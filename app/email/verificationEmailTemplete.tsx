import { Head, Html, Font, Preview, Heading, Row, Section, Text } from "@react-email/components"

interface verificationEmailProps {
	username: string;
	otp: string;
}

export default function VerificationEmail({ username, otp }: verificationEmailProps) {
	return (

		<Html lang="en" dir="ltr">
			<Head>
				<title>Verification Code</title>
				<Font
					fontFamily="Roboto"
					fallbackFontFamily="Verdana"
					webFont={{
						url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mKKTU1Kg•woff2',
						format: 'woff2'
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			<Preview>Here&apos;s your Verification code: {otp}</Preview>
			<Section>
				<Row>
					<Heading as="h2"> Hello {username},</Heading>
				</Row>
				<Row>
					<Text>
						Thank you for regestrating. Please use the following verification code to complete your regestration.
					</Text>
				</Row>
				<Row>
					<Text>{otp}</Text>
				</Row>
				<Row>
					<Text>
						If you did not requested thid code, please ignore this email.
					</Text>
				</Row>
			</Section>
		</Html>
	)
}