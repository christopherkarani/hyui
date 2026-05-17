import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1500, height: 900 } });
const page = await ctx.newPage();
const failed = [];
page.on('response', r => { if (r.status() >= 400 && !r.url().includes('favicon')) failed.push(`${r.status()} ${r.url()}`); });
const res = await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 25000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/localhost-final.png' });
console.log('status:', res.status());
console.log('title:', await page.title());
console.log('failed requests:', failed.length === 0 ? 'none' : '\n  ' + failed.join('\n  '));
// Verify giga assets actually loaded
const counts = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].map(i => i.currentSrc || i.src);
  const giga = imgs.filter(s => s.includes('/giga/')).length;
  const old = imgs.filter(s => s.match(/\/(images|videos)\//) && !s.includes('/giga/')).length;
  return { totalImgs: imgs.length, gigaAssets: giga, oldRefs: old };
});
console.log('img refs:', JSON.stringify(counts));
await browser.close();
