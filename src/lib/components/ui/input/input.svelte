<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils'
	import type { InputEvents } from '.'
	import Label from '../label/label.svelte'
	interface $$Props extends HTMLInputAttributes {
		error?: string[] | undefined
		label?: string | undefined
		id: string | undefined
	}

	type $$Events = InputEvents
	let className: $$Props['class'] = undefined
	export let value: $$Props['value'] = undefined
	export let error: string[] | undefined = undefined
	export let label: string | undefined = undefined
	export let id: string = ''
	export { className as class }
</script>

{#if label}
	<Label error={!!error} for={id}>{label}</Label>
{/if}
<input
	class={cn(
		'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{id}
	{...$$restProps}
/>
{#if error}
	<p class="mt-2 text-[0.8rem] font-medium text-destructive">
		{#each error as err}
			{err}
		{/each}
	</p>
{/if}
