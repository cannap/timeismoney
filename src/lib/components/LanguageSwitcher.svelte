<script lang="ts">
	import { availableLanguageTags, languageTag } from '$paraglide/runtime'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import { Globe2 } from 'lucide-svelte'
	import { i18n } from '$lib/i18n'
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon">
			<Globe2
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Language Switcher</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		{#each availableLanguageTags as lang}
			<DropdownMenu.Item>
				<a
					href={i18n.route($page.url.pathname)}
					hreflang={lang}
					class="lang"
					aria-current={languageTag() === lang ? 'true' : undefined}
					data-sveltekit-keepfocus>{lang.toUpperCase()}</a
				>
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>

{languageTag()}

{#each availableLanguageTags as lang}
	<a
		href={i18n.route($page.url.pathname)}
		hreflang={lang}
		class="lang"
		aria-current={languageTag() === lang ? 'true' : undefined}
		data-sveltekit-keepfocus>{lang.toUpperCase()}</a
	>
{/each}
