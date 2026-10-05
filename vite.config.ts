import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {}
	},
	preview: {
		// Lets Cloudflare quick tunnels (phone testing) reach `vite preview`.
		allowedHosts: ['.trycloudflare.com']
	}
});
