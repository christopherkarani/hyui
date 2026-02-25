# Visual Audit Report: Giga AI Clone

## Executive Summary
The visual audit of `http://localhost:5174/` reveals a generally faithful implementation of the desktop design, but with **critical rendering issues** related to lazy loading and mobile responsiveness. 

**Key Findings:**
1.  **Lazy Loading / Scroll Issue**: Content below the Hero section is invisible to standard screenshot tools and potentially users who scroll quickly. It requires a slow, deliberate scroll to trigger visibility (likely `IntersectionObserver` issue).
2.  **Mobile Broken Rendering**: The "ProductStack" (Feature blocks) section is completely missing/black on mobile (390x844), even with slow scrolling.
3.  **Partner Logos**: Implemented as **plain text** instead of SVG/Image logos, causing significant visual divergence and contrast issues on mobile.

---

## Detailed Section-by-Section Analysis

### 1. Hero Section
**Status: ⚠️ Visual Bugs**

*   **Discrepancy**: Partner logos (Postman, Rio, DoorDash, etc.) are rendered as **plain text strings** rather than brand logos.
    *   *Reference*: Monochrome white SVG logos.
    *   *Current*: Standard sans-serif font text.
*   **Mobile Issue**: Text logos wrap to two lines but have **poor contrast** against the background image and uneven alignment.
*   **Suggested Fix**:
    ```html
    <!-- Replace text nodes with SVGs -->
    <div class="logos-container">
      <img src="/logos/postman.svg" alt="Postman" />
      <img src="/logos/doordash.svg" alt="DoorDash" />
      <!-- ... -->
    </div>
    ```
    ```css
    /* Fix mobile alignment */
    .logos-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
    }
    ```

### 2. ProductStack ("Built to handle complexity")
**Status: 🔴 Critical Failure (Mobile) / ✅ Pass (Desktop)**

*   **Desktop (1920x1080)**: 
    *   Glassmorphism effects (blur, transparency, borders) are present and match reference.
    *   Layout is correct (Alternating grid).
*   **Mobile (390x844)**:
    *   **CRITICAL**: Section is **entirely missing/black**. A large void exists between Hero and DoorDash sections.
    *   *Likely Cause*: `opacity: 0` or `display: none` triggered by media query or failed intersection observer on mobile.
*   **Suggested Fix**:
    *   Check `IntersectionObserver` thresholds for mobile (reduce threshold to `0.1`).
    *   Ensure `.product-stack` container has explicit `min-height` to prevent collapse.
    *   Verify `backdrop-filter: blur()` support/fallback for mobile browsers.

### 3. CustomerSpotlight (DoorDash Case Study)
**Status: ✅ Pass**

*   **Desktop**: 
    *   Orange overlay with "DWR RATE 80%" is present and correctly positioned.
    *   Layout matches reference.
*   **Mobile**:
    *   Correctly stacks (Image top, Content bottom).
    *   Orange overlay persists correctly.

### 4. DemoCTA ("Ready to see Giga")
**Status: ✅ Pass**

*   **Desktop**: Matches reference (White BG, Serif Heading, Black Pill Button).
*   **Mobile**: Stacks correctly, maintains whitespace.

### 5. Footer
**Status: ✅ Pass**

*   **Desktop**: Visible after slow scroll. Includes watermark "Giga" text.
*   **Mobile**: Columns stack vertically. Links are accessible.

---

## Technical Recommendations

1.  **Fix Lazy Loading**: The fade-in animation is too aggressive.
    *   **Action**: Set default state to `opacity: 1` for critical content, or lower the `IntersectionObserver` threshold.
    *   **CSS**:
        ```css
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll {
            opacity: 1 !important;
            transform: none !important;
          }
        }
        ```

2.  **Implement Logos**: Replace text placeholders in `Hero.svelte` (or equivalent component) with actual SVG assets.

3.  **Debug Mobile ProductStack**:
    *   Inspect `main > div:nth-child(2)` on mobile.
    *   Ensure `z-index` is not hiding it behind the background.
    *   Check for `overflow: hidden` on the card container that might be clipping content on narrow screens.

## Screenshot Manifest
*   **Desktop Full Page**: `output/playwright/screenshots/1920x1080_slow_scroll.png` (Reference for correct rendering)
*   **Mobile Full Page**: `output/playwright/screenshots/390x844_slow_scroll.png` (Reference for missing ProductStack)
*   **Section Captures**: `output/playwright/screenshots/section_*.png`
