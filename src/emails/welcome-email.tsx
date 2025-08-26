import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  userFirstname?: string
}

export const WelcomeEmail = ({ userFirstname }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to Personal Agent - Your AI-powered assistant is ready!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Personal Agent!</Heading>
        <Text style={text}>
          Hi {userFirstname || 'there'},
        </Text>
        <Text style={text}>
          Thank you for joining Personal Agent! Your AI-powered personal assistant is now ready to help you with various tasks and streamline your workflow.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href="{{dashboardUrl}}">
            Go to Dashboard
          </Button>
        </Section>
        <Text style={text}>
          Here's what you can do with your Personal Agent:
        </Text>
        <Text style={text}>
          • Have intelligent conversations and get personalized assistance
          • Manage your tasks and schedule efficiently
          • Access advanced features with our premium plans
          • Customize your agent to fit your specific needs
        </Text>
        <Text style={text}>
          If you have any questions or need help getting started, feel free to reach out to our support team.
        </Text>
        <Text style={text}>
          Best regards,<br />
          The Personal Agent Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  paddingTop: '32px',
  paddingBottom: '32px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#000',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}