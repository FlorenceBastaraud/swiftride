'use client'

import CartContext from '@/context/cartContext'
import { Order } from '@/types/order'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const [amount, setAmount] = useState('')
  const { deleteCart, getClientOrderData, cart } = useContext(CartContext)
  const [orderDetails, setOrderDetails] = useState<Order>({} as Order)

  useEffect(() => {
    // Get the amount from search parameters once
    const amountParam = searchParams.get('amount')
    if (amountParam) {
      setAmount(amountParam)
    }
  }, [searchParams])

  useEffect(() => {
    // Initialize order details only once on component mount
    const { name, email, address, city, postalCode } = getClientOrderData()

    setOrderDetails({
      name,
      email,
      address,
      city,
      postalCode,
      list: cart,
    })

    deleteCart()
  }, [getClientOrderData, deleteCart, cart])

  useEffect(() => {
    const saveOrder = async () => {
      if (orderDetails.name) {
        // Check if order details are available before sending the request
        try {
          const { name, email, address, city, postalCode, list } = orderDetails
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`,
            {
              data: {
                Name: name,
                Email: email,
                Address: address,
                City: city,
                postalCode,
                List: list,
              },
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          if (response.status === 200 || response.status === 201) {
            console.log('Order saved successfully')
          }
        } catch (error) {
          console.error('Error saving order:', error)
        }
      }
    }

    saveOrder()
  }, [orderDetails])

  return (
    <main
      className="wrapper wrapper-flex-1 overflow-x-hidden mx-auto"
      style={{ marginTop: '56px', padding: '2rem 1rem 5rem' }}
    >
      <div className="mb-10">
        <h1 className="relative flex items-center justify-center z-10 text-4xl md:text-5xl font-bold text-black text-center px-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-center mt-4">
          Thank you for your payment of{' '}
          <span className="font-semibold">${amount}</span>. Your transaction was
          successful.
        </p>
        <p className="text-center mt-8">
          You will receive a confirmation email with the transaction details
          shortly.
        </p>
      </div>

      <div className="order-details mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Order Details</h2>
        <div className="text-center">
          <p>
            <strong>Name:</strong> {orderDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {orderDetails.email}
          </p>
          <p>
            <strong>Address:</strong> {orderDetails.address}
          </p>
          <p>
            <strong>City:</strong> {orderDetails.city}
          </p>
          <p>
            <strong>Postal Code:</strong> {orderDetails.postalCode}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-center">Items Ordered</h3>
          <ul className="mt-4">
            {orderDetails.list?.map((item, index) => (
              <li key={index} className="text-center">
                <p>
                  {item.product.Name} - ${item.product.Price} x {item.quantity}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
