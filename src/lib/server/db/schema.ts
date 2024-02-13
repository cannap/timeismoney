import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-valibot'

export const clientTable = sqliteTable('clients', {
	id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
	url: text('url'),
	name: text('name').notNull(),
	size: integer('size'),
	creatorId: text('creator_id').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`)
})

export const insertClient = createInsertSchema(clientTable)

export const sessionTable = sqliteTable('user_session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),
	expiresAt: integer('expires_at').notNull()
})

export const timeTable = sqliteTable('time', {
	id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
	action: text('action', { enum: ['start', 'stop'] }).notNull(),
	createdAt: text('timestamp_ms').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('timestamp_ms').default(sql`CURRENT_TIMESTAMP`),
	stopId: integer('stop_id', { mode: 'number' }),
	taskId: integer('task_id', { mode: 'number' })
})

export const usersTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey().unique(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	email: text('email').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})

export const usersRelations = relations(usersTable, ({ many }) => ({
	projects: many(usersToProjectsTable)
}))

export const projectTable = sqliteTable('project', {
	id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`)
})

export const usersToProjectsTable = sqliteTable(
	'usersToProjects',
	{
		userId: text('user_id')
			.notNull()
			.references(() => usersTable.id),
		projectId: integer('project_id')
			.notNull()
			.references(() => projectTable.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.projectId] })
	})
)

export const projectRelations = relations(projectTable, ({ many }) => ({
	users: many(usersToProjectsTable)
}))

export const userToProjectRelation = relations(usersToProjectsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [usersToProjectsTable.userId],
		references: [usersTable.id]
	}),
	project: one(projectTable, {
		fields: [usersToProjectsTable.projectId],
		references: [projectTable.id]
	})
}))

export const taskTable = sqliteTable('task', {
	id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`)
})
