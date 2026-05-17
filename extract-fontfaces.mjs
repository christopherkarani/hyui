import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1500, height: 900 } });
const page = await ctx.newPage();
await page.goto('https://giga.ai', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

const data = await page.evaluate(() => {
  const faces = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.type === CSSRule.FONT_FACE_RULE) faces.push(rule.cssText);
      }
    } catch(e) {}
  }
  const used = {};
  document.querySelectorAll('h1,h2,h3,h4,p,span,a,button,div,li').forEach(el => {
    const ff = getComputedStyle(el).fontFamily;
    used[ff] = (used[ff] || 0) + 1;
  });
  return { faces, used };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
