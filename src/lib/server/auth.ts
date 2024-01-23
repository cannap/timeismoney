import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { db } from './db';
import { sessionTable, userTable } from './db/schema';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';

//const adapter = new BetterSQLite3Adapter(db); // your adapter
const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
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
			username: attributes.username
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}
