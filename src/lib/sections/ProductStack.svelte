<script lang="ts">
	import FeatureBlock from '$lib/components/FeatureBlock.svelte';

	const kpiMetrics = [
		{
			label: 'Solve your most complex support issues with AI, up and running in two weeks.',
			isText: true
		},
		{ label: 'DEFLECTION RATE', value: '70%' },
		{ label: 'SUPPORTED LANGUAGES', value: '100' }
	];

	const agentCanvasFeatures = [
		{ icon: '🔧', title: 'Extremely customizable', description: 'Build agents tailored to your exact workflow and policies.' },
		{ icon: '✏️', title: 'Auto policy writing', description: 'Automatically generate and refine support policies.' },
		{ icon: '✨', title: 'Built-in Copilot', description: 'AI-assisted agent creation and optimization.' }
	];

	const agentCanvasSteps = [
		{ title: 'Create the agent', description: 'Start with a template or build from scratch with custom training data.' },
		{ title: 'Define policies', description: 'Set rules and guardrails for agent behavior.' },
		{ title: 'Design the logic', description: 'Create decision trees and conversation flows.' },
		{ title: 'Test and launch', description: 'Validate with test cases before going live.' },
		{ title: 'Monitor and improve', description: 'Track performance and iterate continuously.' }
	];

	const insightsFeatures = [
		{ icon: '📈', title: 'Performance enhancement', description: 'Identify and resolve performance bottlenecks.' },
		{ icon: '💡', title: 'Custom suggestions', description: 'Receive tailored improvement recommendations.' },
		{ icon: '📊', title: 'Auto improve', description: 'Automatically apply validated optimizations.' }
	];

	const insightsSteps = [
		{ title: 'Choose an objective', description: 'Select a KPI to optimize such as resolution rate or CSAT.' },
		{ title: 'Generate insights', description: 'AI analyzes interactions to find improvement opportunities.' },
		{ title: 'Validate at scale', description: 'Test suggestions across your full conversation volume.' }
	];

	const voiceFeatures = [
		{ icon: '🎤', title: 'Personalized voices', description: 'Create custom voice personas that match your brand.' },
		{ icon: '⚡', title: 'Dynamic interrupts', description: 'Handle natural conversation flow and interruptions.' },
		{ icon: '🚀', title: 'Ultra-low latency', description: 'Sub-300ms response times for natural conversations.' }
	];

	const voiceSteps = [
		{ title: 'Choose a voice', description: 'Select from a library of natural-sounding voices or create your own.' },
		{ title: 'Set the tone', description: 'Configure emotional awareness and empathy levels.' },
		{ title: 'Go live', description: 'Deploy voice agents across phone and digital channels.' }
	];
</script>

<section class="product-stack">
	<div class="kpi-strip">
		{#each kpiMetrics as metric}
			<div class="kpi-item" class:kpi-text={metric.isText}>
				{#if metric.isText}
					<p class="kpi-description">{metric.label}</p>
				{:else}
					<span class="kpi-label">{metric.label}</span>
					<span class="kpi-value">{metric.value}</span>
				{/if}
			</div>
		{/each}
	</div>

	<FeatureBlock
		eyebrow="CUSTOM AGENTS"
		sectionTitle="Built to handle complexity"
		description="Design, deploy, and manage AI agents that handle your most nuanced support scenarios."
		ctaText="Explore Agent Canvas"
		ctaHref="./agent-canvas"
		features={agentCanvasFeatures}
		steps={agentCanvasSteps}
		imageSrc="/images/agent-canvas.png"
		imageAlt="Agent Canvas interface showing create new agent dialog"
	/>

	<FeatureBlock
		eyebrow="SMART INSIGHTS"
		sectionTitle="Improve as you go"
		description="Automatically surface performance gaps and generate targeted improvements across your AI agents."
		ctaText="Explore Smart Insights"
		ctaHref="./insights"
		features={insightsFeatures}
		steps={insightsSteps}
		imageSrc="/images/insights.png"
		imageAlt="Smart Insights dashboard showing resolution rate improvement"
		reversed={true}
	/>

	<FeatureBlock
		eyebrow="VOICE EXPERIENCE"
		sectionTitle="Engage with empathy"
		description="Voice agents that listen, understand context, and respond with genuine emotional intelligence."
		ctaText="Explore Voice Experience"
		ctaHref="./voice-experience"
		features={voiceFeatures}
		steps={voiceSteps}
		imageSrc="/images/voice-poster.png"
		imageAlt="Voice Experience interface with mountain lake video preview"
		videoSrc="/videos/voice-experience.mp4"
	/>
</section>

<style>
	.product-stack {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background: var(--gradient-page-dark);
		padding: var(--product-stack-padding);
		gap: var(--product-stack-gap);
		min-height: 3693.8px;
		width: 100%;
	}

	.kpi-strip {
		display: flex;
		align-items: flex-start;
		gap: var(--space-6);
		width: 100%;
		max-width: 1600px;
		padding: var(--space-5) 0;
	}

	.kpi-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.kpi-text {
		flex: 1.5;
	}

	.kpi-description {
		font-family: var(--font-sans);
		font-size: var(--type-body-lg-size);
		font-weight: var(--type-body-lg-weight);
		line-height: var(--type-body-lg-lh);
		color: var(--text-muted-dark-50);
		max-width: 400px;
	}

	.kpi-label {
		font-family: var(--font-mono);
		font-size: var(--type-eyebrow-size);
		font-weight: var(--type-eyebrow-weight);
		line-height: var(--type-eyebrow-lh);
		letter-spacing: var(--type-eyebrow-ls);
		text-transform: uppercase;
		color: var(--text-muted-dark-50);
	}

	.kpi-value {
		font-family: var(--font-sans);
		font-size: var(--type-kpi-metric-size);
		font-weight: var(--type-kpi-metric-weight);
		line-height: var(--type-kpi-metric-lh);
		letter-spacing: var(--type-kpi-metric-ls);
		color: var(--text-primary-dark);
	}

	@media (max-width: 809.98px) {
		.kpi-strip {
			flex-direction: column;
			padding: 0 var(--space-5);
			gap: var(--space-10);
		}

		.kpi-text {
			flex: none;
		}
	}

@media (max-width: 1024px) and (min-width: 811px) {
	.product-stack {
		min-height: 3331px;
	}
}
@media (max-width: 810px) {
	.product-stack {
		min-height: 3334px;
	}
}
@media (max-width: 809px) {
	.product-stack {
		min-height: 5719px;
	}
}
</style>
