<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import LanguageSwitcher from './LanguageSwitcher.svelte'
	import { i18n } from '$lib/i18n'

	import ModeToggler from './ModeToggler.svelte'
	import Button from './ui/button/button.svelte'
	import UserDropdown from './UserDropdown.svelte'
	import { string } from 'valibot'

	export let user: { username: string; email: string } | undefined
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="ml-auto flex items-center space-x-4">
			<ModeToggler></ModeToggler>
			<LanguageSwitcher></LanguageSwitcher>
			<UserDropdown {user}></UserDropdown>
		</div>
	</div>
</header>
