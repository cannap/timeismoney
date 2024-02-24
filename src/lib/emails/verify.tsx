import { Body, Container, Head, Html, Preview, Section } from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import * as React from 'react'

interface VerifyEmail {
	email: string
}

export const SedimentListThankYou = ({ email }: VerifyEmail) => {
	return (
		<Html>
			<Head />
			<Preview>Herzlich Wilkommen</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white px-2 font-sans">
					<Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
						<Section className="mt-[32px]"></Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default SedimentListThankYou
