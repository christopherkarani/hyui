<script lang="ts">
	import RDivider from './RDivider.svelte';
	import BrandLogo from './BrandLogos.svelte';

	const LOGOS = [
		{ name: 'twilio', label: 'Twilio' },
		{ name: 'klarna', label: 'Klarna' },
		{ name: 'cisco', label: 'Cisco' },
		{ name: 'telekom', label: 'Deutsche Telekom' }
	] as const;
</script>

<section aria-label="Trusted by leading brands">
	<div class="r-wrap">
		<RDivider />
		<div class="r-strip">
			<p>Built on the platform trusted by the world&rsquo;s top brands</p>
			<div class="r-logos">
				{#each LOGOS as logo}
					<span class="r-logo-cell">
						<BrandLogo name={logo.name} label={logo.label} />
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.r-strip {
		padding: 2.5rem 1rem;
	}

	@media (min-width: 768px) {
		.r-strip {
			padding: 3rem 1.75rem;
		}
	}

	.r-strip > p {
		margin-bottom: 2rem;
		text-align: center;
		font-size: 0.875rem;
		letter-spacing: 0.02em;
		color: var(--r-muted);
	}

	.r-logos {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		justify-items: center;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.r-logos {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.r-logo-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1rem;
		color: #171717;
		opacity: 0.5;
		filter: grayscale(1);
		transition:
			opacity 300ms ease-out,
			filter 300ms ease-out;
	}

	.r-logo-cell:hover {
		opacity: 1;
		filter: grayscale(0);
	}
</style>
