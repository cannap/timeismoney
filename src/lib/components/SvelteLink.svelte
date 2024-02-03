<script lang="ts">
	export let path = ''
	import { i18n } from '$lib/i18n'
	import { page } from '$app/stores'
	import { cn } from '$lib/utils'
</script>

<a
	class={cn(
		'transition-colors hover:text-foreground/80',
		i18n.route($page.url.pathname) === path ? 'text-foreground' : 'text-foreground/60'
	)}
	href={path}><slot /></a
>
