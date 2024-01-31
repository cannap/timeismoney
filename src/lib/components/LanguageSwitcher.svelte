<script lang="ts">
	import { availableLanguageTags, languageTag } from '$paraglide/runtime'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import { i18n } from '$lib/i18n'
	import { Globe } from 'radix-icons-svelte'
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon">
			<Globe class="h-[1.2rem] w-[1.2rem]" />
			<span class="sr-only">Language Switcher</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		{#each availableLanguageTags as lang}
			<DropdownMenu.Item>
				<a
					href={i18n.route($page.url.pathname)}
					hreflang={lang}
					class="lang block flex-1"
					aria-current={languageTag() === lang ? 'true' : undefined}
					data-sveltekit-keepfocus>{lang.toUpperCase()}</a
				>
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
