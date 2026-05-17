import { chromium } from 'playwright';

const positions = [0, 800, 1600, 2400, 3200, 4000, 4800, 5400, 6200];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1500, height: 800 } });

for (const url of ['http://localhost:5173', 'https://giga.ai']) {
  const page = await ctx.newPage();
  try { await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 }); }
  catch(e) { console.log('goto fallback for', url, e.message); await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 }); }
  await page.waitForTimeout(2500);
  const tag = url.includes('localhost') ? 'local' : 'giga';
  for (const y of positions) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `/tmp/cmp-${tag}-${String(y).padStart(4,'0')}.png`, fullPage: false });
  }
  await page.close();
}
await browser.close();
console.log('done');
