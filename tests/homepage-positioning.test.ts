import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

const homepageSource = [
	read('src/routes/+page.svelte'),
	read('src/lib/sections/TopNavDesktop.svelte'),
	read('src/lib/sections/Hero.svelte'),
	read('src/lib/sections/ProductStack.svelte'),
	read('src/lib/sections/CustomerSpotlight.svelte'),
	read('src/lib/sections/DemoCTA.svelte'),
	read('src/lib/sections/Footer.svelte')
].join('\n');

describe('AI agent agency homepage positioning', () => {
	it('leads with plain-language autonomous agent metaphors', () => {
		expect(homepageSource).toContain('AI automation agency');
		expect(homepageSource).toContain('We set up autonomous AI agents for your business');
		expect(homepageSource).toContain('AI employee');
		expect(homepageSource).toContain('Book a 15-minute setup call');
	});

	it('avoids tool-specific agent platform language', () => {
		expect(homepageSource).not.toContain('Hermes');
		expect(homepageSource).not.toContain('Hermes-based');
	});

	it('targets legacy service firms with concrete workflow examples', () => {
		for (const phrase of [
			'law firms',
			'insurance agencies',
			'real estate teams',
			'manufacturers',
			'wholesalers',
			'lead follow-up',
			'inbox triage',
			'CRM updates'
		]) {
			expect(homepageSource).toContain(phrase);
		}
	});

	it('removes unsupported enterprise support and certification claims', () => {
		for (const staleClaim of [
			'DoorDash',
			'SOC2',
			'ISO 42001',
			'ISO 27001',
			'Enterprise AI agents for support operations',
			'Autonomous resolution',
			'Agent Canvas',
			'Smart Insights',
			'Voice Experience',
			'Browser Agent',
			'Andy Fang',
			'DWR',
			'production-ready deflection'
		]) {
			expect(homepageSource).not.toContain(staleClaim);
		}
	});
});
