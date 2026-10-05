<script lang="ts">
	import { INDUSTRIES, LINKS } from './data.js';
	import { activeIndustry } from './stores.js';

	let menuOpen = $state(false);
	let dropOpen = $state(false);
	let openedBy: 'hover' | 'click' | null = $state(null);
	let dropTimer: ReturnType<typeof setTimeout> | null = null;

	function openDrop(source: 'hover' | 'click') {
		if (dropTimer) clearTimeout(dropTimer);
		dropOpen = true;
		openedBy = source;
	}

	function scheduleClose() {
		if (dropTimer) clearTimeout(dropTimer);
		dropTimer = setTimeout(() => {
			if (openedBy !== 'click') {
				dropOpen = false;
				openedBy = null;
			}
		}, 120);
	}

	function toggleDrop() {
		if (dropOpen && openedBy === 'click') {
			dropOpen = false;
			openedBy = null;
		} else {
			openDrop('click');
		}
	}

	function closeDrop() {
		if (dropTimer) clearTimeout(dropTimer);
		dropOpen = false;
		openedBy = null;
	}

	function pickIndustry(i: number) {
		activeIndustry.set(i);
		closeDrop();
		menuOpen = false;
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeDrop();
			menuOpen = false;
		}
	}

	$effect(() => {
		document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.documentElement.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={onKey} />

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

		<nav class="r-nav" aria-label="Primary">
			<div
				class="r-drop"
				role="presentation"
				onmouseenter={() => openDrop('hover')}
				onmouseleave={scheduleClose}
			>
				<button
					type="button"
					class="r-navlink r-drop-btn"
					aria-expanded={dropOpen}
					aria-haspopup="true"
					onclick={toggleDrop}
				>
					Industries
					<svg
						class="r-chevron"
						class:open={dropOpen}
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</button>
				{#if dropOpen}
					<div class="r-drop-panel" role="menu" aria-label="Industries">
						{#each INDUSTRIES as ind, i}
							<a
								role="menuitem"
								href="#industries"
								class="r-drop-item"
								onclick={() => pickIndustry(i)}
							>
								<span class="r-drop-name">{ind.name}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>
			<a class="r-navlink" href="#pricing">Pricing</a>
			<a class="r-navlink" href={LINKS.contact}>Partners</a>
			<a class="r-navlink" href={LINKS.process}>Docs</a>
		</nav>

		<div class="r-actions">
			<a class="r-btn r-btn-light r-signin" href={LINKS.contact}>Sign in</a>
			<a class="r-btn r-btn-dark" href={LINKS.calendly}>Talk to sales</a>
			<button
				type="button"
				class="r-burger"
				aria-expanded={menuOpen}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				{:else}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
						<path d="M4 7h16" />
						<path d="M4 12h16" />
						<path d="M4 17h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>
</header>

{#if menuOpen}
	<div class="r-mobile">
			<nav aria-label="Mobile">
				<p class="r-mobile-label">Industries</p>
				<div class="r-mobile-ind">
					{#each INDUSTRIES as ind, i}
						<a href="#industries" onclick={() => pickIndustry(i)}>{ind.name}</a>
					{/each}
				</div>
				<a class="r-mobile-link" href="#pricing" onclick={() => (menuOpen = false)}>Pricing</a>
				<a class="r-mobile-link" href={LINKS.contact}>Partners</a>
				<a class="r-mobile-link" href={LINKS.process}>Docs</a>
				<div class="r-mobile-cta">
					<a class="r-btn r-btn-light r-btn-block" href={LINKS.contact}>Sign in</a>
					<a class="r-btn r-btn-dark r-btn-block" href={LINKS.calendly}>Talk to sales</a>
				</div>
			</nav>
	</div>
{/if}

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

	.r-nav {
		display: none;
		align-items: center;
		gap: 0.25rem;
	}

	@media (min-width: 1024px) {
		.r-nav {
			display: flex;
		}
	}

	.r-drop {
		position: relative;
	}

	.r-drop-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.r-chevron {
		transition: transform 200ms ease-out;
	}

	.r-chevron.open {
		transform: rotate(180deg);
	}

	.r-drop-panel {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		min-width: 17rem;
		padding: 0.375rem;
		border-radius: 1rem;
		background: #fff;
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.06),
			0 12px 32px -8px rgba(0, 0, 0, 0.18);
	}

	.r-drop-item {
		display: block;
		padding: 0.55rem 0.75rem;
		border-radius: 0.65rem;
		font-size: 0.875rem;
	}

	.r-drop-item:hover {
		background: rgba(0, 0, 0, 0.04);
	}

	.r-actions {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.r-signin {
		display: none;
	}

	@media (min-width: 640px) {
		.r-signin {
			display: inline-flex;
		}
	}

	.r-burger {
		display: inline-flex;
		height: 2.25rem;
		width: 2.25rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		color: var(--r-foreground);
	}

	.r-burger:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	@media (min-width: 1024px) {
		.r-burger {
			display: none;
		}
	}

	.r-mobile {
		position: fixed;
		inset: 4rem 0 0 0;
		z-index: 40;
		overflow-y: auto;
		background: var(--r-surface);
		border-top: 1px solid var(--r-border-side);
		padding: 1.25rem 1.5rem 2.5rem;
	}

	@media (min-width: 1024px) {
		.r-mobile {
			display: none;
		}
	}

	.r-mobile-label {
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--r-muted);
		margin-bottom: 0.5rem;
	}

	.r-mobile-ind {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.25rem 1rem;
		margin-bottom: 1rem;
	}

	.r-mobile-ind a {
		padding: 0.5rem 0;
		font-size: 0.9375rem;
	}

	.r-mobile-link {
		display: block;
		padding: 0.65rem 0;
		font-size: 1.05rem;
		font-weight: 500;
		border-top: 1px solid var(--r-border-side);
	}

	.r-mobile-cta {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-top: 1.25rem;
	}
</style>
