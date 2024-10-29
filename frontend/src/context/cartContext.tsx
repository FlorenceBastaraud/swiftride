'use client'

import { createContext, ReactNode, useState, useEffect } from 'react'
import { CartItem } from '@/types/cart'

interface CartProviderProps {
  children: ReactNode
}

type TCartContextValues = {
  cart: CartItem[]
  cartTotal: number
  addToCart: (slug: string) => void
  updateCart: (newCart: CartItem[]) => void
  getProductQuantityInCart: (slug: string) => number
  removeFromCart: (slug: string) => void
}

const CartContext = createContext({} as TCartContextValues)

export default CartContext

const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState<number>(0)

  const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return []
    try {
      const cart = localStorage.getItem('swiftride-cart')
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error('Error parsing cart data from localStorage', error)
      return []
    }
  }

  const addToCart = (slug: string): void => {
    const existingCart = getCart()
    const itemIndex = existingCart.findIndex((item) => item.slug === slug)

    if (itemIndex !== -1) {
      existingCart[itemIndex].quantity += 1
    } else {
      existingCart.push({ slug, quantity: 1 })
    }

    updateCart(existingCart)
  }

  const removeFromCart = (slug: string): void => {
    const itemToRemove = cart.find((item) => item.slug === slug)
    let newCart: CartItem[] = []

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        newCart = cart.map((item) => {
          if (item.slug === slug) {
            item.quantity -= 1
            return item
          } else {
            return item
          }
        })
      } else if (itemToRemove.quantity === 1) {
        newCart = cart.filter((item) => item.slug !== slug)
      }
    }

    updateCart(newCart)
  }

  const updateCart = (newCart: CartItem[]): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('swiftride-cart', JSON.stringify(newCart))
      setCart(newCart)
    }
  }

  const getProductQuantityInCart = (slug: string): number => {
    const p = cart.find((c) => c.slug === slug)
    return p?.quantity || 0
  }

  useEffect(() => {
    setCart(getCart())
  }, [])

  useEffect(() => {
    const getCartTotal = () => {
      return Array.isArray(cart)
        ? cart.reduce((acc, item) => acc + item.quantity, 0)
        : 0
    }

    setCartTotal(getCartTotal())
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        addToCart,
        updateCart,
        getProductQuantityInCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContextProvider }
