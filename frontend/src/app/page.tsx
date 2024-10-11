'use client'

import HeroSlider from '@/components/HeroSlider'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Product } from '@/data/propTypes/product'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=Image`
      )
      const filteredProducts = response.data.data
        .filter((product: Product) => product.Stock > 0)
        .sort((a: Product, b: Product) => b.Stock - a.Stock)

      console.log(filteredProducts)
      setProducts(filteredProducts)
    }

    fetchProducts()
  }, [])

  return (
    <main className="wrapper-flex-1 overflow-x-hidden">
      <HeroSlider />
      <section className="wrapper" style={{ padding: '3em 0' }}>
        <h2 className="text-3xl font-semibold text-center mb-8">
          Best Sellers
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard
              key={product.id}
              productDetails={product}
              isBestSeller={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="wrapper">SECTION: Gallery masonry</section>
      <section className="wrapper">SECTION: Newsletter</section>
    </main>
  )
}
