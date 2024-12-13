import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

if (process.env.STRIPE_SECRET_KEY === undefined) {
  throw new Error('STRIPE_SECRET_KEY is undefined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId } = await request.json()

    const existingIntent = await stripe.paymentIntents.list({
      limit: 1,
    })

    const matchingIntent = existingIntent.data.find(
      (intent) => intent.metadata.orderId === orderId
    )

    if (matchingIntent) {
      return NextResponse.json({
        clientSecret: matchingIntent.client_secret,
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { orderId },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Failed to create or find payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create or find payment intent' },
      { status: 500 }
    )
  }
}
