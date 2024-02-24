<script lang="ts">
	import FormWrapper from './FormWrapper.svelte'
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms'
	import * as m from '$paraglide/messages.js'
	import { loginUserSchema, type TLoginUserSchema } from '$schemas/auth'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'

	import { valibotClient } from 'sveltekit-superforms/adapters'
	export let data: SuperValidated<Infer<TLoginUserSchema>>
	export let dataType
	export let invalidateAll = false
	const form = superForm(data, {
		dataType,
		multipleSubmits: 'abort',
		invalidateAll,
		validators: valibotClient(loginUserSchema)
	})

	const { form: formData, enhance, delayed } = form
</script>

{$delayed}

<div class="flex items-center justify-center md:h-[90.5vh]">
	<FormWrapper description={m.enter_username_and_password()} title={m.login()}>
		<form method="POST" class="grid gap-4" use:enhance {...$$restProps}>
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>{m.username()}</Form.Label>
					<Input {...attrs} bind:value={$formData.username} /></Form.Control
				>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>{m.password()}</Form.Label>
					<Input {...attrs} bind:value={$formData.password} /></Form.Control
				>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button aria-busy={$delayed}>Submit</Form.Button>
		</form></FormWrapper
	>
</div>
