<script lang="ts">
	import LanguageSwitcher from './LanguageSwitcher.svelte'
	import ModeToggler from './ModeToggler.svelte'
	import UserDropdown from './UserDropdown.svelte'
	import Button from './ui/button/button.svelte'
	import { i18n } from '$lib/i18n'
	import * as m from '$paraglide/messages'
	import SvelteLink from './SvelteLink.svelte'
	import TimeTracker from './TimeTracker.svelte'

	interface IUser {
		username: string
		email: string
	}
	export let user: IUser | null
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center gap-2">
		{#if user}
			<TimeTracker></TimeTracker>

			<div class="ml-auto flex items-center space-x-4">
				<ModeToggler></ModeToggler>
				<LanguageSwitcher></LanguageSwitcher>
				<UserDropdown {user}></UserDropdown>
			</div>
		{:else}
			<Button variant="outline" href="login">Anmelden</Button>
			<Button variant="secondary" href="register">Registrieren</Button>
		{/if}
	</div>
</header>
