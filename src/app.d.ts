// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'vite-plugin-pwa/svelte';
import 'vite-plugin-pwa/info';
declare global {
	namespace App {
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
