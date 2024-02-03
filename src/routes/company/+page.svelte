<script lang="ts">
	import { valibotClient } from 'sveltekit-superforms/adapters'
	import type { PageData, ActionData } from './$types'
	import { superForm } from 'sveltekit-superforms'
	import { createCompanySchema } from '$validations/company'
	import Button from '$lib/components/ui/button/button.svelte'
	import Input from '$lib/components/ui/input/input.svelte'
	import * as Alert from '$lib/components/ui/alert'
	import AlertCircle from 'lucide-svelte/icons/check'
	import MainContent from '$lib/components/MainContent.svelte'

	export let data: PageData

	const { enhance, form, errors, message } = superForm(data.form, {
		validators: valibotClient(createCompanySchema)
	})
</script>

<MainContent>
	<form class="flex flex-col gap-2" method="post" use:enhance action="?/createCompany">
		<div class="grid grid-flow-col gap-4">
			<Input
				id="name"
				class="w-full"
				error={$errors.name}
				label="Name"
				name="name"
				bind:value={$form.name}
			/>

			<Input
				class="w-full"
				id="size"
				error={$errors.size}
				type="number"
				label="Team Grösse"
				name="size"
				bind:value={$form.size}
			/>
		</div>

		<Input id="url" error={$errors.url} label="Webseite" name="url" bind:value={$form.url} />

		<Button type="submit">Erstellen</Button>
		{#if $message}
			<Alert.Root>
				<AlertCircle class="h-4 w-4" />
				<Alert.Title>Success</Alert.Title>
				<Alert.Description>{$message}</Alert.Description>
			</Alert.Root>
		{/if}
	</form>
</MainContent>
