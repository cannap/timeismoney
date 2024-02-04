<script lang="ts">
	import type { LayoutServerData } from './$types'

	import Header from '$lib/components/Header.svelte'
	import Sidebar from './Sidebar.svelte'
	export let data: LayoutServerData
</script>

<div class="flex">
	<Sidebar />
	<div class="flex-1">
		<Header user={data.user}></Header>
		<div class="flex-1 px-6">
			<slot />
		</div>
	</div>
</div>
