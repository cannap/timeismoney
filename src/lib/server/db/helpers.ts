import { db } from '$db'
export const uniqueEmail = async (email: string): Promise<boolean> => {
	const result = await db.query.usersTable.findFirst({
		where: (usersTable, { eq }) => eq(usersTable.email, email)
	})

	return !result
}

export const uniqueUsername = async (username: string): Promise<boolean> => {
	const result = await db.query.usersTable.findFirst({
		where: (usersTable, { eq }) => eq(usersTable.username, username)
	})

	return !result
}
