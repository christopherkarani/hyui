<script lang="ts">
	import RDivider from './RDivider.svelte';

	let bookingValue = $state(120);
	let missedPerWeek = $state(35);
	let bookRate = $state(40);
	let repeatVisits = $state(2.0);

	let bookingsPerWeek = $derived((missedPerWeek * bookRate) / 100);
	let yearly = $derived(Math.round(bookingsPerWeek * bookingValue * repeatVisits * 52));
	let monthly = $derived(Math.round(yearly / 12));

	function fmt(n: number) {
		return n.toLocaleString('en-US');
	}

	function num(v: string, fallback: number) {
		const n = Number(v);
		return Number.isFinite(n) ? n : fallback;
	}
</script>

<section id="revenue-calculator" aria-label="Missed-call revenue calculator">
	<div class="r-wrap">
		<RDivider />
		<div class="r-section-pad">
			<div class="r-head">
				<h2>What are missed calls costing you?</h2>
				<p>
					Adjust a few assumptions to estimate the revenue that slips away when you miss calls
					without a receptionist.
				</p>
			</div>

			<div class="r-calc-shell">
				<div class="r-calc">
					<div class="r-inputs">
						<div class="r-value-grid">
							<label class="r-field">
								<span class="r-field-label">Average booking value</span>
								<span class="r-pill-input">
									<span class="r-unit">$</span>
									<input
										type="number"
										min="0"
										value={bookingValue}
										oninput={(e) => (bookingValue = Math.max(0, num(e.currentTarget.value, 0)))}
										aria-label="Average booking value in dollars"
									/>
								</span>
							</label>
						</div>

						<div class="r-slider-card">
							<div class="r-slider-row">
								<label class="r-slider-label" for="rc-missed">Missed calls per week</label>
								<span class="r-pill-input sm">
									<input
										id="rc-missed"
										type="number"
										min="0"
										max="100"
										step="1"
										value={missedPerWeek}
										oninput={(e) => (missedPerWeek = Math.min(100, Math.max(0, num(e.currentTarget.value, 0))))}
									/>
									<span class="r-unit">calls</span>
								</span>
							</div>
							<input
								type="range"
								min="0"
								max="100"
								step="1"
								value={missedPerWeek}
								oninput={(e) => (missedPerWeek = num(e.currentTarget.value, 0))}
								aria-label="Missed calls per week"
							/>
						</div>

						<details class="r-details">
							<summary>
								<span>
									<span class="r-sum-title">Adjust assumptions</span>
									<span class="r-sum-sub">
										Assuming {bookRate}% of missed callers would book and an average of
										{repeatVisits.toFixed(1)}x repeat visits.
									</span>
								</span>
								<span class="r-plus" aria-hidden="true">+</span>
							</summary>
							<div class="r-details-body">
								<div class="r-slider-card">
									<div class="r-slider-row">
										<label class="r-slider-label" for="rc-rate">Missed callers who would book</label>
										<span class="r-pill-input sm">
											<input
												id="rc-rate"
												type="number"
												min="5"
												max="80"
												step="1"
												value={bookRate}
												oninput={(e) => (bookRate = Math.min(80, Math.max(5, num(e.currentTarget.value, 40))))}
											/>
											<span class="r-unit">%</span>
										</span>
									</div>
									<input
										type="range"
										min="5"
										max="80"
										step="1"
										value={bookRate}
										oninput={(e) => (bookRate = num(e.currentTarget.value, 40))}
										aria-label="Missed callers who would book, percent"
									/>
								</div>
								<div class="r-slider-card">
									<div class="r-slider-row">
										<label class="r-slider-label" for="rc-repeat">Average repeat visits</label>
										<span class="r-pill-input sm">
											<input
												id="rc-repeat"
												type="number"
												min="1"
												max="8"
												step="0.1"
												value={repeatVisits}
												oninput={(e) => (repeatVisits = Math.min(8, Math.max(1, num(e.currentTarget.value, 2))))}
											/>
											<span class="r-unit">x</span>
										</span>
									</div>
									<input
										type="range"
										min="1"
										max="8"
										step="0.1"
										value={repeatVisits}
										oninput={(e) => (repeatVisits = num(e.currentTarget.value, 2))}
										aria-label="Average repeat visits"
									/>
								</div>
							</div>
						</details>
					</div>

					<div class="r-results">
						<div class="r-result-card">
							<p class="r-result-label">Potential missed revenue</p>
							<p class="r-result-big">${fmt(yearly)}</p>
							<p class="r-result-sub">per year</p>
							<div class="r-result-split">
								<div>
									<p class="r-split-label">Monthly</p>
									<p class="r-split-value">${fmt(monthly)}</p>
								</div>
								<div>
									<p class="r-split-label">Bookings</p>
									<p class="r-split-value">
										{fmt(Math.round(bookingsPerWeek * 10) / 10)}<span class="r-per"> / week</span>
									</p>
								</div>
							</div>
						</div>
						<p class="r-disclaimer">
							Estimate only. Actual recovered revenue depends on call volume, lead quality,
							scheduling capacity, and more.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.r-calc-shell {
		border-radius: 1.5rem;
		background: var(--r-card);
		padding: 0.25rem;
		box-shadow:
			0px 2px 2px 0px rgba(0, 0, 0, 0.04),
			0px 0px 1px 0px rgba(0, 0, 0, 0.4);
	}

	.r-calc {
		display: grid;
		grid-template-columns: 1fr;
		overflow: hidden;
		border-radius: 1.35rem;
		background: #fff;
	}

	@media (min-width: 1024px) {
		.r-calc {
			grid-template-columns: 0.9fr 1.1fr;
		}
	}

	.r-inputs {
		order: 2;
		padding: 1.25rem;
	}

	@media (min-width: 768px) {
		.r-inputs {
			padding: 1.75rem;
		}
	}

	@media (min-width: 1024px) {
		.r-inputs {
			order: 1;
			border-right: 1px solid var(--r-border);
		}
	}

	.r-value-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.r-value-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.r-field {
		display: block;
	}

	.r-field-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--r-muted);
	}

	.r-pill-input {
		margin-top: 0.375rem;
		display: flex;
		align-items: center;
		border-radius: 9999px;
		background: #fff;
		padding: 0.5rem 0.75rem;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
	}

	.r-pill-input.sm {
		width: 6rem;
		background: var(--r-surface);
		padding: 0.375rem 0.75rem;
	}

	.r-pill-input input {
		width: 100%;
		background: transparent;
		border: none;
		outline: none;
		padding-inline: 0.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--r-foreground);
	}

	.r-pill-input.sm input {
		text-align: right;
		padding-inline: 0;
	}

	.r-pill-input input::-webkit-outer-spin-button,
	.r-pill-input input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	.r-pill-input input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}

	.r-unit {
		font-size: 0.875rem;
		color: var(--r-muted);
	}

	.r-pill-input.sm .r-unit {
		margin-left: 0.25rem;
	}

	.r-slider-card {
		margin-top: 1.25rem;
		border-radius: 1rem;
		border: 1px solid var(--r-border);
		background: #fff;
		padding: 1rem;
	}

	.r-value-grid + .r-slider-card {
		margin-top: 1.25rem;
	}

	.r-slider-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.r-slider-row .r-pill-input {
		margin-top: 0;
	}

	.r-slider-label {
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: -0.01em;
	}

	input[type='range'] {
		margin-top: 1rem;
		width: 100%;
		height: 0.375rem;
		cursor: pointer;
		accent-color: #000;
	}

	.r-details {
		margin-top: 0.75rem;
		border-radius: 1rem;
		border: 1px solid var(--r-border);
		background: #fff;
		padding: 1rem;
	}

	.r-details summary {
		display: flex;
		cursor: pointer;
		list-style: none;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.r-details summary::-webkit-details-marker {
		display: none;
	}

	.r-sum-title {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: -0.01em;
	}

	.r-sum-sub {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: var(--r-muted);
	}

	.r-plus {
		margin-top: 0.125rem;
		font-size: 0.875rem;
		color: var(--r-muted);
		transition: transform 200ms ease-out;
	}

	.r-details[open] .r-plus {
		transform: rotate(45deg);
	}

	.r-details-body {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	.r-details-body .r-slider-card {
		margin-top: 0;
	}

	.r-results {
		order: 1;
		border-bottom: 1px solid var(--r-border);
		padding: 1.25rem;
	}

	@media (min-width: 768px) {
		.r-results {
			padding: 1.75rem;
		}
	}

	@media (min-width: 1024px) {
		.r-results {
			order: 2;
			border-bottom: none;
		}
	}

	.r-result-card {
		border-radius: 1rem;
		background: var(--r-surface);
		padding: 1.25rem;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
	}

	.r-result-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--r-muted);
	}

	.r-result-big {
		margin-top: 0.75rem;
		font-family: var(--r-font-heading);
		font-weight: 300;
		font-size: 2.5rem;
		line-height: 1;
		letter-spacing: -0.03em;
	}

	@media (min-width: 768px) {
		.r-result-big {
			font-size: 3.25rem;
		}
	}

	.r-result-sub {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--r-muted);
	}

	.r-result-split {
		margin-top: 1.25rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		border-top: 1px solid var(--r-border);
		padding-top: 1rem;
	}

	@media (min-width: 640px) {
		.r-result-split {
			grid-template-columns: 1fr 1fr;
		}
	}

	.r-split-label {
		font-size: 11px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--r-muted);
	}

	.r-split-value {
		margin-top: 0.25rem;
		font-size: 1.25rem;
		font-weight: 500;
		letter-spacing: -0.01em;
	}

	.r-per {
		font-size: 0.875rem;
		color: var(--r-muted);
		font-weight: 400;
	}

	.r-disclaimer {
		margin-top: 1rem;
		font-size: 0.75rem;
		color: var(--r-muted);
	}
</style>
