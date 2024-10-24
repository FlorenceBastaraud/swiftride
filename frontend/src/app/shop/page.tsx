'use client'

import HeroSlider from '@/components/HeroSlider'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'
import axios from 'axios'
import { useEffect, useState } from 'react'

const productsPerPage = 9

export default function Shop() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[] | []>([])
  const [products, setProducts] = useState<Product[] | []>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  async function getProducts() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=*`
      )

      const featuredProductsData: Product[] = response.data.data.filter(
        (product: Product) => product?.featured
      )

      setFeaturedProducts(featuredProductsData)
      setProducts(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const totalPages = Math.ceil(products.length / productsPerPage)
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  function handlePagination(page: number) {
    setCurrentPage(page)
  }

  return (
    <main className="wrapper-flex-1 overflow-x-hidden">
      <h1
        className="text-4xl italic font-semibold text-center absolute top-7"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        Shop
      </h1>

      <HeroSlider data={featuredProducts} type="products" />

      <section className="wrapper wrapper-py-3 g-12 flex">
        <div className="py-10 px-14">Filters</div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
          {paginatedProducts.length > 0 &&
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} productDetails={product} />
            ))}
        </div>
      </section>

      <section className="pagination flex justify-center my-8 gap-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePagination(index + 1)}
            className={`transition-effect gap-5 bg-black-500 bg-black h-8 w-8 rounded-full shadow-lg transition-opacity duration-300 hover:bg-blue-400 hover:scale-110 flex items-center justify-center ${
              currentPage === index + 1
                ? 'bg-blue-900 text-white'
                : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </section>
    </main>
  )
}
