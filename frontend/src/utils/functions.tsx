import { Product } from '@/types/product'
import axios from 'axios'

export function stripText(text: string, limit: number): string {
  if (limit < 0) return '...'
  return text.length > limit ? text.slice(0, limit) + '...' : text
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[Slug][$eq]=${slug}&populate=*`
    )
    return response.data.data.length > 0 ? response.data.data[0] : null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getCategoryProducts(categorySlug: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[category][Slug][$eq]=${categorySlug}&populate=*`
    )

    if (response.data?.data?.length > 0) {
      return response.data.data as Product[]
    } else {
      console.warn('No products found for the specified category slug')
      return null
    }
  } catch (error) {
    console.error('Error fetching category products:', error)
    return null
  }
}

export function getRandomProducts(
  products: Product[],
  count: number
): Product[] {
  return products.sort(() => Math.random() - 0.5).slice(0, count)
}

type CartItem = {
  slug: string
  quantity: number
}

export const addToCart = (slug: string) => {
  const cart = getCart()
  cart[slug] = cart[slug] || { quantity: 0 }
  cart[slug].quantity += 1
  updateCart(cart)
  getCartTotal()
}

export const getCart = () => {
  if (typeof window === 'undefined') return {}
  const cart = localStorage.getItem('swiftride-cart')
  return cart ? JSON.parse(cart) : {}
}

export const updateCart = (cart: CartItem) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('swiftride-cart', JSON.stringify(cart))
  }
}

export function getCartTotal() {
  const cart: CartItem[] = getCart()
  return Object.values(cart).reduce((acc, item) => acc + item.quantity, 0)
}
