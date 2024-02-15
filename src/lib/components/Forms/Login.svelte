<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms/client'
	import * as m from '$paraglide/messages.js'
	import { loginUserSchema, type TLoginUserSchema } from '$lib/schemas/auth'
	import * as Card from '$lib/components/ui/card'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'

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
	<Card.Root class="md:w-[400px]">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl">{m.login()}</Card.Title>
			<Card.Description>{m.enter_username_and_password()}</Card.Description>
		</Card.Header>
		<form method="post" use:enhance {...$$restProps}>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Input
						label={m.username()}
						type="text"
						error={$errors.username}
						name="username"
						id="username"
						bind:value={$form.username}
					/>
				</div>

				<div class="grid gap-2">
					<Input
						label={m.password()}
						type="password"
						error={$errors.password}
						name="password"
						autocomplete="current-password"
						id="password"
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
				{m.dont_have_account()}
				<a href="/register" class="text-blue-500 underline underline-offset-1">{m.signup()}</a>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
