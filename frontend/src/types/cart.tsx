import { ReactNode } from 'react'
import { Product } from './product'

export type CartItem = {
  slug: string
  quantity: number
  product: Product
}
export type CartProvider = {
  children: ReactNode
}
