<script lang="ts">
	import { onDestroy } from 'svelte';
	import { LINKS } from './data.js';

	let live = $state(false);
	let step = $state(0);
	let callEnabled = $state(false);
	let timers: ReturnType<typeof setTimeout>[] = [];

	const SCRIPT = [
		{ from: 'agent', text: 'Thanks for calling Maple Dental. How can I help?' },
		{ from: 'caller', text: 'Hi, do you have anything open tomorrow morning?' },
		{ from: 'agent', text: 'I have 9:15 and 10:30 AM. Which works better?' },
		{ from: 'caller', text: '9:15 is perfect.' },
		{ from: 'agent', text: 'Booked \u2014 tomorrow at 9:15 AM. See you then!' }
	];

	function clearTimers() {
		timers.forEach(clearTimeout);
		timers = [];
	}

	function toggle() {
		clearTimers();
		if (live) {
			live = false;
			step = 0;
			return;
		}
		live = true;
		step = 0;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			step = SCRIPT.length;
			return;
		}
		SCRIPT.forEach((_, i) => {
			timers.push(setTimeout(() => (step = i + 1), 900 * (i + 1)));
		});
	}

	onDestroy(clearTimers);
</script>

<section class="r-hero" aria-label="Introduction">
	<div class="r-wrap r-hero-frame">
		<div class="r-hero-side" aria-hidden="true"></div>
		<div class="r-hero-bottom" aria-hidden="true"></div>

		<div class="r-hero-grid">
			<div class="r-hero-copy">
				<h1>An AI receptionist that turns calls into action.</h1>
				<p>
					Pantaa Receptionist answers calls 24/7, handles questions, books appointments, and
					routes important requests using your business information, rules, and real availability.
				</p>
				<div class="r-hero-cta">
					<a class="r-btn r-btn-dark r-btn-lg" href={LINKS.calendly}>Talk to sales</a>
				</div>
			</div>

			<div class="r-voice" data-agent-interaction="true">
				<div class="r-voice-stage">
					<div class="r-orb-wrap">
						<div class="r-orb" class:live>
							<img src="/receptionist/images/agent-1.png" alt="" loading="eager" />
						</div>
						<div class="r-voice-script" aria-live="polite">
							{#each SCRIPT.slice(0, step) as line}
								<p class="r-msg" class:caller={line.from === 'caller'}>{line.text}</p>
							{/each}
						</div>
					</div>

					{#if callEnabled}
					<button
						type="button"
						class="r-call-btn"
						class:live
						aria-label={live ? 'End voice demo' : 'Start voice call'}
						onclick={toggle}
					>
						{#if live}
							<span class="r-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
						{:else}
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path
									d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
								/>
							</svg>
						{/if}
					</button>
					<p class="r-call-label">{live ? 'Live demo \u2014 tap to end' : 'Start call'}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.r-hero {
		position: relative;
	}

	.r-hero-frame {
		overflow: clip;
	}

	.r-hero-side {
		position: absolute;
		top: -4rem;
		bottom: 0;
		left: 50%;
		right: 0;
		display: none;
		background: var(--r-card);
	}

	@media (min-width: 1024px) {
		.r-hero-side {
			display: block;
		}
	}

	.r-hero-bottom {
		position: absolute;
		bottom: 0;
		left: calc(50% - 50vw);
		right: calc(50% - 50vw);
		height: 1px;
		background: var(--r-border-side);
	}

	.r-hero-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		gap: 2.5rem;
		padding-top: 3rem;
		padding-bottom: 2.5rem;
	}

	@media (min-width: 768px) {
		.r-hero-grid {
			padding-top: 5rem;
			padding-bottom: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.r-hero-grid {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			padding-top: 6rem;
			padding-bottom: 3.5rem;
		}
	}

	.r-hero-copy {
		text-align: center;
	}

	@media (min-width: 1024px) {
		.r-hero-copy {
			text-align: left;
		}
	}

	.r-hero-copy h1 {
		font-family: var(--r-font-heading);
		font-weight: 300;
		font-size: 2.25rem;
		line-height: 1.05;
		letter-spacing: -0.03em;
		text-wrap: balance;
	}

	@media (min-width: 768px) {
		.r-hero-copy h1 {
			font-size: 3rem;
		}
	}

	.r-hero-copy > p {
		margin-top: 1.5rem;
		margin-inline: auto;
		max-width: 42rem;
		font-size: 1rem;
		line-height: 1.4;
		letter-spacing: 0.01em;
		color: var(--r-muted);
	}

	@media (min-width: 1024px) {
		.r-hero-copy > p {
			margin-inline: 0;
		}
	}

	.r-hero-cta {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.r-hero-cta {
			flex-direction: row;
			justify-content: center;
		}
	}

	@media (min-width: 1024px) {
		.r-hero-cta {
			justify-content: flex-start;
		}
	}

	.r-voice {
		overflow: hidden;
		border-radius: 2rem;
		background: var(--r-card);
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
		height: 30rem;
	}

	@media (min-width: 1024px) {
		.r-voice {
			border-radius: 0;
			background: transparent;
			box-shadow: none;
			height: 32rem;
		}
	}

	.r-voice-stage {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		min-height: 0;
		border-radius: inherit;
		overflow: hidden;
		padding: 1rem;
	}

	.r-orb-wrap {
		position: relative;
		width: 16rem;
		max-width: 100%;
	}

	.r-orb {
		position: relative;
		aspect-ratio: 1;
		width: 16rem;
		max-width: 100%;
		margin-inline: auto;
		border-radius: 9999px;
		overflow: hidden;
		box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.075);
	}

	.r-orb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.02);
	}

	.r-orb.live::after {
		content: '';
		position: absolute;
		inset: -3px;
		border-radius: inherit;
		border: 2px solid rgba(0, 0, 0, 0.55);
		animation: r-ping 1.8s ease-out infinite;
	}

	@keyframes r-ping {
		0% {
			transform: scale(1);
			opacity: 0.7;
		}
		100% {
			transform: scale(1.12);
			opacity: 0;
		}
	}

	.r-voice-script {
		position: absolute;
		inset: -3rem -0.75rem;
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		gap: 0.5rem;
		padding: 5rem 0;
		pointer-events: none;
		mask-image: linear-gradient(to bottom, transparent, white 3rem, white calc(100% - 5rem), transparent calc(100% - 2rem));
		-webkit-mask-image: linear-gradient(to bottom, transparent, white 3rem, white calc(100% - 5rem), transparent calc(100% - 2rem));
	}

	.r-msg {
		max-width: 85%;
		padding: 0.5rem 0.8rem;
		border-radius: 1rem;
		font-size: 0.8125rem;
		line-height: 1.35;
		background: rgba(255, 255, 255, 0.92);
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
		align-self: flex-start;
		animation: r-msg-in 400ms ease-out;
	}

	.r-msg.caller {
		align-self: flex-end;
		background: #171717;
		color: #fff;
	}

	@keyframes r-msg-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
	}

	.r-call-btn {
		margin-top: 1.5rem;
		display: flex;
		flex-shrink: 0;
		height: 3rem;
		width: 3rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: #fff;
		color: #000;
		box-shadow:
			0 0 1px rgba(0, 0, 0, 0.4),
			0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 200ms ease-out;
	}

	.r-call-btn:hover {
		transform: scale(1.05);
	}

	.r-call-btn.live {
		background: #171717;
		color: #fff;
	}

	.r-eq {
		display: flex;
		align-items: flex-end;
		gap: 2.5px;
		height: 1rem;
	}

	.r-eq i {
		width: 3px;
		border-radius: 2px;
		background: currentColor;
		animation: r-eq 0.9s ease-in-out infinite;
	}

	.r-eq i:nth-child(1) {
		height: 60%;
	}
	.r-eq i:nth-child(2) {
		height: 100%;
		animation-delay: 0.15s;
	}
	.r-eq i:nth-child(3) {
		height: 45%;
		animation-delay: 0.3s;
	}
	.r-eq i:nth-child(4) {
		height: 75%;
		animation-delay: 0.45s;
	}

	@keyframes r-eq {
		0%,
		100% {
			transform: scaleY(0.5);
		}
		50% {
			transform: scaleY(1);
		}
	}

	.r-call-label {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--r-muted);
	}
</style>
