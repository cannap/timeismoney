import * as v from 'valibot'

/**
 * 	id: text('id').notNull().primaryKey(),
	url: text('url'),
	name: text('name').notNull(),
	size: integer('size'),
	leaderId: text('leader_id')
 */
export const createClientSchema = v.object({
	name: v.string([v.minLength(1, 'Bitte geben Sie einen Kundenmane ein ')]),
	//Just for testing
	url: v.union([v.literal(''), v.string([v.startsWith('https://')])])
})

export type TCreateClientSchema = typeof createClientSchema
