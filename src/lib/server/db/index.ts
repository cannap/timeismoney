import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '$db/schema'
import { DATABASE_URL, TURSO_API_TOKEN } from '$env/static/private'
const client = createClient({ url: DATABASE_URL, authToken: TURSO_API_TOKEN })
export const db = drizzle(client, { schema })
