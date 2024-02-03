import { lucia } from '$lib/server/auth'
import { fail, redirect } from '@sveltejs/kit'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { db } from '$lib/server/db'
import { usersTable } from '$db/schema'
import { registerUserSchema } from '$lib/shared/validations/auth'
import type { Actions, PageServerLoad } from './$types'
import { pick } from 'valibot'
import { superValidate, setError } from 'sveltekit-superforms/server'
import { type Input } from 'valibot'
import { valibot } from 'sveltekit-superforms/adapters'
import { uniqueEmail, uniqueUsername } from '$db/helpers'
export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/')
	}

	const form = await superValidate(
		valibot(pick(registerUserSchema, ['username', 'password', 'email']))
	)
	return { form }
}
export type TInsertUserSchema = Input<typeof registerUserSchema>
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, valibot(registerUserSchema))

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form })
		} else {
			const isUniqueEmail = await uniqueEmail(form.data.email)

			if (!isUniqueEmail) {
				setError(form, 'email', 'Email schon vergeben')
			}

			const isUniqueUsename = await uniqueUsername(form.data.username)

			if (!isUniqueUsename) {
				setError(form, 'username', 'Benutzername schon vergeben')
			}

			if (!form.valid) {
				// Again, return { form } and things will just work.
				return fail(400, { form })
			}

			const hashedPassword = await new Argon2id().hash(form.data.password)

			const userId = generateId(15)
			const currentDate = new Date()
			await db.insert(usersTable).values({
				...form.data,
				id: userId,
				password: hashedPassword,
				createdAt: currentDate,
				updatedAt: currentDate
			})

			const session = await lucia.createSession(userId, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})
		}

		return redirect(302, '/')
	}
}
