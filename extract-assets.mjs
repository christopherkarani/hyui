import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1500, height: 900 } });
const page = await ctx.newPage();

const assets = new Set();
page.on('response', (resp) => {
  const url = resp.url();
  const type = resp.request().resourceType();
  if (['image', 'media', 'font'].includes(type) && (url.startsWith('http://') || url.startsWith('https://'))) {
    assets.add(JSON.stringify({url, type, status: resp.status(), ct: resp.headers()['content-type']||''}));
  }
});

await page.goto('https://giga.ai', { waitUntil: 'networkidle', timeout: 30000 });
// Scroll the whole page to trigger lazy loads
const positions = [0, 800, 1600, 2400, 3200, 4000, 4800, 5600, 6400, 7200];
for (const y of positions) { await page.evaluate(y => window.scrollTo(0, y), y); await page.waitForTimeout(800); }
await page.waitForTimeout(2000);

console.log('---ASSETS---');
for (const a of assets) console.log(a);
await browser.close();
