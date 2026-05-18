<section id="process" class="spotlight">
	<div class="spotlight-inner">
		<header class="spotlight-header">
			<div class="spotlight-eyebrow">
				<span class="eyebrow-dot" aria-hidden="true"></span>
				<span class="eyebrow-text">SETUP PROCESS</span>
			</div>
			<h2 class="spotlight-headline">
				A practical path from messy workflows to a working AI employee.
			</h2>
		</header>

		<div class="spotlight-card">
			<div class="spotlight-image-side">
				<img
					src="/pantaa/images/optimized/insights-ui-1600.jpg"
					alt=""
					class="spotlight-photo"
					loading="lazy"
				/>
				<div class="spotlight-image-overlay">
					<div class="spotlight-stat">
						<span class="spotlight-stat-label">FIRST WORKFLOWS</span>
						<span class="spotlight-stat-value">3-5</span>
					</div>
				</div>
			</div>

			<div class="spotlight-content-side">
				<div class="process-grid">
					<div class="process-step">
						<span class="process-index">01</span>
						<h3>Workflow audit</h3>
						<p>We map the repetitive admin, revenue, and research tasks that should move into your agent first.</p>
					</div>
					<div class="process-step">
						<span class="process-index">02</span>
						<h3>Agent setup</h3>
						<p>We install the agent system, configure model routing, connect approved tools, and prepare the workspace.</p>
					</div>
					<div class="process-step">
						<span class="process-index">03</span>
						<h3>Live task testing</h3>
						<p>We test with real examples until the agent can draft useful output your team can review.</p>
					</div>
					<div class="process-step">
						<span class="process-index">04</span>
						<h3>Managed operations</h3>
						<p>We monitor stuck work, handle change requests, and improve workflows as usage becomes routine.</p>
					</div>
				</div>

				<div id="fit" class="fit-panel">
					<span class="fit-label">Best fit</span>
					<p>
						Legacy service firms with repeatable client work: law firms, insurance agencies, real estate teams,
						manufacturers, wholesalers, and marketing agencies.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.spotlight {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgb(255, 255, 255);
		padding: 120px 36px;
		gap: 80px;
		color: rgb(12, 18, 29);
		width: 100%;
	}

	.spotlight-inner {
		width: 100%;
		max-width: 1320px;
	}

	.spotlight-header {
		display: flex;
		flex-direction: column;
		gap: 32px;
		margin-bottom: 80px;
	}

	.spotlight-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}

	.eyebrow-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgb(255, 132, 92);
	}

	.eyebrow-text,
	.spotlight-stat-label,
	.process-index,
	.fit-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.6px;
		text-transform: uppercase;
	}

	.eyebrow-text {
		color: rgba(12, 18, 29, 0.78);
	}

	.spotlight-headline {
		font-family: var(--font-display-hero);
		font-size: clamp(40px, 5.2vw, 72px);
		font-weight: 300;
		line-height: 1.06;
		letter-spacing: -1.4px;
		color: rgb(12, 18, 29);
		max-width: 24ch;
	}

	.spotlight-card {
		display: flex;
		border-radius: 18px;
		overflow: hidden;
		background: rgb(10, 10, 10);
		border: 1px solid rgba(255, 255, 255, 0.06);
		color: inherit;
	}

	.spotlight-image-side {
		flex: 0 0 38%;
		position: relative;
		min-height: 560px;
		background: rgb(8, 8, 8);
	}

	.spotlight-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.32;
		filter: saturate(0.7) contrast(1.1);
	}

	.spotlight-image-overlay {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.72) 100%),
			radial-gradient(circle at 18% 82%, rgba(255, 132, 92, 0.72), rgba(255, 132, 92, 0) 52%);
		display: flex;
		align-items: flex-end;
		padding: 36px;
	}

	.spotlight-stat {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.spotlight-stat-label {
		color: rgb(255, 255, 255);
	}

	.spotlight-stat-value {
		font-family: var(--font-display-hero);
		font-size: 80px;
		font-weight: 300;
		line-height: 1;
		letter-spacing: -2.4px;
		color: rgb(255, 255, 255);
	}

	.spotlight-content-side {
		flex: 1;
		padding: 56px;
		display: flex;
		flex-direction: column;
		gap: 42px;
	}

	.process-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 28px;
	}

	.process-step {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-top: 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
	}

	.process-index {
		color: rgba(255, 132, 92, 0.92);
	}

	.process-step h3 {
		font-family: var(--font-sans-display);
		font-size: 22px;
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: -0.3px;
		color: rgb(255, 255, 255);
	}

	.process-step p,
	.fit-panel p {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 400;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.68);
	}

	.fit-panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-top: auto;
		padding: 24px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.fit-label {
		color: rgba(255, 255, 255, 0.54);
	}

	@media (max-width: 809.98px) {
		.spotlight {
			padding: 80px 20px;
		}

		.spotlight-header {
			margin-bottom: 56px;
		}

		.spotlight-card {
			flex-direction: column;
		}

		.spotlight-image-side {
			flex: none;
			min-height: 300px;
		}

		.spotlight-content-side {
			flex: none;
			padding: 32px 24px;
		}

		.process-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}
</style>
