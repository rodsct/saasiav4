import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface SubscriptionCreatedEmailProps {
  userFirstname?: string
  planName?: string
  amount?: string
  currency?: string
}

export const SubscriptionCreatedEmail = ({
  userFirstname,
  planName,
  amount,
  currency
}: SubscriptionCreatedEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Your Personal Agent subscription is now active!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Subscription Confirmed!</Heading>
        <Text style={text}>
          Hi {userFirstname || 'there'},
        </Text>
        <Text style={text}>
          Great news! Your subscription to Personal Agent has been successfully activated.
        </Text>
        <Section style={planContainer}>
          <Text style={planText}>
            <strong>Plan:</strong> {planName || 'Premium Plan'}
          </Text>
          <Text style={planText}>
            <strong>Amount:</strong> {amount ? `${currency?.toUpperCase() || 'USD'} ${amount}` : 'N/A'}
          </Text>
        </Section>
        <Text style={text}>
          You now have access to all premium features including:
        </Text>
        <Text style={text}>
          • Advanced AI conversations with extended memory
          • Priority support and faster response times
          • Custom email templates and automation
          • Enhanced analytics and insights
          • API access for integrations
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href="{{dashboardUrl}}">
            Access Your Dashboard
          </Button>
        </Section>
        <Text style={text}>
          Your subscription will automatically renew on {{nextBillingDate}}. You can manage your subscription and billing details in your account settings.
        </Text>
        <Text style={text}>
          Thank you for choosing Personal Agent!
        </Text>
        <Text style={text}>
          Best regards,<br />
          The Personal Agent Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SubscriptionCreatedEmail

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

const planContainer = {
  backgroundColor: '#f6f9fc',
  borderRadius: '4px',
  padding: '24px',
  margin: '32px 0',
}

const planText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 12px 0',
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