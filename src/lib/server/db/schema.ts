import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-valibot'

export const usersTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey().unique(),
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
	id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
	url: text('url'),
	name: text('name').notNull(),
	size: integer('size'),
	leaderId: text('leader_id').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
})

export const insertCompanySchema = createInsertSchema(companiesTable)

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
