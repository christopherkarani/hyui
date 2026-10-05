<script lang="ts">
	import { onMount } from 'svelte';
	import { VOICE_AGENT_ID } from './data.js';

	let host: HTMLDivElement | undefined;

	onMount(() => {
		if (!host || !VOICE_AGENT_ID) return;
		if (!document.querySelector('script[data-convai-widget]')) {
			const s = document.createElement('script');
			s.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
			s.async = true;
			s.type = 'text/javascript';
			s.dataset.convaiWidget = '';
			document.body.appendChild(s);
		}
		const el = document.createElement('elevenlabs-convai');
		el.setAttribute('agent-id', VOICE_AGENT_ID);
		el.setAttribute('variant', 'expanded');
		host.appendChild(el);
	});
</script>

<div class="r-widget-host" bind:this={host} aria-label="Voice agent widget"></div>

<style>
	/* The widget positions itself as a floating panel; the host takes no space. */
	.r-widget-host {
		display: contents;
	}
</style>
