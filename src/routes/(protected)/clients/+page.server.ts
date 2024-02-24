import type { PageServerLoad, Actions } from './$types'
import { db } from '$db'
import { valibot } from 'sveltekit-superforms/adapters'
import { createClientSchema } from '$lib/schemas/client'
import { superValidate } from 'sveltekit-superforms/server'
import { redirect } from '@sveltejs/kit'
import { addHttps } from '$lib/utils/addHttps'
import { clientTable } from '$db/schema'
import { ensueAuth } from '$lib/server/auth'

export const load: PageServerLoad = async ({ request, locals }) => {
	ensueAuth(locals)

	const userId = locals?.user?.id

	const form = await superValidate(request, valibot(createClientSchema), {
		defaults: {
			url: 'https://',
			name: ''
		}
	})

	const clients = await db.query.clientTable.findMany({
		limit: 5,
		where: (clientTable, { eq }) => (userId ? eq(clientTable.creatorId, userId) : undefined),
		orderBy(fields, operators) {
			return operators.desc(fields.createdAt)
		}
	})

	return { form, clients }
}

export const actions: Actions = {
	createCompany: async ({ locals, request }) => {
		if (!locals.user || !locals.session) {
			redirect(307, '/login')
		}

		const form = await superValidate(request, valibot(createClientSchema))

		if (!form.valid) return { form }
		await db.insert(clientTable).values({
			creatorId: locals.user.id,
			name: form.data.name,
			url: addHttps(form.data.url ?? '')
		})

		return { form }
	}
} satisfies Actions
