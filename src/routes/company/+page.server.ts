import type { PageServerLoad, Actions } from './$types'

export const actions: Actions = {
	createCompany: async (event) => {
		console.log('create')
	}
}
