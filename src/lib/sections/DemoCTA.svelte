<section class="demo-cta">
	<div class="demo-cta-inner">
		<div class="demo-cta-left">
			<div class="demo-cta-label">
				<span class="demo-dot"></span>
				<span class="demo-eyebrow">GET A PERSONALIZED DEMO</span>
			</div>
			<h2 class="demo-cta-heading">See Pantaa operating on your real support workflows.</h2>
		</div>

		<div class="demo-cta-right">
			<p class="demo-cta-desc">
				Run a guided deployment with governance and observability from day one. Teams typically reach production-ready deflection in weeks, not quarters.
			</p>
			<a href="./contact" class="demo-cta-button">Talk to us</a>
		</div>
	</div>
</section>

<style>
	.demo-cta {
		display: flex;
		flex-direction: column;
		align-items: center;
		background:
			radial-gradient(ellipse 60% 80% at 18% 90%, rgba(255, 195, 175, 0.55) 0%, rgba(255, 195, 175, 0) 60%),
			radial-gradient(ellipse 55% 70% at 82% 95%, rgba(218, 188, 240, 0.5) 0%, rgba(218, 188, 240, 0) 60%),
			radial-gradient(ellipse 50% 60% at 50% 100%, rgba(189, 210, 245, 0.45) 0%, rgba(189, 210, 245, 0) 65%),
			rgb(255, 255, 255);
		padding: 140px 36px 200px;
		color: rgb(12, 18, 29);
		width: 100%;
	}

	.demo-cta-inner {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 100px;
		align-items: end;
		width: 100%;
		max-width: 1320px;
		padding: 0;
		border: none;
		background: transparent;
	}

	.demo-cta-left {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.demo-cta-label {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.demo-dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: rgb(255, 132, 92);
	}

	.demo-eyebrow {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.6px;
		text-transform: uppercase;
		color: rgba(12, 18, 29, 0.82);
	}

	.demo-cta-heading {
		font-family: var(--font-display-hero);
		font-size: clamp(40px, 5.2vw, 72px);
		font-weight: 300;
		line-height: 1.06;
		letter-spacing: -1.4px;
		color: rgb(12, 18, 29);
		max-width: 16ch;
	}

	.demo-cta-right {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 28px;
		padding-bottom: 8px;
	}

	.demo-cta-desc {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 400;
		line-height: 1.6;
		color: rgba(12, 18, 29, 0.72);
		max-width: 40ch;
	}

	.demo-cta-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 14px 30px;
		border-radius: var(--radius-pill);
		background: rgb(0, 0, 0);
		color: rgb(255, 255, 255);
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 500;
		line-height: 1.4;
		width: fit-content;
		border: none;
		transition: background 160ms ease;
	}

	.demo-cta-button:hover,
	.demo-cta-button:focus-visible {
		background: rgb(28, 28, 28);
		color: rgb(255, 255, 255);
	}

	@media (max-width: 809.98px) {
		.demo-cta {
			padding: 80px 24px 100px;
		}

		.demo-cta-inner {
			grid-template-columns: 1fr;
			gap: 32px;
		}

		.demo-cta-right {
			gap: 20px;
			padding-bottom: 0;
		}
	}
</style>
