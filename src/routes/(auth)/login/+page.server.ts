import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { superValidate, message, setError } from 'sveltekit-superforms/server'
import { valibot } from 'sveltekit-superforms/adapters'
import { Argon2id } from 'oslo/password'
import { db } from '$lib/server/db'
import { loginUserDefaults, loginUserSchema } from '$lib/shared/validations/auth'
import { lucia } from '$lib/server/auth'
import { eq } from 'drizzle-orm'
export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/')
	}

	const form = await superValidate(
		valibot(loginUserSchema, {
			defaults: loginUserDefaults
		})
	)
	return { form }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(
			event.request,
			valibot(loginUserSchema, { defaults: loginUserDefaults })
		)

		const existingUser = await db.query.userTable.findFirst({
			where: (userTable, { eq }) => eq(userTable.username, form.data.username)
		})

		if (!existingUser) {
			return setError(form, 'username', 'Password oder Benutzernamen falsch')
		}

		const validPassword = new Argon2id().verify(existingUser.password, form.data.password)

		if (!validPassword) {
			return setError(form, 'username', 'Password oder Benutzernamen falsch')
		}

		const session = await lucia.createSession(existingUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})

		return redirect(302, '/')
	}
}
