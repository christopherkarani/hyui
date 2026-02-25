import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	// Only run Playwright-spec files; avoid unit tests that use Vitest in this folder
	testMatch: ['**/*.spec.ts'],
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry'
	},
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: !process.env.CI
	}
});
