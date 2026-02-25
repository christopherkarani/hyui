import { chromium } from '@playwright/test';

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'mobile', width: 390, height: 844 }
];

const SECTIONS = [
  { name: 'product_stack', selector: 'section.product-stack' },
  { name: 'customer_spotlight', selector: 'section.spotlight' },
  { name: 'demo_cta', selector: 'section.demo-cta' },
  { name: 'footer', selector: 'section.footer' }
];

async function logStyles(page: any, section: typeof SECTIONS[number]) {
  const element = await page.locator(section.selector).first();
  const box = await element.boundingBox();
  const styles = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const computed = window.getComputedStyle(el);
    return {
      paddingTop: computed.paddingTop,
      paddingBottom: computed.paddingBottom,
      marginTop: computed.marginTop,
      marginBottom: computed.marginBottom,
      gap: computed.gap || '0',
      minHeight: computed.minHeight,
      borderTop: computed.borderTopWidth,
      borderBottom: computed.borderBottomWidth
    };
  }, section.selector);

  console.log(`  ${section.name.padEnd(16)} box=${box ? box.height.toFixed(2) + 'px' : 'missing'}`);
  if (styles) {
    console.log(`    padding-top: ${styles.paddingTop}, padding-bottom: ${styles.paddingBottom}, gap: ${styles.gap}, min-height: ${styles.minHeight}`);
  }
}

async function run() {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
    console.log(`Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    for (const section of SECTIONS) {
      await logStyles(page, section);
    }
    await context.close();
  }
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
