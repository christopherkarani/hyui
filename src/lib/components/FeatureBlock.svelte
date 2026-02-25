<script lang="ts">
	interface FeatureItem {
		icon: string;
		title: string;
		description: string;
	}

	interface StepItem {
		title: string;
		description: string;
	}

	interface Props {
		eyebrow: string;
		sectionTitle: string;
		description: string;
		ctaText: string;
		ctaHref: string;
		features: FeatureItem[];
		steps: StepItem[];
		imageSrc: string;
		imageAlt: string;
		videoSrc?: string;
		reversed?: boolean;
	}

	let {
		eyebrow,
		sectionTitle,
		description,
		ctaText,
		ctaHref,
		features,
		steps,
		imageSrc,
		imageAlt,
		videoSrc,
		reversed = false
	}: Props = $props();

	let activeStep = $state(0);
</script>

<div class="feature-block" class:reversed>
	<div class="feature-header">
		<h2 class="feature-heading">{sectionTitle}</h2>
		<div class="feature-grid">
			{#each features as feature}
				<div class="feature-item">
					<div class="feature-icon">{feature.icon}</div>
					<h3 class="feature-item-title">{feature.title}</h3>
					<p class="feature-item-desc">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="feature-content">
		<div class="feature-text-side">
			<div class="feature-label">
				<span class="feature-dot"></span>
				<span class="feature-eyebrow">{eyebrow}</span>
			</div>
			<h3 class="feature-title">{sectionTitle}</h3>
			<p class="feature-desc">{description}</p>
			<a href={ctaHref} class="feature-cta">
				{ctaText}
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
					<path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>

			<div class="steps-list">
				{#each steps as step, i}
					<button
						class="step-item"
						class:active={i === activeStep}
						onclick={() => activeStep = i}
					>
						<span class="step-title">{step.title}</span>
						{#if i === activeStep}
							<p class="step-desc">{step.description}</p>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<div class="feature-visual-side">
			{#if videoSrc}
				<video
					src={videoSrc}
					class="feature-video"
					autoplay
					muted
					loop
					playsinline
					poster={imageSrc}
					aria-label={imageAlt}
				></video>
			{:else}
				<img src={imageSrc} alt={imageAlt} class="feature-image" loading="lazy" />
			{/if}
		</div>
	</div>
</div>

<style>
	.feature-block {
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		padding: 0 var(--space-5);
	}

	.feature-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: var(--space-15);
	}

	.feature-heading {
		font-family: var(--font-display-hero);
		font-size: var(--type-section-title-size);
		font-weight: var(--type-section-title-weight);
		line-height: var(--type-section-title-lh);
		letter-spacing: var(--type-section-title-ls);
		color: var(--text-primary-dark);
		max-width: 500px;
	}

	.feature-grid {
		display: flex;
		gap: 0;
	}

	.feature-item {
		padding: 0 24px;
		border-left: var(--border-light);
		max-width: 240px;
	}

	.feature-item:first-child {
		border-left: none;
		padding-left: 0;
	}

	.feature-icon {
		font-size: 20px;
		margin-bottom: 8px;
		opacity: 0.7;
	}

	.feature-item-title {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: 500;
		line-height: var(--type-body-md-lh);
		color: var(--text-primary-dark);
		margin-bottom: 4px;
	}

	.feature-item-desc {
		font-family: var(--font-sans);
		font-size: var(--type-body-sm-size);
		font-weight: var(--type-body-sm-weight);
		line-height: var(--type-body-sm-lh);
		color: var(--text-muted-dark-50);
	}

	.feature-content {
		display: flex;
		gap: 0;
		background: var(--bg-glass-white-05);
		border-radius: var(--radius-xl);
		border: var(--border-light);
		overflow: hidden;
		box-shadow: var(--shadow-panel-outer);
		backdrop-filter: var(--blur-panel);
		-webkit-backdrop-filter: var(--blur-panel);
	}

	.reversed .feature-content {
		flex-direction: row-reverse;
	}

	.feature-text-side {
		flex: 0 0 40%;
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
	}

	.feature-label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
	}

	.feature-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--bg-brand-orange);
	}

	.feature-eyebrow {
		font-family: var(--font-mono);
		font-size: var(--type-eyebrow-size);
		font-weight: var(--type-eyebrow-weight);
		line-height: var(--type-eyebrow-lh);
		letter-spacing: var(--type-eyebrow-ls);
		text-transform: uppercase;
		color: var(--text-muted-dark-50);
	}

	.feature-title {
		font-family: var(--font-display-product);
		font-size: 30px;
		font-weight: 400;
		line-height: 40px;
		letter-spacing: normal;
		color: var(--text-primary-dark);
		margin-bottom: 12px;
	}

	.feature-desc {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: var(--type-body-md-weight);
		line-height: var(--type-body-md-lh);
		color: var(--text-muted-dark-50);
		margin-bottom: 20px;
	}

	.feature-cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: var(--type-body-md-weight);
		line-height: var(--type-body-md-lh);
		color: var(--text-primary-dark);
		background: var(--bg-glass-white-05);
		padding: 16px;
		border-radius: var(--radius-pill);
		border: 1px solid transparent;
		transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;
		margin-bottom: 24px;
		width: fit-content;
	}

	.feature-cta:hover {
		background: rgba(255, 255, 255, 0.098);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.feature-cta:focus-visible {
		background: rgba(255, 255, 255, 0.1);
		outline: auto 1px;
	}

	.steps-list {
		display: flex;
		flex-direction: column;
		border-top: var(--border-light);
		margin-top: auto;
	}

	.step-item {
		display: flex;
		flex-direction: column;
		padding: 12px 0;
		border-bottom: var(--border-light);
		text-align: left;
		cursor: pointer;
		transition: background 0.2s ease-in-out;
	}

	.step-item:hover {
		background: rgba(255, 255, 255, 0.02);
	}

	.step-title {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: 500;
		line-height: var(--type-body-md-lh);
		color: var(--text-muted-dark-50);
		transition: color 0.2s ease-in-out;
	}

	.step-item.active .step-title {
		color: var(--text-primary-dark);
		font-weight: 600;
	}

	.step-desc {
		font-family: var(--font-sans);
		font-size: var(--type-body-sm-size);
		font-weight: var(--type-body-sm-weight);
		line-height: var(--type-body-sm-lh);
		color: var(--text-muted-dark-50);
		margin-top: 4px;
	}

	.feature-visual-side {
		flex: 0 0 60%;
		display: flex;
		align-items: stretch;
	}

	.feature-image,
	.feature-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
	}

	.reversed .feature-image,
	.reversed .feature-video {
		border-radius: var(--radius-xl) 0 0 var(--radius-xl);
	}

	@media (max-width: 809.98px) {
		.feature-header {
			flex-direction: column;
			gap: 32px;
		}

		.feature-grid {
			flex-direction: column;
			gap: 24px;
		}

		.feature-item {
			border-left: none;
			border-top: var(--border-light);
			padding: 16px 0 0;
			max-width: none;
		}

		.feature-item:first-child {
			border-top: none;
			padding-top: 0;
		}

		.feature-content {
			flex-direction: column;
		}

		.reversed .feature-content {
			flex-direction: column;
		}

		.feature-text-side {
			flex: none;
			padding: var(--space-5);
		}

		.feature-visual-side {
			flex: none;
		}

		.feature-image,
		.feature-video {
			border-radius: 0 0 var(--radius-xl) var(--radius-xl);
		}

		.reversed .feature-image,
		.reversed .feature-video {
			border-radius: 0 0 var(--radius-xl) var(--radius-xl);
		}
	}
</style>
