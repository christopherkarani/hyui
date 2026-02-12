import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const REFERENCE_URL = "https://giga.ai";
const ROOT_DIR = process.cwd();
const OUT_DIR = path.join(ROOT_DIR, "audit", "reference");
const RAW_DIR = path.join(OUT_DIR, "raw");
const SHOT_DIR = path.join(OUT_DIR, "screenshots");

const VIEWPORTS = [
  { id: "vp-1920x1080", width: 1920, height: 1080 },
  { id: "vp-1440x900", width: 1440, height: 900 },
  { id: "vp-1200x900", width: 1200, height: 900 },
  { id: "vp-1024x768", width: 1024, height: 768 },
  { id: "vp-810x1080", width: 810, height: 1080 },
  { id: "vp-390x844", width: 390, height: 844 }
];

const LOGO_FRAMER_NAMES = [
  "Postman - white",
  "Rio white",
  "DoorDash - white",
  "Capital.com - white",
  "Afriex - white",
  "Sendoso"
];

const STYLE_TARGETS = [
  { id: "header.nav", kind: "framerNameTop", name: "Variant 1", maxTop: 180 },
  { id: "hero.root", kind: "framerName", name: "Hero" },
  { id: "hero.title", kind: "css", selector: '[data-framer-name="Hero"] h1' },
  { id: "hero.subtitle", kind: "css", selector: '[data-framer-name="Hero"] h2' },
  { id: "hero.mainCta", kind: "framerName", name: "Main CTA" },
  { id: "logos.first", kind: "framerName", name: "Postman - white" },
  { id: "feature.agentCanvas.root", kind: "framerName", name: "Agent Canvas" },
  { id: "feature.insights.root", kind: "framerName", name: "Insights" },
  { id: "feature.voice.root", kind: "framerName", name: "Voice Experience" },
  { id: "cards.customerSpotlight", kind: "framerNameAfterTop", name: "Variant 1", minTop: 4200 },
  { id: "cta.demo", kind: "textIncludes", text: "GET A PERSONALIZED DEMO" },
  { id: "footer.root", kind: "framerNameAfterTop", name: "Variant 10", minTop: 5600 }
];

const INTERACTIVE_TARGETS = [
  { id: "header.bannerLink", selector: "a", text: "Giga launches Browser Agent" },
  { id: "hero.talkToUs", selector: "a", text: "Talk to us" },
  { id: "agentCanvas.explore", selector: "a", text: "Explore Agent Canvas" },
  { id: "insights.explore", selector: "a", text: "Explore Smart Insights" },
  { id: "voice.explore", selector: "a", text: "Explore Voice Experience" },
  { id: "footer.signIn", selector: "a", text: "Sign in" },
  { id: "footer.talkToUs", selector: "a", text: "Talk to us" }
];

function clampClip(clip, viewport) {
  if (!clip) return null;
  const x = Math.max(0, Math.floor(clip.x));
  const y = Math.max(0, Math.floor(clip.y));
  const maxWidth = viewport.width - x;
  const maxHeight = viewport.height - y;
  const width = Math.max(1, Math.min(Math.ceil(clip.width), maxWidth));
  const height = Math.max(1, Math.min(Math.ceil(clip.height), maxHeight));
  if (width <= 1 || height <= 1) return null;
  return { x, y, width, height };
}

async function mkdirp(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function loadAndStabilize(page, viewport) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(REFERENCE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
}

async function takeFullScreenshot(page, outPath) {
  await page.screenshot({ path: outPath, fullPage: true });
}

async function captureByFramerName(page, framerName, outPath, strategy = "first", minTop = 0) {
  const locator = page.locator(`[data-framer-name="${framerName.replaceAll('"', '\\"')}"]`);
  const count = await locator.count();
  if (count === 0) return { ok: false, reason: "not_found", framerName };

  let target = locator.first();
  if (strategy === "afterTop") {
    let chosen = -1;
    for (let i = 0; i < count; i += 1) {
      const box = await locator.nth(i).boundingBox();
      if (box && box.y >= minTop) {
        chosen = i;
        break;
      }
    }
    if (chosen >= 0) target = locator.nth(chosen);
  }

  await target.scrollIntoViewIfNeeded();
  await target.screenshot({ path: outPath });
  return { ok: true, framerName, strategy };
}

async function captureHeaderNav(page, outPath) {
  const result = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('[data-framer-name="Variant 1"]'))
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { r, el };
      })
      .filter(({ r }) => r.top <= 180 && r.width > window.innerWidth * 0.6 && r.height >= 36 && r.height <= 140)
      .sort((a, b) => a.r.top - b.r.top);
    const hit = candidates[0];
    if (!hit) return null;
    hit.el.setAttribute("data-audit-header-nav", "true");
    return true;
  });
  if (!result) return { ok: false, reason: "not_found" };
  await page.locator('[data-audit-header-nav="true"]').first().screenshot({ path: outPath });
  return { ok: true };
}

async function captureLogoBand(page, outPath, viewport) {
  await page.evaluate((name) => {
    const el = document.querySelector(`[data-framer-name="${name.replaceAll('"', '\\"')}"]`);
    if (el) el.scrollIntoView({ block: "center", behavior: "instant" });
  }, LOGO_FRAMER_NAMES[0]);
  await page.waitForTimeout(200);

  const rawClip = await page.evaluate((names) => {
    const esc = (v) => v.replaceAll('"', '\\"');
    const elements = names
      .map((name) => document.querySelector(`[data-framer-name="${esc(name)}"]`))
      .filter(Boolean);
    if (elements.length === 0) return null;
    const rects = elements.map((el) => el.getBoundingClientRect());
    const left = Math.min(...rects.map((r) => r.left));
    const right = Math.max(...rects.map((r) => r.right));
    const top = Math.min(...rects.map((r) => r.top));
    const bottom = Math.max(...rects.map((r) => r.bottom));
    return {
      x: left - 24,
      y: top - 20,
      width: right - left + 48,
      height: bottom - top + 40
    };
  }, LOGO_FRAMER_NAMES);

  const clip = clampClip(rawClip, viewport);
  if (!clip) return { ok: false, reason: "clip_unavailable" };
  await page.screenshot({ path: outPath, clip });
  return { ok: true, clip };
}

async function captureByTextRegion(page, text, outPath) {
  const marked = await page.evaluate((search) => {
    const norm = (v) => (v || "").replace(/\s+/g, " ").trim();
    const nodes = Array.from(document.querySelectorAll("*"));
    const hit = nodes.find((el) => norm(el.textContent).includes(search));
    if (!hit) return null;
    let cursor = hit;
    while (cursor && cursor !== document.body) {
      const r = cursor.getBoundingClientRect();
      if (r.width >= 280 && r.height >= 120) break;
      cursor = cursor.parentElement;
    }
    const target = cursor || hit;
    target.setAttribute("data-audit-text-region", "true");
    return true;
  }, text);
  if (!marked) return { ok: false, reason: "not_found", text };
  await page.locator('[data-audit-text-region="true"]').first().screenshot({ path: outPath });
  return { ok: true, text };
}

async function captureFooter(page, outPath) {
  const primary = await captureByFramerName(page, "Variant 10", outPath, "afterTop", 5200);
  if (primary.ok) return primary;
  return captureByTextRegion(page, "© 2026 Giga AI, Inc.", outPath);
}

async function captureCustomerSpotlight(page, outPath) {
  return captureByFramerName(page, "Variant 1", outPath, "afterTop", 4200);
}

async function captureMobileMenuOverlay(page, outPath, viewport) {
  if (viewport.width > 810) return { ok: false, reason: "viewport_not_mobile" };
  const meta = await page.evaluate(() => {
    const normalize = (v) => (v || "").replace(/\s+/g, " ").trim().toLowerCase();
    const candidates = Array.from(document.querySelectorAll("button, [role='button'], a"));
    const target = candidates.find((el) => {
      const s = `${normalize(el.getAttribute("aria-label"))} ${normalize(el.textContent)}`;
      return s.includes("menu") || s.includes("navigation") || s.includes("open");
    });
    if (!target) return null;
    target.setAttribute("data-audit-menu-trigger", "true");
    return {
      text: normalize(target.textContent),
      ariaLabel: normalize(target.getAttribute("aria-label"))
    };
  });

  if (!meta) return { ok: false, reason: "menu_trigger_not_found" };

  const trigger = page.locator('[data-audit-menu-trigger="true"]').first();
  await trigger.click({ timeout: 5000 });
  await page.waitForTimeout(450);
  await page.screenshot({ path: outPath, fullPage: false });
  return { ok: true, trigger: meta };
}

async function collectDomSections(page) {
  return page.evaluate(() => {
    const out = Array.from(document.querySelectorAll("[data-framer-name]"))
      .map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          dataFramerName: el.getAttribute("data-framer-name"),
          className: (el.className || "").toString(),
          top: Math.round(r.top + window.scrollY),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height),
          display: cs.display,
          position: cs.position,
          zIndex: cs.zIndex,
          opacity: cs.opacity
        };
      })
      .filter((row) => row.width > 120 && row.height > 30)
      .sort((a, b) => a.top - b.top || a.left - b.left);
    return out;
  });
}

async function collectStyleTarget(page, target, viewportId) {
  return page.evaluate(({ target, viewportId }) => {
    const normalize = (v) => (v || "").replace(/\s+/g, " ").trim();
    const px = (v) => {
      const n = Number.parseFloat(v || "0");
      return Number.isFinite(n) ? n : 0;
    };
    const pick = (descriptor) => {
      if (descriptor.kind === "css") return document.querySelector(descriptor.selector);
      if (descriptor.kind === "framerName") {
        const list = Array.from(document.querySelectorAll(`[data-framer-name="${descriptor.name.replaceAll('"', '\\"')}"]`));
        return list.find((el) => el.getBoundingClientRect().width > 8 && el.getBoundingClientRect().height > 8) || null;
      }
      if (descriptor.kind === "framerNameTop") {
        const list = Array.from(document.querySelectorAll(`[data-framer-name="${descriptor.name.replaceAll('"', '\\"')}"]`));
        return (
          list
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.top <= descriptor.maxTop && r.width > window.innerWidth * 0.5 && r.height > 20;
            })
            .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0] || null
        );
      }
      if (descriptor.kind === "framerNameAfterTop") {
        const list = Array.from(document.querySelectorAll(`[data-framer-name="${descriptor.name.replaceAll('"', '\\"')}"]`));
        return (
          list
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.top + window.scrollY >= descriptor.minTop && r.width > 200 && r.height > 40;
            })
            .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0] || null
        );
      }
      if (descriptor.kind === "textIncludes") {
        const list = Array.from(document.querySelectorAll("*"));
        return list.find((el) => normalize(el.textContent).includes(descriptor.text)) || null;
      }
      return null;
    };
    const el = pick(target);
    if (!el) {
      return {
        id: target.id,
        viewport: viewportId,
        found: false
      };
    }
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      id: target.id,
      viewport: viewportId,
      found: true,
      source: {
        selector:
          target.selector ||
          (target.kind === "framerName" ? `[data-framer-name="${target.name}"]` : target.kind),
        framerName: el.getAttribute("data-framer-name"),
        className: (el.className || "").toString().slice(0, 180)
      },
      textSample: normalize(el.textContent).slice(0, 180),
      typography: {
        fontFamily: cs.fontFamily,
        fontSizePx: px(cs.fontSize),
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform
      },
      color: {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        borderColor: cs.borderColor,
        opacity: cs.opacity
      },
      boxModel: {
        widthPx: px(cs.width),
        heightPx: px(cs.height),
        minWidthPx: px(cs.minWidth),
        minHeightPx: px(cs.minHeight),
        maxWidthPx: cs.maxWidth,
        maxHeightPx: cs.maxHeight,
        marginTopPx: px(cs.marginTop),
        marginRightPx: px(cs.marginRight),
        marginBottomPx: px(cs.marginBottom),
        marginLeftPx: px(cs.marginLeft),
        paddingTopPx: px(cs.paddingTop),
        paddingRightPx: px(cs.paddingRight),
        paddingBottomPx: px(cs.paddingBottom),
        paddingLeftPx: px(cs.paddingLeft),
        gap: cs.gap
      },
      effects: {
        borderRadius: cs.borderRadius,
        borderTopWidth: cs.borderTopWidth,
        borderRightWidth: cs.borderRightWidth,
        borderBottomWidth: cs.borderBottomWidth,
        borderLeftWidth: cs.borderLeftWidth,
        boxShadow: cs.boxShadow,
        filter: cs.filter,
        backdropFilter: cs.backdropFilter
      },
      layout: {
        display: cs.display,
        position: cs.position,
        top: cs.top,
        right: cs.right,
        bottom: cs.bottom,
        left: cs.left,
        zIndex: cs.zIndex,
        flexDirection: cs.flexDirection,
        flexWrap: cs.flexWrap,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        gridTemplateColumns: cs.gridTemplateColumns,
        gridTemplateRows: cs.gridTemplateRows,
        objectFit: cs.objectFit,
        aspectRatio: cs.aspectRatio
      },
      motion: {
        transitionProperty: cs.transitionProperty,
        transitionDuration: cs.transitionDuration,
        transitionDelay: cs.transitionDelay,
        transitionTimingFunction: cs.transitionTimingFunction,
        animationName: cs.animationName,
        animationDuration: cs.animationDuration,
        animationDelay: cs.animationDelay,
        animationTimingFunction: cs.animationTimingFunction
      },
      geometry: {
        topPx: Math.round(r.top + window.scrollY),
        leftPx: Math.round(r.left),
        widthPx: Math.round(r.width),
        heightPx: Math.round(r.height)
      }
    };
  }, { target, viewportId });
}

async function snapshotState(locator) {
  const handle = await locator.elementHandle();
  if (!handle) return null;
  return handle.evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      borderColor: cs.borderColor,
      opacity: cs.opacity,
      transform: cs.transform,
      boxShadow: cs.boxShadow,
      outline: cs.outline
    };
  });
}

async function collectInteractiveStates(page, viewportId) {
  const rows = [];
  for (const target of INTERACTIVE_TARGETS) {
    const locator = page.locator(target.selector, { hasText: target.text }).first();
    const count = await locator.count();
    if (count === 0) {
      rows.push({
        id: target.id,
        viewport: viewportId,
        found: false
      });
      continue;
    }

    const handle = await locator.elementHandle();
    if (!handle) {
      rows.push({
        id: target.id,
        viewport: viewportId,
        found: false
      });
      continue;
    }

    await locator.scrollIntoViewIfNeeded();
    await page.mouse.move(1, 1);
    await page.waitForTimeout(50);

    const defaultState = await snapshotState(locator);
    await locator.hover();
    await page.waitForTimeout(70);
    const hoverState = await snapshotState(locator);

    await locator.focus();
    await page.waitForTimeout(50);
    const focusState = await snapshotState(locator);

    const box = await locator.boundingBox();
    let activeState = null;
    let pressedState = null;
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(50);
      activeState = await snapshotState(locator);
      pressedState = activeState;
      await page.mouse.up();
      await page.waitForTimeout(30);
    }

    const disabled = await handle.evaluate((el) => {
      const ariaDisabled = (el.getAttribute("aria-disabled") || "").toLowerCase() === "true";
      const disabledProp = "disabled" in el ? Boolean(el.disabled) : false;
      return ariaDisabled || disabledProp;
    });

    rows.push({
      id: target.id,
      viewport: viewportId,
      found: true,
      selector: target.selector,
      text: target.text,
      states: {
        default: defaultState,
        hover: hoverState,
        focusVisibleApprox: focusState,
        active: activeState,
        pressed: pressedState,
        disabled: disabled
      }
    });
  }
  return rows;
}

async function collectMotionMap(page, viewportId) {
  return page.evaluate((viewportId) => {
    const rows = [];
    const all = Array.from(document.querySelectorAll("*"));
    for (const el of all) {
      const cs = getComputedStyle(el);
      const hasTransition =
        cs.transitionProperty !== "all" ||
        cs.transitionDuration !== "0s" ||
        cs.transitionDelay !== "0s" ||
        cs.transitionTimingFunction !== "ease";
      const hasAnimation = cs.animationName && cs.animationName !== "none";
      if (!hasTransition && !hasAnimation) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      rows.push({
        viewport: viewportId,
        source: {
          framerName: el.getAttribute("data-framer-name"),
          className: (el.className || "").toString().slice(0, 140),
          tagName: el.tagName
        },
        transitionProperty: cs.transitionProperty,
        transitionDuration: cs.transitionDuration,
        transitionDelay: cs.transitionDelay,
        transitionTimingFunction: cs.transitionTimingFunction,
        animationName: cs.animationName,
        animationDuration: cs.animationDuration,
        animationDelay: cs.animationDelay,
        animationTimingFunction: cs.animationTimingFunction,
        transform: cs.transform,
        topPx: Math.round(r.top + window.scrollY),
        leftPx: Math.round(r.left)
      });
      if (rows.length >= 300) break;
    }
    return rows;
  }, viewportId);
}

async function collectAssets(page) {
  return page.evaluate(() => {
    const absolutize = (v) => {
      if (!v) return null;
      try {
        return new URL(v, window.location.href).href;
      } catch {
        return null;
      }
    };
    const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));
    const parseSrcset = (value) =>
      (value || "")
        .split(",")
        .map((item) => item.trim().split(" ")[0])
        .map(absolutize)
        .filter(Boolean);

    const imgs = Array.from(document.querySelectorAll("img"))
      .flatMap((img) => [absolutize(img.getAttribute("src")), ...parseSrcset(img.getAttribute("srcset"))]);
    const videos = Array.from(document.querySelectorAll("video, source"))
      .flatMap((el) => [absolutize(el.getAttribute("src")), ...parseSrcset(el.getAttribute("srcset"))]);
    const links = Array.from(document.querySelectorAll("link"))
      .filter((el) => /(preload|stylesheet|icon|manifest)/i.test(el.getAttribute("rel") || ""))
      .map((el) => absolutize(el.getAttribute("href")));
    const scripts = Array.from(document.querySelectorAll("script[src]")).map((el) =>
      absolutize(el.getAttribute("src"))
    );
    const svgs = Array.from(document.querySelectorAll("use"))
      .map((el) => absolutize(el.getAttribute("href") || el.getAttribute("xlink:href")))
      .filter(Boolean);

    const fonts = [];
    if (document.fonts && document.fonts.forEach) {
      document.fonts.forEach((fontFace) => {
        fonts.push({
          family: fontFace.family,
          style: fontFace.style,
          weight: fontFace.weight,
          stretch: fontFace.stretch,
          status: fontFace.status
        });
      });
    }

    const all = uniq([...imgs, ...videos, ...links, ...scripts, ...svgs]);
    const inventory = all.map((url) => {
      let host = "unknown";
      try {
        host = new URL(url).hostname;
      } catch {
        host = "unknown";
      }
      const proprietary =
        host.endsWith("giga.ai") ||
        host.endsWith("framerusercontent.com") ||
        host.endsWith("framerstatic.com");
      return {
        url,
        host,
        proprietaryOrLicensed: proprietary ? "likely_proprietary" : "third_party_or_public",
        fallbackStrategy: proprietary
          ? "Replace with non-branded placeholders or licensed equivalents while preserving dimensions/aspect-ratio."
          : "Retain if license allows; otherwise replace with equivalent open-licensed asset."
      };
    });

    return {
      inventory,
      fonts
    };
  });
}

function metricsChanged(prev, next) {
  if (!prev) return false;
  const keys = Object.keys(next);
  for (const key of keys) {
    const a = prev[key];
    const b = next[key];
    if (typeof a === "number" && typeof b === "number") {
      if (Math.abs(a - b) > 0.5) return true;
    } else if (a !== b) {
      return true;
    }
  }
  return false;
}

async function collectResponsiveData(page) {
  const samples = [];
  for (let width = 320; width <= 1920; width += 10) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(40);
    const metrics = await page.evaluate(() => {
      const hero = document.querySelector('[data-framer-name="Hero"]');
      const h1 = hero?.querySelector("h1");
      const nav = Array.from(document.querySelectorAll('[data-framer-name="Variant 1"]'))
        .filter((el) => el.getBoundingClientRect().top <= 180)
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
      const canvas = document.querySelector('[data-framer-name="Agent Canvas"]');
      const rect = (el) => (el ? el.getBoundingClientRect() : { width: 0, height: 0 });
      const heroRect = rect(hero);
      const navRect = rect(nav);
      const canvasRect = rect(canvas);
      const h1Cs = h1 ? getComputedStyle(h1) : null;
      return {
        heroHeight: Number(heroRect.height.toFixed(2)),
        heroWidth: Number(heroRect.width.toFixed(2)),
        navHeight: Number(navRect.height.toFixed(2)),
        canvasWidth: Number(canvasRect.width.toFixed(2)),
        h1FontSize: h1Cs ? Number.parseFloat(h1Cs.fontSize) : 0,
        h1LineHeight: h1Cs ? h1Cs.lineHeight : "0px"
      };
    });
    samples.push({ width, metrics });
  }

  const boundaries = [];
  let prev = null;
  for (const sample of samples) {
    if (metricsChanged(prev?.metrics, sample.metrics)) {
      boundaries.push(sample.width);
    }
    prev = sample;
  }

  const mediaQueries = await page.evaluate(() => {
    const queries = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules || [])) {
          if (rule.type === CSSRule.MEDIA_RULE) {
            queries.push(rule.conditionText);
          }
        }
      } catch {
        // Cross-origin stylesheets are intentionally skipped.
      }
    }
    return Array.from(new Set(queries));
  });

  return {
    coarseBoundariesPx: boundaries,
    samples,
    mediaQueries
  };
}

async function run() {
  await mkdirp(RAW_DIR);
  await mkdirp(SHOT_DIR);

  const startedAt = new Date();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const network = [];
  page.on("response", (response) => {
    const headers = response.headers();
    network.push({
      url: response.url(),
      status: response.status(),
      contentType: headers["content-type"] || "",
      cacheControl: headers["cache-control"] || ""
    });
  });

  const perViewport = [];

  for (const viewport of VIEWPORTS) {
    const vpDir = path.join(SHOT_DIR, viewport.id);
    const vpSectionDir = path.join(vpDir, "sections");
    await mkdirp(vpSectionDir);

    await loadAndStabilize(page, viewport);

    await takeFullScreenshot(page, path.join(vpDir, "full.png"));

    const sectionShots = {
      headerNav: await captureHeaderNav(page, path.join(vpSectionDir, "header-nav.png")),
      hero: await captureByFramerName(page, "Hero", path.join(vpSectionDir, "hero.png")),
      socialProofLogos: await captureLogoBand(page, path.join(vpSectionDir, "social-proof-logos.png"), viewport),
      featureAgentCanvas: await captureByFramerName(
        page,
        "Agent Canvas",
        path.join(vpSectionDir, "feature-agent-canvas.png")
      ),
      featureInsights: await captureByFramerName(page, "Insights", path.join(vpSectionDir, "feature-insights.png")),
      featureVoice: await captureByFramerName(
        page,
        "Voice Experience",
        path.join(vpSectionDir, "feature-voice-experience.png")
      ),
      cards: await captureCustomerSpotlight(page, path.join(vpSectionDir, "cards-customer-spotlight.png")),
      ctaHero: await captureByFramerName(page, "Main CTA", path.join(vpSectionDir, "cta-hero-main.png")),
      ctaDemo: await captureByTextRegion(page, "GET A PERSONALIZED DEMO", path.join(vpSectionDir, "cta-demo.png")),
      footer: await captureFooter(page, path.join(vpSectionDir, "footer.png")),
      mobileMenuOverlay: await captureMobileMenuOverlay(
        page,
        path.join(vpSectionDir, "mobile-menu-overlay.png"),
        viewport
      )
    };

    const domSections = await collectDomSections(page);
    const styleTargets = [];
    for (const target of STYLE_TARGETS) {
      styleTargets.push(await collectStyleTarget(page, target, viewport.id));
    }

    const interactiveStates = await collectInteractiveStates(page, viewport.id);
    const motionMap = await collectMotionMap(page, viewport.id);

    perViewport.push({
      viewport,
      url: page.url(),
      title: await page.title(),
      sectionScreenshots: sectionShots,
      domSections,
      styleTargets,
      interactiveStates,
      motionMap
    });
  }

  await loadAndStabilize(page, VIEWPORTS[0]);
  const responsive = await collectResponsiveData(page);
  const assets = await collectAssets(page);

  const uniqueNetwork = Array.from(
    new Map(network.map((entry) => [`${entry.url}|${entry.status}|${entry.contentType}`, entry])).values()
  );

  const result = {
    generatedAt: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referenceUrl: REFERENCE_URL,
    startedAt: startedAt.toISOString(),
    finishedAt: new Date().toISOString(),
    viewports: perViewport,
    responsive,
    assets,
    network: uniqueNetwork
  };

  await writeJson(path.join(RAW_DIR, "forensic-audit.json"), result);
  await writeJson(path.join(RAW_DIR, "network-responses.json"), uniqueNetwork);

  await browser.close();
  console.log(`Wrote forensic audit: ${path.join(RAW_DIR, "forensic-audit.json")}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
