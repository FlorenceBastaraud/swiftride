import { ReactNode } from 'react'

export type CartItem = {
  slug: string
  quantity: number
}
export type CartProvider = {
  children: ReactNode
}
