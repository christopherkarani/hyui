import { describe, it, expect, vi } from 'vitest';
import {
	startWithTimeout,
	StartTimeoutError,
	isFillerLine,
	type VoiceSession
} from '../src/lib/receptionist/voice';

function fakeSession(): VoiceSession {
	return { endSession: vi.fn(async () => {}) } as unknown as VoiceSession;
}

describe('startWithTimeout', () => {
	it('resolves when the start wins the race', async () => {
		const session = fakeSession();
		const out = await startWithTimeout(async () => session, 50);
		expect(out).toBe(session);
		expect((session as unknown as { endSession: () => void }).endSession).not.toHaveBeenCalled();
	});

	it('rejects with StartTimeoutError when the start hangs', async () => {
		await expect(startWithTimeout(() => new Promise(() => {}), 20)).rejects.toBeInstanceOf(
			StartTimeoutError
		);
	});

	it('ends a session that resolves after losing the race', async () => {
		const session = fakeSession();
		let release!: (s: VoiceSession) => void;
		const gate = new Promise<VoiceSession>((res) => {
			release = res;
		});
		const pending = startWithTimeout(() => gate, 20);
		await expect(pending).rejects.toBeInstanceOf(StartTimeoutError);
		release(session);
		await gate;
		await new Promise((r) => setTimeout(r, 10));
		expect((session as unknown as { endSession: () => void }).endSession).toHaveBeenCalledTimes(1);
	});

	it('passes through a fast rejection untouched', async () => {
		const boom = new Error('mic denied');
		await expect(startWithTimeout(() => Promise.reject(boom), 50)).rejects.toBe(boom);
	});
});

describe('isFillerLine', () => {
	it.each(['...', '…', '. . .', '—', '   ', '?!', '\u200b', '\u200b.\u200b.\u200b'])('drops %j', (line) => {
		expect(isFillerLine(line)).toBe(true);
	});

	it.each(['Hi', 'Okay.', '123', '[Patient] hello', 'a'])('keeps %j', (line) => {
		expect(isFillerLine(line)).toBe(false);
	});
});
