import { CartItem } from './cart'

export type Order = {
  name: string
  email: string
  address: string
  city: string
  postalCode: string
  list: CartItem[]
}
