<script lang="ts">
	import '../lib/styles/tokens.css';

	let { children } = $props();
</script>

<a href="#page-content" class="skip-link">Skip to main content</a>

<div id="page-content" class="app-shell" tabindex="-1">
	{@render children()}
</div>

<style>
	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.skip-link {
		position: fixed;
		top: 8px;
		left: 50%;
		transform: translate(-50%, -140%);
		z-index: 200;
		padding: 10px 16px;
		border-radius: var(--radius-pill);
		border: var(--border-glass);
		background: rgba(8, 10, 14, 0.94);
		color: var(--text-primary-dark);
		font-size: var(--type-body-md-size);
		line-height: var(--type-body-md-lh);
	}

	.skip-link:focus-visible {
		transform: translate(-50%, 0);
	}
</style>
