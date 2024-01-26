<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms/client'
	import Input from '../ui/input/input.svelte'
	import { createCompanySchema, type CreateCompanySchema } from '$lib/shared/validations/company'
	export let data
	import { valibot } from 'sveltekit-superforms/adapters'
	import Button from '../ui/button/button.svelte'
	const { form, errors, enhance } = superForm(data, {
		validators: valibot(createCompanySchema, { defaults: { url: '', name: '', size: 1 } })
	})
</script>

<form method="post" use:enhance action="?/createCompany">
	<Input bind:value={$form.size} />
	<Button type="submit">Create</Button>
</form>
