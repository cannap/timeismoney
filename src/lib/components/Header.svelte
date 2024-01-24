<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import LanguageSwitcher from './LanguageSwitcher.svelte'
	import { i18n } from '$lib/i18n'

	import ModeToggler from './ModeToggler.svelte'
	import Button from './ui/button/button.svelte'

	async function handleSignOut() {
		const response = await fetch('logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			goto('login', {
				replaceState: true,
				invalidateAll: true
			})
		}
	}
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<ul>
			<li aria-current={i18n.route($page.url.pathname) === '/sverdle' ? 'page' : undefined}>
				<a href="/login">
					{'Login'}
				</a>
			</li>
		</ul>
		<ModeToggler></ModeToggler>

		<Button size="sm" on:click={handleSignOut}>Logout</Button>
		<LanguageSwitcher></LanguageSwitcher>
	</div>
</header>
