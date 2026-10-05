<script lang="ts">
	import RDivider from './RDivider.svelte';
	import { FAQS } from './data.js';

	let open = $state(-1);

	function toggle(i: number) {
		open = open === i ? -1 : i;
	}
</script>

<section id="faqs" aria-label="Frequently asked questions">
	<div class="r-wrap">
		<RDivider />
		<div class="r-faq-pad">
			<div class="r-faq-grid">
				<h2>Frequently asked<br />questions</h2>
				<div class="r-list">
					{#each FAQS as faq, i}
						<div class="r-item">
							<button
								type="button"
								aria-expanded={open === i}
								aria-controls={`faq-panel-${i}`}
								id={`faq-trigger-${i}`}
								class="r-trigger"
								onclick={() => toggle(i)}
							>
								<span class="r-q">{faq.q}</span>
								<span class="r-icon" class:open={open === i} aria-hidden="true">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
										<path d="M12 5v14" />
										<path d="M5 12h14" />
									</svg>
								</span>
							</button>
							<div
								class="r-answer"
								class:open={open === i}
								id={`faq-panel-${i}`}
								role="region"
								aria-labelledby={`faq-trigger-${i}`}
							>
								<p>{faq.a}</p>
							</div>
							<div class="r-dots" aria-hidden="true"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.r-faq-pad {
		padding: 2.5rem 1rem 1.75rem;
	}

	@media (min-width: 768px) {
		.r-faq-pad {
			padding: 4rem 1.75rem 2.5rem;
		}
	}

	@media (min-width: 1024px) {
		.r-faq-pad {
			padding-top: 8rem;
			padding-bottom: 3.5rem;
		}
	}

	.r-faq-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.r-faq-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.r-faq-grid h2 {
		font-family: var(--r-font-heading);
		font-weight: 300;
		font-size: 1.75rem;
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	@media (min-width: 768px) {
		.r-faq-grid h2 {
			font-size: 2rem;
		}
	}

	@media (min-width: 1024px) {
		.r-faq-grid h2 {
			font-size: 2.5rem;
		}
	}

	.r-trigger {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
		text-align: left;
		cursor: pointer;
	}

	.r-q {
		font-family: var(--r-font-heading);
		font-size: 1.125rem;
		line-height: 1.3;
		letter-spacing: 0.01em;
		padding-right: 1rem;
	}

	.r-icon {
		flex-shrink: 0;
		display: flex;
		transition: transform 250ms ease-out;
	}

	.r-icon.open {
		transform: rotate(45deg);
	}

	.r-answer {
		display: grid;
		grid-template-rows: 0fr;
		opacity: 0;
		transition:
			grid-template-rows 300ms ease-out,
			opacity 300ms ease-out;
	}

	.r-answer > p {
		overflow: hidden;
		font-size: 1rem;
		line-height: 1.4;
		letter-spacing: 0.01em;
		color: var(--r-muted);
	}

	.r-answer.open {
		grid-template-rows: 1fr;
		opacity: 1;
	}

	.r-answer.open > p {
		padding-bottom: 1.25rem;
	}

	.r-dots {
		width: 100%;
		height: 2px;
		background-image: repeating-radial-gradient(
			circle,
			rgba(0, 0, 0, 0.15) 0 1px,
			transparent 1px 6px
		);
		background-size: 6px 100%;
	}
</style>
