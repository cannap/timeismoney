<script lang="ts">
	import type { PageData } from './$types'
	import * as m from '$paraglide/messages.js'
	export let data: PageData
	import Login from '$lib/components/Forms/Login.svelte'
</script>

<svelte:head>
	<title>{m.login()}</title>
	<Login action="?/login" data={data?.form} />
</svelte:head>
