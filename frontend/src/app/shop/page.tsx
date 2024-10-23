'use client'

import HeroSlider from '@/components/HeroSlider'
import { Product } from '@/types/product'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Shop() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[] | []>([])
  const [products, setProducts] = useState<Product[] | []>([])

  async function getProducts() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=Image`
      )

      const featuredProductsData: Product[] = response.data.data.filter(
        (product: Product) => product?.featured
      )

      console.log(featuredProductsData)

      setFeaturedProducts(featuredProductsData)
      setProducts(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <main className="wrapper-flex-1 overflow-x-hidden">
      <HeroSlider data={featuredProducts} type="products" />
    </main>
  )
}
