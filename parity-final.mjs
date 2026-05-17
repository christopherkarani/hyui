import { chromium } from 'playwright';
const positions = [0, 800, 1600, 4000, 5400, 6200];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1500, height: 800 } });
const page = await ctx.newPage();
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 25000 });
await page.waitForTimeout(2500);
for (const y of positions) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/final-local-${String(y).padStart(4,'0')}.png` });
}
await browser.close();
console.log('done');
