import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

if (process.env.STRIPE_SECRET_KEY === undefined) {
  throw new Error('STRIPE_SECRET_KEY is undefined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Failed to create payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
