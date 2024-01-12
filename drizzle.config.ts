import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
	schema: './src/server/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.TURSO_API_TOKEN
	},
	verbose: true,
	strict: true
});
