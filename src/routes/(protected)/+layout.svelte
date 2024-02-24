<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import Sidebar from './Sidebar.svelte'
	export let data
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
