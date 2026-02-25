# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pixel-perfect SvelteKit clone of giga.ai — an AI agent enterprise support landing page. The goal is exact visual parity with the production site across all viewport sizes.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build (port 4173) |
| `npm run check` | Type-check with svelte-check |
| `npm test` | Run unit tests (Vitest, one-shot) |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run test:e2e` | Playwright E2E visual regression tests |
| `npm run audit:parity` | Run layout parity audit against expected dimensions |

Run a single unit test: `npx vitest run tests/tokens.test.ts`
Run a single E2E test: `npx playwright test tests/visual-regression.spec.ts --grep "test name"`

E2E tests require a built preview server — Playwright auto-runs `npm run build && npm run preview` before tests.

## Architecture

**Stack:** SvelteKit 2.5 / Svelte 5 / Vite 6 / TypeScript strict / PostCSS

**Single-page layout:** `+page.svelte` composes 6 full-width sections in order:
1. `TopNavDesktop` — fixed header with dropdown menus (hidden <810px)
2. `Hero` — 100vh hero with mobile hamburger overlay nav
3. `ProductStack` — KPI strip + 3 FeatureBlock cards
4. `CustomerSpotlight` — DoorDash case study card
5. `DemoCTA` — call-to-action split layout
6. `Footer` — video background, compliance badges, link columns

**Key directories:**
- `src/lib/sections/` — full-width page sections (one file per section)
- `src/lib/components/` — reusable components (AnimateEntry, FeatureBlock)
- `src/lib/styles/tokens.css` — all design tokens (colors, fonts, spacing, motion, responsive breakpoints)
- `static/fonts/` — custom woff/woff2 fonts (Emilio Light, Giga Sans, Inter, Geist Mono)
- `static/images/`, `static/videos/` — media assets
- `audit/reference/` — design system ground truth (token JSONs, layout maps, asset manifests)
- `scripts/` — Playwright-based audit utilities (parity-audit, style-check)

## Styling

**No CSS framework.** All styling uses scoped `<style>` blocks with CSS custom properties from `tokens.css`.

Three responsive tiers via media queries:
- **Desktop:** ≥1200px (default)
- **Tablet:** 810px–1199.98px
- **Mobile:** ≤809.98px

Glass-morphism pattern: `backdrop-filter: blur()` + semi-transparent backgrounds via `--bg-glass-white-*` tokens.

## Svelte 5 Patterns

This project uses Svelte 5 syntax exclusively:
- `$state()` for reactive state (not legacy `let` reactivity)
- `$props()` for component props
- `{@render children()}` snippet syntax (not `<slot>`)
- Event handlers as properties: `onclick={handler}` (not `on:click`)

## Animation

- `AnimateEntry.svelte` wraps sections with IntersectionObserver scroll-triggered fade-in (translateY + opacity)
- `motion` library (v11) for programmatic animations
- Respects `prefers-reduced-motion`
- Motion tokens: `--motion-enter-duration: 400ms`, `--motion-enter-easing: cubic-bezier(0.01, 0.55, 0.39, 1)`

## Testing

**Unit tests** (`tests/*.test.ts`): Validate design tokens, component order, viewport geometry, font references, asset manifest compliance.

**E2E tests** (`tests/*.spec.ts`): Playwright visual regression across 6 viewports (1920x1080, 1440x900, 1200x900, 1024x768, 810x1080, 390x844). Max diff pixel ratio: 2%. Snapshots stored per-platform (Darwin).

## Visual Parity

This project prioritizes exact visual match with giga.ai. When making changes:
- Check computed styles against `audit/reference/` token files
- Run `npm run audit:parity` to detect layout dimension gaps
- Use `scripts/style-check-target.ts` to compare against live giga.ai
- Visual regression snapshots in `tests/` serve as the baseline
