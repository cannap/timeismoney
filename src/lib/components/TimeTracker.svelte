<script lang="ts">
	import * as Popover from '$lib/components/ui/popover'
	import { Button } from '$lib/components/ui/button'
	import Play from 'lucide-svelte/icons/play'
	import Pause from 'lucide-svelte/icons/pause'
	import Clock from 'lucide-svelte/icons/clock'

	let interval: string | number | NodeJS.Timeout | null | undefined = null
	let isRunning = false
	let original = 0
	let timer = original
	let lastTime = 0
	const stopTimer = () => {
		if (interval) {
			clearInterval(interval)
			interval = null
			isRunning = false
			lastTime = timer
			timer = 0
		}
	}
	const toggleTimer = () => {
		if (isRunning) {
			stopTimer()
			return
		}
		isRunning = true
		//isRunning = !isRunning
		interval = setInterval(() => {
			timer++
		}, 1000)
	}

	$: hours = Math.floor(timer / 3600)
	$: minutes = Math.floor((timer % 3600) / 60)
	$: seconds = Math.floor(timer % 60)
	$: formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
</script>

<Popover.Root
	portal={null}
	onOutsideClick={(e) => {
		e.preventDefault()
	}}
>
	<Popover.Trigger asChild let:builder>
		<Button class="w-[150px]" builders={[builder]} variant={isRunning ? 'secondary' : 'outline'}>
			<span class="flex items-center gap-2">
				<Clock />
				{formattedTime}
			</span>
		</Button>
	</Popover.Trigger>

	<Popover.Content align={'start'} sideOffset={15} class="w-96">
		<div class="flex items-start justify-between">
			<Button on:click={toggleTimer} variant="outline">
				{#if isRunning}
					<Pause />
				{:else}
					<Play></Play>
				{/if}
			</Button>
			<div class="timer">
				<span class="block text-left text-2xl"> {formattedTime}</span>
				<span class="text-xs">Heute: {formattedTime} </span>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
