<script lang="ts">
	import '../app.scss'
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import Header from '$lib/components/Header.svelte'

	import { ModeWatcher } from 'mode-watcher'
	import { pwaInfo } from 'virtual:pwa-info'
	import type { LayoutServerData } from './$types'
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit'
	import { i18n } from '$lib/i18n'
	export let data: LayoutServerData

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<ModeWatcher />

<svelte:head>
	{@html webManifestLink}
</svelte:head>
<ParaglideJS {i18n}>
	<Header></Header>
	<slot />
</ParaglideJS>

{#await import('$lib/components/ReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt></ReloadPrompt>
{/await}
