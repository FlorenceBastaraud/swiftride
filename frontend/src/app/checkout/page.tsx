'use client'

import React, { useContext, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentForm } from '@/components/PaymentForm'
import CartContext from '@/context/cartContext'
import { convertToSubCurrency } from '@/utils/functions'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const Checkout: React.FC = () => {
  const { cart, cartTotalPrice, setClientOrderData } = useContext(CartContext)
  const [isFormValid, setIsFormValid] = useState(false)

  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalData((prevState) => {
      const updatedData = { ...prevState, [name]: value }

      setIsFormValid(
        Object.values(updatedData).every((field) => field.trim() !== '')
      )

      return {
        ...prevState,
        [name]: value,
      }
    })

    const { name: clientName, email, address, city, postalCode } = personalData

    setClientOrderData({
      name: clientName,
      email,
      address,
      city,
      postalCode,
      list: cart,
    })
  }

  return (
    <div
      className="wrapper wrapper-checkout wrapper-flex-1 overflow-x-hidden mx-auto"
      style={{ marginTop: '56px', padding: '2rem 1rem 5rem' }}
    >
      <h1 className="relative flex items-center justify-center mb-8 z-10 text-4xl md:text-5xl font-bold text-black text-center px-4">
        Checkout
      </h1>

      <div className="w-full p-4 border rounded-[20px] mb-4">
        <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.product.Slug} className="flex justify-between mb-2">
              <span>
                {item.product.Name} (x{item.quantity})
              </span>
              <span>${(item.product.Price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>${cartTotalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="w-full p-4 border rounded-[20px] mb-4">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={personalData.name}
              onChange={handleChange}
              className="border rounded-[20px] w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={personalData.email}
              onChange={handleChange}
              className="border rounded-[20px] w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={personalData.address}
              onChange={handleChange}
              className="border rounded-[20px] w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              value={personalData.city}
              onChange={handleChange}
              className="border rounded-[20px] w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={personalData.postalCode}
              onChange={handleChange}
              className="border rounded-[20px] w-full p-2"
              required
            />
          </div>
        </form>
      </div>

      {cartTotalPrice > 0 && isFormValid && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: convertToSubCurrency(cartTotalPrice),
            currency: 'usd',
            locale: 'en',
          }}
        >
          <div className="w-full p-4 border rounded-[20px] mb-4">
            <h2 className="text-2xl font-semibold mb-4">Payment</h2>
            <p className="mb-3">
              <em>
                <b>DISCLAIMER</b>: This website is a demonstration project.{' '}
                <u>The products are not real</u>, and{' '}
                <u>payments are simulated</u>. Use the card number{' '}
                <b>4242 4242 4242 4242</b> to experience the full process. Enter
                any date later than today&apos;s date for the expiration date,
                and any random security code.
              </em>
            </p>
            <PaymentForm total={cartTotalPrice} isFormValid={isFormValid} />
          </div>
        </Elements>
      )}
    </div>
  )
}

export default Checkout
