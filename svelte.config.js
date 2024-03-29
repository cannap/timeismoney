import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],
	vitePlugin: {
		inspector: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		files: {
			serviceWorker: 'src/sw.js' // or `src/my-sw.ts`
		},
		adapter: adapter({}),
		csrf: { checkOrigin: false },
		alias: {
			$paraglide: './src/paraglide/',
			$db: './src/lib/server/db/',
			$forms: './src/lib/components/Forms/',
			$schemas: './src/lib/schemas/'
		}
	}
}

export default config
