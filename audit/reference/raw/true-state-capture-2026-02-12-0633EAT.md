# True-State Capture Rerun (2026-02-12 06:33 EAT)

## Environment
- Timestamp (UTC): 2026-02-12T03:33:27Z
- Timestamp (Local): 2026-02-12T06:33:12+0300 EAT
- URL: https://giga.ai/
- Tooling: Playwright MCP

## Viewport: vp-390x844
- Trigger detection:
  - `document.elementFromPoint(innerWidth - 24, 40)` returned class `framer-1y1o6ud`, size `20x2`, cursor `pointer`
- Deterministic open action:
  - mouse click at coordinates `(x=362, y=42)`
  - after click top-right element became class `framer-112uw12` with size `16x16` (close icon)
- Evidence files:
  - `audit/reference/screenshots/vp-390x844/sections/mobile-menu-overlay-true-state-final-open.png` (`390x844`)
  - `audit/reference/screenshots/vp-390x844/sections/header-nav-true-state-final-topclip.png` (`390x180`)

## Viewport: vp-810x1080
- Nav state detection:
  - Visible nav link texts include `Product`, `Company`, `Sign in`, `Talk to us`
  - No mobile menu trigger candidates found in top bar detection pass
- Evidence files:
  - `audit/reference/screenshots/vp-810x1080/sections/mobile-menu-overlay-true-state-final-not-applicable.png` (`810x1080`)
  - `audit/reference/screenshots/vp-810x1080/sections/header-nav-true-state-final-topclip.png` (`810x200`)

## Classification updates applied
- `vp-390x844`
  - `header_nav`: `true_state_partial_logo_plus_topclip`
  - `mobile_menu_overlay`: `true_state_opened_via_coordinate_click`
- `vp-810x1080`
  - `header_nav`: `true_state`
  - `mobile_menu_overlay`: `not_applicable_confirmed_no_trigger`
