import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { superValidate, message, setError } from 'sveltekit-superforms/server'
import { valibot } from 'sveltekit-superforms/adapters'
import { Argon2id } from 'oslo/password'
import { db } from '$lib/server/db'
import { loginUserSchema } from '$lib/shared/validations/auth'
import { lucia } from '$lib/server/auth'
export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(307, '/dashboard')
	}

	const form = await superValidate(valibot(loginUserSchema, {}))
	return { form }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, valibot(loginUserSchema))

		const existingUser = await db.query.usersTable.findFirst({
			where: (usersTable, { eq }) => eq(usersTable.username, form.data.username)
		})

		if (!existingUser) {
			return setError(form, 'username', 'Password oder Benutzernamen falsch')
		}

		const validPassword = await new Argon2id().verify(existingUser.password, form.data.password)
		console.log()
		if (!validPassword) {
			return setError(form, 'username', 'Password oder Benutzernamen falsch')
		}

		const session = await lucia.createSession(existingUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})

		return redirect(302, '/dashboard')
	}
}
