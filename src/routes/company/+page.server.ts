import type { PageServerLoad, Actions } from './$types'
import { db } from '$db'
import { valibot } from 'sveltekit-superforms/adapters'
import { createCompanySchema } from '$validations/company'
import { superValidate } from 'sveltekit-superforms/server'
import { companiesTable } from '$db/schema'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ request }) => {
	const form = await superValidate(request, valibot(createCompanySchema))

	return { form }
}

export const actions = {
	createCompany: async ({ request, locals }) => {
		console.log('create')
		if (!locals.user || !locals.session) {
			redirect(307, '/login')
		}

		const form = await superValidate(request, valibot(createCompanySchema))
		if (!form.valid) db.insert(companiesTable).values({ ...form.data, leaderId: locals.user.id })
	}
} satisfies Actions
