import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = (event) => {
	const test = {
		hello: 'world'
	}

	return json(test)
}
