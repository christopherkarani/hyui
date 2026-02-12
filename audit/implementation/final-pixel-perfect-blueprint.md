# Final Implementation Blueprint (giga.ai Clone)

Last updated: 2026-02-12T03:57:19Z
Status: Final build blueprint aligned to latest true-state audit

## 1) Build Intent
Translate measured audit output into a deterministic, maintainable frontend implementation that reproduces giga.ai layout and behavior with pixel parity.

## 2) Rendering Architecture
Use semantic section components; do not implement with Framer class names.

Required section tree:
1. `TopNavDesktop` (desktop/tablet only)
2. `Hero`
3. `ProductStack`
4. `CustomerSpotlight`
5. `DemoCTA`
6. `Footer`

Suggested files:
- `src/app.*` or framework page entry
- `src/components/TopNavDesktop.*`
- `src/components/Hero.*`
- `src/components/ProductStack.*`
- `src/components/CustomerSpotlight.*`
- `src/components/DemoCTA.*`
- `src/components/Footer.*`
- `src/styles/tokens.css`
- `src/styles/app.css`

## 3) Token Wiring Blueprint
Token source:
- `audit/reference/tokens.colors.json`
- `audit/reference/tokens.typography.json`
- `audit/reference/tokens.spacing.json`
- `audit/reference/tokens.motion.json`

Wiring rules:
- Convert measured token values to CSS custom properties.
- Scope vars by breakpoint (`desktop`, `tablet`, `mobile`).
- Avoid raw ad-hoc `px/rgb` in components.
- Every non-trivial visual declaration must map to a token or measured contract row.

## 4) Layering and Z-Index Model
Global stack:
- `TopNavDesktop`: fixed overlay, `z-index: 9`.
- Hero root: `position: relative`, `z-index: 3`, `overflow: clip`.
- Hero content group: above hero background layers.
- Footer wrapper: breakpoint variant container; desktop observed sticky behavior in reference capture.

## 5) Hero Blueprint (Including Giant Glob)
Hero section contract:
- Geometry by viewport from final plan.
- Black base surface + full-bleed scenic media + bottom vignette mask.

Giant glob rendering implementation:
1. Background media layer
- `<img>` full-bleed inside hero bounds.
- `object-fit: cover`.
- `object-position`:
  - `50% 50%` desktop/tablet/1024
  - `26.8% 67%` on `390x844`

2. Vignette mask layer
- Absolute layer at hero bottom.
- `background: linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)`.
- `mix-blend-mode: multiply`.
- Geometry per viewport from final plan.

3. Hero content block
- Announcement chip, headline, subheadline, primary CTA.
- Preserve measured text sizes/line-height/letter-spacing per breakpoint.

Mobile top-row behavior:
- Desktop nav container absent.
- Logo + hamburger trigger in hero top row.
- Trigger opens full-screen black overlay menu with close icon and product/company link groups.

## 6) Product Stack Blueprint
Container behavior:
- `display:flex`, `flex-direction:column`, `align-items:center`.
- Gradient background: `linear-gradient(rgb(0, 0, 0) 0%, rgb(15, 14, 13) 8%)`.
- Spacing rhythm:
  - desktop: `gap:160px`
  - tablet: `gap:67px`
  - mobile: `gap:80px`

Subsections in order:
1. KPI strip
2. Agent Canvas feature block
3. Smart Insights feature block
4. Voice Experience feature block

## 7) Spotlight, Demo, Footer Blueprint
Customer Spotlight:
- Light surface (`rgb(254, 252, 251)`).
- Preserve primary card size/position and radius (`6px` desktop, `4px` mobile).

Demo CTA:
- Centered vertical composition with measured padding and `60px` gap.

Footer:
- Implement variant-aware structure for desktop/tablet vs mobile.
- Keep measured section heights and y-offset relationships.

## 8) Layout Feature Lock Blueprint
Desktop lock checks (`1920x1080`):
- `product_stack`: flex column + center align + `gap:160px` + `padding:20px`
- `customer_spotlight`: flex column + `gap:160px` + `padding:100px 20px 40px`
- `demo_cta`: centered flex column + `gap:60px` + `padding:48px 0 0`
- `top_nav_desktop`: fixed at `y=20`, `h=54`, `z-index:9`

Mobile lock checks (`390x844`):
- `product_stack`: `padding:20px 0px 60px`, `gap:80px`
- `customer_spotlight`: `padding:60px 0px 40px`, `gap:160px`
- `demo_cta`: `padding:0px 20px`, `gap:60px`
- `kpi_strip`: `padding:0px 20px`
- Menu overlay opens to full-screen black panel on hamburger trigger

## 9) Interaction Blueprint
Preserve:
- Global link transition signature
- CTA hover/focus/active deltas
- Sign-in hover/focus deltas
- Focus outline behavior where measured

State matrix to implement and snapshot:
- default
- hover
- focus-visible
- active
- menu-open (`390`)

## 10) Validation Blueprint
Tooling flow:
1. Start app locally.
2. Capture six viewport screenshots (full page + sections).
3. Run strict diff against reference screenshots.
4. Produce geometry delta table (x/y/w/h).
5. Produce typography/color/state delta tables.
6. Block merge until thresholds pass or residuals are documented.

Required viewport set:
- `1920x1080`
- `1440x900`
- `1200x900`
- `1024x768`
- `810x1080`
- `390x844`

## 11) Experiment Asset Policy
Experiment mode:
- Use upstream assets/fonts for fidelity in this repository.

If promoted beyond experiment:
- Replace or license proprietary assets/fonts.

## 12) Implementation Guardrails
- No visual “approximation” where measured values exist.
- No untracked spacing overrides.
- Keep semantic HTML and accessibility intact while matching visuals.
- Keep a direct mapping between implemented rules and measured contracts.
