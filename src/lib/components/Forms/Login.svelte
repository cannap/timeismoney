<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms/client'
	import * as m from '$paraglide/messages.js'
	import { loginUserSchema, type TLoginUserSchema } from '$schemas/auth'

	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import FormWrapper from './FormWrapper.svelte'
	import { valibotClient } from 'sveltekit-superforms/adapters'
	export let data: SuperValidated<TLoginUserSchema>
	export let dataType
	export let invalidateAll = false
	const { form, errors, enhance } = superForm(data, {
		dataType,
		invalidateAll,
		validators: valibotClient(loginUserSchema)
	})
</script>

<div class="flex items-center justify-center md:h-[90.5vh]">
	<FormWrapper description={m.enter_username_and_password()} title={m.login()}>
		<form method="POST" class="grid gap-4" use:enhance {...$$restProps}>
			<Input
				label={m.username()}
				type="text"
				error={$errors.username}
				autocomplete="username"
				name="username"
				id="username"
				bind:value={$form.username}
			/>

			<Input
				label={m.password()}
				type="password"
				error={$errors.password}
				name="password"
				autocomplete="current-password"
				id="password"
				bind:value={$form.password}
			/>
			<Button type="submit" class="w-full">{m.next()}</Button>
		</form>
		<svelte:fragment slot="footer">
			<div class="grid gap-4">
				{m.dont_have_account()}
				<a href="/register" class="text-blue-500 underline underline-offset-1">{m.signup()}</a>
			</div>
		</svelte:fragment>
	</FormWrapper>
</div>
