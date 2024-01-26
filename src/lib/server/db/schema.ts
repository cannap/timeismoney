import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	email: text('email').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})

export const userTableRelations = relations(usersTable, ({ many }) => ({
	companies: many(companiesTable)
}))

export const companiesTable = sqliteTable('companies', {
	id: text('id').notNull().primaryKey(),
	url: text('url'),
	name: text('name').notNull(),
	size: integer('size'),
	leaderId: text('leader_id')
})

export const companiesTableRelations = relations(companiesTable, ({ one }) => ({
	leader: one(usersTable, {
		fields: [companiesTable.leaderId],
		references: [usersTable.id]
	})
}))

export const sessionTable = sqliteTable('user_session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),
	expiresAt: integer('expires_at').notNull()
})
