<script lang="ts">
	import '../app.scss'
	import { browser } from '$app/environment'
	import Header from '$lib/components/Header.svelte'
	import { availableLanguageTags, languageTag } from '$paraglide/runtime'
	import { page } from '$app/stores'
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
	{#if data.user}
		<Header user={{ username: data.user.username, email: data.user.email }}></Header>
	{:else}
		<!-- Handle the case when data.user is null -->
	{/if}
	<div class="container max-w-screen-2xl">
		<slot />
	</div>
</ParaglideJS>

{#await import('$lib/components/ReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt></ReloadPrompt>
{/await}
