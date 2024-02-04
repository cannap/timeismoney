<script lang="ts">
	import SvelteLink from '$lib/components/SvelteLink.svelte'
</script>

<div class="w-[240px] border-r border-border/40">
	<nav>
		<ul class="divide-y divide-border/40">
			<li class="p-4">
				<SvelteLink path="/dashboard">Dashboard</SvelteLink>
			</li>
			<li class="p-4">
				<SvelteLink path="/dashboard">Stunden</SvelteLink>
			</li>
		</ul>
	</nav>
</div>
