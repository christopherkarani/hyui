<script lang="ts">
	import RDivider from './RDivider.svelte';
	import BrandLogo from './BrandLogos.svelte';
	import { PROOF_CARDS } from './data.js';
</script>

<section aria-label="Proven in production">
	<div class="r-wrap">
		<RDivider />
		<div class="r-section-pad">
			<div class="r-head">
				<h2>Proven in production</h2>
				<p>
					Pantaa Receptionist is built on the same Pantaa platform that already handles
					inbound requests involving scheduling, support, and countless other enterprise use
					cases.
				</p>
			</div>

			<div class="r-grid">
				{#each PROOF_CARDS as card}
					<article class="r-proof">
						<div class="r-hover-bg" style="background:{card.gradient}" aria-hidden="true"></div>
						<div class="r-noise" aria-hidden="true"></div>
						<div class="r-proof-inner">
							<div class="r-proof-logo">
								<BrandLogo name={card.logo} label={card.logoLabel} />
							</div>
							<p>{card.stat}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.r-grid {
		margin-inline: auto;
		max-width: 46rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.r-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.r-proof {
		position: relative;
		display: flex;
		aspect-ratio: 1;
		min-height: 100%;
		overflow: hidden;
		border-radius: 2rem;
		background: var(--r-card);
		color: var(--r-foreground);
		padding: 1.5rem;
		box-shadow: var(--r-shadow-proof);
		transition: transform 300ms ease-out;
	}

	@media (min-width: 768px) {
		.r-proof {
			padding: 1.75rem;
		}
	}

	.r-proof:hover {
		transform: translateY(-2px);
	}

	.r-hover-bg {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 500ms ease-out;
	}

	.r-proof:hover .r-hover-bg {
		opacity: 1;
	}

	.r-noise {
		position: absolute;
		inset: 0;
		pointer-events: none;
		mix-blend-mode: overlay;
		opacity: 0;
		transition: opacity 500ms ease-out;
		background-image: url('/receptionist/images/noise.png');
		background-size: 256px;
		image-rendering: pixelated;
	}

	.r-proof:hover .r-noise {
		opacity: 0.45;
	}

	.r-proof-inner {
		position: relative;
		z-index: 1;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
	}

	.r-proof-logo {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		padding-inline: 0.75rem;
		color: #171717;
	}

	.r-proof-logo :global(svg) {
		max-height: 3.5rem;
		max-width: 68%;
		transition:
			filter 500ms ease-out,
			color 300ms ease-out;
	}

	.r-proof:hover .r-proof-logo {
		color: #fff;
	}

	.r-proof-inner > p {
		max-width: 28rem;
		font-size: 1rem;
		line-height: 1.4;
		letter-spacing: 0.01em;
		text-wrap: balance;
		color: var(--r-foreground);
		transition: color 300ms ease-out;
	}

	.r-proof:hover .r-proof-inner > p {
		color: #fff;
	}
</style>
