'use client'

import axios from 'axios'
import { notFound } from 'next/navigation'
import { Product } from '@/types/product'
import Link from 'next/link'
import { useEffect, useState } from 'react'

async function getProduct(slug: string): Promise<Product | null> {
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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProduct(params.slug)
      if (!productData) {
        notFound()
      } else {
        setProduct(productData)
      }
    }

    fetchProduct()
  }, [params.slug])

  if (!product) {
    return <div>Loading...</div>
  }

  const imageUrl = product.Image[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.Image[0].url}`
    : '/images/default-product-image.png'

  const imageAlt = product.Image[0]?.alternativeText || `${product.Name} image`

  return (
    <main
      className="wrapper wrapper-flex-1 overflow-x-hidden mx-auto"
      style={{ marginTop: '56px', padding: '2rem 1rem 5rem' }}
    >
      <Link href="/shop" className="text-black underline mb-4">
        Return to shop page
      </Link>
      <div className="flex flex-wrap md:flex-nowrap mb-6">
        <div className="md:w-1/2 h-[400px] overflow-hidden relative">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full mb-4 object-contain rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>
        <div className="md:w-1/2 md:pl-6 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-2">{product.Name}</h1>
          <p className="text-2xl font-semibold text-blue-950 mb-4">
            ${product.Price}
          </p>
          <button className="w-fit text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black">
            Add to Cart
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Description</h2>
        <p className="text-lg mb-4">
          {product.Description[0].children[0].text}
        </p>
      </div>
      <div className="border-t mt-8 pt-4">
        <h2 className="text-lg font-bold mb-2">Related Products</h2>
        <div className="flex space-x-4">{/* related products */}</div>
      </div>
    </main>
  )
}
