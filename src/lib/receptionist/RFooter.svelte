<script lang="ts">
	import RDivider from './RDivider.svelte';
	import { LINKS, VOICE_UI, VOICE_ENABLED } from './data.js';
	import { voiceStatus, toggleVoiceSession, isVoiceConfigured } from './voice.js';

	function onPill() {
		if (!isVoiceConfigured() && $voiceStatus !== 'live' && $voiceStatus !== 'connecting') {
			window.location.href = LINKS.contact;
			return;
		}
		toggleVoiceSession();
	}
</script>

<footer aria-label="Footer">
	<div class="r-wrap">
		<RDivider />
		<div class="r-foot">
			<a class="r-logo" href={LINKS.home} aria-label="Pantaa home">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5" />
					<path d="M6 12C6 8.68629 8.68629 6 12 6" stroke="currentColor" stroke-width="1.5" />
					<path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="currentColor" stroke-width="1.5" />
					<path d="M4 12H20" stroke="currentColor" stroke-width="1" opacity="0.3" />
				</svg>
				<span><strong>Pantaa</strong> Receptionist</span>
			</a>
			<nav class="r-foot-nav" aria-label="Footer">
				<a href={LINKS.contact}>Partners</a>
				<a href={LINKS.home}>Pantaa</a>
				<a href={LINKS.x} target="_blank" rel="noopener noreferrer">X</a>
				<a href={LINKS.terms}>Terms</a>
				<a href={LINKS.privacy}>Privacy</a>
			</nav>
		</div>
	</div>
</footer>

{#if VOICE_ENABLED && VOICE_UI === 'custom'}
<button
	type="button"
	class="r-pill"
	class:live={$voiceStatus === 'live'}
	aria-label={$voiceStatus === 'live' ? 'End voice call' : 'Try a Pantaa agent'}
	onclick={onPill}
>
	<span class="r-pill-avatar">
		<img src="/receptionist/images/agent-2.png" alt="" loading="lazy" />
	</span>
	<span class="r-pill-text">
		<strong>{$voiceStatus === 'live' ? 'End voice call' : 'Try a Pantaa agent'}</strong>
		<span class="r-pill-sub">
			Pantaa Receptionist <i aria-hidden="true"></i>
			{#if $voiceStatus === 'live'}
				Live now
			{:else if $voiceStatus === 'connecting'}
				Connecting…
			{:else}
				Ready
			{/if}
		</span>
	</span>
</button>
{/if}

<style>
	.r-foot {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 2rem 1rem;
	}

	@media (min-width: 640px) {
		.r-foot {
			flex-direction: row;
		}
	}

	@media (min-width: 768px) {
		.r-foot {
			padding: 2.5rem 1.75rem;
		}
	}

	.r-logo {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.5rem;
		color: var(--r-foreground);
		font-size: 0.95rem;
		letter-spacing: -0.01em;
	}

	.r-logo strong {
		font-weight: 600;
	}

	.r-foot-nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
	}

	.r-foot-nav a {
		padding: 0.5rem 0.75rem;
		border-radius: 1.125rem;
		font-size: 0.75rem;
		line-height: 1.25rem;
		transition: background-color 200ms ease-out;
	}

	.r-foot-nav a:hover {
		background: rgba(31, 41, 55, 0.05);
	}

	.r-pill {
		position: fixed;
		left: 50%;
		bottom: max(1rem, env(safe-area-inset-bottom));
		z-index: 60;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		height: 3.5rem;
		width: fit-content;
		max-width: calc(100% - 2rem);
		padding: 0.5rem 1.25rem 0.5rem 3.5rem;
		border: none;
		border-radius: 1.75rem;
		background: #fff;
		color: var(--r-foreground);
		font: inherit;
		text-align: left;
		cursor: pointer;
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.08),
			0 6px 16px rgba(78, 50, 23, 0.08);
		transition: background-color 200ms ease-out;
	}

	.r-pill.live .r-pill-sub i {
		animation: r-blink 1.2s ease-in-out infinite;
	}

	@keyframes r-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
	}

	.r-pill:hover {
		background: #fafafa;
	}

	.r-pill-avatar {
		position: absolute;
		left: 0.625rem;
		bottom: 0.625rem;
		height: 2.25rem;
		width: 2.25rem;
		overflow: hidden;
		border-radius: 9999px;
	}

	.r-pill-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.r-pill-text {
		display: flex;
		flex-direction: column;
		line-height: 1.3;
		white-space: nowrap;
	}

	.r-pill-text strong {
		font-size: 0.875rem;
		font-weight: 500;
	}

	.r-pill-sub {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.75rem;
		color: var(--r-muted);
	}

	.r-pill-sub i {
		height: 5px;
		width: 5px;
		border-radius: 9999px;
		background: #22c55e;
	}
</style>
