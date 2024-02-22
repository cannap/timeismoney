import { SMTPClient } from 'emailjs'
import { dev } from '$app/environment'
const client = new SMTPClient({
	host: 'localhost',
	port: 1025,
	ssl: false
})

const sendTestEmail = async (options: {
	from: string
	to: string
	subject: string
	html: string
}) => {
	try {
		await client.sendAsync({
			text: options.subject,
			from: options.from,
			to: options.to,
			subject: options.subject,
			attachment: [{ data: options.html, alternative: true }]
		})
		console.log(`Test email sent to ${options.to}`)
	} catch (e) {
		console.error(e)
	}
}
export const sendEmail = async (options: {
	from: string
	to: string
	subject: string
	html: string
	headers?: Record<string, string>
}) => {
	if (dev) {
		return await sendTestEmail(options)
	}
	//	return await sendResendEmail(options)
}
