<script lang="ts">
	export let title = ''
	export let description = ''
	import * as Card from '$lib/components/ui/card'
</script>

<Card.Root class="md:w-[400px]">
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">{title}</Card.Title>
		{#if description}
			<Card.Description>{description}</Card.Description>{/if}
	</Card.Header>

	<Card.Content>
		<slot />
	</Card.Content>

	<Card.Footer>
		<slot name="submit" />
	</Card.Footer>

	<Card.Footer>
		<slot name="footer" />
	</Card.Footer>
</Card.Root>
