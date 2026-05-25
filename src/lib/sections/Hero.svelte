<script lang="ts">
	import { tick } from 'svelte';

	let menuOpen = $state(false);
	let menuButton = $state<HTMLButtonElement | null>(null);
	let mobileOverlay = $state<HTMLElement | null>(null);
	let lastFocusedElement: HTMLElement | null = null;

	const heroLogoList = [
		{ id: 'law', label: 'law firms' },
		{ id: 'insurance', label: 'insurance agencies' },
		{ id: 'realEstate', label: 'real estate teams' },
		{ id: 'manufacturing', label: 'manufacturers' },
		{ id: 'wholesale', label: 'wholesalers' },
		{ id: 'agencies', label: 'marketing agencies' }
	];

	const heroLogoSvgs: Record<string, string> = {
		law: `<svg role="img" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#fff">law firms</text></svg>`,
		insurance: `<svg role="img" viewBox="0 0 170 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#fff">insurance agencies</text></svg>`,
		realEstate: `<svg role="img" viewBox="0 0 160 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#fff">real estate teams</text></svg>`,
		manufacturing: `<svg role="img" viewBox="0 0 145 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#fff">manufacturers</text></svg>`,
		wholesale: `<svg role="img" viewBox="0 0 125 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#fff">wholesalers</text></svg>`,
		agencies: `<svg role="img" viewBox="0 0 155 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#fff">marketing agencies</text></svg>`
	};

	const menuFocusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function closeMenu() {
		menuOpen = false;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function focusFirstOverlayControl() {
		if (!mobileOverlay) {
			return;
		}
		const focusableElements = mobileOverlay.querySelectorAll<HTMLElement>(menuFocusableSelector);
		focusableElements[0]?.focus();
	}

	function handleOverlayKeydown(event: KeyboardEvent) {
		if (!mobileOverlay) {
			return;
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu();
			return;
		}

		if (event.key !== 'Tab') {
			return;
		}

		const focusableElements = Array.from(
			mobileOverlay.querySelectorAll<HTMLElement>(menuFocusableSelector)
		).filter((element) => !element.hasAttribute('disabled'));

		if (focusableElements.length === 0) {
			return;
		}

		const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey && (currentIndex <= 0 || document.activeElement === firstElement)) {
			event.preventDefault();
			lastElement.focus();
			return;
		}

		if (!event.shiftKey && (currentIndex === -1 || document.activeElement === lastElement)) {
			event.preventDefault();
			firstElement.focus();
		}
	}

	$effect(() => {
		if (!menuOpen) {
			return;
		}

		const previousBodyOverflow = document.body.style.overflow;
		const onDocumentKeydown = (event: KeyboardEvent) => {
			handleOverlayKeydown(event);
		};

		lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', onDocumentKeydown);

		void tick().then(() => {
			focusFirstOverlayControl();
		});

		return () => {
			document.removeEventListener('keydown', onDocumentKeydown);
			document.body.style.overflow = previousBodyOverflow;
			(lastFocusedElement ?? menuButton)?.focus();
		};
	});
</script>

<section class="hero">
	<div class="hero-bg">
		<picture class="hero-picture">
			<source
				type="image/webp"
				srcset="
					/pantaa/images/optimized/hero-bg-768.webp 768w,
					/pantaa/images/optimized/hero-bg-1440.webp 1440w,
					/pantaa/images/optimized/hero-bg-1920.webp 1920w,
					/pantaa/images/optimized/hero-bg-2560.webp 2560w
				"
				sizes="100vw"
			/>
			<img
				src="/pantaa/images/optimized/hero-bg-2560.jpg"
				alt=""
				class="hero-image"
				width="2560"
				height="1266"
				loading="eager"
				fetchpriority="high"
				decoding="async"
			/>
		</picture>
		<div class="hero-vignette"></div>
	</div>

	<div class="hero-content">
		<div class="hero-mobile-top">
			<a href="/" class="mobile-logo">
				<svg class="logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
					<path d="M14 2 C19 4, 24 8, 26 14 C24 20, 19 24, 14 26 C12 22, 14 18, 18 14 C14 12, 10 14, 6 18 C4 12, 8 6, 14 2 Z" fill="white"/>
				</svg>
				<span class="logo-text">Pantaa</span>
			</a>
			<button
				type="button"
				bind:this={menuButton}
				class="hamburger"
				onclick={toggleMenu}
				aria-controls="mobile-nav"
				aria-expanded={menuOpen}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<line x1="4" y1="8" x2="20" y2="8" stroke="white" stroke-width="1.5" stroke-linecap="round" />
					<line x1="4" y1="14" x2="20" y2="14" stroke="white" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		</div>

		<div class="hero-center">
			<a href="./contact" class="announcement-chip">
				<span class="chip-dot" aria-hidden="true"></span>
				<span class="chip-text">AI AUTOMATION AGENCY FOR AUTONOMOUS AGENTS</span>
				<svg class="chip-arrow" width="6" height="10" viewBox="0 0 6 10" fill="none">
					<path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>

			<h1 class="hero-headline" aria-label="We set up autonomous AI agents for your business">
				<span class="headline-line">We set up autonomous</span>
				<span class="headline-line">AI agents for your business.</span>
			</h1>

			<p class="hero-subheadline">Pantaa installs, configures, and manages AI employees that handle follow-up, inbox triage, CRM updates, research, and reporting.</p>

			<div class="hero-actions">
				<a href="https://calendly.com/carltonkarani/30min" class="hero-cta hero-cta-primary">Book a 15-minute setup call</a>
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
	<nav id="mobile-nav" bind:this={mobileOverlay} class="mobile-overlay" aria-label="Mobile navigation panel">
		<div class="overlay-header">
			<a href="/" class="mobile-logo">
				<svg class="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="11" stroke="white" stroke-width="1.5" />
					<path d="M6 12C6 8.68629 8.68629 6 12 6" stroke="white" stroke-width="1.5" />
					<path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="white" stroke-width="1.5" />
					<path d="M4 12H20" stroke="white" stroke-width="1" opacity="0.3" />
				</svg>
				<span class="logo-text">Pantaa</span>
			</a>
			<button type="button" class="close-btn" onclick={closeMenu} aria-label="Close menu">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="1.5" stroke-linecap="round" />
					<line x1="18" y1="6" x2="6" y2="18" stroke="white" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		</div>

		<div class="overlay-trust-pill">AI agent setup • workflow buildout • monitoring</div>

		<div class="overlay-nav">
			<div class="overlay-group">
				<h3 class="overlay-group-title">Offer</h3>
				<a href="#workflows" class="overlay-link" onclick={closeMenu}>Workflows</a>
				<a href="#process" class="overlay-link" onclick={closeMenu}>Setup process</a>
				<a href="#fit" class="overlay-link" onclick={closeMenu}>Best fit</a>
			</div>
			<div class="overlay-group">
				<h3 class="overlay-group-title">Company</h3>
				<a href="https://calendly.com/carltonkarani/30min" class="overlay-link" onclick={closeMenu}>Book setup call</a>
				<a href="./privacy" class="overlay-link" onclick={closeMenu}>Privacy</a>
				<a href="./terms" class="overlay-link" onclick={closeMenu}>Terms</a>
			</div>
		</div>
	</nav>
{/if}

<style>
	.hero {
		position: relative;
		width: 100%;
		min-height: 100svh;
		overflow: clip;
		background: rgb(0, 0, 0);
		z-index: 3;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
	}

	.hero-picture,
	.hero-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.hero-image {
		object-fit: cover;
		object-position: 50% 50%;
		opacity: 0.55;
		filter: saturate(0.85) brightness(0.7) contrast(1.05);
	}

	.hero-vignette {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 18%, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.05) 60%, rgba(0, 0, 0, 0.95) 100%);
	}

	.hero-content {
		position: relative;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		min-height: 100svh;
		width: 100%;
		margin-inline: auto;
		padding: clamp(180px, 26vh, 280px) 36px 56px;
	}

	.hero-mobile-top {
		display: none;
	}

	.hero-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 26px;
		text-align: center;
		max-width: 1120px;
	}

	.announcement-chip {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 6px 10px 6px 8px;
		border-radius: var(--radius-pill);
		background: rgba(0, 0, 0, 0.42);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border: 1px solid rgba(255, 255, 255, 0.16);
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.96);
	}

	.chip-dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgb(255, 255, 255);
		margin-left: 4px;
	}

	.hero-headline {
		font-family: var(--font-display-hero);
		font-size: clamp(44px, 5.4vw, 80px);
		font-weight: 300;
		line-height: 1.04;
		letter-spacing: -1.5px;
		color: rgb(255, 255, 255);
		max-width: 18ch;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.headline-line {
		display: block;
	}

	.hero-subheadline {
		font-family: var(--font-sans-display);
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.94);
		max-width: 60ch;
		margin-top: -8px;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 18px;
	}

	.hero-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 13px 28px;
		border-radius: var(--radius-pill);
		font-family: var(--font-sans-display);
		font-size: 15px;
		font-weight: 400;
		line-height: 1.4;
		border: 1px solid transparent;
	}

	.hero-cta-primary {
		background: rgb(255, 255, 255);
		color: rgb(0, 0, 0);
	}

	.hero-cta-primary:hover,
	.hero-cta-primary:focus-visible {
		background: rgba(255, 255, 255, 0.88);
		color: rgb(0, 0, 0);
	}

	.hero-logos {
		margin-top: auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		padding-top: 80px;
	}

	.logo-row {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 64px;
		justify-content: center;
		align-items: center;
		opacity: 0.42;
		width: 100%;
		max-width: 1320px;
	}

	.partner-logo {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 0;
		max-width: 160px;
		color: rgb(255, 255, 255);
		margin-inline: auto;
	}

	:global(.partner-logo svg) {
		width: 100%;
		max-width: 130px;
		height: 22px;
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
		background: rgba(209, 225, 255, 0.08);
		border: var(--border-glass);
	}

	.mobile-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(7, 10, 16, 0.98);
		padding: 20px;
		display: flex;
		flex-direction: column;
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
		animation: mobile-overlay-enter var(--motion-duration-base) var(--motion-enter-easing) both;
	}

	.overlay-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.overlay-trust-pill {
		display: inline-flex;
		align-self: flex-start;
		margin-top: 28px;
		padding: 8px 12px;
		border-radius: var(--radius-pill);
		background: rgba(210, 225, 255, 0.1);
		border: var(--border-glass);
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.36px;
		text-transform: uppercase;
		color: var(--text-muted-dark-87);
	}

	.overlay-nav {
		display: flex;
		flex-direction: column;
		gap: 32px;
		margin-top: 28px;
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
		font-size: 22px;
		font-weight: 500;
		line-height: 1.45;
		color: var(--text-primary-dark);
	}

	.overlay-link:hover,
	.overlay-link:focus-visible {
		color: var(--color-accent);
	}

	@keyframes mobile-overlay-enter {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 809.98px) {
		.hero {
			min-height: 760px;
		}

		.hero-image {
			object-position: 33% 63%;
		}

		.hero-grid-overlay {
			background-size: 52px 52px;
			opacity: 0.26;
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

		.hero-content {
			width: 100%;
			padding: 120px 20px var(--space-12);
		}

		.hero-center {
			max-width: 100%;
			gap: var(--space-4);
		}

		.hero-subheadline {
			font-size: 15px;
			max-width: 34ch;
		}

		.hero-actions {
			flex-direction: column;
			width: 100%;
		}

		.hero-cta {
			width: min(320px, 100%);
		}

		.hero-logos {
			padding-top: var(--space-10);
		}

		.logo-row {
			grid-template-columns: repeat(2, minmax(120px, 1fr));
			gap: 20px 28px;
			max-width: 360px;
		}
	}

	@media (min-width: 810px) and (max-width: 1199.98px) {
		.hero-content {
			padding-top: 172px;
		}

		.logo-row {
			grid-template-columns: repeat(3, minmax(120px, 1fr));
			gap: 28px 40px;
			max-width: 620px;
		}
	}
</style>
