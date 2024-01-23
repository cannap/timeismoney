<script lang="ts">
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import Label from '$lib/components/ui/label/label.svelte'
	import Input from '$lib/components/ui/input/input.svelte'
	import type { Infer } from 'sveltekit-superforms'

	import { valibot } from 'sveltekit-superforms/adapters'
	import { registerUserDefaults, registerUserSchema } from '$lib/shared/validations/auth'
	import * as Card from '$lib/components/ui/card'
	import Button from '$lib/components/ui/button/button.svelte'

	export let data: PageData

	const { form, errors, enhance } = superForm(data.form, {
		validators: valibot(registerUserSchema, { defaults: registerUserDefaults })
	})
</script>

<pre>{JSON.stringify($errors, null, 2)}</pre>
<div class="flex items-center justify-center md:h-[90.5vh]">
	<Card.Root class="md:w-[400px]">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl">Create an account</Card.Title>
			<Card.Description>Enter your email below to create your account</Card.Description>
		</Card.Header>
		<form method="post" use:enhance>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input type="text" name="username" id="username" bind:value={$form.username} />
					{$errors.username}
				</div>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input type="text" name="email" id="email" bind:value={$form.email} />
					{$errors.email}
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input type="password" name="password" id="password" bind:value={$form.password} />
				</div>
			</Card.Content>
			<Card.Footer class="Footer">
				<Button type="submit" class="w-full">Continue</Button>
			</Card.Footer>
		</form>
		<Card.Footer>
			<div>
				Already have an account? <a href="/login" class="text-blue-500 underline underline-offset-1"
					>Log In</a
				>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
