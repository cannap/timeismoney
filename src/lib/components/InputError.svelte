<script lang="ts">
	// your script goes here

	export let error = ''
</script>

{#if error}
	<div class="text-destructive">{error}</div>
{/if}
