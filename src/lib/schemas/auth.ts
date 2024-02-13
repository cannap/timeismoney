import { string, minLength, maxLength, email, regex, object, type Input } from 'valibot'

export const USERNAME_VALIDATION = regex(
	/^[A-Za-z0-9_-]{4,20}$/,
	'Der Benutzername ist ungültig. Er muss zwischen 4 und 20 Zeichen lang sein und darf nur Buchstaben, Zahlen, Unterstriche und Bindestriche enthalten.'
)

export const registerUserSchema = object({
	//id: string(),
	email: string([email('Bitte geben Sie eine gültige Email ein')]),
	password: string([minLength(5, 'Die Minimum länge beträgt 5'), maxLength(254)]),
	username: string([USERNAME_VALIDATION])
})

export type RegisterUserSchema = Input<typeof registerUserSchema> // { email: string; password: string }

export const loginUserSchema = object({
	username: string([minLength(1, 'Bitte geben Sie einen Benutzernamen ein.')]),
	password: string([minLength(1, 'Bitte geben Sie ein Passwort ein.')])
})
export type TLoginUserSchema = Input<typeof loginUserSchema>
