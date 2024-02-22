<script lang="ts">
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import Input from '$lib/components/ui/input/input.svelte'
	import * as m from '$paraglide/messages.js'
	import { valibotClient } from 'sveltekit-superforms/adapters'
	import { registerUserSchema } from '$schemas/auth'
	import * as Card from '$lib/components/ui/card'
	import Button from '$lib/components/ui/button/button.svelte'

	export let data: PageData

	const { form, errors, enhance } = superForm(data.form, {
		validators: valibotClient(registerUserSchema)
	})
</script>

<div class="flex items-center justify-center md:h-[90.5vh]">
	<Card.Root class="md:w-[400px]">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl">{m.create_account()}</Card.Title>
			<Card.Description>{m.get_started()}</Card.Description>
		</Card.Header>
		<form method="post" use:enhance>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Input
						type="text"
						name="username"
						id="username"
						autocomplete="username"
						label={m.username()}
						error={$errors.username}
						bind:value={$form.username}
					/>
				</div>
				<div class="grid gap-2">
					<Input
						label="Email"
						type="text"
						name="email"
						autocomplete="email"
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
						autocomplete="new-password"
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
				{m.already_have_an_account()}
				<a href="/login" class="text-blue-500 underline underline-offset-1">{m.login()}</a>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
