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

export const session = sqliteTable('user_session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull()
})

export const times = sqliteTable('times', {
	id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
	action: text('action', { enum: ['start', 'stop'] }).notNull(),
	createdAt: text('timestamp_ms').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('timestamp_ms').default(sql`CURRENT_TIMESTAMP`),
	stopId: integer('stop_id', { mode: 'number' }),
	taskId: integer('task_id', { mode: 'number' })
})

export const users = sqliteTable('users', {
	id: text('id').notNull().primaryKey().unique(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	email: text('email').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
	projects: many(usersToProjects),
	tasks: many(tasks)
}))

export const projects = sqliteTable('projects', {
	id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`)
})

export const usersToProjects = sqliteTable(
	'usersToProjects',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		projectId: integer('project_id')
			.notNull()
			.references(() => projects.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.projectId] })
	})
)

export const projectsRelations = relations(projects, ({ many }) => ({
	users: many(usersToProjects)
}))

export const userToProjectRelation = relations(usersToProjects, ({ one }) => ({
	user: one(users, {
		fields: [usersToProjects.userId],
		references: [users.id]
	}),
	project: one(projects, {
		fields: [usersToProjects.projectId],
		references: [projects.id]
	})
}))

export const tasks = sqliteTable('tasks', {
	id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`)
})
export const tasksRelations = relations(tasks, ({ one }) => ({
	user: one(users, {
		fields: [tasks.userId],
		references: [users.id]
	})
}))
