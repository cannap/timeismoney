import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { paraglide } from '@inlang/paraglide-js-adapter-sveltekit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [
		//basicSsl({}),
		paraglide({
			silent: false,
			project: './project.inlang', //Path to your inlang project
			outdir: './src/paraglide' //Where you want the generated files to be placed
		}),
		sveltekit(),
		SvelteKitPWA({
			mode: 'development',
			//	devOptions: { enabled: true },
			strategies: 'generateSW'
			//filename: 'sw.js', // or `my-sw.ts`

			/* other pwa options */
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
