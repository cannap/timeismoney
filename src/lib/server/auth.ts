import { Lucia } from 'lucia'
import { dev } from '$app/environment'
import { db } from './db'
import { session, users } from './db/schema'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { redirect } from '@sveltejs/kit'
//const adapter = new BetterSQLite3Adapter(db); // your adapter
const adapter = new DrizzleSQLiteAdapter(db, session, users)
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
			email: attributes.email
		}
	}
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: {
			username: string
			email: string
			isAdmin: boolean
		}
	}
}

export const ensueAuth = (locals: App.Locals) => {
	if (!locals.user || !locals.session) {
		redirect(303, '/login')
	}
}
