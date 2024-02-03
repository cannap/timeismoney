import { parse } from 'svelte/compiler'
import { string, minLength, number, object, optional, transform } from 'valibot'
/**
 * 	id: text('id').notNull().primaryKey(),
	url: text('url'),
	name: text('name').notNull(),
	size: integer('size'),
	leaderId: text('leader_id')
 */
export const createCompanySchema = object({
	name: string([minLength(1, 'Bitte geben sie einen Firmennamen ein ')]),
	size: optional(string()),
	url: optional(string())
})

export type CreateCompanySchema = typeof createCompanySchema
