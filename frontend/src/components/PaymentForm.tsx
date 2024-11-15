'use client'

import React, { useEffect, useState, useContext } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import CartContext from '@/context/cartContext'
import { Order } from '@/types/order'
import axios from 'axios'
interface PaymentFormProps {
  total: number
  isFormValid: boolean
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  total,
  isFormValid,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const { deleteCart, getClientOrderData, cart } = useContext(CartContext)
  const [orderDetails, setOrderDetails] = useState<Order | null>(null)

  useEffect(() => {
    axios
      .post('/api/create-payment-intent', {
        amount: total,
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret)
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error)
        setErrorMessage('Failed to create payment intent. Please try again.')
      })
  }, [total])

  useEffect(() => {
    const clientData = getClientOrderData()
    if (clientData.name) {
      setOrderDetails({
        ...clientData,
        list: cart,
      })
    }
  }, [getClientOrderData, cart])

  const saveOrder = async () => {
    if (orderDetails && orderDetails.name) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`,
          {
            data: {
              Name: orderDetails.name,
              Email: orderDetails.email,
              Address: orderDetails.address,
              City: orderDetails.city,
              PostalCode: orderDetails.postalCode,
              List: orderDetails.list,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.status === 201) {
          deleteCart()
        } else {
          console.warn('Unexpected response:', response.status, response.data)
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Error response data:', error.response?.data)
          console.error('Error response status:', error.response?.status)
        } else if (error instanceof Error) {
          console.error('Error message:', error.message)
        } else {
          console.error('Unexpected error:', error)
        }
        throw new Error(`Error saving order: ${error}`)
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    saveOrder()

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${total}`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      throw new Error(`dofus error... ${error.message}`)
    }
    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading || !isFormValid}
        className="mt-4 text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
      >
        {!loading ? 'Pay now' : 'Processing...'}
      </button>
    </form>
  )
}
