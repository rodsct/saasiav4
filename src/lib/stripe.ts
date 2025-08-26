import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const getStripeSession = async ({
  priceId,
  customerId,
  userId,
}: {
  priceId: string
  customerId?: string
  userId: string
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: userId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    metadata: {
      userId,
    },
  })

  return session
}

export const getStripePrices = async () => {
  const prices = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  })

  return prices.data.map((price) => ({
    id: price.id,
    productId: price.product as Stripe.Product,
    unitAmount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval,
    intervalCount: price.recurring?.interval_count,
    trialPeriodDays: price.recurring?.trial_period_days,
  }))
}

export const createStripeCustomer = async ({
  email,
  name,
}: {
  email: string
  name?: string
}) => {
  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
}