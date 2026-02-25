<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		delay?: number;
		duration?: number;
		children: import('svelte').Snippet;
	}

	let { delay = 0, duration = 400, children }: Props = $props();

	let element: HTMLDivElement;
	let visible = $state(false);
	let mounted = $state(false);
	let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

	onMount(() => {
		mounted = true;
		// Check if element is already in viewport
		const rect = element.getBoundingClientRect();
		const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

		if (isInViewport) {
			// Small delay to allow CSS transition to work
			setTimeout(() => {
				visible = true;
			}, 50);
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						observer.unobserve(entry.target);
						if (fallbackTimer) {
							clearTimeout(fallbackTimer);
							fallbackTimer = null;
						}
					}
				});
			},
			{ threshold: 0.05, rootMargin: '50px' }
		);

		observer.observe(element);

		fallbackTimer = setTimeout(() => {
			visible = true;
			observer.disconnect();
			fallbackTimer = null;
		}, 1200);

		return () => {
			observer.disconnect();
			if (fallbackTimer) {
				clearTimeout(fallbackTimer);
				fallbackTimer = null;
			}
		};
	});
</script>

<div
	bind:this={element}
	class="animate-entry"
	class:visible
	class:mounted
	style="--enter-delay: {delay}ms; --enter-duration: {duration}ms;"
>
	{@render children()}
</div>

<style>
	.animate-entry {
		/* Start visible to prevent black void, animate from there */
		opacity: 1;
		transform: translateY(0);
	}

	.animate-entry.mounted {
		opacity: 0.001;
		transform: translateY(10px);
		transition:
			opacity var(--enter-duration) var(--motion-enter-easing) var(--enter-delay),
			transform var(--enter-duration) var(--motion-enter-easing) var(--enter-delay);
	}

	.animate-entry.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Respect reduced motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.animate-entry.mounted {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
