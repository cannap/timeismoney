import { string, minLength, number, object, transform, optional } from 'valibot'
import { addHttps } from '$lib/utils/addHttps'
/**
 * 	id: text('id').notNull().primaryKey(),
	url: text('url'),
	name: text('name').notNull(),
	size: integer('size'),
	leaderId: text('leader_id')
 */
export const createCompanySchema = object({
	name: string([minLength(1, 'Bitte geben sie einen Firmennamen ein ')]),
	size: optional(number()),
	url: optional(transform(string(), addHttps))
})

export type CreateCompanySchema = typeof createCompanySchema
