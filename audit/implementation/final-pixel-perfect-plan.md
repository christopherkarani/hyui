# Final Pixel-Perfect Plan (giga.ai Clone)

Last updated: 2026-02-12T03:57:19Z (2026-02-12T06:57:19+0300 EAT)
Status: Final consolidated plan from latest true-state captures

## 1) Objective
Recreate https://giga.ai with pixel parity in this repository using measured values from audited captures.

Fidelity order:
1. Layout geometry
2. Typography
3. Color/contrast
4. Spacing rhythm
5. Motion/interaction
6. Asset rendering details

Acceptance thresholds:
- Desktop geometry: ±1px
- Mobile geometry: ±2px
- Spacing parity gate: any spacing/padding delta > 0.5px is failure

## 2) Source of Truth
- `audit/reference/capture-status.json`
- `audit/reference/re-review-summary.json`
- `audit/reference/layout-map.json`
- `audit/reference/breakpoints.json`
- `audit/reference/tokens.colors.json`
- `audit/reference/tokens.typography.json`
- `audit/reference/tokens.spacing.json`
- `audit/reference/tokens.motion.json`
- `audit/reference/assets-manifest.json`
- `audit/local/gap-matrix.json`
- `audit/reference/raw/true-state-capture-2026-02-12-0657EAT.md`

## 3) Capture Confidence (Final)
| Viewport | Header Nav | Mobile Overlay | Status |
| --- | --- | --- | --- |
| `vp-1920x1080` | `true_state` | `not_applicable` | final |
| `vp-1440x900` | `true_state` | `not_applicable` | final |
| `vp-1200x900` | `true_state` | `not_applicable` | final |
| `vp-1024x768` | `true_state` | `not_applicable` | final (upgraded this pass) |
| `vp-810x1080` | `true_state` | `not_applicable_confirmed_no_trigger` | final |
| `vp-390x844` | `true_state_partial_logo_plus_topclip` | `true_state_opened_via_coordinate_click` | final |

## 4) Breakpoints
- Desktop: `min-width: 1200px`
- Tablet: `min-width: 810px and max-width: 1199.98px`
- Mobile: `max-width: 809.98px`

## 5) Section Geometry Contract
| Section | 1920x1080 | 1440x900 | 1200x900 | 1024x768 | 810x1080 | 390x844 |
| --- | --- | --- | --- | --- | --- | --- |
| Hero | `0,0,1920x1080` | `0,0,1440x900` | `0,0,1200x900` | `0,0,1024x800` | `0,0,810x1080` | `0,0,390x1000` |
| Product Stack | `0,1080,1920x3693.8` | `0,900,1440x3693.8` | `0,900,1200x3693.8` | `0,800,1024x3331` | `0,1080,810x3334` | `0,1000,390x5719` |
| Customer Spotlight | `0,4773.8,1920x954.8` | `0,4593.8,1440x954.8` | `0,4593.8,1200x954.8` | `0,4131,1024x954.8` | `0,4414,810x1015.8` | `0,6719,390x1350.8` |
| Demo CTA | `0,5728.59,1920x403` | `0,5548.59,1440x403` | `0,5548.59,1200x403` | `0,5085.8,1024x424` | `0,5429.8,810x445` | `0,8069.8,390x486` |
| Footer | `0,6131.59,1920x740` | `0,5951.59,1440x740` | `0,5951.59,1200x740` | `0,5509.8,1024x740` | `0,5874.8,810x740` | `0,8555.8,390x1010` |

## 6) Key Component Geometry Contract
| Component | Desktop (1920) | Mobile (390) |
| --- | --- | --- |
| Hero announcement chip | `838.55,355.2,242.91x28` | `73.55,142,242.91x28` |
| Hero primary CTA | `908.34,684.8,103.33x42` | `143.34,495.19,103.33x42` |
| Top nav container | `0,20,1920x54` | absent |
| KPI strip | `160,1100,1600x200` | `0,1020,390x381` |
| Agent Canvas CTA | `184,1864.8,177.96x38` | `40,2296,177.96x38` |
| Insights CTA | `1239.92,3093.8,180.18x38` | `40,4217,137.06x38` |
| Voice CTA | `184,4265.8,200.66x38` | `40,6108,200.66x38` |
| Spotlight primary card | `184,5112.59,824.73x552` | `30,7035,330x336` |

## 7) Giant Glob Rendering Contract (Hero)
Definition in this plan:
- The “giant glob” look is produced by full-bleed hero image + bottom multiply vignette mask, not a separate circular element.

Layer 1: Hero image
- Selector: `#main > div.framer-vTKWY > .framer-1ug9l4m img`
- `object-fit: cover` all viewports
- `object-position`:
  - `50% 50%`: `vp-1920x1080`, `vp-1440x900`, `vp-1200x900`, `vp-1024x768`, `vp-810x1080`
  - `26.8% 67%`: `vp-390x844`

Layer 2: Vignette mask
- Selector pattern: hero child with `background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)`
- Required: `mix-blend-mode: multiply`, `position: absolute`, `opacity: 1`
- Geometry:
  - `vp-1920x1080`: `0,810,1920x270`
  - `vp-1440x900`: `0,675,1440x225`
  - `vp-1200x900`: `0,675,1200x225`
  - `vp-1024x768`: `0,600,1024x200`
  - `vp-810x1080`: `0,810,810x270`
  - `vp-390x844`: `0,640,390x360`

## 8) Spacing and Padding Lock
Mandatory exact values:
- `product_stack`:
  - desktop: `padding: 20px`, `gap: 160px`
  - tablet: `padding: 20px`, `gap: 67px`
  - mobile: `padding: 20px 0px 60px`, `gap: 80px`
- `customer_spotlight`:
  - desktop/tablet: `padding: 100px 20px 40px`, `gap: 160px`
  - mobile: `padding: 60px 0px 40px`, `gap: 160px`
- `demo_cta`:
  - desktop/tablet: `padding: 48px 0px 0px`, `gap: 60px`
  - mobile: `padding: 0px 20px`, `gap: 60px`
- `kpi_strip` (mobile): `padding: 0px 20px`

Rule:
- No shorthand normalization drift. Preserve measured strings.

## 9) Layout Feature Lock
Desktop (`vp-1920x1080`) must match:
- `product_stack`: `display:flex`, `flex-direction:column`, `justify-content:flex-start`, `align-items:center`
- `top_nav_desktop`: `position:fixed`, `z-index:9`, `y=20`, `h=54`
- `spotlight_primary_card` radius: `6px`

Mobile (`vp-390x844`) must match:
- `top_nav_desktop`: absent
- Hero top row: logo + hamburger trigger
- Hamburger opens full-screen black overlay menu with close icon
- `spotlight_primary_card` radius: `4px`

## 10) Typography, Color, Motion
Use token files as implementation contract:
- Typography: `audit/reference/tokens.typography.json`
- Color: `audit/reference/tokens.colors.json`
- Spacing: `audit/reference/tokens.spacing.json`
- Motion: `audit/reference/tokens.motion.json`

Critical motion/state requirements:
- Entry animation: `400ms`, `cubic-bezier(0.01, 0.55, 0.39, 1)`, stagger variants
- Link transition: `color 0.3s cubic-bezier(0.44, 0, 0.56, 1)`
- CTA/nav state deltas from tokens must match

## 11) Asset Policy
Experiment mode (approved by user):
- Upstream assets and fonts can be used in this repository for parity testing.

Production hardening (deferred):
- Replace proprietary assets/fonts or secure license rights.

## 12) Greenfield Execution Plan
Current blocker:
- No runnable app scaffold (`npm run dev` missing).

Commit sequence:
1. `feat: scaffold app runtime and token pipeline`
2. `feat: implement hero geometry + giant glob rendering + nav variants`
3. `feat: implement product stack shell and KPI strip`
4. `feat: implement agent canvas block`
5. `feat: implement insights block`
6. `feat: implement voice experience block`
7. `feat: implement customer spotlight`
8. `feat: implement demo cta and footer variants`
9. `feat: interaction and motion parity`
10. `test: screenshot diff harness for six viewports and interaction states`
11. `chore: residual mismatch report with exact deltas`

## 13) Validation Workflow
Per major commit:
1. Capture local full-page + section screenshots at all six viewports.
2. Compare with `audit/reference/screenshots/vp-*/`.
3. Compute geometry deltas for sections/components.
4. Compute typography and color deltas for key selectors/states.
5. Run interaction-state checks (hover/focus/active; menu overlay states).
6. Fail build on threshold breach.

## 14) Done Criteria
- [ ] App scaffold runs locally
- [ ] Section geometry within threshold at all viewports
- [ ] Giant glob rendering matched at all viewports
- [ ] Typography/color/spacing/motion contracts matched
- [ ] Layout feature lock passed (display/flex/align/gap/padding/z-index/radius)
- [ ] Mobile overlay behavior matched (`390`) and absent where not applicable (`810`, `1024+`)
- [ ] Residual mismatch report complete with quantified deltas
