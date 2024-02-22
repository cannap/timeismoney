import { db } from '$db'
import { createClientSchema } from '$schemas/client'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'
import { valibot } from 'sveltekit-superforms/adapters'
import { ensueAuth } from '$lib/server/auth'

export const load: PageServerLoad = async ({ locals }) => {
	ensueAuth(locals)
	const userId = locals?.user?.id // Declare the userId variable
	const companies = await db.query.clientTable.findMany({
		where: (clientTable, { eq }) => (userId ? eq(clientTable.creatorId, userId) : undefined)
	})

	const form = await superValidate(valibot(createClientSchema), {
		defaults: { name: 'test' }
	})

	return { companies, companyForm: form }
}
/**
 * Actions object containing various functions for the dashboard page.
 */
export const actions: Actions = {}
