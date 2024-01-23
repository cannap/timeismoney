import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event): Promise<void> => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
};
