import type { LayoutServerLoad } from './$types'
import { ensueAuth } from '$lib/server/auth'

export const load: LayoutServerLoad = async ({ locals }) => {
	ensueAuth(locals)

	return {
		user: locals.user
	}
}
