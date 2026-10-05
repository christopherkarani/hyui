<script lang="ts">
	import RDivider from './RDivider.svelte';
	import { LINKS } from './data.js';
</script>

<section id="pricing" aria-label="Pricing">
	<div class="r-wrap">
		<RDivider />
		<div class="r-sales">
			<p class="r-eyebrow">Pricing</p>
			<h2>A plan built around your call volume</h2>
			<p>
				Every business answers a different number of calls. Tell us about your volume,
				locations, and workflow, and we&rsquo;ll tailor Pantaa Receptionist &mdash; and its
				price &mdash; to fit.
			</p>
			<a class="r-btn r-btn-dark r-btn-lg" href={LINKS.calendly}>Talk to sales</a>
		</div>
	</div>
</section>

<style>
	.r-sales {
		margin-inline: auto;
		max-width: 56rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 5rem 2rem;
	}

	@media (min-width: 768px) {
		.r-sales {
			padding: 6rem 3rem;
		}
	}

	.r-eyebrow {
		font-size: 11px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--r-muted);
	}

	.r-sales h2 {
		margin-top: 1.25rem;
		font-family: var(--r-font-heading);
		font-weight: 300;
		font-size: 2.5rem;
		line-height: 1.02;
		letter-spacing: -0.04em;
		text-wrap: balance;
	}

	@media (min-width: 768px) {
		.r-sales h2 {
			font-size: 3.75rem;
		}
	}

	.r-sales > p {
		margin-top: 1.5rem;
		max-width: 36rem;
		font-size: 1rem;
		line-height: 1.4;
		letter-spacing: 0.01em;
		color: var(--r-muted);
	}

	.r-sales > a {
		margin-top: 2rem;
	}
</style>
