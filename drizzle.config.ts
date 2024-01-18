import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
		authToken: process.env.TURSO_API_TOKEN
	},
	verbose: true,
	strict: true
});
