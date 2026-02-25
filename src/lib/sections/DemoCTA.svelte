<section class="demo-cta">
	<div class="demo-cta-inner">
		<div class="demo-cta-left">
			<div class="demo-cta-label">
				<span class="demo-dot"></span>
				<span class="demo-eyebrow">GET A PERSONALIZED DEMO</span>
			</div>
			<h2 class="demo-cta-heading">Ready to see the Giga AI agent in action?</h2>
		</div>

		<div class="demo-cta-right">
			<p class="demo-cta-desc">
				Giga's AI agents handle complex workflows at scale, from live delivery issues to compliance decisions, while maintaining over 90% resolution accuracy in production.
			</p>
			<a href="./contact" class="demo-cta-button">
				Talk to us
			</a>
		</div>
	</div>
</section>

<style>
	.demo-cta {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: linear-gradient(90deg, rgb(255, 154, 234) -10%, rgb(255, 255, 255) 28%);
		padding: var(--demo-cta-padding);
		gap: var(--demo-cta-gap);
		min-height: 403px;
		color: var(--text-primary-light);
		width: 100%;
	}

	.demo-cta-inner {
		display: flex;
		gap: var(--demo-cta-gap);
		width: 100%;
		max-width: 1600px;
		padding: var(--space-12) var(--space-5);
	}

	.demo-cta-left {
		flex: 1;
	}

	.demo-cta-label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 16px;
	}

	.demo-dot {
		width: 8px;
		height: 8px;
		border-radius: 2px;
		background: var(--bg-brand-orange);
		box-shadow: var(--shadow-brand-glow);
		animation: pulse-dot 2s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%, 100% {
			box-shadow: rgba(247, 107, 21, 0.5) 0px 0px 4px 0px;
		}
		50% {
			box-shadow: rgba(247, 107, 21, 0.8) 0px 0px 8px 2px;
		}
	}

	.demo-eyebrow {
		font-family: var(--font-mono);
		font-size: var(--type-eyebrow-size);
		font-weight: var(--type-eyebrow-weight);
		line-height: var(--type-eyebrow-lh);
		letter-spacing: var(--type-eyebrow-ls);
		text-transform: uppercase;
		color: var(--text-muted-light-50);
	}

	.demo-cta-heading {
		font-family: var(--font-display-hero);
		font-size: var(--type-section-title-size);
		font-weight: var(--type-section-title-weight);
		line-height: var(--type-section-title-lh);
		letter-spacing: var(--type-section-title-ls);
		background: linear-gradient(90deg, rgb(247, 107, 21), var(--text-primary-light));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: var(--text-primary-light);
	}

	.demo-cta-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 24px;
	}

	.demo-cta-desc {
		font-family: var(--font-sans);
		font-size: var(--type-body-lg-size);
		font-weight: var(--type-body-lg-weight);
		line-height: var(--type-body-lg-lh);
		color: var(--text-muted-light-60);
	}

	.demo-cta-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 9px 20px;
		border-radius: var(--radius-pill);
		background: var(--bg-cta-dark);
		color: var(--text-primary-dark);
		font-family: var(--font-sans);
		font-size: var(--type-button-md-size);
		font-weight: var(--type-button-md-weight);
		line-height: var(--type-button-md-lh);
		width: fit-content;
		transition: opacity 0.2s ease-in-out;
	}

	.demo-cta-button:hover {
		opacity: 0.85;
	}

	@media (max-width: 809.98px) {
		.demo-cta-inner {
			flex-direction: column;
			gap: var(--space-5);
			padding: var(--space-6) var(--space-5);
		}

		.demo-cta-right {
			gap: 16px;
		}
	}

@media (max-width: 1024px) and (min-width: 811px) {
	.demo-cta {
		min-height: 424px;
	}
}
@media (max-width: 810px) {
	.demo-cta {
		min-height: 445px;
	}
}
@media (max-width: 809px) {
	.demo-cta {
		min-height: 486px;
	}
}
</style>
