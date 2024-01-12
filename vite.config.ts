import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';
export default defineConfig({
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang', //Path to your inlang project
			outdir: './src/paraglide' //Where you want the generated files to be placed
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
