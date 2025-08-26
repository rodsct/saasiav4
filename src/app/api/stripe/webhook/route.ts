import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case 'checkout.session.completed':
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )
      
      const userId = session.metadata?.userId
      if (!userId) {
        return new Response('User ID not found in metadata', { status: 400 })
      }

      await prisma.subscription.create({
        data: {
          userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          status: subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
      break

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice
      
      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: invoice.subscription as string,
        },
        data: {
          status: 'active',
          currentPeriodStart: new Date(invoice.period_start * 1000),
          currentPeriodEnd: new Date(invoice.period_end * 1000),
        },
      })
      break

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object as Stripe.Subscription
      
      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: updatedSubscription.id,
        },
        data: {
          status: updatedSubscription.status,
          stripePriceId: updatedSubscription.items.data[0].price.id,
          currentPeriodStart: new Date(updatedSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
          cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
        },
      })
      break

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription
      
      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: deletedSubscription.id,
        },
        data: {
          status: 'canceled',
        },
      })
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return new Response(null, { status: 200 })
}