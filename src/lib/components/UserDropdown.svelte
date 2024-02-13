<script lang="ts">
	import { goto } from '$app/navigation'
	import * as Avatar from '$lib/components/ui/avatar'
	import { Button } from '$lib/components/ui/button'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import * as m from '$paraglide/messages.js'

	export let user = { username: '', email: '' }
	async function handleSignOut() {
		const response = await fetch('logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			goto('login', {
				replaceState: true,
				invalidateAll: true
			})
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-9 w-9">
				<Avatar.Image src="" alt={user.username} />
				<Avatar.Fallback>MB</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content>
		<DropdownMenu.Label>
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{user.username}</p>
				<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />

		<DropdownMenu.Item on:click={handleSignOut}>{m.logout()}</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
