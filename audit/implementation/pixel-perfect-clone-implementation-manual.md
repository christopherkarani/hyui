# Pixel-Perfect Clone Implementation Manual (giga.ai)

Superseded by: `audit/implementation/final-pixel-perfect-plan.md` (authoritative final plan)

Generated: 2026-02-12T03:33:27Z (Africa/Nairobi)
Reference URL: https://giga.ai

## 1) Objective and Acceptance Criteria
- Build a pixel-accurate clone of giga.ai in this greenfield repository.
- Priority order: layout geometry, typography, color/contrast, spacing rhythm, motion/interaction, asset rendering details.
- Acceptance thresholds: desktop geometry ±1px, mobile geometry ±2px.
- All residual diffs must be quantified and explained.

## 2) Re-Review Final Run-Through (Quality Corrections Applied)
Re-review summary artifact: `audit/reference/re-review-summary.json`

- Fixed mobile nav expectation mismatch in gap matrix (vp-390x844).
- Normalized gap matrix viewport keys to vp-WIDTHxHEIGHT.
- Added numeric delta semantics for typography/color rows.
- Downgraded unresolved/ambiguous token selectors and added disambiguation metadata.
- Added capture quality classification (true_state vs fallback).
- Final true-state recapture executed at `2026-02-12T03:33:27Z`:
  - `vp-390x844`: mobile overlay confirmed open (true state) via deterministic click; close icon confirmed.
  - `vp-810x1080`: desktop/tablet nav confirmed; mobile overlay confirmed not applicable.

Remaining limits:
- Some Framer-generated selectors remain volatile; implementation should prefer semantic selectors in clone.
- `vp-390x844` menu trigger is not exposed as an accessible button and required coordinate click for deterministic capture.

## 3) Source-of-Truth Artifacts
- `audit/reference/tokens.colors.json`
- `audit/reference/tokens.typography.json`
- `audit/reference/tokens.spacing.json`
- `audit/reference/tokens.motion.json`
- `audit/reference/layout-map.json`
- `audit/reference/breakpoints.json`
- `audit/reference/assets-manifest.json`
- `audit/reference/capture-status.json`
- `audit/reference/raw/true-state-capture-2026-02-12-0633EAT.md`
- `audit/local/gap-matrix.json`
- `audit/local/capture-status.json`

## 4) Current Local Blockers (Greenfield Reality)
- Local app runnable: false
- Block reason: No local runnable app found in greenfield repository
- Commands attempted:
  - `npm run dev` -> exit 1; npm error Missing script: "dev"
  - `npm run` -> exit 0; No scripts returned

## 5) Breakpoints and Responsive Contract
| Name | Min Width | Max Width |
| --- | --- | --- |
| desktop | 1200 | none |
| tablet | 810 | 1199.98 |
| mobile | 0 | 809.98 |

Framer hash map:
- 119qab9: (min-width: 1200px)
- grp9jf: (min-width: 810px) and (max-width: 1199.98px)
- 4i2zcu: (max-width: 809.98px)

Viewport metrics (implementation baseline):
| Viewport | Hero (w x h) | Product Stack Height | Product Stack Padding | Product Stack Gap | Spotlight Height | Demo CTA Height | Top Nav |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1920x1080 | 1920x1080 | 3693.8 | 20px | 160px | 954.8 | 403 | true |
| 1440x900 | 1440x900 | 3693.8 | 20px | 160px | 954.8 | 403 | true |
| 1200x900 | 1200x900 | 3693.8 | 20px | 160px | 954.8 | 403 | true |
| 1024x768 | 1024x800 | 3331 | 20px | 67px | 954.8 | 424 | true |
| 810x1080 | 810x1080 | 3334 | 20px | 67px | 1015.8 | 445 | true |
| 390x844 | 390x1000 | 5719 | 20px 0px 60px 0px | 80px | 1350.8 | 486 | false (desktop nav absent; logo + hamburger trigger in hero; overlay available) |

Precision note:
- Geometry values in this manual are normalized to match `audit/local/gap-matrix.json` expected values used for implementation tracking.
- Raw capture precision remains available in `audit/reference/breakpoints.json`.

Behavior map:
- Desktop (>=1200): hero scales with viewport height; product stack uses wide 160px vertical rhythm.
- Tablet (810-1199.98): section widths collapse; product gap drops to 67px; hero text shifts to compact scale.
- Mobile (<=809.98): nav container variant is removed; hero top row shows logo + hamburger trigger; click opens full-screen black overlay menu. Product stack becomes single-column with 80px spacing and zero horizontal padding; spotlight and CTA gain mobile-specific heights/padding.

## 6) Section Geometry Matrix (Exact Targets)
| Section | Viewport | X | Y | Width | Height | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| hero | 1920x1080 | 0 | 0 | 1920 | 1080 |  |
| hero | 1440x900 | 0 | 0 | 1440 | 900 |  |
| hero | 1200x900 | 0 | 0 | 1200 | 900 |  |
| hero | 1024x768 | 0 | 0 | 1024 | 800 |  |
| hero | 810x1080 | 0 | 0 | 810 | 1080 |  |
| hero | 390x844 | 0 | 0 | 390 | 1000 |  |
| product_stack | 1920x1080 | 0 | 1080 | 1920 | 3693.8 |  |
| product_stack | 1440x900 | 0 | 900 | 1440 | 3693.8 |  |
| product_stack | 1200x900 | 0 | 900 | 1200 | 3693.8 |  |
| product_stack | 1024x768 | 0 | 800 | 1024 | 3331 |  |
| product_stack | 810x1080 | 0 | 1080 | 810 | 3334 |  |
| product_stack | 390x844 | 0 | 1000 | 390 | 5719 |  |
| customer_spotlight | 1920x1080 | 0 | 4773.8 | 1920 | 954.8 |  |
| customer_spotlight | 1440x900 | 0 | 4593.8 | 1440 | 954.8 |  |
| customer_spotlight | 1200x900 | 0 | 4593.8 | 1200 | 954.8 |  |
| customer_spotlight | 1024x768 | 0 | 4131 | 1024 | 954.8 |  |
| customer_spotlight | 810x1080 | 0 | 4414 | 810 | 1015.8 |  |
| customer_spotlight | 390x844 | 0 | 6719 | 390 | 1350.8 |  |
| top_nav_overlay_desktop | 1920x1080 | 0 | 20 | 1920 | 54 | present=true |
| top_nav_overlay_desktop | 1440x900 | 0 | 20 | 1440 | 54 | present=true |
| top_nav_overlay_desktop | 1200x900 | 0 | 20 | 1200 | 54 | present=true |
| top_nav_overlay_desktop | 1024x768 | 0 | 20 | 1024 | 54 | present=true |
| top_nav_overlay_desktop | 810x1080 | 0 | 20 | 810 | 54 | present=true |
| top_nav_overlay_desktop | 390x844 | absent | absent | absent | absent | present=false |
| demo_cta | 1920x1080 | 0 | 5728.59 | 1920 | 403 |  |
| demo_cta | 1440x900 | 0 | 5548.59 | 1440 | 403 |  |
| demo_cta | 1200x900 | 0 | 5548.59 | 1200 | 403 |  |
| demo_cta | 1024x768 | 0 | 5085.8 | 1024 | 424 |  |
| demo_cta | 810x1080 | 0 | 5429.8 | 810 | 445 |  |
| demo_cta | 390x844 | 0 | 8069.8 | 390 | 486 |  |
| footer | 1920x1080 | 0 | 6131.59 | 1920 | 740 |  |
| footer | 1440x900 | 0 | 5951.59 | 1440 | 740 |  |
| footer | 1200x900 | 0 | 5951.59 | 1200 | 740 |  |
| footer | 1024x768 | 0 | 5509.8 | 1024 | 740 |  |
| footer | 810x1080 | 0 | 5874.8 | 810 | 740 |  |
| footer | 390x844 | 0 | 8555.8 | 390 | 1010 |  |

## 7) Component Geometry Matrix (Exact Targets)
| Component | Selector | Desktop 1920 (x,y,wxh) | Mobile 390 (x,y,wxh|state) |
| --- | --- | --- | --- |
| hero_background_layer | `#main > div.framer-vTKWY > .framer-1ug9l4m img` | 0,0,1920x1080 (object-fit: cover; object-position: 50% 50%) | 0,0,390x1000 (object-fit: cover; object-position: 26.8% 67%) |
| hero_giant_glob_vignette_mask | `#main > div.framer-vTKWY > .framer-1ug9l4m .framer-v2au5a` | 0,810,1920x270 (mix-blend-mode: multiply; gradient mask) | 0,640,390x360 (mix-blend-mode: multiply; gradient mask) |
| hero_announcement_chip | a[href="./browser-agent"] | 838.55,355.2,242.91x28 | 73.55,142,242.91x28 |
| hero_primary_cta | #button-1 a[href="./contact"] | 908.34,684.8,103.33x42 | 143.34,495.19,103.33x42 |
| top_nav_desktop | #main > div.framer-vTKWY > .framer-xujnb7-container | 0,20,1920x54 | absent |
| kpi_strip | #main > div.framer-vTKWY > .framer-1xxmgs4 > div.framer-1iialbr | 160,1100,1600x200 | 0,1020,390x381 |
| agent_canvas_cta | a[href="./agent-canvas"] | 184,1864.8,177.96x38 | 40,2296,177.96x38 |
| insights_cta | a[href="./insights"] | 1239.92,3093.8,180.18x38 | 40,4217,137.06x38 |
| voice_cta | a[href="./voice-experience"] | 184,4265.8,200.66x38 | 40,6108,200.66x38 |
| spotlight_primary_card | a[href="./doordash"] | 184,5112.59,824.73x552 | 30,7035,330x336 |

## 8) Capture Evidence Quality by Viewport
| Viewport | Full Page | Sections Captured | Sections Total | Header Nav Capture | Mobile Menu Overlay Capture |
| --- | --- | --- | --- | --- | --- |
| vp-1920x1080 | true | 10 | 10 | true_state | not_applicable |
| vp-1440x900 | true | 10 | 10 | true_state | not_applicable |
| vp-1200x900 | true | 10 | 10 | true_state | not_applicable |
| vp-1024x768 | true | 10 | 10 | true_state | not_applicable |
| vp-810x1080 | true | 10 | 10 | true_state | not_applicable_confirmed_no_trigger |
| vp-390x844 | true | 10 | 10 | true_state_partial_logo_plus_topclip | true_state_opened_via_coordinate_click |

Capture-quality definitions:
- true_state = target element-state explicitly located before capture.
- fallback_top_slice = viewport crop used when explicit trigger/selector was not stable.
- true_state_opened_via_coordinate_click = overlay state confirmed and captured after deterministic top-right click in viewport.
- not_applicable_confirmed_no_trigger = overlay pattern does not exist for that breakpoint/state.

## 9) Color Token Contract
Rules:
- Any token with `confidence=medium` must be re-verified before final acceptance signoff.
- State-based tokens must be implemented with explicit pseudo-state styles.

| Token | Value | Selector | State | Match Text | Viewport | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| text.primary.dark | rgb(255, 255, 255) | [data-framer-name="Hero"] h1 | - | - | vp-1920x1080 | high |
| text.primary.light | rgb(0, 0, 0) | #main > div.framer-vTKWY > .framer-107a8lb | - | - | vp-1920x1080 | high |
| text.muted.dark.50 | rgba(255, 255, 255, 0.5) | [data-framer-name="Voice Experience"] | - | - | vp-1920x1080 | high |
| text.muted.dark.61 | rgba(255, 255, 255, 0.61) | [data-framer-name="Insights"] | - | - | vp-1920x1080 | high |
| text.muted.dark.87 | rgba(255, 255, 255, 0.87) | [data-framer-name="Agent Canvas"] | - | - | vp-1920x1080 | high |
| text.muted.light.50 | rgba(0, 0, 0, 0.5) | #main > div.framer-vTKWY > .framer-107a8lb | - | - | vp-1920x1080 | high |
| text.muted.light.60 | rgba(0, 0, 0, 0.6) | #main > div.framer-vTKWY > .framer-kuopsy | - | - | vp-1920x1080 | high |
| text.muted.light.30 | rgba(0, 0, 0, 0.3) | #main > div.framer-vTKWY > .framer-1j0lk2w-container | - | - | vp-1920x1080 | high |
| text.success | rgb(73, 222, 128) | [data-framer-name="Available-2"] | - | - | vp-1920x1080 | high |
| text.info | rgb(33, 149, 255) | p.framer-text | - | Policy Modification | vp-1920x1080 | medium |
| text.warning | rgb(246, 182, 21) | p.framer-text | - | Knowledge Gap | vp-1920x1080 | medium |
| text.subtle.gray | rgb(138, 143, 152) | [data-framer-name="Voice Experience"] | - | - | vp-390x844 | high |
| text.subtle.gray2 | rgb(150, 150, 150) | [data-framer-name="Insights"] | - | - | vp-390x844 | high |
| bg.hero | rgb(0, 0, 0) | [data-framer-name="Hero"] | - | - | vp-1920x1080 | high |
| bg.canvas.dark | rgb(15, 14, 13) | #main > div.framer-vTKWY > .framer-1xxmgs4 | - | - | vp-1920x1080 | high |
| bg.surface.light | rgb(254, 252, 251) | #main > div.framer-vTKWY > .framer-107a8lb | - | - | vp-1920x1080 | high |
| bg.surface.white | rgb(255, 255, 255) | [data-framer-name="Main CTA"] | - | - | vp-1920x1080 | high |
| bg.glass.white.05 | rgba(255, 255, 255, 0.05) | a[href="./agent-canvas"] | - | - | vp-1920x1080 | high |
| bg.glass.white.07 | rgba(255, 255, 255, 0.07) | [data-framer-name="Voice Experience"] | - | - | vp-1920x1080 | high |
| bg.glass.white.10 | rgba(255, 255, 255, 0.1) | a[href="./insights"] | hover | - | vp-1920x1080 | medium |
| bg.glass.black.20 | rgba(0, 0, 0, 0.2) | [data-framer-name="Hero"] [data-framer-name="Desktop"] | - | - | vp-1920x1080 | high |
| bg.brand.orange | rgb(254, 44, 2) | a[href="./doordash"] | - | - | vp-1920x1080 | high |
| bg.trust.green.50 | rgba(185, 248, 209, 0.5) | a[href="https://trust.giga.ai/"] | - | - | vp-1920x1080 | high |
| gradient.page.darkToNearBlack | linear-gradient(rgb(0, 0, 0) 0%, rgb(15, 14, 13) 8%) | #main > div.framer-vTKWY > .framer-1xxmgs4 | - | - | vp-1920x1080 | high |
| gradient.hero.vignette | linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%) | [data-framer-name="Degrade / Mask"] | - | - | vp-1920x1080 | high |

## 10) Typography Contract
Font families (from reference):
- font.display.hero: "Emilio Light", "Emilio Light Placeholder", sans-serif
- font.display.product: "Giga Sans Display Trial 400", "Giga Sans Display Trial 400 Placeholder", sans-serif
- font.display.product.medium: "Giga Sans Display Trial 500", sans-serif
- font.sans: Inter, "Inter Placeholder", sans-serif
- font.sans.gigaText.400: "Giga Sans Text Trial 400", "Giga Sans Text Trial 400 Placeholder", sans-serif
- font.sans.gigaText.500: "Giga Sans Text Trial 500", "Giga Sans Text Trial 500 Placeholder", sans-serif
- font.sans.display: "Inter Display", "Inter Display Placeholder", sans-serif
- font.mono: "Geist Mono", monospace

Typography tokens:
| Token | Family Ref | Size | Weight | Line Height | Letter Spacing | Transform | Selector | Match Text | Viewport | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| type.hero.headline.desktop | font.display.hero | 81.6669px | 300 | 98.0003px | -2.45001px | none | [data-framer-name="Hero"] h1 | - | vp-1920x1080 | high |
| type.hero.headline.tablet | font.display.hero | 48.8454px | 300 | 58.6145px | -1.46536px | none | [data-framer-name="Hero"] h1 | - | vp-810x1080 | high |
| type.hero.headline.mobile | font.display.hero | 44px | 300 | 52.8px | -1.32px | none | [data-framer-name="Hero"] h1 | - | vp-390x844 | high |
| type.section.title.desktop | font.display.hero | 48px | 400 | 62.4px | -0.96px | none | [data-framer-name="Agent Canvas"] [data-framer-name="text"] | Built to handle complexity | vp-1920x1080 | medium |
| type.section.title.compact | font.display.hero | 40px | 400 | 52px | -0.8px | none | [data-framer-name="Agent Canvas"] [data-framer-name="text"] | Built to handle complexity | vp-390x844 | medium |
| type.kpi.metric | font.sans | 44px | 400 | 44px | -1.32px | none | #main > div.framer-vTKWY > .framer-1xxmgs4 > div.framer-1iialbr | - | vp-1920x1080 | high |
| type.body.lg | font.sans | 16px | 400 | 28px | normal | none | [data-framer-name="Hero"] h2 | - | vp-1920x1080 | high |
| type.body.md | font.sans | 14px | 400 | 24px | normal | none | [data-framer-name="Agent Canvas"] [data-framer-name="Feature item"] | Fine-tune every nuance to match your business | vp-1920x1080 | medium |
| type.body.sm | font.sans | 13px | 400 | 20px | normal | none | [data-framer-name="Insights"] [data-framer-name="Feature item"] | Designed to help you hit KPIs | vp-1920x1080 | medium |
| type.button.md | font.sans | 14px | 400 | 24px | normal | none | [data-framer-name="Main CTA"] | - | vp-1920x1080 | high |
| type.eyebrow | font.mono | 11px | 400 | 24px | 0.1px | uppercase | [data-framer-name="Agent Canvas"] [data-framer-name="text"] | CUSTOM AGENTS | vp-1920x1080 | medium |
| type.mono.meta | font.mono | 12px | 400 | 24px | normal | none | [data-framer-name="Voice Experience"] [data-framer-name="text"] | NATURAL VOICE | vp-1920x1080 | medium |

Responsive type notes:
- hero_headline:
  - 1920x1080: 24.1807px base with fit-text expansion to 81.6669px spans
  - 1440x900: 24.1807px base with fit-text expansion
  - 1200x900: 24.1807px base with fit-text expansion
  - 1024x768: 48.8454px
  - 810x1080: 48.8454px
  - 390x844: 44px
- custom_agents_title:
  - 1920x1080: 48px
  - 1440x900: 48px
  - 1200x900: 48px
  - 1024x768: 40px
  - 810x1080: 40px
  - 390x844: 40px

## 11) Spacing Contract
| Token | Value | Selector | Viewport | Confidence |
| --- | --- | --- | --- | --- |
| space.0 | 0px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.3 | 12px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.4 | 16px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.5 | 20px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.6 | 24px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.10 | 40px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.12 | 48px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.15 | 60px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.17 | 67px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.20 | 80px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.25 | 100px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| space.40 | 160px | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-1920x1080 | high |
| section.hero | {"padding":"0px","gap":"normal"} | #main > div.framer-vTKWY > .framer-1ug9l4m | vp-1920x1080 | high |
| section.product_stack | {"desktop":{"padding":"20px","row_gap":"160px","column_gap":"160px"},"tablet":{"padding":"20px","row_gap":"67px","column_gap":"67px"},"mobile":{"padding":"20px 0px 60px 0px","row_gap":"80px","column_gap":"80px"}} | #main > div.framer-vTKWY > .framer-1xxmgs4 | vp-390x844 | high |
| section.spotlight | {"desktop_tablet":{"padding":"100px 20px 40px","row_gap":"160px","column_gap":"160px"},"mobile":{"padding":"60px 0px 40px","row_gap":"160px","column_gap":"160px"}} | #main > div.framer-vTKWY > .framer-107a8lb | vp-1920x1080 | high |
| section.demo_cta | {"desktop_tablet":{"padding":"48px 0px 0px","row_gap":"60px","column_gap":"60px"},"mobile":{"padding":"0px 20px 0px","row_gap":"60px","column_gap":"60px"}} | #main > div.framer-vTKWY > .framer-kuopsy | vp-1920x1080 | high |
| component.button.pill.primary | 9px 20px | [data-framer-name="Main CTA"] | vp-1920x1080 | medium |
| component.button.pill.alt | 10px 0px | [data-framer-name="Main CTA"] | vp-1920x1080 | medium |
| component.card.header | 24px | [data-framer-name="Agent Canvas"] | vp-1920x1080 | medium |
| component.panel.edge | 24px 24px 24px 0px | [data-framer-name="Agent Canvas"] | vp-1920x1080 | medium |
| component.micro_gap.default | 8px | [data-framer-name="Agent Canvas"] | vp-1920x1080 | medium |
| component.grid_kpi | 24px / 24px | #main > div.framer-vTKWY > .framer-1xxmgs4 > div.framer-1iialbr | vp-1920x1080 | medium |
| component.stack_large | 60px / 60px | [data-framer-name="Agent Canvas"] | vp-1920x1080 | medium |

Layout patterns:
- pattern.section.vertical: display:flex; flex-direction:column; justify-content:flex-start; align-items:center
- pattern.cta.pill: display:flex; flex-direction:row; justify-content:center; align-items:center
- pattern.content.two_column: display:flex; flex-direction:row; justify-content:flex-start; align-items:flex-start

## 12) Motion and Interaction Contract
| Token | Value | Selector | State | Viewport | Confidence |
| --- | --- | --- | --- | --- | --- |
| page_enter | {"duration":"400ms","easing":"cubic-bezier(0.01, 0.55, 0.39, 1)","fill_mode":"both","delay_variants":["0ms","50ms","100ms","1000ms"],"observed_targets":["a.framer-1fargiu","svg#0","div.framer-6azb3","div#button-1","div.framer-1cj4qmz-container","div.framer-13y0fp4","div.framer-1wfjid4"]} | #main | - | vp-1920x1080 | high |
| component_transitions.links.global | {"property":"color","duration":"0.3s","timing":"cubic-bezier(0.44, 0, 0.56, 1)","delay":"0s"} | a | - | vp-1920x1080 | high |
| component_transitions.most_cta_surfaces | {"property":"all","duration":"0s","timing":"ease","delay":"0s"} | [data-framer-name="Main CTA"] | - | vp-1920x1080 | high |
| interaction_state_deltas.cta.contact | {"default":"background rgb(255,255,255)","hover":"background rgba(50,50,50,0.616)","focus":"background rgba(0,0,0,0.592) + outline auto 1px","active":"background rgba(0,0,0,0.596) + outline auto 1px"} | [data-framer-name="Main CTA"] | - | vp-1920x1080 | high |
| interaction_state_deltas.cta.explore | {"default":"background rgba(255,255,255,0.05)","hover":{"agent_canvas_and_voice":"background rgba(255,255,255,0.098)","smart_insights":"background rgba(255,255,255,0.094)"},"focus":{"agent_canvas_and_voice":"background rgba(255,255,255,0.1) + outline auto 1px","smart_insights":"background rgba(255,255,255,0.094) + outline auto 1px"},"active":"background rgba(255,255,255,0.1) + outline auto 1px"} | a[href="./agent-canvas"],a[href="./insights"],a[href="./voice-experience"] | - | vp-1920x1080 | high |
| interaction_state_deltas.nav.signin | {"default":"background transparent","hover":"background rgba(0,0,0,0.286)","focus":"background rgba(0,0,0,0.306) + outline auto 1px","active":"background rgba(0,0,0,0.3) + outline auto 1px"} | a[href="https://console.gigaml.com/"] | - | vp-1920x1080 | high |
| interaction_state_deltas.disabled | No meaningful custom disabled styles detected on interactive anchors | a | - | vp-1920x1080 | medium |

Implementation requirements:
- Preserve entry reveal timing sequence (400ms, cubic-bezier(0.01,0.55,0.39,1), stagger delays).
- Preserve link color transition signature globally (0.3s cubic-bezier(0.44,0,0.56,1)).
- Reproduce state deltas for CTA/contact/explore/sign-in exactly.
- Preserve focus-visible outline behavior (browser-like auto 1px unless explicit compliance override is approved).

## 13) Asset and Licensing Plan (Do Not Skip)
Experimental-mode override:
- User-approved context for this project is experimentation-only and non-release.
- Upstream assets/fonts may be used for fidelity work in this repository during this experiment.

Font assets:
| Family | Source | License Risk | Fallback |
| --- | --- | --- | --- |
| Emilio Light | https://framerusercontent.com/assets/5gyh90sizT7zuGcWB8UHjZXd3c.woff | likely-commercial | "Playfair Display", "Instrument Serif", serif |
| Giga Sans Display Trial 400 | https://framerusercontent.com/assets/zbcP3gqwgWZKzR2nnO3wxT9uTVw.woff2 | trial-proprietary | "Inter Display", Inter, sans-serif |
| Inter | https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2 | depends-on-license | Inter, "Segoe UI", system-ui, sans-serif |
| Inter Display | https://framerusercontent.com/assets/iwWTDc49ENF2tCHbqlNARXw6Ug.woff2 | depends-on-license | Inter, "Segoe UI", system-ui, sans-serif |
| Geist Mono | https://fonts.gstatic.com/s/geistmono/v4/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2 | google-font-license | "JetBrains Mono", "IBM Plex Mono", monospace |
| Giga Sans Display Trial 500 | https://framerusercontent.com/assets/O6d3iSZK1sGU0jru1j7OxFwhRw.woff2 | trial-proprietary | "Inter Display", Inter, sans-serif |
| Giga Sans Text Trial 500 | https://framerusercontent.com/assets/YgLnYiTfRKd8uvNEalADQAFa3Q.woff2 | trial-proprietary | Inter, "Segoe UI", system-ui, sans-serif |
| Giga Sans Text Trial 400 | https://framerusercontent.com/assets/zmRPZZSMbAJ3pU8ZNqgdZvuDxA.woff2 | trial-proprietary | Inter, "Segoe UI", system-ui, sans-serif |
| Inter Display (alt file) | https://framerusercontent.com/assets/bHYNJqzTyl2lqvmMiRRS6Y16Es.woff2 | depends-on-license | Inter, "Segoe UI", system-ui, sans-serif |
| Inter (alt file) | https://framerusercontent.com/assets/UjlFhCnUjxhNfep4oYBPqnEssyo.woff2 | depends-on-license | Inter, "Segoe UI", system-ui, sans-serif |
| Inter (alt file) | https://framerusercontent.com/assets/aqiiD4LUKkKzXdjGL5UzHq8bo5w.woff2 | depends-on-license | Inter, "Segoe UI", system-ui, sans-serif |

Image assets:
| Usage | URL | Rendered Size @1920 | License Risk |
| --- | --- | --- | --- |
| hero background | https://framerusercontent.com/images/x1ioW6hoCO0EWJfApnLyqDWxrs.png?scale-down-to=2048&width=6740&height=3332 | 1920x1080 | unknown-proprietary |
| agent canvas visual | https://framerusercontent.com/images/KwSrFTdjUqgh9N8xwlxRBf7qic.png?scale-down-to=2048&width=2640&height=2352 | 1007.92x731 | unknown-proprietary |
| insights visual | https://framerusercontent.com/images/nw1nKNo2mCT3T2ZcAZEbjhzyzIE.png?scale-down-to=1024&width=2736&height=2166 | 1007.92x702 | unknown-proprietary |
| customer spotlight card image | https://framerusercontent.com/images/CMSehIg25fZdZaxossQ9pXfXTI.jpg?scale-down-to=4096&width=8192&height=5464 | 824.73x552 | unknown-proprietary |
| voice video poster | https://framerusercontent.com/images/4n345Z2FuAud4fhrJ7Q4FtE5eY.png?width=1322&height=1324 | 1007.92x702 | unknown-proprietary |
| avatar | https://framerusercontent.com/images/xbL0ByCm4W8HOXdS9Ky1Em7fMM.png?width=400&height=400 | 48x48 | unknown-proprietary |
| avatar | https://framerusercontent.com/images/ef52GnaQAtuckMwaG3YVm6rNbkQ.png?width=400&height=400 | 48x48 | unknown-proprietary |
| avatar | https://framerusercontent.com/images/p38PV0KbYkrzgJhkEqCyASSOITM.png?width=400&height=400 | 48x48 | unknown-proprietary |
| ui icon (panel control) | https://framerusercontent.com/images/LaQ6HFt6vou1m4B0lxuFvMrjejI.png?width=96&height=96 | 24x24 | unknown-proprietary |
| spotlight avatar | https://framerusercontent.com/images/0Tlkpcg0rCJ2VfQzeU83Y6rpg.webp?width=416&height=416 | 50x50 | unknown-proprietary |
| favicon/app icon | https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256 | n/a | unknown-proprietary |
| site logo/brand image asset | https://framerusercontent.com/images/6DMMmv1qq90IndBZJRLHvvJHmE.png | n/a | unknown-proprietary |
| small iconographic image | https://framerusercontent.com/images/6Z4Aldc9q0azIZt1y8QikyWbVis.png?width=80&height=80 | n/a | unknown-proprietary |
| section media variant (responsive source) | https://framerusercontent.com/images/iCYwviY1oz4DvLeRAVJwyI0RT0.png?scale-down-to=1024&width=2640&height=2352 | responsive variant | unknown-proprietary |
| youtube preview | https://i.ytimg.com/vi_webp/Ct095PlZF3M/sddefault.webp | - | third-party-youtube |

Video assets:
| Usage | URL | Rendered Size @1920 | Playback Flags | License Risk |
| --- | --- | --- | --- | --- |
| voice experience section media | https://framerusercontent.com/assets/lt3r9RT6cCKh8i9Cy7jtB8i2HI.mp4 | 1007.92x702 | loop=true; muted=true; autoplay=false | unknown-proprietary |
| footer/background motion layer | https://framerusercontent.com/assets/chRFmBq9ayObGUcObGO5vqKAVQ.mp4 | 1920x1028 | loop=true; muted=true; autoplay=false | unknown-proprietary |

Production hardening constraints (deferred; not required for this experiment run):
- Do not copy framerusercontent media binaries directly into a production clone without asset rights.
- Replace Emilio/Giga trial font families with licensed or open-source alternatives unless explicit license is obtained.
- Recreate SVG icons and decorative vectors from scratch.
- Do not include analytics/marketing trackers from target site in clone baseline.

Tracking assets excluded:
- Google Tag Manager / Analytics
- LinkedIn Insight
- Twitter UWT
- HubSpot scripts
- ZoomInfo pixel

## 14) Required Project Scaffold (Greenfield)
Implement this exact minimal scaffold before visual work:

```text
package.json
src/
  index.html
  styles/
    tokens.css
    reset.css
  app.css
  assets/
    media/ (reference-derived assets for experiment)
    fonts/ (upstream fonts for fidelity testing)
  components/
    Hero.*
    ProductStack.*
    Spotlight.*
    DemoCTA.*
    Footer.*
  app.* (entry composition)
tests/visual/
audit/reference/ (existing)
audit/local/
```

## 15) CSS Variable and Token Wiring Requirements
- Generate CSS custom properties from the JSON token files.
- Enforce breakpoint-scoped vars for desktop/tablet/mobile.
- Disallow raw hardcoded hex/rgb/px in section components (except one-off measured exceptions with inline comment and gap ID).
- Map every visual declaration to a token ID and (for implementation tracking) a gap matrix ID.
- Spacing/padding precision lock:
  - Preserve exact computed padding/gap strings for section containers.
  - Do not normalize shorthand values (for example, keep `20px 0px 60px`, not inferred equivalents).
  - Treat any spacing delta > `0.5px` as a failed parity check.

## 16) Section-by-Section Build Specification
### 16.1 Hero
- Section selector target: `#main > div.framer-vTKWY > .framer-1ug9l4m`.
- Geometry targets must match section matrix for each viewport.
- Required elements: announcement chip, H1 display headline, H2 subheadline, primary Talk to us CTA, logo strip.
- H1 token set: `type.hero.headline.desktop/tablet/mobile` by breakpoint.
- Background composition: black base + hero image + vignette gradient token.
- Top nav replacement on mobile: desktop nav absent; hero top row includes logo + hamburger trigger that opens full-screen overlay menu with close icon and product/company links.
- Giant glob rendering (explicit):
  - Definition used in this plan: the dominant atmospheric mass in hero is produced by the full-bleed hero image plus the bottom vignette mask layer.
  - Base image layer rules:
    - `object-fit: cover` at all breakpoints.
    - `object-position: 50% 50%` for `vp-1920x1080`, `vp-1440x900`, `vp-1200x900`, `vp-1024x768`, `vp-810x1080`.
    - `object-position: 26.8% 67%` for `vp-390x844`.
  - Vignette mask rules:
    - Selector pattern: hero child with `background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)`.
    - `mix-blend-mode: multiply`, `position: absolute`, `opacity: 1`.
    - Geometry by viewport:
      - `vp-1920x1080`: `x=0,y=810,w=1920,h=270`
      - `vp-1440x900`: `x=0,y=675,w=1440,h=225`
      - `vp-1200x900`: `x=0,y=675,w=1200,h=225`
      - `vp-1024x768`: `x=0,y=600,w=1024,h=200`
      - `vp-810x1080`: `x=0,y=810,w=810,h=270`
      - `vp-390x844`: `x=0,y=640,w=390,h=360`

### 16.2 Layout Feature Lock (Exact-Match)
- Section container layout primitives must match measured computed styles before signoff.
- Desktop (`vp-1920x1080`) required values:
  - `product_stack`: `display:flex`, `flex-direction:column`, `justify-content:flex-start`, `align-items:center`, `gap:160px`, `padding:20px`, `background-image: linear-gradient(rgb(0, 0, 0) 0%, rgb(15, 14, 13) 8%)`.
  - `customer_spotlight`: `display:flex`, `flex-direction:column`, `gap:160px`, `padding:100px 20px 40px`, `background-color: rgb(254, 252, 251)`.
  - `demo_cta`: `display:flex`, `justify-content:center`, `align-items:center`, `gap:60px`, `padding:48px 0px 0px`, `background-color: rgb(254, 252, 251)`.
  - `top_nav_desktop`: `position:fixed`, `z-index:9`, `y=20`, `height=54`.
- Mobile (`vp-390x844`) required values:
  - `product_stack`: `display:flex`, `flex-direction:column`, `gap:80px`, `padding:20px 0px 60px`.
  - `customer_spotlight`: `display:flex`, `flex-direction:column`, `gap:160px`, `padding:60px 0px 40px`.
  - `demo_cta`: `display:flex`, `justify-content:center`, `align-items:center`, `gap:60px`, `padding:0px 20px`.
  - `kpi_strip`: `display:flex`, `flex-direction:column`, `padding:0px 20px`.
- Radius/shape locks:
  - Spotlight primary card border radius: desktop `6px`, mobile `4px`.

### 16.3 Product Stack
- Section selector target: `#main > div.framer-vTKWY > .framer-1xxmgs4`.
- Vertical rhythm: desktop 160px, tablet 67px, mobile 80px.
- Modules in order: KPI strip -> Agent Canvas -> Smart Insights -> Voice Experience.
- Ensure each module uses dark/glass surfaces and correct CTA styles.
- Ensure content blocks collapse to single-column behavior on mobile as measured.

### 16.4 Customer Spotlight
- Section selector target: `#main > div.framer-vTKWY > .framer-107a8lb`.
- Preserve orange media block, testimonial text hierarchy, avatar/name/title grouping.
- Keep exact section heights per viewport matrix.

### 16.5 Demo CTA
- Section selector target: `#main > div.framer-vTKWY > .framer-kuopsy`.
- Eyebrow + title + body + CTA composition with exact section height and padding.
- Desktop/tablet uses top padding 48px; mobile uses horizontal inset 20px and adjusted height.

### 16.6 Footer
- Section selector target: `#main > div.framer-vTKWY > .ssr-variant .framer-1j0lk2w-container`.
- Desktop/footer internals differ from mobile; implement variant-specific layout structures.
- Keep exact measured heights and Y offsets by viewport matrix.

## 17) Interaction-State Specification
- Contact CTA: default white, hover/focus/active darkening per motion token deltas.
- Explore CTA family: default translucent white, hover/focus/active with token-specific RGBA deltas.
- Sign-in nav item: transparent default with subtle black hover/focus overlays.
- Disabled states: no custom disabled style detected; treat as unsupported unless product requirements add disabled controls.

## 18) Final Gap Matrix (Re-reviewed)
- Total rows: 50
- Severity distribution: critical=38, low=1, high=6, medium=5

Critical mismatches to close first (complete list):
| Gap ID | Section | Viewport | Property | Expected | Numeric Delta | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| GM-SEC-hero-1920x1080 | hero | vp-1920x1080 | geometry | {"x":0,"y":0,"width":1920,"height":1080} | {"x":0,"y":0,"width":1920,"height":1080} | Implement hero with exact x/y/width/height target for 1920x1080. |
| GM-SEC-hero-1440x900 | hero | vp-1440x900 | geometry | {"x":0,"y":0,"width":1440,"height":900} | {"x":0,"y":0,"width":1440,"height":900} | Implement hero with exact x/y/width/height target for 1440x900. |
| GM-SEC-hero-1200x900 | hero | vp-1200x900 | geometry | {"x":0,"y":0,"width":1200,"height":900} | {"x":0,"y":0,"width":1200,"height":900} | Implement hero with exact x/y/width/height target for 1200x900. |
| GM-SEC-hero-1024x768 | hero | vp-1024x768 | geometry | {"x":0,"y":0,"width":1024,"height":800} | {"x":0,"y":0,"width":1024,"height":800} | Implement hero with exact x/y/width/height target for 1024x768. |
| GM-SEC-hero-810x1080 | hero | vp-810x1080 | geometry | {"x":0,"y":0,"width":810,"height":1080} | {"x":0,"y":0,"width":810,"height":1080} | Implement hero with exact x/y/width/height target for 810x1080. |
| GM-SEC-hero-390x844 | hero | vp-390x844 | geometry | {"x":0,"y":0,"width":390,"height":1000} | {"x":0,"y":0,"width":390,"height":1000} | Implement hero with exact x/y/width/height target for 390x844. |
| GM-SEC-product_stack-1920x1080 | product_stack | vp-1920x1080 | geometry | {"x":0,"y":1080,"width":1920,"height":3693.8} | {"x":0,"y":1080,"width":1920,"height":3693.8} | Implement product_stack with exact x/y/width/height target for 1920x1080. |
| GM-SEC-product_stack-1440x900 | product_stack | vp-1440x900 | geometry | {"x":0,"y":900,"width":1440,"height":3693.8} | {"x":0,"y":900,"width":1440,"height":3693.8} | Implement product_stack with exact x/y/width/height target for 1440x900. |
| GM-SEC-product_stack-1200x900 | product_stack | vp-1200x900 | geometry | {"x":0,"y":900,"width":1200,"height":3693.8} | {"x":0,"y":900,"width":1200,"height":3693.8} | Implement product_stack with exact x/y/width/height target for 1200x900. |
| GM-SEC-product_stack-1024x768 | product_stack | vp-1024x768 | geometry | {"x":0,"y":800,"width":1024,"height":3331} | {"x":0,"y":800,"width":1024,"height":3331} | Implement product_stack with exact x/y/width/height target for 1024x768. |
| GM-SEC-product_stack-810x1080 | product_stack | vp-810x1080 | geometry | {"x":0,"y":1080,"width":810,"height":3334} | {"x":0,"y":1080,"width":810,"height":3334} | Implement product_stack with exact x/y/width/height target for 810x1080. |
| GM-SEC-product_stack-390x844 | product_stack | vp-390x844 | geometry | {"x":0,"y":1000,"width":390,"height":5719} | {"x":0,"y":1000,"width":390,"height":5719} | Implement product_stack with exact x/y/width/height target for 390x844. |
| GM-SEC-customer_spotlight-1920x1080 | customer_spotlight | vp-1920x1080 | geometry | {"x":0,"y":4773.8,"width":1920,"height":954.8} | {"x":0,"y":4773.8,"width":1920,"height":954.8} | Implement customer_spotlight with exact x/y/width/height target for 1920x1080. |
| GM-SEC-customer_spotlight-1440x900 | customer_spotlight | vp-1440x900 | geometry | {"x":0,"y":4593.8,"width":1440,"height":954.8} | {"x":0,"y":4593.8,"width":1440,"height":954.8} | Implement customer_spotlight with exact x/y/width/height target for 1440x900. |
| GM-SEC-customer_spotlight-1200x900 | customer_spotlight | vp-1200x900 | geometry | {"x":0,"y":4593.8,"width":1200,"height":954.8} | {"x":0,"y":4593.8,"width":1200,"height":954.8} | Implement customer_spotlight with exact x/y/width/height target for 1200x900. |
| GM-SEC-customer_spotlight-1024x768 | customer_spotlight | vp-1024x768 | geometry | {"x":0,"y":4131,"width":1024,"height":954.8} | {"x":0,"y":4131,"width":1024,"height":954.8} | Implement customer_spotlight with exact x/y/width/height target for 1024x768. |
| GM-SEC-customer_spotlight-810x1080 | customer_spotlight | vp-810x1080 | geometry | {"x":0,"y":4414,"width":810,"height":1015.8} | {"x":0,"y":4414,"width":810,"height":1015.8} | Implement customer_spotlight with exact x/y/width/height target for 810x1080. |
| GM-SEC-customer_spotlight-390x844 | customer_spotlight | vp-390x844 | geometry | {"x":0,"y":6719,"width":390,"height":1350.8} | {"x":0,"y":6719,"width":390,"height":1350.8} | Implement customer_spotlight with exact x/y/width/height target for 390x844. |
| GM-SEC-top_nav_overlay_desktop-1920x1080 | top_nav_overlay_desktop | vp-1920x1080 | geometry | {"x":0,"y":20,"width":1920,"height":54,"present":true} | {"x":0,"y":20,"width":1920,"height":54} | Implement top_nav_overlay_desktop with exact x/y/width/height target for 1920x1080. |
| GM-SEC-top_nav_overlay_desktop-1440x900 | top_nav_overlay_desktop | vp-1440x900 | geometry | {"x":0,"y":20,"width":1440,"height":54,"present":true} | {"x":0,"y":20,"width":1440,"height":54} | Implement top_nav_overlay_desktop with exact x/y/width/height target for 1440x900. |
| GM-SEC-top_nav_overlay_desktop-1200x900 | top_nav_overlay_desktop | vp-1200x900 | geometry | {"x":0,"y":20,"width":1200,"height":54,"present":true} | {"x":0,"y":20,"width":1200,"height":54} | Implement top_nav_overlay_desktop with exact x/y/width/height target for 1200x900. |
| GM-SEC-top_nav_overlay_desktop-1024x768 | top_nav_overlay_desktop | vp-1024x768 | geometry | {"x":0,"y":20,"width":1024,"height":54,"present":true} | {"x":0,"y":20,"width":1024,"height":54} | Implement top_nav_overlay_desktop with exact x/y/width/height target for 1024x768. |
| GM-SEC-top_nav_overlay_desktop-810x1080 | top_nav_overlay_desktop | vp-810x1080 | geometry | {"x":0,"y":20,"width":810,"height":54,"present":true} | {"x":0,"y":20,"width":810,"height":54} | Implement top_nav_overlay_desktop with exact x/y/width/height target for 810x1080. |
| GM-SEC-demo_cta-1920x1080 | demo_cta | vp-1920x1080 | geometry | {"x":0,"y":5728.59,"width":1920,"height":403} | {"x":0,"y":5728.59,"width":1920,"height":403} | Implement demo_cta with exact x/y/width/height target for 1920x1080. |
| GM-SEC-demo_cta-1440x900 | demo_cta | vp-1440x900 | geometry | {"x":0,"y":5548.59,"width":1440,"height":403} | {"x":0,"y":5548.59,"width":1440,"height":403} | Implement demo_cta with exact x/y/width/height target for 1440x900. |
| GM-SEC-demo_cta-1200x900 | demo_cta | vp-1200x900 | geometry | {"x":0,"y":5548.59,"width":1200,"height":403} | {"x":0,"y":5548.59,"width":1200,"height":403} | Implement demo_cta with exact x/y/width/height target for 1200x900. |
| GM-SEC-demo_cta-1024x768 | demo_cta | vp-1024x768 | geometry | {"x":0,"y":5085.8,"width":1024,"height":424} | {"x":0,"y":5085.8,"width":1024,"height":424} | Implement demo_cta with exact x/y/width/height target for 1024x768. |
| GM-SEC-demo_cta-810x1080 | demo_cta | vp-810x1080 | geometry | {"x":0,"y":5429.8,"width":810,"height":445} | {"x":0,"y":5429.8,"width":810,"height":445} | Implement demo_cta with exact x/y/width/height target for 810x1080. |
| GM-SEC-demo_cta-390x844 | demo_cta | vp-390x844 | geometry | {"x":0,"y":8069.8,"width":390,"height":486} | {"x":0,"y":8069.8,"width":390,"height":486} | Implement demo_cta with exact x/y/width/height target for 390x844. |
| GM-SEC-footer-1920x1080 | footer | vp-1920x1080 | geometry | {"x":0,"y":6131.59,"width":1920,"height":740} | {"x":0,"y":6131.59,"width":1920,"height":740} | Implement footer with exact x/y/width/height target for 1920x1080. |
| GM-SEC-footer-1440x900 | footer | vp-1440x900 | geometry | {"x":0,"y":5951.59,"width":1440,"height":740} | {"x":0,"y":5951.59,"width":1440,"height":740} | Implement footer with exact x/y/width/height target for 1440x900. |
| GM-SEC-footer-1200x900 | footer | vp-1200x900 | geometry | {"x":0,"y":5951.59,"width":1200,"height":740} | {"x":0,"y":5951.59,"width":1200,"height":740} | Implement footer with exact x/y/width/height target for 1200x900. |
| GM-SEC-footer-1024x768 | footer | vp-1024x768 | geometry | {"x":0,"y":5509.8,"width":1024,"height":740} | {"x":0,"y":5509.8,"width":1024,"height":740} | Implement footer with exact x/y/width/height target for 1024x768. |
| GM-SEC-footer-810x1080 | footer | vp-810x1080 | geometry | {"x":0,"y":5874.8,"width":810,"height":740} | {"x":0,"y":5874.8,"width":810,"height":740} | Implement footer with exact x/y/width/height target for 810x1080. |
| GM-SEC-footer-390x844 | footer | vp-390x844 | geometry | {"x":0,"y":8555.8,"width":390,"height":1010} | {"x":0,"y":8555.8,"width":390,"height":1010} | Implement footer with exact x/y/width/height target for 390x844. |
| GM-TYPO-type.hero.headline.desktop | typography | vp-1920x1080 | typography | {"font_family":"font.display.hero","font_size":"81.6669px","font_weight":"300","line_height":"98.0003px","letter_spacing":"-2.45001px","text_transform":"none"} | {"font_size_px":81.6669,"line_height_px":98.0003,"letter_spacing_px":-2.45001,"font_weight":300,"baseline_assumption":"actual missing => treated as 0 baseline"} | Apply token type.hero.headline.desktop exactly to [data-framer-name="Hero"] h1. |
| GM-TYPO-type.hero.headline.tablet | typography | vp-810x1080 | typography | {"font_family":"font.display.hero","font_size":"48.8454px","font_weight":"300","line_height":"58.6145px","letter_spacing":"-1.46536px","text_transform":"none"} | {"font_size_px":48.8454,"line_height_px":58.6145,"letter_spacing_px":-1.46536,"font_weight":300,"baseline_assumption":"actual missing => treated as 0 baseline"} | Apply token type.hero.headline.tablet exactly to [data-framer-name="Hero"] h1. |
| GM-TYPO-type.hero.headline.mobile | typography | vp-390x844 | typography | {"font_family":"font.display.hero","font_size":"44px","font_weight":"300","line_height":"52.8px","letter_spacing":"-1.32px","text_transform":"none"} | {"font_size_px":44,"line_height_px":52.8,"letter_spacing_px":-1.32,"font_weight":300,"baseline_assumption":"actual missing => treated as 0 baseline"} | Apply token type.hero.headline.mobile exactly to [data-framer-name="Hero"] h1. |

## 19) Commit-by-Commit Implementation Sequence (Mandatory)
1. `feat: scaffold app runtime and token pipeline`
2. `feat: implement hero geometry + typography + nav variants`
3. `feat: implement product stack shell and KPI strip`
4. `feat: implement Agent Canvas block parity`
5. `feat: implement Smart Insights block parity`
6. `feat: implement Voice Experience block parity`
7. `feat: implement spotlight section parity`
8. `feat: implement demo CTA and footer variants`
9. `feat: interaction/motion parity and focus behavior`
10. `test: add screenshot diff harness for all target viewports/states`
11. `chore: final residual mismatch report with quantified deltas`

## 20) Validation and Acceptance Workflow
- For each commit boundary, capture local screenshots at all six target viewports.
- Compare against `audit/reference/screenshots/vp-<width>x<height>/full.png` and section captures (use: `vp-1920x1080`, `vp-1440x900`, `vp-1200x900`, `vp-1024x768`, `vp-810x1080`, `vp-390x844`).
- Compute geometric deltas for section and component anchors (x,y,w,h).
- Compute typographic deltas for H1/H2/section titles/body text/CTAs.
- Compute color deltas (RGBA channels) for key surfaces and text states.
- Validate hover/focus/active states against motion tokens and delta definitions.
- Do not mark completion until all critical/high gaps are closed and residuals are explicitly justified.

## 21) Done Criteria Checklist
- [ ] App scaffold exists and runs locally.
- [ ] All section geometries meet ±1px desktop and ±2px mobile thresholds.
- [ ] Hero giant glob rendering (image crop + vignette mask geometry + blend mode) matches all required viewports.
- [ ] Typography tokens applied by breakpoint with measured parity.
- [ ] Color tokens and gradients match measured values and states.
- [ ] Spacing rhythm and component paddings/gaps match per matrix.
- [ ] Layout feature lock checks pass (display/flex/align/gap/padding/z-index/radius).
- [ ] Motion and interaction deltas match token contract.
- [ ] Experimental asset/font usage documented; production licensing hardening deferred.
- [ ] Residual mismatch report generated with exact deltas and reasons.

## 22) Notes for Engineering Execution
- Framer classes are unstable; build semantic component classes and keep selector mapping only for verification, not implementation architecture.
- Use stable content anchors (`match_text`) when validating medium-confidence tokens.
- Keep implementation deterministic: avoid runtime randomness and hidden layout side effects.
- Maintain accessibility semantics while matching visuals.
