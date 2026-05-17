<script lang="ts">
	import FeatureBlock from '$lib/components/FeatureBlock.svelte';
	import { icons } from '$lib/icons';

	const kpiHeadline = 'Deploy enterprise-safe AI support operations in under 14 days with governance built in.';

	const kpiMetrics = [
		{ label: 'AUTONOMOUS RESOLUTION', value: '70%' },
		{ label: 'SUPPORTED LANGUAGES', value: '100+' }
	];

	const agentCanvasFeatures = [
		{ icon: icons.compass, title: 'Policy-grounded orchestration', description: 'Map workflows to explicit policy paths and escalation boundaries.' },
		{ icon: icons.shieldCheck, title: 'Change-safe governance', description: 'Version every policy update with auditable rollback controls.' },
		{ icon: icons.sliders, title: 'Operator-grade controls', description: 'Tune agent behavior with production-tested guardrails.' }
	];

	const agentCanvasSteps = [
		{ title: 'Model your support domains', description: 'Capture intents, risk levels, and business rules for each queue.' },
		{ title: 'Define policy constraints', description: 'Set escalation, verification, and compliance checkpoints by flow.' },
		{ title: 'Launch controlled pilots', description: 'Start with representative traffic and compare outcomes to baseline.' },
		{ title: 'Scale with confidence', description: 'Expand coverage using monitored thresholds and staged rollout.' },
		{ title: 'Continuously harden', description: 'Improve quality with real-time feedback and supervised learning loops.' }
	];

	const insightsFeatures = [
		{ icon: icons.barChart, title: 'Executive observability', description: 'Track quality, deflection, and risk at queue, team, and region levels.' },
		{ icon: icons.activity, title: 'Root-cause diagnostics', description: 'Identify policy gaps and interaction bottlenecks automatically.' },
		{ icon: icons.refresh, title: 'Closed-loop optimization', description: 'Ship recommendations directly into controlled rollout workflows.' }
	];

	const insightsSteps = [
		{ title: 'Select operational KPI', description: 'Choose goals like first-contact resolution, CSAT, or escalation rate.' },
		{ title: 'Review high-impact findings', description: 'Inspect ranked insights with confidence and expected lift scores.' },
		{ title: 'Approve and deploy updates', description: 'Apply changes through governance workflows with full auditability.' }
	];

	const voiceFeatures = [
		{ icon: icons.headphones, title: 'Human-caliber voice UX', description: 'Natural, interruption-aware conversations with enterprise reliability.' },
		{ icon: icons.globe, title: 'Global deployment ready', description: 'Support regional language and tone requirements at scale.' },
		{ icon: icons.timer, title: 'Low-latency interactions', description: 'Sub-300ms turn response for fluid, high-stakes conversations.' }
	];

	const voiceSteps = [
		{ title: 'Design voice personas', description: 'Align tone and cadence with your brand and support objectives.' },
		{ title: 'Configure safety boundaries', description: 'Apply verification, compliance, and escalation rules to voice flows.' },
		{ title: 'Go live omnichannel', description: 'Deploy across phone and digital channels with shared policy controls.' }
	];
</script>

<section class="product-stack">
	<div class="kpi-strip">
		<div class="kpi-headline">
			<p>{kpiHeadline}</p>
		</div>
		<div class="kpi-stats">
			{#each kpiMetrics as metric}
				<div class="kpi-item">
					<span class="kpi-label">{metric.label}</span>
					<span class="kpi-value">{metric.value}</span>
				</div>
			{/each}
		</div>
	</div>

	<FeatureBlock
		eyebrow="CUSTOM AGENTS"
		sectionTitle="Built to handle enterprise complexity"
		productName="Agent Canvas"
		productColor="rgb(255, 196, 211)"
		description="Design, deploy, and govern AI agents that execute nuanced support policies without sacrificing customer quality."
		ctaText="Explore Agent Canvas"
		ctaHref="./agent-canvas"
		features={agentCanvasFeatures}
		steps={agentCanvasSteps}
		imageSrc="/pantaa/images/optimized/agent-canvas-ui-1600.jpg"
		imageSrcset="/pantaa/images/optimized/agent-canvas-ui-1024.webp 1024w, /pantaa/images/optimized/agent-canvas-ui-1600.webp 1600w"
		imageAlt="Agent Canvas interface showing create new agent dialog"
	/>

	<FeatureBlock
		eyebrow="SMART INSIGHTS"
		sectionTitle="Operational intelligence that drives outcomes"
		productName="Smart Insights"
		productColor="rgb(255, 222, 158)"
		description="Surface bottlenecks, forecast impact, and ship controlled improvements across your support organization."
		ctaText="Explore Smart Insights"
		ctaHref="./insights"
		features={insightsFeatures}
		steps={insightsSteps}
		imageSrc="/pantaa/images/optimized/insights-ui-1600.jpg"
		imageSrcset="/pantaa/images/optimized/insights-ui-1024.webp 1024w, /pantaa/images/optimized/insights-ui-1600.webp 1600w"
		imageAlt="Smart Insights dashboard showing resolution rate improvement"
		reversed={true}
	/>

	<FeatureBlock
		eyebrow="VOICE EXPERIENCE"
		sectionTitle="Voice support with policy-level precision"
		productName="Voice Experience"
		productColor="rgb(196, 196, 255)"
		description="Deliver conversational voice experiences that remain compliant, empathetic, and fast in every region you operate."
		ctaText="Explore Voice Experience"
		ctaHref="./voice-experience"
		features={voiceFeatures}
		steps={voiceSteps}
		imageSrc="/pantaa/images/optimized/voice-poster-1600.jpg"
		imageAlt="Voice Experience interface with mountain lake video preview"
		videoSrc="/pantaa/videos/voice-experience.mp4"
	/>
</section>

<style>
	.product-stack {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background: rgb(0, 0, 0);
		padding: 80px 0 160px;
		gap: 160px;
		width: 100%;
	}

	.kpi-strip {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr;
		align-items: stretch;
		gap: 0;
		width: 100%;
		max-width: 1320px;
		padding: 64px 36px 80px;
		border: none;
		background: transparent;
	}

	.kpi-headline {
		padding-right: 64px;
		display: flex;
		align-items: center;
	}

	.kpi-headline p {
		font-family: var(--font-sans);
		font-size: 17px;
		font-weight: 400;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.78);
		max-width: 36ch;
	}

	.kpi-stats {
		display: contents;
	}

	.kpi-item {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 0 36px;
		border-left: 1px solid rgba(255, 255, 255, 0.12);
	}

	.kpi-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.6px;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.55);
	}

	.kpi-value {
		font-family: var(--font-display-hero);
		font-size: clamp(56px, 6vw, 84px);
		font-weight: 300;
		line-height: 1;
		letter-spacing: -2.2px;
		color: rgb(255, 255, 255);
	}

	@media (max-width: 809.98px) {
		.product-stack {
			padding: 60px 0 100px;
			gap: 100px;
		}

		.kpi-strip {
			grid-template-columns: 1fr;
			padding: 40px 24px;
			gap: 32px;
		}

		.kpi-headline {
			padding-right: 0;
		}

		.kpi-item {
			border-left: none;
			border-top: 1px solid rgba(255, 255, 255, 0.12);
			padding: 24px 0 0;
		}
	}
</style>
