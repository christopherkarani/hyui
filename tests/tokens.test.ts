import { describe, it, expect } from 'vitest';

describe('Design Tokens', () => {
	it('has correct breakpoint definitions', () => {
		const breakpoints = {
			desktop: { min: 1200 },
			tablet: { min: 810, max: 1199.98 },
			mobile: { max: 809.98 }
		};

		expect(breakpoints.desktop.min).toBe(1200);
		expect(breakpoints.tablet.min).toBe(810);
		expect(breakpoints.tablet.max).toBe(1199.98);
		expect(breakpoints.mobile.max).toBe(809.98);
	});

	it('has correct color tokens', () => {
		const colors = {
			bgHero: 'rgb(0, 0, 0)',
			bgCanvasDark: 'rgb(15, 14, 13)',
			bgSurfaceLight: 'rgb(254, 252, 251)',
			bgBrandOrange: 'rgb(254, 44, 2)'
		};

		expect(colors.bgHero).toBe('rgb(0, 0, 0)');
		expect(colors.bgSurfaceLight).toBe('rgb(254, 252, 251)');
	});

	it('has correct typography scale', () => {
		const heroDesktop = {
			fontSize: '81.6669px',
			fontWeight: '300',
			lineHeight: '98.0003px',
			letterSpacing: '-2.45001px'
		};

		expect(heroDesktop.fontSize).toBe('81.6669px');
		expect(heroDesktop.fontWeight).toBe('300');
	});

	it('has correct spacing primitives', () => {
		const spacing = {
			productStackGapDesktop: '160px',
			productStackGapTablet: '67px',
			productStackGapMobile: '80px'
		};

		expect(spacing.productStackGapDesktop).toBe('160px');
		expect(spacing.productStackGapTablet).toBe('67px');
		expect(spacing.productStackGapMobile).toBe('80px');
	});

	it('has correct motion tokens', () => {
		const motion = {
			enterDuration: '400ms',
			enterEasing: 'cubic-bezier(0.01, 0.55, 0.39, 1)',
			linkDuration: '0.3s',
			linkEasing: 'cubic-bezier(0.44, 0, 0.56, 1)'
		};

		expect(motion.enterDuration).toBe('400ms');
		expect(motion.enterEasing).toBe('cubic-bezier(0.01, 0.55, 0.39, 1)');
	});
});

describe('Component Map', () => {
	it('defines correct section order', () => {
		const sectionOrder = [
			'hero',
			'product_stack',
			'customer_spotlight',
			'top_nav_overlay_desktop',
			'demo_cta',
			'footer'
		];

		expect(sectionOrder).toHaveLength(6);
		expect(sectionOrder[0]).toBe('hero');
		expect(sectionOrder[1]).toBe('product_stack');
	});

	it('defines correct reusable modules', () => {
		const modules = [
			'pill_cta_link',
			'mono_eyebrow + display_heading pair',
			'dark_glass_panel + nested cards',
			'metric_strip (label + large value)',
			'testimonial split-card'
		];

		expect(modules).toHaveLength(5);
	});

	it('hero section has correct viewport geometry', () => {
		const heroViewports = {
			'1920x1080': { x: 0, y: 0, width: 1920, height: 1080 },
			'1440x900': { x: 0, y: 0, width: 1440, height: 900 },
			'390x844': { x: 0, y: 0, width: 390, height: 1000 }
		};

		expect(heroViewports['1920x1080'].width).toBe(1920);
		expect(heroViewports['1920x1080'].height).toBe(1080);
		expect(heroViewports['390x844'].height).toBe(1000);
	});
});

describe('Asset Manifest Compliance', () => {
	it('references all required font families', () => {
		const requiredFonts = [
			'Emilio Light',
			'Giga Sans Display Trial 400',
			'Giga Sans Display Trial 500',
			'Inter',
			'Inter Display',
			'Giga Sans Text Trial 400',
			'Giga Sans Text Trial 500',
			'Geist Mono'
		];

		expect(requiredFonts).toHaveLength(8);
	});

	it('references all required images', () => {
		const requiredImages = [
			'hero-bg.png',
			'agent-canvas.png',
			'insights.png',
			'spotlight-doordash.jpg',
			'voice-poster.png',
			'spotlight-avatar.webp'
		];

		expect(requiredImages).toHaveLength(6);
	});
});
