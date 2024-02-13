<script lang="ts">
	import * as Popover from '$lib/components/ui/popover'
	import { Button } from '$lib/components/ui/button'
	import Play from 'lucide-svelte/icons/play'
	import Pause from 'lucide-svelte/icons/pause'
	import Clock from 'lucide-svelte/icons/clock'
	import { onDestroy } from 'svelte'

	let interval: number | null = null
	let isRunning = false
	let original = 0
	let timer = original

	//Gib mir eeinen Zeistempel in 20 minuten in der Zukunft
	const getFutureTime = (minutes: number) => {
		const now = new Date()
		now.setMinutes(now.getMinutes() + minutes)
		return now
	}

	const getDifferenceInSeconds = (start: Date = new Date(), end: Date = getFutureTime(20)) => {
		const diff = Math.abs(start.getTime() - end.getTime())
		return Math.floor(diff / 1000)
	}

	//Formattiere mir die Sekunden in Minute nund Stunden
	function formatTime(seconds: number) {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const formattedHours = hours.toString().padStart(2, '0')
		const formattedMinutes = minutes.toString().padStart(2, '0')
		const formattedSeconds = (seconds % 60).toString().padStart(2, '0')
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
	}

	const a = getDifferenceInSeconds()

	console.log(formatTime(a))

	const stopTimer = () => {
		if (interval) {
			clearInterval(interval)

			interval = null
			isRunning = false
			timer = 0
		}
	}
	const toggleTimer = async () => {
		if (isRunning) {
			stopTimer()
			return
		}
		isRunning = true

		interval = setInterval(() => {
			timer++
		}, 1000) as unknown as number
	}

	onDestroy(() => {
		stopTimer()
	})
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
