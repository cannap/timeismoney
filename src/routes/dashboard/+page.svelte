<script lang="ts">
	import * as Card from '$lib/components/ui/card'

	import type { PageData } from './$types'
	import { Button } from '$lib/components/ui/button'
	import CreateCompanyForm from '$forms/CreateCompanyForm.svelte'
	export let data: PageData
</script>

{#if !data.companies.length}
	<div class="flex items-center justify-center md:h-[90.5vh]">
		<Card.Root class="mx-auto md:w-[400px]">
			<CreateCompanyForm data={data.companyForm}></CreateCompanyForm>
		</Card.Root>
	</div>
{/if}
