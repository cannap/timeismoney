import { db } from '$db'
export const uniqueEmail = async (email: string): Promise<boolean> => {
	const result = await db.query.userTable.findFirst({
		where: (userTable, { eq }) => eq(userTable.email, email)
	})

	return !result
}

export const uniqueUsername = async (username: string): Promise<boolean> => {
	const result = await db.query.userTable.findFirst({
		where: (userTable, { eq }) => eq(userTable.username, username)
	})

	return !result
}
