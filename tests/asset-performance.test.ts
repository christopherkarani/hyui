import { statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const kb = (path: string) => Math.round(statSync(path).size / 1024);

describe('Asset performance budgets', () => {
	it('keeps responsive hero background variants under the first-viewport budget', () => {
		const heroVariants = [
			'static/pantaa/images/optimized/hero-bg-768.webp',
			'static/pantaa/images/optimized/hero-bg-1440.webp',
			'static/pantaa/images/optimized/hero-bg-1920.webp',
			'static/pantaa/images/optimized/hero-bg-2560.webp'
		];

		for (const path of heroVariants) {
			expect(kb(path), path).toBeLessThanOrEqual(350);
		}
	});

	it('keeps below-the-fold product visual variants compact', () => {
		const productVariants = [
			'static/pantaa/images/optimized/agent-canvas-ui-1600.webp',
			'static/pantaa/images/optimized/insights-ui-1600.webp',
			'static/pantaa/images/optimized/voice-poster-1600.webp'
		];

		for (const path of productVariants) {
			expect(kb(path), path).toBeLessThanOrEqual(350);
		}
	});

	it('uses compact JPEG fallbacks instead of original source PNGs', () => {
		const fallbackVariants = [
			'static/pantaa/images/optimized/hero-bg-2560.jpg',
			'static/pantaa/images/optimized/agent-canvas-ui-1600.jpg',
			'static/pantaa/images/optimized/insights-ui-1600.jpg',
			'static/pantaa/images/optimized/voice-poster-1600.jpg'
		];

		for (const path of fallbackVariants) {
			expect(kb(path), path).toBeLessThanOrEqual(450);
		}
	});
});
