import { db } from '$db'
import { createCompanySchema } from '$lib/shared/validations/company'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'
import { valibot } from 'sveltekit-superforms/adapters'
import { redirect } from '@sveltejs/kit'
import { companiesTable } from '$db/schema'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || !locals.session) {
		redirect(307, '/login')
	}
	const companies = await db.query.companiesTable.findMany({
		where: (companies, { eq }) => eq(companies.leaderId, locals.user.id)
	})

	const form = await superValidate(valibot(createCompanySchema), {
		defaults: { name: 'test' }
	})

	return { companies, companyForm: form }
}
/**
 * Actions object containing various functions for the dashboard page.
 */
export const actions: Actions = {}
