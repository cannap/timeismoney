import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-valibot';
import { string, email, minLength, maxLength } from 'valibot';
export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const insertUserSchenma = createInsertSchema(userTable, {
	password: string([email(), minLength(6), maxLength(254)])
});

export const sessionTable = sqliteTable('user_session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});
