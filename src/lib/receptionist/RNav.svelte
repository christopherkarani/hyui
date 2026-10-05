<script lang="ts">
	import { LINKS } from './data.js';
</script>

<header class="r-header">
	<div class="r-header-bg" aria-hidden="true"></div>
	<div class="r-wrap r-header-inner">
		<a class="r-logo" href={LINKS.home} aria-label="Pantaa home">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5" />
				<path d="M6 12C6 8.68629 8.68629 6 12 6" stroke="currentColor" stroke-width="1.5" />
				<path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="currentColor" stroke-width="1.5" />
				<path d="M4 12H20" stroke="currentColor" stroke-width="1" opacity="0.3" />
			</svg>
			<span class="r-logo-text"><strong>Pantaa</strong> <span class="r-logo-sub">Receptionist</span></span>
		</a>

		<div class="r-actions">
			<a class="r-btn r-btn-dark" href={LINKS.calendly}>Talk to sales</a>
		</div>
	</div>
</header>

<style>
	.r-header {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 50;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.r-header-bg {
		position: absolute;
		inset: 0;
		background: rgba(253, 252, 252, 0.8);
	}

	.r-header-inner {
		position: relative;
		display: flex;
		height: 4rem;
		align-items: center;
		gap: 1.5rem;
		border-left: 1px solid transparent;
		border-right: 1px solid transparent;
	}

	.r-logo {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.5rem;
		color: var(--r-foreground);
	}

	.r-logo-text {
		font-size: 1.05rem;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.r-logo-text strong {
		font-weight: 600;
	}

	.r-logo-sub {
		display: none;
	}

	@media (min-width: 640px) {
		.r-logo-sub {
			display: inline;
		}
	}

	.r-actions {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
