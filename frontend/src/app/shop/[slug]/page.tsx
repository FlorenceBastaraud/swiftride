'use client'

import { notFound } from 'next/navigation'
import { Product } from '@/types/product'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import {
  getProduct,
  getCategoryProducts,
  getRandomProducts,
} from '@/utils/functions'
import ProductCard from '@/components/ProductCard'
import CartContext from '@/context/cartContext'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addToCart, getProductQuantityInCart } = useContext(CartContext)

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(null)

  const quantity = getProductQuantityInCart(params.slug)

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProduct(params.slug)
      if (!productData) {
        notFound()
      } else {
        setProduct(productData)
        const relatedProductsData = await getCategoryProducts(
          productData.category.Slug
        )
        setRelatedProducts(getRandomProducts(relatedProductsData || [], 4))
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
        Shop page
      </Link>
      <section className="flex flex-wrap md:flex-nowrap mb-6 mt-3 gap-2">
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
          <button
            className={`w-fit py-1 px-4 border-2 border-transparent rounded-2xl transition-effect hover:bg-white  hover:border-black ${
              quantity > 0
                ? 'bg-white text-black border-blue-400 font-semibold hover:text-gray-600'
                : 'bg-black text-white hover:text-black'
            }`}
            onClick={() => addToCart(product.Slug)}
          >
            Add to Cart
            {quantity > 0 && <span className="ml-2">x {quantity}</span>}
          </button>
        </div>
      </section>
      <section>
        <h2 className="text-lg font-bold mb-2">Description</h2>
        <p className="text-lg mb-4">
          {product.Description[0].children[0].text}
        </p>
      </section>
      <section className="border-t mt-10 pt-4">
        <h2 className="text-lg font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 rproducts:grid-cols-4">
          {relatedProducts &&
            relatedProducts?.length > 0 &&
            relatedProducts?.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.Slug}
                productDetails={relatedProduct}
              />
            ))}
        </div>
      </section>
    </main>
  )
}
