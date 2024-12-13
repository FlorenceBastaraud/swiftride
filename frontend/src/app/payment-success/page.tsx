'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useContext, useRef } from 'react'
import CartContext from '@/context/cartContext'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const [amount, setAmount] = useState('')
  const { deleteCart } = useContext(CartContext)
  const hasDeletedCart = useRef(false)

  useEffect(() => {
    const amountParam = searchParams.get('amount')
    if (amountParam) {
      setAmount(amountParam)
    }

    if (!hasDeletedCart.current) {
      deleteCart()
      hasDeletedCart.current = true
    }
  }, [searchParams, deleteCart])

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
          <span className="font-semibold">${Number(amount).toFixed(2)}</span>.
          Your transaction was successful.
        </p>
        <p className="text-center mt-8">
          You will receive a confirmation email with the transaction details
          shortly.
        </p>
      </div>
    </main>
  )
}
