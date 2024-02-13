<script lang="ts">
	import '../app.scss'

	import { ModeWatcher } from 'mode-watcher'
	import { pwaInfo } from 'virtual:pwa-info'
	import { Toaster } from 'svelte-sonner'
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit'
	import { i18n } from '$lib/i18n'
	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<Toaster richColors></Toaster>
<ModeWatcher />
<svelte:head>
	{@html webManifestLink}
</svelte:head>
<ParaglideJS {i18n}>
	<slot />
</ParaglideJS>

{#await import('$lib/components/ReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt></ReloadPrompt>
{/await}
