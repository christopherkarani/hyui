<script lang="ts">
	import '$lib/receptionist/receptionist.css';
	import RNav from '$lib/receptionist/RNav.svelte';
	import RHero from '$lib/receptionist/RHero.svelte';
	import RVideo from '$lib/receptionist/RVideo.svelte';
	import RUseCases from '$lib/receptionist/RUseCases.svelte';
	import RIndustries from '$lib/receptionist/RIndustries.svelte';
	import RPricing from '$lib/receptionist/RPricing.svelte';
	import RCalculator from '$lib/receptionist/RCalculator.svelte';
	import RFaq from '$lib/receptionist/RFaq.svelte';
	import RFinalCta from '$lib/receptionist/RFinalCta.svelte';
	import RFooter from '$lib/receptionist/RFooter.svelte';
	import RWidget from '$lib/receptionist/RWidget.svelte';
	import { VOICE_UI, VOICE_ENABLED } from '$lib/receptionist/data.js';
</script>

<svelte:head>
	<title>AI Receptionist for Small Business | Pantaa Receptionist</title>
	<meta
		name="description"
		content="Set up an AI receptionist in minutes. Answer calls around the clock, book appointments, route urgent requests, and serve customers in 70+ languages."
	/>
	<link rel="canonical" href="https://pantaa.com/receptionist" />
	<meta property="og:title" content="AI Receptionist for Small Business | Pantaa Receptionist" />
	<meta
		property="og:description"
		content="Set up an AI receptionist in minutes. Answer calls around the clock, book appointments, route urgent requests, and serve customers in 70+ languages."
	/>
	<meta property="og:image" content="https://pantaa.com/receptionist/images/poster.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="AI Receptionist for Small Business | Pantaa Receptionist" />
	<meta
		name="twitter:description"
		content="Set up an AI receptionist in minutes. Answer calls around the clock, book appointments, route urgent requests, and serve customers in 70+ languages."
	/>
</svelte:head>

<div class="receptionist">
	<RNav />
	<main class="r-main">
		<RHero />
		<RVideo />
		<RUseCases />
		<RIndustries />
		<RPricing />
		<RCalculator />
		<RFaq />
		<RFinalCta />
	</main>
	<RFooter />
	{#if VOICE_ENABLED && VOICE_UI === 'widget'}
		<RWidget />
	{/if}
</div>

<style>
	.r-main {
		padding-top: 4rem;
	}
</style>
