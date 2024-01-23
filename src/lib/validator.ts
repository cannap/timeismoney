import type { Issue } from 'valibot'

export const formatValidationIssues = (issues: Issue[]) => {
	const mappedIssues = issues.map((issue) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { requirement, validation, origin, path, ...rest } = issue

		return {
			...rest,
			path: issue?.path?.map((item) => item.key).join('.') || ''
		}
	})
	return mappedIssues
}
