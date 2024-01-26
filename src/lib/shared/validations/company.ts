import { string, minLength, number, object, minValue, url } from 'valibot'
/**
 * 	id: text('id').notNull().primaryKey(),
	url: text('url'),
	name: text('name').notNull(),
	size: integer('size'),
	leaderId: text('leader_id')
 */
export const createCompanySchema = object({
	url: string([url('Bitte geben Sie eine gültige Url ein.')]),
	name: string([minLength(1, 'Bitte geben sie einen Firmennamen ein ')]),
	size: number([minValue(1)])
})

export const createCompanyDefault = {
	url: '',
	name: '',
	size: 1
}

export type CreateCompanySchema = typeof createCompanySchema
