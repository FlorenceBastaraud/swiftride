'use client'

import CartContext from '@/context/cartContext'
import { useContext } from 'react'
import Link from 'next/link'
import CartProductCard from '@/components/CartProductCard'

export default function Cart() {
  const { cart, deleteCart, cartTotal, cartTotalPrice } =
    useContext(CartContext)

  return (
    <main
      className="wrapper wrapper-flex-1 overflow-x-hidden mx-auto"
      style={{ marginTop: '56px', padding: '2rem 1rem 5rem' }}
    >
      <h1 className="relative flex items-center justify-center z-10 text-4xl md:text-5xl font-bold text-black text-center px-4">
        Cart <span className="text-sm ml-2">({cartTotal})</span>
      </h1>
      {cartTotal > 0 ? (
        <div className="flex flex-col mt-8 space-y-6 px-4 md:px-8">
          <div className="flex flex-col space-y-4">
            {cart.length > 0 &&
              cart.map((item) => (
                <CartProductCard key={item.product.Slug} item={item} />
              ))}
          </div>

          <div className="p-4 border-t border-gray-200 mt-6">
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total:</span>
              <span>${cartTotalPrice.toFixed(2)}</span>
            </div>
            {cartTotal > 0 && (
              <button
                className="mt-4 w-full py-2 text-black bg-slate-200 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={deleteCart}
              >
                Clear
              </button>
            )}
            <Link
              href="/checkout"
              className="mt-4 block text-center w-full py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10 gap-3">
          <p className="text-lg">There are no items in your cart.</p>
          <Link
            href="/shop"
            className="text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
          >
            Shop
          </Link>
        </div>
      )}
    </main>
  )
}
