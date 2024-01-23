import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		//basicSsl({}),
		sveltekit(),
		SvelteKitPWA({
			strategies: 'generateSW',
			mode: 'development',
			//filename: 'sw.js', // or `my-sw.ts`
			devOptions: {
				enabled: true
			}

			/* other pwa options */
		}),
		paraglide({
			project: './project.inlang', //Path to your inlang project
			outdir: './src/paraglide' //Where you want the generated files to be placed
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
