import { db } from '$db'
export const uniqueEmail = async (email: string): Promise<boolean> => {
	const result = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.email, email)
	})

	return !result
}

export const uniqueUsername = async (username: string): Promise<boolean> => {
	const result = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.username, username)
	})

	return !result
}
