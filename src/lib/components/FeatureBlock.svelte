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
		productName?: string;
		productColor?: string;
		description: string;
		ctaText: string;
		ctaHref: string;
		features: FeatureItem[];
		steps: StepItem[];
		imageSrc: string;
		imageAlt: string;
		imageSrcset?: string;
		imageSizes?: string;
		videoSrc?: string;
		reversed?: boolean;
	}

	let {
		eyebrow,
		sectionTitle,
		productName,
		productColor = 'rgb(255, 222, 200)',
		description,
		ctaText,
		ctaHref,
		features,
		steps,
		imageSrc,
		imageAlt,
		imageSrcset,
		imageSizes = '(min-width: 1200px) 55vw, 100vw',
		videoSrc,
		reversed = false
	}: Props = $props();

	let activeStep = $state(0);
</script>

<div class="feature-block" class:reversed>
	<div class="feature-header">
		<div class="feature-header-left">
			<div class="feature-label">
				<span class="feature-dot"></span>
				<span class="feature-eyebrow">{eyebrow}</span>
			</div>
			<h2 class="feature-heading">{sectionTitle}</h2>
		</div>
		<div class="feature-grid">
			{#each features as feature}
				<div class="feature-item">
					<div class="feature-icon" aria-hidden="true">{@html feature.icon}</div>
					<h3 class="feature-item-title">{feature.title}</h3>
					<p class="feature-item-desc">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="feature-content">
		<div class="feature-text-side">
			<div class="feature-content-header">
				<span class="feature-content-icon" aria-hidden="true" style="background: color-mix(in srgb, {productColor} 18%, transparent); color: {productColor};">◆</span>
				<h3 class="feature-title" style="color: {productColor};">{productName || sectionTitle}</h3>
			</div>
			<p class="feature-desc">{description}</p>
			<a href={ctaHref} class="feature-cta">
				{ctaText}
			</a>

			<div class="steps-list" role="list" aria-label="Operational steps">
				{#each steps as step, i}
					<button
						type="button"
						class="step-item"
						class:active={i === activeStep}
						aria-pressed={i === activeStep}
						onclick={() => (activeStep = i)}
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
				<picture>
					{#if imageSrcset}
						<source type="image/webp" srcset={imageSrcset} sizes={imageSizes} />
					{/if}
					<img src={imageSrc} alt={imageAlt} class="feature-image" loading="lazy" decoding="async" />
				</picture>
			{/if}
		</div>
	</div>
</div>

<style>
	.feature-block {
		width: 100%;
		max-width: 1320px;
		margin: 0 auto;
		padding: 0 36px;
	}

	.feature-header {
		display: grid;
		grid-template-columns: minmax(360px, 1fr) minmax(520px, 1.5fr);
		align-items: start;
		gap: 96px;
		margin-bottom: 96px;
		padding-top: 24px;
	}

	.feature-header-left {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.feature-heading {
		font-family: var(--font-display-hero);
		font-size: clamp(40px, 4.4vw, 64px);
		font-weight: 300;
		line-height: 1.05;
		letter-spacing: -1.4px;
		color: rgb(255, 255, 255);
		max-width: 12ch;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 32px;
	}

	.feature-item {
		padding: 0;
		border: none;
		border-radius: 0;
		background: transparent;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.feature-icon {
		width: 28px;
		height: 28px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.82);
	}

	.feature-icon :global(svg) {
		width: 16px;
		height: 16px;
		stroke: currentColor;
		stroke-width: 1.5;
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.feature-item-title {
		font-family: var(--font-sans-display);
		font-size: 15px;
		font-weight: 500;
		line-height: 1.4;
		letter-spacing: -0.1px;
		color: rgb(255, 255, 255);
		margin-bottom: 0;
	}

	.feature-item-desc {
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 400;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.5);
		max-width: 28ch;
	}

	.feature-content {
		display: grid;
		grid-template-columns: minmax(380px, 1fr) minmax(560px, 1.7fr);
		background: rgb(8, 8, 8);
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		overflow: hidden;
	}

	.reversed .feature-text-side {
		order: 2;
	}

	.reversed .feature-visual-side {
		order: 1;
	}

	.feature-text-side {
		padding: 48px 44px 44px;
		display: flex;
		flex-direction: column;
	}

	.feature-content-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 22px;
	}

	.feature-content-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		font-size: 12px;
		flex-shrink: 0;
	}

	.feature-label {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.feature-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgb(255, 132, 92);
	}

	.feature-eyebrow {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.6px;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.85);
	}

	.feature-title {
		font-family: var(--font-sans-display);
		font-size: 30px;
		font-weight: 500;
		line-height: 1.15;
		letter-spacing: -0.6px;
	}

	.feature-desc {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 400;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.62);
		margin-bottom: 32px;
		max-width: 36ch;
	}

	.feature-cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.4;
		color: rgb(255, 255, 255);
		background: transparent;
		padding: 10px 18px;
		border-radius: var(--radius-pill);
		border: 1px solid rgba(255, 255, 255, 0.18);
		margin-bottom: 36px;
		width: fit-content;
	}

	.feature-cta:hover,
	.feature-cta:focus-visible {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.32);
		color: rgb(255, 255, 255);
	}

	.steps-list {
		display: flex;
		flex-direction: column;
		margin-top: auto;
	}

	.step-item {
		display: flex;
		flex-direction: column;
		padding: 18px 0;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		text-align: left;
		cursor: pointer;
		transition: color 0.2s ease-in-out;
		background: transparent;
	}

	.step-item:last-child {
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.step-title {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 500;
		line-height: 1.4;
		color: rgb(255, 255, 255);
		transition: color 0.2s ease-in-out;
	}

	.step-item.active .step-title {
		color: rgb(255, 255, 255);
		font-weight: 600;
	}

	.step-desc {
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 400;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.55);
		margin-top: 8px;
	}

	.feature-visual-side {
		display: flex;
		align-items: stretch;
		background: rgb(0, 0, 0);
	}

	.feature-image,
	.feature-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		min-height: 520px;
		border-radius: 0;
	}

	.reversed .feature-image,
	.reversed .feature-video {
		border-radius: 0;
	}

	@media (max-width: 809.98px) {
		.feature-header {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.feature-grid {
			grid-template-columns: 1fr;
			gap: var(--space-3);
		}

		.feature-item {
			padding: var(--space-4);
		}

		.feature-content {
			grid-template-columns: 1fr;
		}

		.feature-text-side {
			padding: var(--space-5) var(--space-4);
		}

		.reversed .feature-text-side,
		.reversed .feature-visual-side {
			order: initial;
		}

		.feature-image,
		.feature-video {
			min-height: 280px;
			max-height: 360px;
			border-radius: 0 0 18px 18px;
		}
	}
</style>
