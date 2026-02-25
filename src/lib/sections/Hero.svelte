<script lang="ts">
	let menuOpen = $state(false);

	const heroLogoList = [
		{ id: 'postman', label: 'Postman' },
		{ id: 'rio', label: 'Rio' },
		{ id: 'doordash', label: 'DoorDash' },
		{ id: 'capital', label: 'capital.com' },
		{ id: 'afriex', label: 'Afriex' },
		{ id: 'sendoso', label: 'Sendoso' }
	];

	const heroLogoSvgs: Record<string, string> = {
		postman: `<svg role="img" viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg"><polygon points="16 4 104 4 116 18 104 32 16 32 4 18" fill="#FF3008"/><text x="34" y="24" font-family="Inter" font-size="12" font-weight="600" fill="#fff">POSTMAN</text></svg>`,
		rio: `<svg role="img" viewBox="0 0 64 36" xmlns="http://www.w3.org/2000/svg"><text x="0" y="24" font-family="Emilio Light, serif" font-size="24" fill="#fff" font-style="italic">Rio</text></svg>`,
		doordash: `<svg role="img" viewBox="0 0 130 36" xmlns="http://www.w3.org/2000/svg"><path d="M0 4L45 4L70 32H40L0 18Z" fill="#FF3008" opacity="0.85"/><text x="78" y="24" font-family="Inter" font-size="14" font-weight="600" fill="#fff">DoorDash</text></svg>`,
		capital: `<svg role="img" viewBox="0 0 140 36" xmlns="http://www.w3.org/2000/svg"><text x="0" y="24" font-family="Inter" font-size="16" font-weight="500" fill="#fff">capital.com</text></svg>`,
		afriex: `<svg role="img" viewBox="0 0 110 36" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="8" width="16" height="16" rx="4" fill="#fff" opacity="0.25"/><text x="26" y="24" font-family="Inter" font-size="16" font-weight="600" fill="#fff">afriex</text></svg>`,
		sendoso: `<svg role="img" viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg"><text x="0" y="24" font-family="Emilio Light, serif" font-size="18" fill="#fff" font-style="italic">Sendoso</text><path d="M0 32H38" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`
	};

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<section class="hero">
	<div class="hero-bg">
		<img
			src="/images/hero-bg.png"
			alt=""
			class="hero-image"
			loading="eager"
		/>
		<div class="hero-vignette"></div>
	</div>

	<div class="hero-content">
		<div class="hero-mobile-top">
			<a href="/" class="mobile-logo">
				<svg class="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="11" stroke="white" stroke-width="1.5"/>
					<path d="M6 12C6 8.68629 8.68629 6 12 6" stroke="white" stroke-width="1.5"/>
					<path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="white" stroke-width="1.5"/>
					<path d="M4 12H20" stroke="white" stroke-width="1" opacity="0.3"/>
				</svg>
				<span class="logo-text">Giga</span>
			</a>
			<button class="hamburger" onclick={toggleMenu} aria-label="Open menu">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<line x1="4" y1="8" x2="20" y2="8" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
					<line x1="4" y1="14" x2="20" y2="14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
			</button>
		</div>

		<div class="hero-center">
			<a href="./browser-agent" class="announcement-chip">
				<span class="chip-text">GIGA LAUNCHES BROWSER AGENT</span>
				<svg width="6" height="10" viewBox="0 0 6 10" fill="none">
					<path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>

			<h1 class="hero-headline">AI that talks like a human.<br/>Handles millions of calls.</h1>

			<h2 class="hero-subheadline">AI agents for enterprise support</h2>

			<div id="button-1">
				<a href="./contact" class="hero-cta">Talk to us</a>
			</div>
		</div>

		<div class="hero-logos">
			<div class="logo-row">
				{#each heroLogoList as logo}
					<div class="partner-logo" aria-label={logo.label}>
						{@html heroLogoSvgs[logo.id]}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

{#if menuOpen}
	<div class="mobile-overlay" role="dialog" aria-modal="true">
		<div class="overlay-header">
			<a href="/" class="mobile-logo">
				<svg class="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="11" stroke="white" stroke-width="1.5"/>
					<path d="M6 12C6 8.68629 8.68629 6 12 6" stroke="white" stroke-width="1.5"/>
					<path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="white" stroke-width="1.5"/>
					<path d="M4 12H20" stroke="white" stroke-width="1" opacity="0.3"/>
				</svg>
				<span class="logo-text">Giga</span>
			</a>
			<button class="close-btn" onclick={toggleMenu} aria-label="Close menu">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
					<line x1="18" y1="6" x2="6" y2="18" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
			</button>
		</div>
		<nav class="overlay-nav">
			<div class="overlay-group">
				<h3 class="overlay-group-title">Product</h3>
				<a href="./agent-canvas" class="overlay-link">Agent Canvas</a>
				<a href="./insights" class="overlay-link">Insights</a>
				<a href="./voice-experience" class="overlay-link">Voice Experience</a>
				<a href="./browser-agent" class="overlay-link">Browser Agent</a>
			</div>
			<div class="overlay-group">
				<h3 class="overlay-group-title">Company</h3>
				<a href="./careers" class="overlay-link">Careers</a>
				<a href="./contact" class="overlay-link">Contact</a>
				<a href="./trust" class="overlay-link">Trust Center</a>
			</div>
		</nav>
	</div>
{/if}

<style>
	.hero {
		position: relative;
		width: 100%;
		height: 100vh;
		min-height: 800px;
		overflow: clip;
		background: var(--bg-hero);
		z-index: 3;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 50%;
	}

	.hero-vignette {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 270px;
		background: var(--gradient-hero-vignette);
		mix-blend-mode: multiply;
	}

	@media (max-width: 1440px) {
		.hero-vignette {
			height: 225px;
		}
	}

	.hero-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 20px;
	}

	.hero-mobile-top {
		display: none;
	}

	.hero-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		text-align: center;
		max-width: 900px;
	}

	.announcement-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		background: var(--bg-glass-white-10);
		backdrop-filter: var(--blur-hero-cta);
		font-family: var(--font-mono);
		font-size: var(--type-eyebrow-size);
		font-weight: var(--type-eyebrow-weight);
		line-height: var(--type-eyebrow-lh);
		letter-spacing: var(--type-eyebrow-ls);
		text-transform: uppercase;
		color: var(--text-primary-dark);
	}

	.chip-text {
		font-size: inherit;
	}

	.hero-headline {
		font-family: var(--font-display-hero);
		font-size: var(--type-hero-headline-size);
		font-weight: var(--type-hero-headline-weight);
		line-height: var(--type-hero-headline-lh);
		letter-spacing: var(--type-hero-headline-ls);
		color: var(--text-primary-dark);
		text-transform: none;
	}

	.hero-subheadline {
		font-family: var(--font-sans);
		font-size: var(--type-body-lg-size);
		font-weight: var(--type-body-lg-weight);
		line-height: var(--type-body-lg-lh);
		color: var(--text-muted-dark-87);
	}

	.hero-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 9px 20px;
		border-radius: var(--radius-pill);
		background: var(--bg-surface-white);
		color: var(--text-primary-light);
		font-family: var(--font-sans);
		font-size: var(--type-button-md-size);
		font-weight: var(--type-button-md-weight);
		line-height: var(--type-button-md-lh);
		transition: background 0.2s ease-in-out;
	}

	.hero-cta:hover {
		background: rgba(50, 50, 50, 0.616);
		color: var(--text-primary-dark);
	}

	.hero-cta:focus-visible {
		background: rgba(0, 0, 0, 0.592);
		color: var(--text-primary-dark);
		outline: auto 1px;
	}

	.hero-logos {
		position: absolute;
		bottom: 60px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		pointer-events: none;
	}

	.logo-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, max-content));
		gap: 40px;
		justify-content: center;
		align-items: center;
		opacity: 0.85;
	}

	.partner-logo {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 120px;
		max-width: 160px;
		color: var(--text-primary-dark);
	}

	.partner-logo svg {
		width: 100%;
		height: auto;
	}

	@media (max-width: 809.98px) {
		.hero {
			min-height: 1000px;
		}

		.hero-image {
			object-position: 26.8% 67%;
		}

		.hero-vignette {
			height: 360px;
		}

		.hero-mobile-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			top: 20px;
			left: 20px;
			right: 20px;
			z-index: 10;
		}

		.hero-headline {
			font-size: var(--type-hero-headline-size);
			line-height: var(--type-hero-headline-lh);
			letter-spacing: var(--type-hero-headline-ls);
		}

		.logo-row {
			flex-wrap: wrap;
			justify-content: center;
			gap: 24px 32px;
			padding: 0 20px;
		}
	}

	@media (min-width: 810px) and (max-width: 1199.98px) {
		.hero-headline {
			font-size: var(--type-hero-headline-size);
			line-height: var(--type-hero-headline-lh);
			letter-spacing: var(--type-hero-headline-ls);
		}

		.hero-vignette {
			height: 200px;
		}
	}

	.mobile-logo {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.logo-text {
		font-family: var(--font-sans);
		font-size: 18px;
		font-weight: 600;
		color: var(--text-primary-dark);
		letter-spacing: -0.3px;
	}

	.hamburger,
	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-lg);
	}

	.mobile-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgb(0, 0, 0);
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.overlay-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.overlay-nav {
		display: flex;
		flex-direction: column;
		gap: 40px;
		margin-top: 60px;
	}

	.overlay-group {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.overlay-group-title {
		font-family: var(--font-mono);
		font-size: var(--type-eyebrow-size);
		font-weight: var(--type-eyebrow-weight);
		line-height: var(--type-eyebrow-lh);
		letter-spacing: var(--type-eyebrow-ls);
		text-transform: uppercase;
		color: var(--text-muted-dark-50);
	}

	.overlay-link {
		font-family: var(--font-sans);
		font-size: 24px;
		font-weight: 400;
		line-height: 36px;
		color: var(--text-primary-dark);
	}
</style>
