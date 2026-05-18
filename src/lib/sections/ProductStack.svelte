<script lang="ts">
	import FeatureBlock from '$lib/components/FeatureBlock.svelte';
	import { icons } from '$lib/icons';

	const kpiHeadline = 'A done-for-you autonomous AI agent setup for operators who want the outcome of an AI employee, not another tool to manage.';

	const kpiMetrics = [
		{ label: 'SETUP CALL', value: '15m' },
		{ label: 'TYPICAL LAUNCH', value: '14d' }
	];

	const setupFeatures = [
		{ icon: icons.compass, title: 'AI employee installed for your team', description: 'We configure the agent, model provider, workspace, and daily operating loop.' },
		{ icon: icons.shieldCheck, title: 'Your tools connected', description: 'Email, calendar, CRM, project boards, docs, and research tools get wired into one agent workflow.' },
		{ icon: icons.sliders, title: 'Plain-English handoff', description: 'You get an AI employee with working tasks, not a pile of prompts and setup notes.' }
	];

	const setupSteps = [
		{ title: 'Audit repetitive work', description: 'We identify the admin, research, follow-up, and reporting loops that should move first.' },
		{ title: 'Install the agent stack', description: 'We set up the workspace, memory, model routing, and secure access pattern.' },
		{ title: 'Connect tools', description: 'We connect the accounts and documents needed for the first live workflows.' },
		{ title: 'Test real tasks', description: 'We run your agent against actual examples until the output is usable.' },
		{ title: 'Train your operator', description: 'We show your team how to assign work, review results, and request changes.' }
	];

	const workflowFeatures = [
		{ icon: icons.barChart, title: 'lead follow-up', description: 'Turn new inquiries, missed replies, and open opportunities into next-step drafts.' },
		{ icon: icons.activity, title: 'inbox triage', description: 'Sort messages, summarize context, prepare replies, and flag decisions for humans.' },
		{ icon: icons.refresh, title: 'CRM updates', description: 'Keep records current after calls, emails, meetings, and research passes.' }
	];

	const workflowSteps = [
		{ title: 'Revenue workflows', description: 'Lead qualification, proposal prep, client follow-up, and dormant-account reactivation.' },
		{ title: 'Operations workflows', description: 'Meeting notes, task routing, vendor research, status updates, and internal reporting.' },
		{ title: 'Knowledge workflows', description: 'Market research, document review, SOP cleanup, and searchable operating memory.' }
	];

	const managedFeatures = [
		{ icon: icons.headphones, title: 'Ongoing support', description: 'We keep tuning workflows as your team learns what to delegate.' },
		{ icon: icons.globe, title: 'Monitoring loop', description: 'Watchdogs, check-ins, and review rituals catch agent drift before it becomes a customer problem.' },
		{ icon: icons.timer, title: 'Change requests included', description: 'New prompts, skills, workflows, and tool wiring stay part of the retainer relationship.' }
	];

	const managedSteps = [
		{ title: 'Daily operating rhythm', description: 'Your team gets a clear way to assign tasks, review output, and escalate exceptions.' },
		{ title: 'Weekly improvements', description: 'We review stuck tasks and turn them into better workflows or clearer guardrails.' },
		{ title: 'Expansion path', description: 'Once one agent works, we add specialist agents only where they reduce real load.' }
	];
</script>

<section id="workflows" class="product-stack">
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
		eyebrow="AI AGENT SETUP"
		sectionTitle="Your AI employee, installed and ready to work"
		productName="Done-for-you setup"
		productColor="rgb(255, 196, 211)"
		description="Pantaa installs a managed agent system, connects your operating tools, and turns your first repeatable tasks into working workflows."
		ctaText="Book setup call"
		ctaHref="./contact"
		features={setupFeatures}
		steps={setupSteps}
		imageSrc="/pantaa/images/optimized/agent-canvas-ui-1600.jpg"
		imageSrcset="/pantaa/images/optimized/agent-canvas-ui-1024.webp 1024w, /pantaa/images/optimized/agent-canvas-ui-1600.webp 1600w"
		imageAlt="Agent setup workspace for configuring an AI employee"
	/>

	<FeatureBlock
		eyebrow="WORKFLOW BUILDOUT"
		sectionTitle="Start with boring work that already costs you time"
		productName="Revenue and admin workflows"
		productColor="rgb(255, 222, 158)"
		description="We focus the AI employee on concrete business loops: lead follow-up, inbox triage, CRM updates, meeting notes, research, and weekly reporting."
		ctaText="Map my workflows"
		ctaHref="./contact"
		features={workflowFeatures}
		steps={workflowSteps}
		imageSrc="/pantaa/images/optimized/insights-ui-1600.jpg"
		imageSrcset="/pantaa/images/optimized/insights-ui-1024.webp 1024w, /pantaa/images/optimized/insights-ui-1600.webp 1600w"
		imageAlt="Workflow dashboard showing agent tasks and operating notes"
		reversed={true}
	/>

	<FeatureBlock
		eyebrow="MANAGED OPERATIONS"
		sectionTitle="Monitoring and support after the install"
		productName="Ongoing agent ops"
		productColor="rgb(196, 196, 255)"
		description="The business model is anti-friction: setup, monitoring, changes, and support stay bundled so your team can keep assigning work."
		ctaText="Talk through the retainer"
		ctaHref="./contact"
		features={managedFeatures}
		steps={managedSteps}
		imageSrc="/pantaa/images/optimized/voice-poster-1600.jpg"
		imageAlt="Managed agent operating loop with monitoring and review cadence"
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
