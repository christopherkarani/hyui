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
	<title>Giga – AI agents for enterprise support</title>
	<meta name="description" content="AI that talks like a human. Handles millions of calls." />
</svelte:head>

<TopNavDesktop />

<main>
	<Hero />
	<AnimateEntry delay={100}>
		<ProductStack />
	</AnimateEntry>
	<AnimateEntry delay={50}>
		<CustomerSpotlight />
	</AnimateEntry>
	<AnimateEntry delay={50}>
		<DemoCTA />
	</AnimateEntry>
</main>

<AnimateEntry delay={100}>
	<Footer />
</AnimateEntry>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>
