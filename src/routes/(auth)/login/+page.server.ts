import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { superValidate, setError } from 'sveltekit-superforms/server'
import { valibot } from 'sveltekit-superforms/adapters'
import { Argon2id } from 'oslo/password'
import { db } from '$lib/server/db'
import { loginUserSchema } from '$schemas/auth'
import { lucia } from '$lib/server/auth'
import { AppRoutes } from '$lib/constants'
import { sendEmail } from '$lib/server/email'
export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(307, '/dashboard')
	}

	const form = await superValidate(valibot(loginUserSchema, {}))
	return { form }
}

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event.request, valibot(loginUserSchema))

		const existingUser = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.username, form.data.username)
		})

		if (!existingUser) {
			return setError(form, 'username', 'Password oder Benutzernamen falsch')
		}

		const validPassword = await new Argon2id().verify(existingUser.password, form.data.password)
		if (!validPassword) {
			return setError(form, 'username', 'Password oder Benutzernamen falsch')
		}

		const session = await lucia.createSession(existingUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})

		sendEmail({
			from: `Marko <s4fty@gmail.com>`,
			to: 'shafty@gmail.com',
			subject: `Your activation link for`,
			html: 'bla',
			headers: {
				//-Entity-Ref-ID': generateId(20)
			}
		})

		return redirect(302, AppRoutes.DASHBOARD)
	}
}
