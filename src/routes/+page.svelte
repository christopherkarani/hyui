<script lang="ts">
	import TopNavDesktop from '$lib/sections/TopNavDesktop.svelte';
	import Hero from '$lib/sections/Hero.svelte';
	import ProductStack from '$lib/sections/ProductStack.svelte';
	import CustomerSpotlight from '$lib/sections/CustomerSpotlight.svelte';
	import DemoCTA from '$lib/sections/DemoCTA.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import AnimateEntry from '$lib/components/AnimateEntry.svelte';
</script>

<svelte:head>
	<title>Pantaa – AI agents for enterprise support</title>
	<meta name="description" content="Enterprise AI agents for support operations with policy-safe automation and measurable outcomes." />
</svelte:head>

<TopNavDesktop />

<main aria-label="Main content">
	<Hero />
	<AnimateEntry delay={80}>
		<ProductStack />
	</AnimateEntry>
	<AnimateEntry delay={60}>
		<CustomerSpotlight />
	</AnimateEntry>
	<AnimateEntry delay={60}>
		<DemoCTA />
	</AnimateEntry>
</main>

<AnimateEntry delay={90}>
	<Footer />
</AnimateEntry>

<style>
	main {
		display: flex;
		flex-direction: column;
		scroll-margin-top: 90px;
	}
</style>
