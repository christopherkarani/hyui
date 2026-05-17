<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		delay?: number;
		duration?: number;
		children: import('svelte').Snippet;
	}

	let { delay = 0, duration, children }: Props = $props();

	let element: HTMLDivElement;
	let visible = $state(false);
	let mounted = $state(false);
	let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
	let matchMediaListener: ((event: MediaQueryListEvent) => void) | null = null;
	let reducedMotionQuery: MediaQueryList | null = null;
	let resolvedDuration = $state(420);

	function parseDurationValue(value: string): number | null {
		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return null;
		}

		if (trimmedValue.endsWith('ms')) {
			const parsed = Number.parseFloat(trimmedValue);
			return Number.isFinite(parsed) ? parsed : null;
		}

		if (trimmedValue.endsWith('s')) {
			const parsed = Number.parseFloat(trimmedValue);
			return Number.isFinite(parsed) ? Math.round(parsed * 1000) : null;
		}

		const parsed = Number.parseFloat(trimmedValue);
		return Number.isFinite(parsed) ? parsed : null;
	}

	onMount(() => {
		if (typeof duration === 'number') {
			resolvedDuration = duration;
		} else {
			const tokenDuration = parseDurationValue(
				getComputedStyle(document.documentElement).getPropertyValue('--motion-enter-duration')
			);
			resolvedDuration = tokenDuration ?? 420;
		}

		reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (reducedMotionQuery.matches) {
			visible = true;
			return;
		}

		mounted = true;
		const rect = element.getBoundingClientRect();
		const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

		if (isInViewport) {
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

		matchMediaListener = (event: MediaQueryListEvent) => {
			if (event.matches) {
				mounted = false;
				visible = true;
				observer.disconnect();
				if (fallbackTimer) {
					clearTimeout(fallbackTimer);
					fallbackTimer = null;
				}
			}
		};

		reducedMotionQuery.addEventListener('change', matchMediaListener);

		return () => {
			observer.disconnect();
			if (fallbackTimer) {
				clearTimeout(fallbackTimer);
				fallbackTimer = null;
			}
			if (reducedMotionQuery && matchMediaListener) {
				reducedMotionQuery.removeEventListener('change', matchMediaListener);
				matchMediaListener = null;
			}
		};
	});
</script>

<div
	bind:this={element}
	class="animate-entry"
	class:visible
	class:mounted
	style="--enter-delay: {delay}ms; --enter-duration: {resolvedDuration}ms;"
>
	{@render children()}
</div>

<style>
	.animate-entry {
		opacity: 1;
		transform: translateY(0);
		will-change: opacity, transform;
	}

	.animate-entry.mounted {
		opacity: 0.001;
		transform: translateY(12px) scale(0.995);
		transition:
			opacity var(--enter-duration) var(--motion-enter-easing) var(--enter-delay),
			transform var(--enter-duration) var(--motion-enter-easing) var(--enter-delay);
	}

	.animate-entry.visible {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-entry.mounted {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
