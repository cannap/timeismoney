import { lucia } from '$lib/server/auth'
import { fail, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { AppRoutes } from '$lib/constants'

export const POST: RequestHandler = async (event) => {
	if (!event.locals.session) {
		fail(401)
	}
	const session = event.locals.session
	if (session) {
		lucia.invalidateSession(session.id)
		const sessionCookie = lucia.createBlankSessionCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
	}
	redirect(302, AppRoutes.AUTH_LOGIN)
}
