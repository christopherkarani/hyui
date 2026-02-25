import { test, expect, type Page } from '@playwright/test';

const VIEWPORTS = [
	{ name: '1920x1080', width: 1920, height: 1080 },
	{ name: '1440x900', width: 1440, height: 900 },
	{ name: '1200x900', width: 1200, height: 900 },
	{ name: '1024x768', width: 1024, height: 768 },
	{ name: '810x1080', width: 810, height: 1080 },
	{ name: '390x844', width: 390, height: 844 }
];

const SECTIONS = [
	{ name: 'hero', selector: 'section.hero' },
	{ name: 'product-stack', selector: 'section.product-stack' },
	{ name: 'spotlight', selector: 'section.spotlight' },
	{ name: 'demo-cta', selector: 'section.demo-cta' },
	{ name: 'footer', selector: 'section.footer' }
];

for (const vp of VIEWPORTS) {
	test.describe(`Viewport ${vp.name}`, () => {
		test.use({ viewport: { width: vp.width, height: vp.height } });

		test(`full page screenshot at ${vp.name}`, async ({ page }) => {
			await page.goto('/');
			await page.waitForLoadState('networkidle');
			await expect(page).toHaveScreenshot(`full-${vp.name}.png`, {
				fullPage: true,
				maxDiffPixelRatio: 0.02
			});
		});

		for (const section of SECTIONS) {
			test(`${section.name} section at ${vp.name}`, async ({ page }) => {
				await page.goto('/');
				await page.waitForLoadState('networkidle');
				const el = page.locator(section.selector).first();
				await expect(el).toBeVisible();
				await expect(el).toHaveScreenshot(
					`section-${section.name}-${vp.name}.png`,
					{ maxDiffPixelRatio: 0.02 }
				);
			});
		}

		if (vp.width >= 810) {
			test(`top nav visible at ${vp.name}`, async ({ page }) => {
				await page.goto('/');
				await page.waitForLoadState('networkidle');
				const nav = page.locator('nav.top-nav');
				await expect(nav).toBeVisible();
			});
		}

		if (vp.width < 810) {
			test(`top nav hidden, hamburger visible at ${vp.name}`, async ({ page }) => {
				await page.goto('/');
				await page.waitForLoadState('networkidle');
				const nav = page.locator('nav.top-nav');
				await expect(nav).not.toBeVisible();
				const hamburger = page.locator('button.hamburger');
				await expect(hamburger).toBeVisible();
			});

			test(`mobile menu overlay opens at ${vp.name}`, async ({ page }) => {
				await page.goto('/');
				await page.waitForLoadState('networkidle');
				await page.locator('button.hamburger').click();
				const overlay = page.locator('.mobile-overlay');
				await expect(overlay).toBeVisible();
				await expect(overlay).toHaveScreenshot(
					`mobile-overlay-${vp.name}.png`,
					{ maxDiffPixelRatio: 0.02 }
				);
			});
		}
	});
}

test.describe('Interaction states', () => {
	test.use({ viewport: { width: 1920, height: 1080 } });

	test('hero CTA hover state', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const cta = page.locator('.hero-cta');
		await cta.hover();
		const bg = await cta.evaluate((el) => getComputedStyle(el).backgroundColor);
		expect(bg).not.toBe('rgb(255, 255, 255)');
	});

	test('nav sign-in hover state', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const signin = page.locator('.nav-signin');
		await signin.hover();
		const bg = await signin.evaluate((el) => getComputedStyle(el).backgroundColor);
		expect(bg).not.toBe('rgba(0, 0, 0, 0)');
	});
});
