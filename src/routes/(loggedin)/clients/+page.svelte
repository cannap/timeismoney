<script lang="ts">
	import { valibotClient } from 'sveltekit-superforms/adapters'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms'
	import { createClientSchema } from '$lib/schemas/client'
	import Button from '$lib/components/ui/button/button.svelte'
	import Input from '$lib/components/ui/input/input.svelte'
	import * as Alert from '$lib/components/ui/alert'
	import AlertCircle from 'lucide-svelte/icons/check'
	import MainContent from '$lib/components/MainContent.svelte'
	import { toast } from 'svelte-sonner'
	export let data: PageData

	const { enhance, form, errors, message } = superForm(data.form, {
		validators: valibotClient(createClientSchema),
		onResult: ({ result, cancel }) => {
			if (result.type === 'success') {
				toast.success('Kunde erfolgreich erstellt.')
			}
		}
	})
</script>

<MainContent>
	<form class="flex flex-col flex-wrap gap-2" method="post" use:enhance action="?/createCompany">
		{#if $message}
			<Alert.Root>
				<AlertCircle class="h-4 w-4" />
				<Alert.Title>Success</Alert.Title>
				<Alert.Description>{$message}</Alert.Description>
			</Alert.Root>
		{/if}
		<div class="grid grid-flow-col flex-wrap gap-4">
			<Input
				id="name"
				class="w-full"
				error={$errors.name}
				label="Name"
				name="name"
				bind:value={$form.name}
			/>
		</div>

		<Input id="url" error={$errors.url} label="Webseite" name="url" bind:value={$form.url} />

		<Button type="submit">Erstellen</Button>
	</form>
</MainContent>
