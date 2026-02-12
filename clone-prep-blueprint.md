# 1. Executive summary

Superseded by: `audit/implementation/final-pixel-perfect-blueprint.md` (authoritative final blueprint)
- Target audited with Playwright at required viewports: `1920x1080`, `1440x900`, `1200x900`, `1024x768`, `810x1080`, `390x844`.
- Evidence captured: full-page screenshots, per-section screenshots (desktop + mobile), computed style snapshots, animation/timing extraction, network asset capture.
- Required token/manifests generated:
  - `design-tokens.colors.json`
  - `design-tokens.typography.json`
  - `design-tokens.spacing.json`
  - `design-tokens.effects.json`
  - `design-tokens.motion.json`
  - `breakpoints.json`
  - `component-map.json`
  - `assets-manifest.json`
- No implementation code was written.

# 2. Section-by-section style blueprint
## Hero (`#main > div.framer-vTKWY > .framer-1ug9l4m`)
- Background: black base with scenic image + bottom vignette.
- Typography: Emilio Light display headline, white; Inter white subhead; pill CTA.
- Desktop size: `1920x1080`; mobile size: `390x1000`.
- Giant glob rendering rule:
  - Implement as full-bleed hero image + bottom multiply vignette mask (not a separate circle layer).
  - Mobile crop uses `object-position: 26.8% 67%`; desktop/tablet use `50% 50%`.
- Key components:
  - Announcement chip: `a[href="./browser-agent"]`
  - Primary CTA: `#button-1 a[href="./contact"]`

## Product stack (`#main > div.framer-vTKWY > .framer-1xxmgs4`)
- Background: `linear-gradient(rgb(0, 0, 0) 0%, rgb(15, 14, 13) 8%)`.
- Layout: vertical flex stack with large gaps; dark glass cards.
- Modules in order:
  - KPI strip
  - Custom Agents / Agent Canvas
  - Smart Suggestions / Smart Insights
  - Natural Voice / Voice Experience

## Customer spotlight (`#main > div.framer-vTKWY > .framer-107a8lb`)
- Background: light surface `rgb(254, 252, 251)`.
- Two-column testimonial card with dominant orange media block (`rgb(254, 44, 2)`) and quote content.

## Demo CTA (`#main > div.framer-vTKWY > .framer-kuopsy`)
- Background: light surface.
- Eyebrow + short supporting copy + CTA button.

## Nav/footer behavior
- Desktop/tablet: fixed top nav (`.framer-xujnb7-container`) present.
- Mobile: desktop nav container absent; hero top row shows logo + hamburger trigger, and a full-screen black overlay menu opens on trigger click.
- Footer rendered through SSR variants; desktop and mobile differ by variant classes.

# 3. Complete token tables with exact values
- Full exact token tables are in:
  - `design-tokens.colors.json`
  - `design-tokens.typography.json`
  - `design-tokens.spacing.json`
  - `design-tokens.effects.json`
  - `design-tokens.motion.json`
- Breakpoint tables are in `breakpoints.json`.
- Section/component metrics are in `component-map.json`.

# 4. Breakpoint behavior map
- Canonical breakpoints (from `#__framer__breakpoints`):
  - Desktop: `(min-width: 1200px)`
  - Tablet: `(min-width: 810px) and (max-width: 1199.98px)`
  - Mobile: `(max-width: 809.98px)`
- Structural changes:
  - Desktop -> tablet: product-stack gap drops from `160px` to `67px`.
  - Tablet -> mobile: product-stack grows vertically (`3334px` -> `5719px` at sampled viewports), horizontal padding collapses, CTA and spotlight heights increase.
  - Mobile removes fixed desktop nav container and replaces it with a hamburger-triggered overlay menu; tablet keeps desktop/tablet nav.

# 5. Interaction/motion spec
- Entry animation system:
  - Duration: `400ms`
  - Easing: `cubic-bezier(0.01, 0.55, 0.39, 1)`
  - Fill: `both`
  - Delays observed: `0ms`, `50ms`, `100ms`, `1000ms`
- Link transition signature:
  - `transition-property: color`
  - `transition-duration: 0.3s`
  - `transition-timing-function: cubic-bezier(0.44, 0, 0.56, 1)`
- CTA state deltas:
  - Explore buttons:
    - Agent Canvas / Voice Experience: `rgba(255,255,255,0.05)` -> `rgba(255,255,255,0.098)` hover -> `rgba(255,255,255,0.1)` focus.
    - Smart Insights: `rgba(255,255,255,0.05)` -> `rgba(255,255,255,0.094)` hover -> `rgba(255,255,255,0.094)` focus.
  - Contact button: `rgb(255,255,255)` -> `rgba(50,50,50,0.616)` hover -> `rgba(0,0,0,0.592)` focus.
  - Nav sign-in: transparent -> `rgba(0,0,0,0.286)` hover -> `rgba(0,0,0,0.306)` focus.
  - Focus ring appears as browser outline (`outline: auto 1px`).

# 6. Asset/licensing notes
- Manifest: `assets-manifest.json`.
- Proprietary/high-risk assets:
  - Framer-hosted brand media and videos on `framerusercontent.com`.
  - Trial/commercial font families (`Emilio*`, `Giga Sans*`).
- Experimental-mode context:
  - User approved experimentation-only use of upstream assets/fonts in this repository.
- Production hardening guidance (deferred for experiment):
  - Replace proprietary fonts with licensed/open alternatives before shipping.
  - Rebuild SVG/icon vectors from scratch.
  - Exclude imported trackers/analytics from clone baseline.

# 7. Clone implementation plan (no coding yet)
## Recommended build order
1. Global shell (app frame + section scaffolding + viewport switching).
2. Hero section (background composition + fit text + top row variants).
3. Product stack skeleton (KPI strip + 3 showcase panels).
4. Spotlight section.
5. Demo CTA section.
6. Footer variants.
7. Motion and interaction states.
8. Final pixel-parity pass.

## Suggested file/folder architecture
- `src/routes/+page.svelte` (or framework equivalent)
- `src/lib/sections/Hero.*`
- `src/lib/sections/ProductStack.*`
- `src/lib/sections/Spotlight.*`
- `src/lib/sections/DemoCTA.*`
- `src/lib/sections/Footer.*`
- `src/lib/components/{PillButton,MetricCard,GlassPanel,...}`
- `src/lib/styles/tokens/*.json` (directly from generated token files)
- `src/lib/styles/foundation.css` (token -> CSS custom properties)

## CSS/token architecture recommendation
- Keep raw measured values in JSON token files.
- Compile JSON tokens to CSS custom properties per breakpoint.
- Separate semantic tokens from component tokens.
- Keep motion tokens centralized; avoid inline hard-coded easing/durations.
- Enforce spacing/padding lock: no shorthand normalization drift; any spacing delta over `0.5px` is a parity failure.

## Risk list and unknowns
- Framer class names are obfuscated and unstable; clone must use semantic component names.
- Some computed link colors show UA defaults; explicit link state normalization is required.
- Footer/nav SSR variants require careful conditional rendering by breakpoint.
- Hero fit-text behavior relies on dynamic scaling (not static font-size only).

## Licensing constraints
- Experiment run: direct upstream asset/font usage is allowed by user approval.
- If shipping later: replace proprietary assets/fonts or obtain explicit license rights.

## Effort estimate (implementation phase)
- Hero: `1.5-2.5 days`
- Product stack: `3-5 days`
- Spotlight: `1-1.5 days`
- Demo CTA + footer variants: `1-1.5 days`
- Motion/state parity + polish: `1-2 days`
- Total: `7.5-12.5 engineering days` for one engineer.

## Test/validation strategy for pixel parity
- Screenshot diff tests at all required viewports with strict thresholds.
- Section-level visual snapshots and per-component snapshots.
- Computed-style assertions for key selectors/tokens.
- Interaction snapshots for hover/focus states.
- Asset audit checks for missing references and production-hardening follow-ups.

## Delta audit vs local implementation
| Expected | Actual | Delta | Severity | Fix recommendation |
|---|---|---|---|---|
| Existing local clone implementation available for comparison | No app files found in repo (only generated audit artifacts) | Cannot compute UI diffs | High (blocked) | Implement baseline clone shell first, then re-run automated delta audit against target |

# 8. Open questions/blockers
- Confirm whether clone should include third-party embeds (YouTube, trust badges) or mocked equivalents.
- Confirm framework target and rendering strategy (SvelteKit/Next/etc.) before implementation.
