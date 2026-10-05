<script lang="ts">
	import RDivider from './RDivider.svelte';
	import { LINKS, USE_CASES } from './data.js';

	let track: HTMLElement | null = $state(null);
	let canPrev = $state(false);
	let canNext = $state(true);

	function stepSize() {
		const card = track?.querySelector('article');
		return card ? card.getBoundingClientRect().width + 16 : 320;
	}

	function scrollByStep(dir: 1 | -1) {
		track?.scrollBy({ left: dir * stepSize(), behavior: 'smooth' });
	}

	function onScroll() {
		if (!track) return;
		canPrev = track.scrollLeft > 8;
		canNext = track.scrollLeft + track.clientWidth < track.scrollWidth - 8;
	}
</script>

<section id="use-cases" aria-label="Use cases">
	<div class="r-wrap">
		<RDivider />
		<div class="r-section-pad">
			<div class="r-head">
				<h2>More than an AI answering service</h2>
				<p>
					Pantaa Receptionist handles the calls that keep a business running, from scheduling
					to after-hours coverage, so your team can focus on the work that matters.
				</p>
			</div>

			<div class="r-carousel" role="region" aria-label="Pantaa Receptionist use cases carousel">
				<div class="r-fade left" aria-hidden="true"></div>
				<div class="r-fade right" aria-hidden="true"></div>
				<button
					type="button"
					class="r-arrow left"
					aria-label="Previous use case"
					disabled={!canPrev}
					onclick={() => scrollByStep(-1)}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
				<button
					type="button"
					class="r-arrow right"
					aria-label="Next use case"
					disabled={!canNext}
					onclick={() => scrollByStep(1)}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="m9 18 6-6-6-6" />
					</svg>
				</button>

				<div class="r-track" bind:this={track} onscroll={onScroll}>
					{#each USE_CASES as useCase, i}
						<article class="r-card">
							<div class="r-visual">
								<div class="r-grad" style="background:{useCase.gradient}" aria-hidden="true"></div>
								<div class="r-frost" aria-hidden="true"></div>
								<div class="r-panel-wrap">
									<div class="r-panel">
										{#if useCase.image}
											<img src={useCase.image} alt={useCase.alt} loading="lazy" />
										{:else}
											<div class="r-chat" role="img" aria-label={useCase.alt}>
												<div class="r-chat-head">
													<span class="r-chat-dot"></span>
													<span class="r-chat-name">Support</span>
													<span class="r-chat-online">Online</span>
												</div>
												<p class="r-chat-msg in">What time do you close on Sundays?</p>
												<p class="r-chat-msg out">We&rsquo;re open 9 AM &ndash; 5 PM every Sunday.</p>
												<p class="r-chat-msg in">Do I need an appointment?</p>
												<p class="r-chat-msg out">Walk-ins are welcome &mdash; or I can book you in now.</p>
												<div class="r-chat-input"><span>Type a message&hellip;</span></div>
											</div>
										{/if}
									</div>
								</div>
								<div class="r-ring" aria-hidden="true"></div>
							</div>
							<div class="r-card-text">
								<h3>
									{useCase.title}<span class="r-muted">{useCase.trailer}{useCase.description}</span>
								</h3>
								<span class="r-sr">Use case {i + 1} of {USE_CASES.length}</span>
							</div>
						</article>
					{/each}
				</div>
			</div>

			<div class="r-cards-cta">
				<a class="r-btn r-btn-dark r-btn-lg" href={LINKS.calendly}>Talk to sales</a>
			</div>
		</div>
	</div>
</section>

<style>
	.r-carousel {
		position: relative;
		margin-top: 0.5rem;
	}

	@media (min-width: 768px) {
		.r-carousel {
			margin-top: 1.5rem;
		}
	}

	.r-fade {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 2;
		width: 3rem;
		pointer-events: none;
	}

	@media (min-width: 768px) {
		.r-fade {
			display: block;
		}
	}

	.r-fade.left {
		left: 0;
		background: linear-gradient(to right, var(--r-surface), transparent);
	}

	.r-fade.right {
		right: 0;
		background: linear-gradient(to left, var(--r-surface), transparent);
	}

	.r-arrow {
		display: none;
		position: absolute;
		top: 50%;
		z-index: 3;
		height: 2.75rem;
		width: 2.75rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: #fff;
		color: var(--r-foreground);
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.06),
			0 2px 6px 0 rgba(0, 0, 0, 0.08);
		transform: translateY(-50%);
		transition:
			opacity 200ms ease-out,
			transform 200ms ease-out,
			box-shadow 200ms ease-out;
	}

	@media (min-width: 768px) {
		.r-arrow {
			display: flex;
		}
	}

	.r-arrow.left {
		left: 0.5rem;
	}

	.r-arrow.right {
		right: 0.5rem;
	}

	@media (min-width: 1024px) {
		.r-arrow.left {
			left: 0.75rem;
		}
		.r-arrow.right {
			right: 0.75rem;
		}
	}

	.r-arrow:hover:not(:disabled) {
		transform: translateY(calc(-50% - 1px));
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.06),
			0 4px 12px 0 rgba(0, 0, 0, 0.12);
	}

	.r-arrow:disabled {
		cursor: not-allowed;
		opacity: 0;
		pointer-events: none;
	}

	.r-track {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		padding: 0 0.25rem 1rem;
		scrollbar-width: none;
	}

	.r-track::-webkit-scrollbar {
		display: none;
	}

	.r-card {
		position: relative;
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		gap: 1.25rem;
		width: 80vw;
		scroll-snap-align: center;
	}

	@media (min-width: 640px) {
		.r-card {
			width: 60vw;
		}
	}

	@media (min-width: 768px) {
		.r-card {
			width: 26rem;
		}
	}

	@media (min-width: 1024px) {
		.r-card {
			width: 24rem;
		}
	}

	.r-visual {
		position: relative;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		border-radius: 1.25rem;
		background: var(--r-card);
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.075);
	}

	.r-grad {
		position: absolute;
		inset: 0;
	}

	.r-frost {
		position: absolute;
		inset: 0;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
	}

	.r-panel-wrap {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	@media (min-width: 768px) {
		.r-panel-wrap {
			padding: 2rem;
		}
	}

	.r-panel {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow:
			0 8px 30px rgba(0, 0, 0, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.6);
	}

	.r-panel img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.r-ring {
		position: absolute;
		inset: 0;
		border-radius: 1.25rem;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
		pointer-events: none;
	}

	.r-card-text {
		padding-inline: 0.25rem;
	}

	.r-card-text h3 {
		font-family: var(--r-font-heading);
		font-size: 1.125rem;
		line-height: 1.3;
		letter-spacing: 0.01em;
		font-weight: 400;
	}

	.r-muted {
		color: var(--r-muted);
		font-family: var(--r-font-sans);
		font-weight: 400;
		letter-spacing: normal;
	}

	.r-sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	.r-cards-cta {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.r-cards-cta {
			flex-direction: row;
			justify-content: center;
		}
	}

	/* Recreated support-chat visual for card 1 (source image not archived) */
	.r-chat {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.5rem;
		height: 100%;
		padding: 1rem;
		background: #fff;
	}

	.r-chat-head {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 0.6rem;
		margin-bottom: 0.25rem;
		border-bottom: 1px solid var(--r-border);
	}

	.r-chat-dot {
		height: 0.6rem;
		width: 0.6rem;
		border-radius: 9999px;
		background: #22c55e;
	}

	.r-chat-name {
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.r-chat-online {
		margin-left: auto;
		font-size: 0.6875rem;
		color: var(--r-muted);
	}

	.r-chat-msg {
		max-width: 88%;
		padding: 0.55rem 0.75rem;
		border-radius: 0.9rem;
		font-size: 0.8125rem;
		line-height: 1.4;
	}

	.r-chat-msg.in {
		align-self: flex-start;
		background: #f1f1f3;
		border-bottom-left-radius: 0.25rem;
	}

	.r-chat-msg.out {
		align-self: flex-end;
		background: #171717;
		color: #fff;
		border-bottom-right-radius: 0.25rem;
	}

	.r-chat-input {
		margin-top: 0.25rem;
		border-radius: 9999px;
		padding: 0.55rem 0.9rem;
		font-size: 0.75rem;
		color: var(--r-muted);
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
	}
</style>
