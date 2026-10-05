<script lang="ts">
	import RDivider from './RDivider.svelte';
	import { INDUSTRIES } from './data.js';
	import { activeIndustry } from './stores.js';

	let selected = $state(0);
	const unsub = activeIndustry.subscribe((v) => (selected = v));
	$effect(() => () => unsub());

	function select(i: number) {
		activeIndustry.set(i);
	}

	function onKeys(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			select((selected + 1) % INDUSTRIES.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			select((selected - 1 + INDUSTRIES.length) % INDUSTRIES.length);
		}
	}

	let industry = $derived(INDUSTRIES[selected]);
</script>

<section id="industries" aria-label="Industries">
	<div class="r-wrap">
		<RDivider />
		<div class="r-section-pad">
			<div class="r-head">
				<h2>Built for home services, professional services, automotive, wellness, and more</h2>
				<p>
					Every business handles calls and bookings differently. Pantaa Receptionist adapts to
					the way your office handles calls, intake, scheduling, and follow-up, so every customer
					reaches the right next step.
				</p>
			</div>

			<div class="r-split">
				<div
					class="r-tabpanel"
					role="tabpanel"
					id="industry-panel"
					aria-labelledby={`industry-tab-${selected}`}
					tabindex="0"
				>
					<div class="r-phone-stage">
						<div class="r-phone-frame">
							<div class="r-phone">
								<div class="r-phone-head">
									<span class="r-avatar">
										<img src="/receptionist/images/agent-1.png" alt="" loading="lazy" />
									</span>
									<span class="r-phone-name">{industry.panelName}</span>
								</div>
								{#key selected}
									<div class="r-transcript">
										{#each industry.transcript as line}
											<p class="r-line" class:caller={line.from === 'caller'}>{line.text}</p>
										{/each}
										{#if industry.booking}
											<div class="r-booking">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
													<path d="M20 6 9 17l-5-5" />
												</svg>
												<span>
													<strong>{industry.booking.title}</strong>
													{industry.booking.detail}
												</span>
											</div>
										{/if}
									</div>
								{/key}
							</div>
						</div>
					</div>
				</div>

				<ul
					class="r-tabs"
					role="tablist"
					aria-label="Business vertical scenarios"
					aria-orientation="vertical"
					onkeydown={onKeys}
				>
					{#each INDUSTRIES as ind, i}
						<li role="presentation">
							<button
								type="button"
								role="tab"
								id={`industry-tab-${i}`}
								aria-selected={i === selected}
								aria-controls="industry-panel"
								tabindex={i === selected ? 0 : -1}
								class="r-tab"
								class:active={i === selected}
								onclick={() => select(i)}
							>
								<span class="r-tab-name">{ind.name}</span>
								<span class="r-tab-desc" aria-hidden={i !== selected}>
									<span>{ind.description}</span>
								</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	.r-split {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.r-split {
			margin-top: 3rem;
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
		}
	}

	.r-tabpanel {
		position: relative;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: flex-end;
	}

	@media (min-width: 1024px) {
		.r-tabpanel {
			grid-column-start: 2;
			grid-row-start: 1;
			max-width: 37.5rem;
		}
	}

	.r-phone-stage {
		aspect-ratio: 3 / 4;
		width: 100%;
	}

	@media (min-width: 640px) {
		.r-phone-stage {
			aspect-ratio: 1;
		}
	}

	.r-phone-frame {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
		overflow: clip;
		border-radius: 1rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background: #f5f3f1;
		padding: 1rem;
	}

	@media (min-width: 768px) {
		.r-phone-frame {
			border-radius: 1.5rem;
			padding: 2rem;
		}
	}

	.r-phone {
		position: relative;
		display: flex;
		flex-direction: column;
		aspect-ratio: 2 / 3;
		height: 100%;
		max-height: 28rem;
		overflow: hidden;
		border-radius: 0.75rem;
		background: #fff;
		padding: 0.625rem;
		box-shadow:
			0 0 0.9px 0 rgba(0, 0, 0, 0.4),
			0 1.8px 1.8px 0 rgba(0, 0, 0, 0.04);
	}

	@media (min-width: 768px) {
		.r-phone {
			border-radius: 1.8rem;
			padding: 0.875rem;
		}
	}

	.r-phone-head {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 0.75rem;
		background: linear-gradient(180deg, #fff 36%, rgba(255, 255, 255, 0) 100%);
	}

	@media (min-width: 768px) {
		.r-phone-head {
			gap: 0.75rem;
			padding-bottom: 1rem;
		}
	}

	.r-avatar {
		position: relative;
		flex-shrink: 0;
		height: 2rem;
		width: 2rem;
		overflow: hidden;
		border-radius: 9999px;
	}

	@media (min-width: 768px) {
		.r-avatar {
			height: 2.5rem;
			width: 2.5rem;
		}
	}

	.r-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.r-phone-name {
		font-size: 0.75rem;
		font-weight: 500;
		color: #000;
	}

	@media (min-width: 768px) {
		.r-phone-name {
			font-size: 0.875rem;
		}
	}

	.r-transcript {
		display: flex;
		flex: 1;
		min-height: 0;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.5rem;
		overflow: hidden;
		padding: 0.375rem;
		animation: r-tab-in 350ms ease-out;
	}

	@keyframes r-tab-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	.r-line {
		max-width: 92%;
		padding: 0.45rem 0.65rem;
		border-radius: 0.8rem;
		font-size: 0.75rem;
		line-height: 1.4;
		background: #f1f1f3;
		align-self: flex-start;
		border-bottom-left-radius: 0.2rem;
	}

	.r-line.caller {
		align-self: flex-end;
		background: #171717;
		color: #fff;
		border-radius: 0.8rem;
		border-bottom-right-radius: 0.2rem;
	}

	.r-booking {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 0.8rem;
		background: #f5f3f1;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
		padding: 0.55rem 0.7rem;
		font-size: 0.72rem;
		line-height: 1.35;
	}

	.r-booking svg {
		flex-shrink: 0;
		color: #15803d;
	}

	.r-booking span {
		display: flex;
		flex-direction: column;
	}

	.r-tabs {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		list-style: none;
		justify-content: center;
	}

	@media (min-width: 768px) {
		.r-tabs {
			gap: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.r-tabs {
			grid-column-start: 1;
			grid-row-start: 1;
			max-width: 37.5rem;
		}
	}

	.r-tab {
		width: 100%;
		cursor: pointer;
		text-align: left;
	}

	.r-tab-name {
		display: flex;
		font-family: var(--r-font-heading);
		font-size: 1.25rem;
		line-height: 1.75rem;
		opacity: 0.4;
		transition: opacity 150ms ease-out;
	}

	.r-tab:hover .r-tab-name {
		opacity: 0.65;
	}

	.r-tab.active .r-tab-name {
		opacity: 1;
	}

	.r-tab-desc {
		display: grid;
		grid-template-rows: 0fr;
		opacity: 0;
		transition:
			grid-template-rows 300ms ease-out,
			opacity 300ms ease-out;
		font-size: 1rem;
		line-height: 1.4;
		letter-spacing: 0.01em;
		color: var(--r-muted);
	}

	.r-tab-desc > span {
		overflow: hidden;
	}

	.r-tab.active .r-tab-desc {
		grid-template-rows: 1fr;
		opacity: 1;
	}

	.r-tab-desc > span {
		display: block;
		white-space: pre-line;
		padding-top: 0.5rem;
		padding-bottom: 0.25rem;
	}
</style>
