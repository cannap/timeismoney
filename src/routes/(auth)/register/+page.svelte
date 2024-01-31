<script lang="ts">
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import Input from '$lib/components/ui/input/input.svelte'
	import * as m from '$paraglide/messages.js'

	import { valibot } from 'sveltekit-superforms/adapters'
	import { registerUserSchema } from '$validations/auth'
	import * as Card from '$lib/components/ui/card'
	import Button from '$lib/components/ui/button/button.svelte'

	export let data: PageData

	const { form, errors, enhance } = superForm(data.form, {
		validators: valibot(registerUserSchema)
	})
</script>

<div class="flex items-center justify-center md:h-[90.5vh]">
	<Card.Root class="md:w-[400px]">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl">Create an account</Card.Title>
			<Card.Description>Enter your email below to create your account</Card.Description>
		</Card.Header>
		<form method="post" use:enhance>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Input
						type="text"
						name="username"
						id="username"
						label="Benutzername"
						error={$errors.username}
						bind:value={$form.username}
					/>
				</div>
				<div class="grid gap-2">
					<Input
						label="Email"
						type="text"
						name="email"
						id="email"
						error={$errors.email}
						bind:value={$form.email}
					/>
				</div>
				<div class="grid gap-2">
					<Input
						label={m.password()}
						type="password"
						name="password"
						id="password"
						error={$errors.password}
						bind:value={$form.password}
					/>
				</div>
			</Card.Content>
			<Card.Footer class="Footer">
				<Button type="submit" class="w-full">{m.next()}</Button>
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
