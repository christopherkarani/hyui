import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { USE_CASES, INDUSTRIES, PROOF_CARDS, PLANS, FAQS, LINKS } from '../src/lib/receptionist/data';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src/lib/receptionist');

describe('Receptionist page data', () => {
	it('has 7 use cases with gradients, copy, and visuals', () => {
		expect(USE_CASES).toHaveLength(7);
		for (const u of USE_CASES) {
			expect(u.title.length).toBeGreaterThan(3);
			expect(u.description.length).toBeGreaterThan(20);
			expect(u.gradient).toContain('linear-gradient');
			expect(u.alt.length).toBeGreaterThan(10);
		}
	});

	it('has 8 industries with descriptions and transcripts', () => {
		expect(INDUSTRIES).toHaveLength(8);
		for (const ind of INDUSTRIES) {
			expect(ind.description.length).toBeGreaterThan(20);
			expect(ind.transcript.length).toBeGreaterThanOrEqual(4);
			expect(ind.panelName).toContain('Receptionist');
		}
	});

	it('has 4 proof cards with stats', () => {
		expect(PROOF_CARDS).toHaveLength(4);
		for (const c of PROOF_CARDS) {
			expect(c.stat.length).toBeGreaterThan(20);
		}
	});

	it('has 4 pricing plans with a featured popular tier', () => {
		expect(PLANS).toHaveLength(4);
		expect(PLANS.map((p) => p.name)).toEqual(['Free trial', 'Basic', 'Plus', 'Premium']);
		const plus = PLANS.find((p) => p.name === 'Plus');
		expect(plus?.badge).toBe('Most popular');
		expect(plus?.featured).toBe('gradient');
		expect(PLANS.find((p) => p.name === 'Basic')?.monthly).toBe(29);
		expect(PLANS.find((p) => p.name === 'Premium')?.monthly).toBe(199);
	});

	it('annual prices reflect 2 free months (10/12 of monthly, rounded)', () => {
		for (const p of PLANS) {
			if (p.monthly === null) continue;
			expect(p.annual).toBe(Math.round((p.monthly * 10) / 12));
		}
	});

	it('has 11 FAQs with answers', () => {
		expect(FAQS).toHaveLength(11);
		for (const f of FAQS) {
			expect(f.q.endsWith('?')).toBe(true);
			expect(f.a.length).toBeGreaterThan(20);
		}
	});

	it('points CTAs at Pantaa destinations only', () => {
		expect(LINKS.contact).toBe('/contact');
		expect(LINKS.calendly).toContain('calendly.com/');
		for (const v of Object.values(LINKS)) {
			expect(v).not.toMatch(/reception\.ai|elevenlabs/i);
		}
	});
});

describe('Receptionist brand isolation', () => {
	const files = [
		'data.ts',
		'RNav.svelte',
		'RHero.svelte',
		'RLogoStrip.svelte',
		'RVideo.svelte',
		'RUseCases.svelte',
		'RIndustries.svelte',
		'RProof.svelte',
		'RPricing.svelte',
		'RCalculator.svelte',
		'RFaq.svelte',
		'RFinalCta.svelte',
		'RFooter.svelte'
	];

	it.each(files)('%s mentions no reception.ai / elevenlabs brands', (f) => {
		const body = readFileSync(join(SRC, f), 'utf8');
		expect(body).not.toMatch(/reception\.ai|elevenlabs|elevenagents/i);
	});

	it('route page mentions no reception.ai / elevenlabs brands', () => {
		const body = readFileSync(join(ROOT, 'src/routes/receptionist/+page.svelte'), 'utf8');
		expect(body).not.toMatch(/reception\.ai|elevenlabs|elevenagents/i);
	});

	it('has no Get started free CTAs in live components', () => {
		const live = [
			'RNav.svelte',
			'RHero.svelte',
			'RVideo.svelte',
			'RUseCases.svelte',
			'RIndustries.svelte',
			'RPricing.svelte',
			'RCalculator.svelte',
			'RFaq.svelte',
			'RFinalCta.svelte',
			'RFooter.svelte'
		];
		for (const f of live) {
			expect(readFileSync(join(SRC, f), 'utf8')).not.toContain('Get started free');
		}
		expect(
			readFileSync(join(ROOT, 'src/routes/receptionist/+page.svelte'), 'utf8')
		).not.toContain('Get started free');
	});

	it('hides the logo strip and proof sections from the page', () => {
		const page = readFileSync(join(ROOT, 'src/routes/receptionist/+page.svelte'), 'utf8');
		expect(page).not.toContain('<RLogoStrip');
		expect(page).not.toContain('<RProof');
	});

	it('pricing section is a sales CTA linking to the sales call', () => {
		const pricing = readFileSync(join(SRC, 'RPricing.svelte'), 'utf8');
		expect(pricing).toContain('Talk to sales');
		expect(pricing).toContain('LINKS.calendly');
		expect(pricing).not.toContain('Subscribe');
	});
});

describe('Receptionist revenue math', () => {
	it('matches the reference defaults ($174,720/yr)', () => {
		const missed = 35;
		const rate = 40;
		const value = 120;
		const repeat = 2.0;
		const bookings = (missed * rate) / 100;
		const yearly = Math.round(bookings * value * repeat * 52);
		expect(bookings).toBe(14);
		expect(yearly).toBe(174720);
		expect(Math.round(yearly / 12)).toBe(14560);
	});
});

describe('Receptionist route + assets', () => {
	it('prerenders /receptionist', () => {
		const config = readFileSync(join(ROOT, 'svelte.config.js'), 'utf8');
		expect(config).toContain("'/receptionist'");
		expect(existsSync(join(ROOT, 'src/routes/receptionist/+page.svelte'))).toBe(true);
	});

	it.each([
		'static/receptionist/images/poster.png',
		'static/receptionist/images/agent-1.png',
		'static/receptionist/images/agent-2.png',
		'static/receptionist/images/Calendar.png',
		'static/receptionist/images/24_7.png',
		'static/receptionist/images/Languages_2.png',
		'static/receptionist/images/Online_booking.png',
		'static/receptionist/images/Booking.png',
		'static/receptionist/images/Location.png',
		'static/receptionist/images/noise.png',
		'static/receptionist/reception-preview.mp4'
	])('%s exists', (p) => {
		expect(existsSync(join(ROOT, p))).toBe(true);
	});
});
