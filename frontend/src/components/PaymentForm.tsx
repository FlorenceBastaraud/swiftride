import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import CartContext from '@/context/cartContext'
import { useContext } from 'react'

export const PaymentForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  const { getClientOrderData } = useContext(CartContext)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) return

    // const clientSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      'clientSecret',
      {
        payment_method: { card: cardElement },
      }
    )

    if (error) {
      console.error('Payment failed', error.message)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment successful')

      try {
        const { name, email, address, city, postalCode, list } =
          getClientOrderData()

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`,
          {
            data: { name, email, address, city, postalCode, list },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.status === 200 || response.status === 201) {
          console.log('Form submitted')
        }
      } catch (error) {
        console.error('Error subscribing:', error)
      } finally {
        console.log('Done...')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6">
      <CardElement className="w-full p-2 border border-gray-300 rounded-[20px]" />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
      >
        Pay Now
      </button>
    </form>
  )
}
