import { db } from '$db'
import { createCompanyDefault, createCompanySchema } from '$lib/shared/validations/company'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'
import { valibot } from 'sveltekit-superforms/adapters'

import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || !locals.session) {
		redirect(307, '/login')
	}

	const companies = await db.query.companiesTable.findMany({
		where: (companies, { eq }) => eq(companies.leaderId, locals.user.id)
	})

	const form = await superValidate(
		valibot(createCompanySchema, {
			defaults: createCompanyDefault
		})
	)

	return { companies, companyForm: form }
}
export const actions: Actions = {
	createCompany: async (event) => {
		console.log('create')
	}
}
