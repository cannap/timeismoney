import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { AppRoutes } from '$lib/constants'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(302, AppRoutes.DASHBOARD)
	} else {
		redirect(302, AppRoutes.AUTH_LOGIN)
	}
}
