<script lang="ts">
	import * as Card from '$lib/components/ui/card'

	import type { PageData } from './$types'
	import { Button } from '$lib/components/ui/button'
	import MainContent from '$lib/components/MainContent.svelte'
	export let data: PageData
</script>

<MainContent>
	{#if !data.companies.length}
		<p>Um zu beginnen tragen Sie eine Firma ein</p>
	{/if}
</MainContent>
