import type { PageServerLoad, Actions } from './$types'
import { db } from '$db'
import { valibot } from 'sveltekit-superforms/adapters'
import { createCompanySchema } from '$validations/company'
import { superValidate, message } from 'sveltekit-superforms/server'
import { companiesTable } from '$db/schema'
import { redirect } from '@sveltejs/kit'
import { addHttps } from '$lib/utils/addHttps'

export const load: PageServerLoad = async ({ request, locals }) => {
	if (!locals.user || !locals.session) {
		redirect(307, '/login')
	}

	const form = await superValidate(request, valibot(createCompanySchema))
	const companies = await db.query.companiesTable.findMany({
		limit: 5,
		where: (companiesTable, { eq }) => eq(companiesTable.leaderId, locals.user.id),
		orderBy(fields, operators) {
			return operators.desc(fields.createdAt)
		}
	})

	return { form, companies }
}

export const actions: Actions = {
	createCompany: async ({ locals, request }) => {
		if (!locals.user || !locals.session) {
			redirect(307, '/login')
		}

		const form = await superValidate(request, valibot(createCompanySchema))

		if (!form.valid) return { form }
		await db.insert(companiesTable).values({
			leaderId: locals.user.id,
			name: form.data.name,
			url: addHttps(form.data.url ?? ''),
			size: form.data.size ? parseInt(form.data.size) : null
		})

		return message(form, 'Firma erfolgreich erstellt')
	}
} satisfies Actions
