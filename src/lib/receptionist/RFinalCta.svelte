<script lang="ts">
	import RDivider from './RDivider.svelte';
	import { LINKS } from './data.js';
</script>

<section aria-label="Get started">
	<div class="r-wrap">
		<RDivider />
		<div class="r-cta">
			<h2>Get started today</h2>
			<p>
				Set up your AI receptionist in minutes. Answer every call, book every meeting, and
				never let a lead slip away.
			</p>
			<div class="r-cta-row">
				<a class="r-btn r-btn-dark r-btn-lg" href={LINKS.calendly}>Talk to sales</a>
			</div>
		</div>
	</div>
</section>

<style>
	.r-cta {
		padding-top: 6rem;
		padding-bottom: 6rem;
		text-align: center;
	}

	@media (min-width: 768px) {
		.r-cta {
			padding-top: 8rem;
			padding-bottom: 8rem;
		}
	}

	@media (min-width: 1024px) {
		.r-cta {
			padding-top: 10rem;
			padding-bottom: 10rem;
		}
	}

	.r-cta h2 {
		font-family: var(--r-font-heading);
		font-weight: 300;
		font-size: 2.25rem;
		line-height: 1.05;
		letter-spacing: -0.03em;
	}

	@media (min-width: 768px) {
		.r-cta h2 {
			font-size: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.r-cta h2 {
			font-size: 3.75rem;
		}
	}

	.r-cta > p {
		margin-top: 1.5rem;
		margin-inline: auto;
		max-width: 36rem;
		font-size: 1rem;
		line-height: 1.4;
		letter-spacing: 0.01em;
		color: var(--r-muted);
	}

	.r-cta-row {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.r-cta-row {
			flex-direction: row;
		}
	}
</style>
