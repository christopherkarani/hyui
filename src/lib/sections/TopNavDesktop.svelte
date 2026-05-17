<nav class="top-nav" aria-label="Main navigation">
	<div class="nav-inner">
		<a href="/" class="nav-logo" aria-label="Pantaa home">
			<svg class="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="11" stroke="white" stroke-width="1.5" />
				<path d="M6 12C6 8.68629 8.68629 6 12 6" stroke="white" stroke-width="1.5" />
				<path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="white" stroke-width="1.5" />
				<path d="M4 12H20" stroke="white" stroke-width="1" opacity="0.3" />
			</svg>
			<span class="logo-text">Pantaa</span>
		</a>

		<div class="nav-actions">
			<a href="./contact" class="nav-cta">Talk to sales</a>
		</div>
	</div>
</nav>

<style>
	.top-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 12;
		height: 84px;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.nav-inner {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		width: 100%;
		max-width: none;
		height: 84px;
		padding: 0 40px;
		pointer-events: auto;
		background: transparent;
	}

	.nav-logo {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--text-primary-dark);
	}

	.logo-text {
		font-family: var(--font-sans-display);
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.4px;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 18px;
		margin-left: auto;
	}

	.nav-cta {
		font-family: var(--font-sans-display);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.4;
		color: rgb(0, 0, 0);
		background: var(--bg-cta-white);
		padding: 10px 22px;
		border-radius: var(--radius-pill);
	}

	.nav-cta:hover,
	.nav-cta:focus-visible {
		background: rgba(255, 255, 255, 0.88);
		color: rgb(0, 0, 0);
	}

	@media (max-width: 809.98px) {
		.top-nav {
			display: none;
		}
	}
</style>
