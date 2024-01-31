<script lang="ts">
	import { valibot } from 'sveltekit-superforms/adapters'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms'
	import { createCompanySchema } from '$validations/company'
	import Button from '$lib/components/ui/button/button.svelte'
	export let data: PageData

	const { enhance } = superForm(data.form, {
		validators: valibot(createCompanySchema, { defaults: { size: 1, name: '' } })
	})
</script>

<form method="post" use:enhance action="?/createCompany">
	<Button type="submit">Erstellen</Button>
</form>
