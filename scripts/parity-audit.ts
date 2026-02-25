import { chromium } from '@playwright/test';
import * as fs from 'fs';

const VIEWPORTS = [
	{ name: '1920x1080', width: 1920, height: 1080 },
	{ name: '1440x900', width: 1440, height: 900 },
	{ name: '1200x900', width: 1200, height: 900 },
	{ name: '1024x768', width: 1024, height: 768 },
	{ name: '810x1080', width: 810, height: 1080 },
	{ name: '390x844', width: 390, height: 844 }
];

const SECTIONS = [
	{ id: 'hero', selector: 'section.hero' },
	{ id: 'product_stack', selector: 'section.product-stack' },
	{ id: 'customer_spotlight', selector: 'section.spotlight' },
	{ id: 'demo_cta', selector: 'section.demo-cta' },
	{ id: 'footer', selector: 'section.footer' }
];

const EXPECTED: Record<string, Record<string, { width: number; height: number }>> = {
	hero: {
		'1920x1080': { width: 1920, height: 1080 },
		'1440x900': { width: 1440, height: 900 },
		'1200x900': { width: 1200, height: 900 },
		'1024x768': { width: 1024, height: 800 },
		'810x1080': { width: 810, height: 1080 },
		'390x844': { width: 390, height: 1000 }
	},
	product_stack: {
		'1920x1080': { width: 1920, height: 3693.8 },
		'1440x900': { width: 1440, height: 3693.8 },
		'1200x900': { width: 1200, height: 3693.8 },
		'1024x768': { width: 1024, height: 3331 },
		'810x1080': { width: 810, height: 3334 },
		'390x844': { width: 390, height: 5719 }
	},
	customer_spotlight: {
		'1920x1080': { width: 1920, height: 954.8 },
		'1440x900': { width: 1440, height: 954.8 },
		'1200x900': { width: 1200, height: 954.8 },
		'1024x768': { width: 1024, height: 954.8 },
		'810x1080': { width: 810, height: 1015.8 },
		'390x844': { width: 390, height: 1350.8 }
	},
	demo_cta: {
		'1920x1080': { width: 1920, height: 403 },
		'1440x900': { width: 1440, height: 403 },
		'1200x900': { width: 1200, height: 403 },
		'1024x768': { width: 1024, height: 424 },
		'810x1080': { width: 810, height: 445 },
		'390x844': { width: 390, height: 486 }
	},
	footer: {
		'1920x1080': { width: 1920, height: 740 },
		'1440x900': { width: 1440, height: 740 },
		'1200x900': { width: 1200, height: 740 },
		'1024x768': { width: 1024, height: 740 },
		'810x1080': { width: 810, height: 740 },
		'390x844': { width: 390, height: 1010 }
	}
};

interface GapRow {
	section: string;
	viewport: string;
	property: string;
	expected: string;
	actual: string;
	delta: string;
	severity: string;
	fix: string;
}

async function runAudit() {
	const browser = await chromium.launch();
	const gaps: GapRow[] = [];

	for (const vp of VIEWPORTS) {
		const context = await browser.newContext({
			viewport: { width: vp.width, height: vp.height }
		});
		const page = await context.newPage();

		try {
			await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
			await page.waitForTimeout(1000);

			for (const section of SECTIONS) {
				const el = page.locator(section.selector).first();
				const isVisible = await el.isVisible().catch(() => false);

				if (!isVisible) {
					gaps.push({
						section: section.id,
						viewport: vp.name,
						property: 'presence',
						expected: 'visible',
						actual: 'not found',
						delta: 'N/A',
						severity: 'critical',
						fix: `Add ${section.id} section to page`
					});
					continue;
				}

				const box = await el.boundingBox();
				if (!box) continue;

				const expected = EXPECTED[section.id]?.[vp.name];
				if (!expected) continue;

				const widthDelta = Math.abs(box.width - expected.width);
				const heightDelta = Math.abs(box.height - expected.height);
				const threshold = vp.width < 810 ? 2 : 1;

				if (widthDelta > threshold) {
					gaps.push({
						section: section.id,
						viewport: vp.name,
						property: 'width',
						expected: `${expected.width}px`,
						actual: `${box.width}px`,
						delta: `${widthDelta.toFixed(1)}px`,
						severity: widthDelta > 10 ? 'critical' : widthDelta > 3 ? 'high' : 'medium',
						fix: `Adjust ${section.id} width at ${vp.name}`
					});
				}

				if (heightDelta > threshold) {
					gaps.push({
						section: section.id,
						viewport: vp.name,
						property: 'height',
						expected: `${expected.height}px`,
						actual: `${box.height}px`,
						delta: `${heightDelta.toFixed(1)}px`,
						severity: heightDelta > 50 ? 'critical' : heightDelta > 10 ? 'high' : 'medium',
						fix: `Adjust ${section.id} height at ${vp.name}`
					});
				}
			}
		} finally {
			await context.close();
		}
	}

	await browser.close();

	const report = {
		generated_at: new Date().toISOString(),
		total_checks: VIEWPORTS.length * SECTIONS.length * 2,
		gaps_found: gaps.length,
		critical: gaps.filter((g) => g.severity === 'critical').length,
		high: gaps.filter((g) => g.severity === 'high').length,
		medium: gaps.filter((g) => g.severity === 'medium').length,
		rows: gaps
	};

	fs.writeFileSync('audit/local/parity-report.json', JSON.stringify(report, null, 2));

	console.log('\n=== PARITY AUDIT REPORT ===');
	console.log(`Total checks: ${report.total_checks}`);
	console.log(`Gaps found: ${report.gaps_found}`);
	console.log(`  Critical: ${report.critical}`);
	console.log(`  High: ${report.high}`);
	console.log(`  Medium: ${report.medium}`);

	if (gaps.length > 0) {
		console.log('\n| Section | Viewport | Property | Expected | Actual | Delta | Severity |');
		console.log('|---------|----------|----------|----------|--------|-------|----------|');
		for (const gap of gaps) {
			console.log(
				`| ${gap.section} | ${gap.viewport} | ${gap.property} | ${gap.expected} | ${gap.actual} | ${gap.delta} | ${gap.severity} |`
			);
		}
	} else {
		console.log('\nAll checks passed within threshold!');
	}
}

runAudit().catch(console.error);
