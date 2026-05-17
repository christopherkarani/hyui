import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1500, height: 900 } });
const page = await ctx.newPage();
await page.goto('https://giga.ai', { waitUntil: 'networkidle', timeout: 30000 });
const positions = [0, 800, 1600, 2400, 3200, 4000, 4800, 5600, 6400, 7200];
for (const y of positions) { await page.evaluate(y => window.scrollTo(0, y), y); await page.waitForTimeout(800); }
await page.waitForTimeout(2000);

// Grab DOM context for every image+video
const items = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('img').forEach((img) => {
    const r = img.getBoundingClientRect();
    out.push({ kind: 'img', src: img.currentSrc || img.src, alt: img.alt || '', w: img.naturalWidth, h: img.naturalHeight, top: r.top + window.scrollY, parentText: (img.parentElement?.textContent || '').slice(0, 80).trim() });
  });
  document.querySelectorAll('video').forEach((v) => {
    const sources = Array.from(v.querySelectorAll('source')).map(s => s.src);
    const r = v.getBoundingClientRect();
    out.push({ kind: 'video', src: v.currentSrc || v.src || sources[0], poster: v.poster || '', sources, top: r.top + window.scrollY });
  });
  // CSS background-images
  document.querySelectorAll('*').forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none' && bg.includes('framerusercontent')) {
      const r = el.getBoundingClientRect();
      out.push({ kind: 'bg', src: bg, tag: el.tagName, cls: el.className?.toString?.().slice(0, 80) || '', top: r.top + window.scrollY });
    }
  });
  return out;
});

console.log(JSON.stringify(items, null, 2));
await browser.close();
