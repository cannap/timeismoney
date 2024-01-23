<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import * as m from '$paraglide/messages';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
		onRegistered(r: ServiceWorkerRegistration) {
			// uncomment following code if you want check for updates
			// r && setInterval(() => {
			//    console.log('Checking for sw update')
			//    r.update()
			// }, 20000 /* 20s for testing purposes */)
			console.log(`SW Registered: ${r}`);
		},
		onRegisterError(error: Error) {
			console.log('SW registration error', error);
		}
	});
	const close = () => {
		offlineReady.set(false);
		needRefresh.set(false);
	};
	$: toast = $needRefresh;
</script>

{#if toast}
	<Card.Root class="fixed bottom-5 right-5 " role="alert">
		<Card.Header>
			<Card.Title>{m.new_content()}</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="rounded-md border p-4">Aktualisieren Sie die Seite</div>
		</Card.Content>

		<Card.Footer class="flex justify-between">
			{#if $needRefresh}
				<Button size="sm" on:click={() => updateServiceWorker(true)}>Aktualisieren</Button>
			{/if}
			<Button variant="secondary" size="sm" on:click={close}>Schliessen</Button>
		</Card.Footer>
	</Card.Root>
{/if}
