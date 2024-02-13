import { string, minLength, object, optional } from 'valibot'
/**
 * 	id: text('id').notNull().primaryKey(),
	url: text('url'),
	name: text('name').notNull(),
	size: integer('size'),
	leaderId: text('leader_id')
 */
export const createClientSchema = object({
	name: string([minLength(1, 'Bitte geben Sie einen Kundenmane ein ')]),
	url: optional(string())
})

export type TCreateClientSchema = typeof createClientSchema
