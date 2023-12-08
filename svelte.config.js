import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
	preprocess: vitePreprocess(),

	kit: {
		// prerender: {
		// 	onError: 'continue',
		// 	entries: ['*'], // Include all routes for prerendering
		// },
		adapter: adapter(),
	}
};
