<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { availableLanguageTags, sourceLanguageTag } from '$paraglide/runtime'
	import { translatePath } from '../i18n'

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

<ModeToggler></ModeToggler>

<Button on:click={handleSignOut}>Logout</Button>
<svelte:head>
	{#each availableLanguageTags as lang}
		<link rel="alternate" hreflang={lang} href={translatePath($page.url.pathname, lang)} />
	{/each}
</svelte:head>
