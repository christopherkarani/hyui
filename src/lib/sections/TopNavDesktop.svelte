<script lang="ts">
	const navLinks = [
		{ label: 'Product', href: '/product', hasDropdown: true },
		{ label: 'Company', href: '/company', hasDropdown: true }
	];

	const overlaySections = [
		{
			title: 'Product',
			links: [
				{ label: 'Agent Canvas', href: './agent-canvas' },
				{ label: 'Insights', href: './insights' },
				{ label: 'Voice Experience', href: './voice-experience' },
				{ label: 'Browser Agent', href: './browser-agent' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'Careers', href: './careers' },
				{ label: 'Contact', href: './contact' },
				{ label: 'Trust Center', href: './trust' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ label: 'News', href: './news' },
				{ label: 'Privacy Policy', href: './privacy-policy' },
				{ label: 'Terms Of Service', href: './terms-of-service' }
			]
		}
	];

	const complianceCerts = ['SOC2', 'ISO 42001', 'ISO 27001'];
</script>

<nav class="top-nav">
	<div class="nav-inner">
		<a href="/" class="nav-logo">
			<svg class="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="11" stroke="white" stroke-width="1.5" />
				<path d="M6 12C6 8.68629 8.68629 6 12 6" stroke="white" stroke-width="1.5" />
				<path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="white" stroke-width="1.5" />
				<path d="M4 12H20" stroke="white" stroke-width="1" opacity="0.3" />
			</svg>
			<span class="logo-text">Giga</span>
		</a>

		<div class="nav-links">
			{#each navLinks as link}
				<a href={link.href} class="nav-link">
					{link.label}
					{#if link.hasDropdown}
						<svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
							<path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					{/if}
				</a>
			{/each}
		</div>

		<div class="nav-actions">
			<a href="./signin" class="nav-signin">Sign in</a>
			<a href="./contact" class="nav-cta">Talk to us</a>
		</div>
	</div>

	<div class="nav-overlay" aria-hidden="true">
		<div class="overlay-columns">
			{#each overlaySections as section}
				<div class="overlay-column">
					<p class="overlay-title">{section.title}</p>
					{#each section.links as link}
						<a href={link.href} class="overlay-link">
							{link.label}
						</a>
					{/each}
				</div>
			{/each}
		</div>

		<div class="overlay-meta">
			<div class="compliant-pill">
				<span>Compliant</span>
				<div class="compliance-certs">
					{#each complianceCerts as cert}
						<span class="cert-pill">{cert}</span>
					{/each}
				</div>
			</div>
			<a href="./contact" class="overlay-cta">Talk to us</a>
		</div>
	</div>
</nav>

<style>
	.top-nav {
		position: fixed;
		top: 20px;
		left: 0;
		right: 0;
		z-index: 9;
		height: 54px;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 1600px;
		padding: 0 20px;
		pointer-events: auto;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.nav-logo {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.logo-icon {
		width: 24px;
		height: 24px;
	}

	.logo-text {
		font-family: var(--font-sans);
		font-size: 18px;
		font-weight: 600;
		color: var(--text-primary-dark);
		letter-spacing: -0.3px;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 32px;
		margin-left: 40px;
	}

	.nav-link {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: var(--type-body-md-weight);
		line-height: var(--type-body-md-lh);
		color: var(--text-primary-dark);
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.chevron {
		width: 10px;
		height: 6px;
		opacity: 0.7;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-left: auto;
	}

	.nav-signin,
	.nav-cta {
		font-family: var(--font-sans);
		font-size: var(--type-button-md-size);
		font-weight: var(--type-button-md-weight);
		line-height: var(--type-button-md-lh);
	}

	.nav-signin {
		color: var(--text-primary-dark);
		padding: 6px 12px;
		border-radius: var(--radius-pill);
		transition: background 0.2s ease-in-out;
	}

	.nav-signin:hover {
		background: rgba(0, 0, 0, 0.286);
	}

	.nav-signin:focus-visible {
		background: rgba(0, 0, 0, 0.306);
		outline: auto 1px;
	}

	.nav-cta {
		color: var(--text-primary-light);
		background: var(--bg-surface-white);
		padding: 9px 20px;
		border-radius: var(--radius-pill);
		transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
	}

	.nav-cta:hover {
		background: rgba(50, 50, 50, 0.616);
		color: var(--text-primary-dark);
	}

	.nav-cta:focus-visible {
		background: rgba(0, 0, 0, 0.592);
		color: var(--text-primary-dark);
		outline: auto 1px;
	}

	.nav-overlay {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 12px;
		background: rgba(0, 0, 0, 0.88);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 18px;
		padding: 32px 40px;
		display: flex;
		flex-direction: column;
		gap: 32px;
		opacity: 0;
		pointer-events: none;
		transform: translateY(-10px);
		transition: opacity 0.24s ease, transform 0.24s ease;
	}

	.top-nav:hover .nav-overlay,
	.top-nav:focus-within .nav-overlay {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
	}

	.overlay-columns {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 32px;
	}

	.overlay-column {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.overlay-title {
		font-family: var(--font-mono);
		font-size: var(--type-eyebrow-size);
		font-weight: var(--type-eyebrow-weight);
		line-height: var(--type-eyebrow-lh);
		letter-spacing: var(--type-eyebrow-ls);
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.6);
	}

	.overlay-link {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: 500;
		line-height: var(--type-body-md-lh);
		color: var(--text-primary-dark);
		text-decoration: none;
		padding: 4px 0;
		position: relative;
	}

	.overlay-link::after {
		content: '';
		width: 100%;
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.overlay-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.compliant-pill {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.compliance-certs {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.cert-pill {
		padding: 4px 10px;
		border-radius: var(--radius-pill);
		border: 1px solid rgba(255, 255, 255, 0.2);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.85);
	}

	.overlay-cta {
		align-self: flex-start;
		font-family: var(--font-sans);
		font-size: var(--type-button-md-size);
		font-weight: var(--type-button-md-weight);
		line-height: var(--type-button-md-lh);
		color: var(--text-primary-dark);
		background: var(--bg-surface-white);
		padding: 10px 24px;
		border-radius: var(--radius-pill);
	}

	@media (max-width: 809.98px) {
		.top-nav {
			display: none;
		}
	}
</style>
