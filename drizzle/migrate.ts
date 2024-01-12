import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
console.log(process.env.DATABASE_URL, process.env.TURSO_API_TOKEN);
export const client = createClient({
	url: process.env.DATABASE_URL as string,
	authToken: process.env.TURSO_API_TOKEN as string
});

export const db = drizzle(client);

async function main() {
	try {
		await migrate(db, {
			migrationsFolder: 'drizzle/migrations'
		});
		console.log('Tables migrated!');
		process.exit(0);
	} catch (error) {
		console.error('Error performing migration: ', error);
		process.exit(1);
	}
}

main();
