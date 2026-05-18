# Enterprise Redesign TODO

# AI Agent Agency Homepage Reposition TODO (2026-05-17)

## Plan
- [x] Add regression tests for AI agent positioning and stale-claim removal.
- [x] Verify the new tests fail against the current Pantaa enterprise-support page.
- [x] Rewrite page metadata, navigation, hero, offer blocks, process/proof, CTA, and footer around the autonomous AI agent agency offer.
- [x] Run verification (`npm run check`, `npm test`, `npm run build`) and inspect the responsive page.
- [x] Document results and residual risks in Review.

## Review
- Repositioned the homepage around Pantaa as an AI automation agency that sets up, runs, and monitors autonomous AI employees for legacy service firms.
- Replaced stale enterprise-support copy, product taxonomy, customer spotlight, certification badges, and unsupported customer proof with setup/process/workflow/fit messaging.
- Added `tests/homepage-positioning.test.ts` to enforce AI agent positioning and prevent stale claims such as DoorDash, SOC/ISO badges, old product names, and deflection claims from returning.
- Updated the stale nav hover visual-regression selector from `.nav-signin` to `.nav-cta`.
- Verification passed: focused red test failed first, then `npm test`, `npm run check`, `npm run build`, `git diff --check`, and a Playwright desktop/mobile smoke against `http://127.0.0.1:4173/`.
- Residual note: `npm run check` and `npm run build` still report the pre-existing unused `.hero-grid-overlay` selector warning in `Hero.svelte`.
- Follow-up copy pass: removed tool-specific agent platform language entirely and kept the public offer in plain-language autonomous AI agent / AI employee metaphors.

---

## Plan
- [x] Load project baseline and inspect all page sections/components.
- [x] Attempt requested skill/reference clone: `git clone https://github.com/pinkforest/threejs-playground.git` (failed: repository not found / 404).
- [x] Research enterprise UI and Three.js integration approach using explorer subagents.
- [x] Install Three.js dependency and add a reusable Svelte Three.js hero background component with cleanup + reduced-motion handling.
- [x] Refine global tokens for enterprise tone (calmer palette, stronger trust accents, consistent spacing/motion/focus states).
- [x] Apply enterprise visual pass to key sections (`TopNavDesktop`, `Hero`, `FeatureBlock`, `ProductStack`, `CustomerSpotlight`, `DemoCTA`, `Footer`) and remove brittle fixed heights.
- [x] Run verification (`npm run check`, `npm run test`, `npm run build`).
- [x] Document results and residual risks in Review.

## Review
- Implemented a full enterprise-style visual pass across nav, hero, feature stack, proof section, CTA, and footer with a unified blue-slate token system.
- Added `src/lib/components/HeroThreeBackground.svelte` and integrated it into the hero for a creative Three.js-driven effect with SSR-safe dynamic import, resize observation, reduced-motion behavior, and resource cleanup.
- Added accessibility and UX hardening through consistent focus styles, structured hierarchy, and maintained keyboard-safe mobile menu behavior.
- Verified with `npm run check`, `npm run test`, and `npm run build` (all passing).
- Build note: Vite warns about a large client chunk after adding Three.js (`~725 kB`); functionally correct, but can be optimized later with additional code-splitting if required.

---

# Three.js Redo TODO (2026-02-25)

## Plan
- [x] Replace the initial Three.js hero implementation with a new enterprise-style scene architecture.
- [x] Keep integration minimal by preserving hero section API surface and adjusting only component wiring if needed.
- [x] Validate accessibility/performance basics (reduced motion support, resize handling, deterministic cleanup).
- [x] Run verification (`npm run check`, `npm run test`, `npm run build`).
- [x] Document results and residual risks in Review.

## Review
- Replaced the first Three.js scene with a distinct enterprise-oriented architecture: instanced shader-based data lanes, instanced pulse nodes, an angled line-grid network, and a curved data-spine mesh.
- Kept the hero integration stable (`Hero.svelte` still consumes `HeroThreeBackground` with the same prop shape), so no layout/API churn was introduced.
- Retained operational safeguards: dynamic import, resize observer, reduced-motion mode with static pose rendering, pointer-based parallax smoothing, and deterministic disposal of geometry/material resources.
- Verification passed: `npm run check`, `npm run test`, and `npm run build`.
- Build note remains: a large client chunk warning due to Three.js bundle size (`~725 kB`).

## Hero Background Architecture Proposal (2026-02-25)

- [x] Review the current `HeroThreeBackground` and `Hero` components to understand their structure, props, and integration.
- [x] Clarify enterprise visual/performance goals and constraints for the replacement effect (motion, responsiveness, resource limits).
- [x] Design a new Three.js architecture (scene graph, custom materials, animation logic, optimization strategies) with concrete implementation notes.
- [x] Document necessary `Hero` changes, integration plan, and performance safeguards in the proposal.

## Review (Hero Background Architecture Proposal)
- Explorer proposal completed and used directly for implementation: replaced organic knot/core motif with a data-flow composition and explicit instance-count/pixel-ratio constraints for predictable runtime cost.

---

# Globe Mesh Redo TODO (2026-02-25)

## Plan
- [x] Review current hero background setup, Three.js helpers, and integration points to ensure the new dotted globe can replace them safely.
- [x] Draft the Svelte implementation plan covering scene initialization, dotted landmask generation, hub coordinates, arc line logic, and animation control with resource cleanup.
- [x] Outline performance guardrails (e.g., reduced-motion, manageable vertex counts, efficient animation loop) plus verification steps.
- [x] Run required checks (`npm run check`, `npm run test`, `npm run build`) and document results in Review once code is added.

## Review
- Replaced the previous scene with a globe-focused Three.js background featuring continent-only dotted land points via procedural lat/lon landmask logic.
- Added animated arcing global connections between country hubs and moving pulse travelers along each route.
- Preserved runtime safeguards: dynamic import, reduced-motion static rendering, resize observer updates, pointer smoothing, and deterministic geometry/material disposal.
- Verification passed: `npm run check`, `npm run test`, and `npm run build`.
- Dev server is running; since port `4173` was occupied, Vite served on `http://127.0.0.1:4174/`.
- Polish pass applied after screenshot review: reduced overexposure (dot shader sizing/blending + lower light power), eased arc/traveler brightness, shifted globe away from headline copy, and added viewport-aware masking for cleaner enterprise readability.

---

# Firebase Pantaa Deployment TODO (2026-05-05)

## Plan
- [x] Inspect current SvelteKit build setup and old `/Users/chriskarani/CodingProjects/pantaaa` deployment clues.
- [x] Verify Firebase CLI/auth/project/site state before creating config.
- [x] Configure this repo for production Firebase Hosting with the correct static build output.
- [x] Run checks and a production build before deployment.
- [x] Deploy the new site to the Pantaa Firebase Hosting target.
- [x] Verify the deployed URL/domain and document results in Review.

## Assumptions To Validate
- The new Pantaa site should be deployed from this checkout: `/Users/chriskarani/Websites/opus-giga`.
- Firebase Hosting should serve a static SvelteKit build, so the app needs a static adapter/output directory.
- The old `CodingProjects/pantaaa` folder may reveal the app identity, but the Firebase project/site may need to come from Firebase CLI state because no shallow Firebase config exists there.

## Review
- Deployed this checkout to Firebase Hosting project/site `pantaa-d3d55`.
- Live URL: `https://pantaa-d3d55.web.app`.
- Added Firebase Hosting config via `.firebaserc` and `firebase.json`, publishing SvelteKit static output from `build/`.
- Replaced `@sveltejs/adapter-auto` with `@sveltejs/adapter-static`, prerendering only `/` and using a Firebase fallback rewrite for existing landing-page links such as `/contact`.
- Fixed the favicon path to the existing static asset at `/images/favicon.png`.
- Verification passed: `npm run check` (0 errors, 1 existing unused CSS selector warning in `Hero.svelte`), `npm test` (10/10 passing), `npm run build`, and `firebase deploy --only hosting --project pantaa-d3d55`.
- Live HTTP checks passed for `/`, `/contact`, `/images/favicon.png`, `/pantaa/images/spotlight-doordash.jpg`, `/pantaa/images/spotlight-avatar.webp`, and `/pantaa/videos/voice-experience.mp4`.

---

# Pantaa Asset Performance TODO (2026-05-05)

## Plan
- [x] Measure current live asset sizes and identify first-viewport bottlenecks.
- [x] Generate responsive compressed image variants for the hero and heavy product visuals.
- [x] Wire responsive `<picture>` / `srcset` usage without changing the page design.
- [x] Add a regression test that fails on oversized first-viewport assets.
- [x] Run checks, tests, production build, and live timing comparison.
- [x] Redeploy to Firebase Hosting and document the result.

## Review
- Replaced the first-viewport hero payload path with responsive WebP variants and a compact JPEG fallback.
- Added optimized product visual variants for Agent Canvas, Insights, and Voice poster assets.
- Updated `FeatureBlock` to render responsive `<picture>` sources for image-based visuals.
- Updated Firebase Hosting cache headers so `webp` and `avif` assets receive immutable one-year caching.
- Added `tests/asset-performance.test.ts` to enforce hero, product visual, and fallback image budgets.
- Deployed the optimized site to Firebase Hosting project/site `pantaa-d3d55`.
- Verification passed: `npm test` (13/13), `npm run check` (0 errors, existing unused CSS selector warning in `Hero.svelte`), `npm run build`, and `firebase deploy --only hosting --project pantaa-d3d55`.
- Live result: normal hero rendering now references `/pantaa/images/optimized/hero-bg-*.webp` with `/pantaa/images/optimized/hero-bg-2560.jpg` fallback instead of the 7.1 MB source PNG.
- Size result: hero candidates are now 34 KB, 123 KB, 206 KB, and 325 KB WebP; fallback JPEG is 404 KB.
- Live header result: optimized hero assets return `cache-control: public,max-age=31536000,immutable`.
