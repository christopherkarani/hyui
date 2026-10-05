import { writable, get, type Writable } from 'svelte/store';
import type { VoiceConversation, TextConversation } from '@elevenlabs/client';
import { VOICE_AGENT_ID } from './data.js';

export type VoiceStatus = 'idle' | 'connecting' | 'live' | 'error';
export type VoiceMode = 'speaking' | 'listening';

export interface VoiceMsg {
	id: number;
	from: 'caller' | 'agent';
	text: string;
}

export type VoiceSession = VoiceConversation | TextConversation;

const MAX_TRANSCRIPT = 12;

export const voiceStatus: Writable<VoiceStatus> = writable('idle');
export const voiceTranscript: Writable<VoiceMsg[]> = writable([]);
export const voiceMode: Writable<VoiceMode> = writable('listening');
export const voiceError: Writable<string | null> = writable(null);

let session: VoiceSession | null = null;
let starting = false;
let userEnded = false;
let msgId = 0;
/** Locally echoed user text awaiting (or missing) its server echo. */
let pendingEcho: string | null = null;
/** Text typed while (re)connecting; sent on the next connect. */
let queuedText: string | null = null;
/** Bumps on every (re)start and every user end; stale attempts check against it. */
let epoch = 0;
/** Timestamps of recent remote drops. A per-try counter resets on every connect,
 * which loops forever when each new session dies fast; a windowed count bounds that. */
let recentFailures: number[] = [];
const MAX_RECONNECT = 2;
const FAILURE_WINDOW_MS = 60000;

/** End a session object we no longer own (superseded attempt, lost race). */
function orphanSession(s: VoiceSession) {
	try {
		void s.endSession();
	} catch {
		// Already dead; nothing to hold.
	}
}

export function isVoiceConfigured(): boolean {
	return VOICE_AGENT_ID.trim().length > 0;
}

function friendlyError(message: string): string {
	const m = message.toLowerCase();
	if (m.includes('timed out')) {
		return 'Connection timed out. Try again.';
	}
	if (m.includes('microphone') || m.includes('permission') || m.includes('denied')) {
		return 'Microphone access was denied. Allow the microphone and try again.';
	}
	if (m.includes('not found') || m.includes('404') || m.includes('agent')) {
		return 'Voice agent not found. Check the agent ID and try again.';
	}
	return 'Could not start the voice call. Try again.';
}

function resetSession() {
	session = null;
	starting = false;
	pendingEcho = null;
}

function appendLine(line: Omit<VoiceMsg, 'id'>) {
	voiceTranscript.update((lines) => [...lines, { ...line, id: ++msgId }].slice(-MAX_TRANSCRIPT));
}

/** True when a line holds no readable content ("...", zero-width junk, bare punctuation). */
export function isFillerLine(text: string): boolean {
	return text.replace(/[^\p{L}\p{N}]/gu, '').length === 0;
}

function safeJson(value: unknown): string {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}

export class StartTimeoutError extends Error {}
const START_TIMEOUT_MS = 20000;

/**
 * Race a session start against a timeout. A hung start (neither resolve nor
 * reject) previously left the UI on "Connecting…" forever with no way out;
 * now it rejects so the caller can retry or surface a retriable error.
 * A session that resolves after losing the race is ended as an orphan.
 */
export function startWithTimeout(
	start: () => Promise<VoiceSession>,
	ms = START_TIMEOUT_MS
): Promise<VoiceSession> {
	return new Promise((resolve, reject) => {
		let settled = false;
		// The main handlers below orphan a late resolve and swallow a late reject.
		const timer = setTimeout(() => {
			if (settled) return;
			settled = true;
			reject(new StartTimeoutError('Connection timed out. Try again.'));
		}, ms);
		const task = start();
		task.then(
			(s) => {
				if (settled) orphanSession(s);
				else {
					settled = true;
					clearTimeout(timer);
					resolve(s);
				}
			},
			(e) => {
				if (settled) return;
				settled = true;
				clearTimeout(timer);
				reject(e);
			}
		);
	});
}

/** Remote hangup vs local end look identical on the wire; only the flag tells. */
function handleRemoteEnd(kind: 'voice' | 'text') {
	const wasUser = userEnded;
	resetSession();
	if (wasUser) {
		recentFailures = [];
		voiceStatus.set('idle');
		return;
	}
	console.debug('[voice] remote end');
	// Transient server drops ("Server error: Unknown error" + reason agent) are
	// common enough to mask: silently rejoin, keeping the transcript. But when
	// every session dies within seconds, retrying forever is worse than an error.
	const now = Date.now();
	recentFailures = [...recentFailures.filter((t) => now - t < FAILURE_WINDOW_MS), now];
	if (recentFailures.length <= MAX_RECONNECT) {
		console.debug('[voice] auto-reconnect try', recentFailures.length);
		voiceError.set(null);
		voiceStatus.set('connecting');
		void restartSession(kind);
		return;
	}
	recentFailures = [];
	queuedText = null;
	epoch++; // Abandon the dead session; its twin event must not retrigger us.
	voiceError.set('The agent ended the conversation.');
	voiceStatus.set('error');
}

/** Silent restart after a remote drop; keeps the transcript and flushes queued text. */
async function restartSession(kind: 'voice' | 'text'): Promise<void> {
	if (starting) return;
	starting = true;
	epoch++;
	const attemptEpoch = epoch;
	try {
		const mod = await import('@elevenlabs/client');
		const callbacks = sessionCallbacks(kind, attemptEpoch);
		const next = await startWithTimeout(() =>
			kind === 'voice'
				? mod.VoiceConversation.startSession({ agentId: VOICE_AGENT_ID, ...callbacks })
				: mod.TextConversation.startSession({ agentId: VOICE_AGENT_ID, ...callbacks })
		);
		if (attemptEpoch !== epoch) {
			orphanSession(next);
			return;
		}
		session = next;
		voiceError.set(null);
		voiceStatus.set('live');
	} catch (e) {
		if (attemptEpoch !== epoch) return; // Superseded; a newer attempt owns state.
		epoch++; // Abandon any late callbacks from this attempt.
		resetSession();
		if (e instanceof StartTimeoutError) {
			// A hung rejoin consumes a retry like any other remote failure.
			handleRemoteEnd(kind);
		} else {
			queuedText = null;
			voiceError.set(friendlyError(e instanceof Error ? e.message : String(e)));
			voiceStatus.set('error');
		}
	} finally {
		if (attemptEpoch === epoch) starting = false;
	}
}

function flushQueue() {
	if (!queuedText || !session) return;
	const text = queuedText;
	queuedText = null;
	pendingEcho = text;
	try {
		session.sendUserMessage(text);
	} catch {
		// Session died mid-flush; the line is already in the transcript.
	}
}

function sessionCallbacks(kind: 'voice' | 'text', attemptEpoch: number) {
	// The attempt's own epoch, NOT the live global: async setup (SDK import)
	// can finish after a newer attempt started, and reading the global here
	// would let a superseded session masquerade as the current one.
	const myEpoch = attemptEpoch;
	const isStale = () => myEpoch !== epoch;
	return {
		onConnect: () => {
			if (isStale()) return;
			console.debug('[voice] connected');
			voiceError.set(null);
			voiceStatus.set('live');
			flushQueue();
		},
		onDisconnect: (details?: unknown) => {
			console.debug('[voice] disconnected', safeJson(details));
			if (isStale()) return;
			handleRemoteEnd(kind);
		},
		onError: (message: string) => {
			if (isStale()) return;
			console.debug('[voice] error', message);
			resetSession();
			voiceError.set(friendlyError(message));
			voiceStatus.set('error');
		},
		onMessage: ({ message, role }: { message: string; role: 'user' | 'agent' }) => {
			if (isStale()) return;
			const text = message?.trim();
			if (!text) return;
			// Agents emit content-free filler while listening; never bubble it.
			if (role !== 'user' && isFillerLine(text)) return;
			if (role === 'user') {
				if (pendingEcho !== null && text === pendingEcho) {
					pendingEcho = null;
					return;
				}
				if (pendingEcho !== null) pendingEcho = null;
			}
			appendLine({ from: role === 'user' ? 'caller' : 'agent', text });
		},
		onModeChange: ({ mode }: { mode: VoiceMode }) => {
			if (isStale()) return;
			voiceMode.set(mode);
		},
		onStatusChange: ({ status: next }: { status: string }) => {
			if (isStale()) return;
			console.debug('[voice] status', next);
			if (next === 'connected') {
				voiceError.set(null);
				voiceStatus.set('live');
				flushQueue();
			} else if (next === 'disconnected' && session) {
				handleRemoteEnd(kind);
			}
		}
	};
}

function requireConfigured(): boolean {
	if (!isVoiceConfigured()) {
		voiceError.set('Voice agent is not configured yet.');
		voiceStatus.set('error');
		return false;
	}
	return true;
}

async function shutdownSession() {
	epoch++; // The session being shut down no longer owns state; ignore its echoes.
	const current = session;
	resetSession();
	if (current) {
		try {
			await current.endSession();
		} catch {
			// Already disconnected; nothing to do.
		}
	}
}

export async function startVoiceSession(): Promise<void> {
	const status = get(voiceStatus);
	if (starting || status === 'live' || status === 'connecting') return;
	if (!requireConfigured()) return;

	if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
		voiceError.set('Microphone is not available in this browser.');
		voiceStatus.set('error');
		return;
	}

	// One active session at a time: a text chat yields to voice.
	userEnded = true;
	await shutdownSession();
	userEnded = false;

	starting = true;
	epoch++;
	const attemptEpoch = epoch;
	queuedText = null;
	recentFailures = [];
	voiceError.set(null);
	voiceTranscript.set([]);
	voiceMode.set('listening');
	voiceStatus.set('connecting');

	try {
		// Dynamic import keeps the voice SDK out of SSR and the initial bundle.
		const { VoiceConversation } = await import('@elevenlabs/client');
		const next = await startWithTimeout(() =>
			VoiceConversation.startSession({
				agentId: VOICE_AGENT_ID,
				...sessionCallbacks('voice', attemptEpoch)
			})
		);
		if (attemptEpoch !== epoch) {
			orphanSession(next);
			return;
		}
		session = next;
		voiceError.set(null);
		voiceStatus.set('live');
	} catch (e) {
		if (attemptEpoch !== epoch) return; // Superseded; a newer attempt owns state.
		epoch++; // Abandon any late callbacks from this attempt.
		resetSession();
		voiceError.set(friendlyError(e instanceof Error ? e.message : String(e)));
		voiceStatus.set('error');
	} finally {
		if (attemptEpoch === epoch) starting = false;
	}
}

/** Send typed text to the agent, starting a text session when none is live. */
export async function sendTextMessage(raw: string): Promise<void> {
	const text = raw.trim();
	if (!text) return;
	if (!requireConfigured()) return;

	const status = get(voiceStatus);
	// Typed while (re)connecting: show immediately, send on connect.
	if (status === 'connecting' || starting) {
		queuedText = text;
		appendLine({ from: 'caller', text });
		return;
	}

	// -1 until the fresh-start attempt below runs; the live-send branch makes no attempt.
	let attemptEpoch = -1;
	try {
		if ((status === 'live' || status === 'error') && session) {
			pendingEcho = text;
			appendLine({ from: 'caller', text });
			session.sendUserMessage(text);
			voiceStatus.set('live');
			return;
		}

		starting = true;
		epoch++;
		attemptEpoch = epoch;
		recentFailures = [];
		voiceError.set(null);
		voiceStatus.set('connecting');

		const { TextConversation } = await import('@elevenlabs/client');
		const next = await startWithTimeout(() =>
			TextConversation.startSession({
				agentId: VOICE_AGENT_ID,
				...sessionCallbacks('text', attemptEpoch)
			})
		);
		if (attemptEpoch !== epoch) {
			orphanSession(next);
			return;
		}
		session = next;
		pendingEcho = text;
		appendLine({ from: 'caller', text });
		session.sendUserMessage(text);
		voiceError.set(null);
		voiceStatus.set('live');
	} catch (e) {
		// A live-send throw leaves the dead session's disconnect to drive the reconnect.
		if (attemptEpoch !== -1 && attemptEpoch !== epoch) return;
		if (attemptEpoch !== -1) epoch++; // Abandon the failed start's late callbacks.
		resetSession();
		voiceError.set(friendlyError(e instanceof Error ? e.message : String(e)));
		voiceStatus.set('error');
	} finally {
		if (attemptEpoch === epoch) starting = false;
	}
}

export async function endVoiceSession(): Promise<void> {
	userEnded = true;
	queuedText = null;
	recentFailures = [];
	await shutdownSession(); // Bumps epoch: in-flight starts and the old session go stale.
	voiceStatus.set('idle');
}

export function toggleVoiceSession(): void {
	const status = get(voiceStatus);
	if (status === 'live' || status === 'connecting') {
		void endVoiceSession();
	} else {
		void startVoiceSession();
	}
}
