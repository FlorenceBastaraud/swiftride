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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { addToCart, getProductQuantityInCart, removeFromCart } =
    useContext(CartContext)

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(null)
  const [theSlug, setTheSlug] = useState<string>('')

  const quantity = getProductQuantityInCart(theSlug)

  useEffect(() => {
    async function fetchParams() {
      const { slug } = await params

      setTheSlug(slug)
    }
    fetchParams()
  }, [params])

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProduct(theSlug)
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
  }, [theSlug])

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
          <div className="flex items-center gap-2">
            <div className="relative">
              <FontAwesomeIcon
                icon={faCartShopping}
                className={`hover:text-blue-800 transition-effect ${
                  quantity > 0 ? 'text-blue-800' : ''
                }`}
              />
              {quantity > 0 && (
                <span className="absolute top-[-10px] right-[10px] bg-blue-800 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {quantity}
                </span>
              )}
            </div>
            <div className="flex">
              {quantity > 0 && (
                <button
                  className="text-black bg-slate-200 text-center flex justify-center items-center w-[20px] py-0 px-2 text-lg font-bold transition-effect transition-1s hover:bg-slate-400 hover:text-blue-945 hover:border-black"
                  onClick={() => removeFromCart(product.Slug)}
                  aria-label={`Remove ${product.Name} from cart`}
                >
                  -
                </button>
              )}
              <button
                className="text-white bg-black text-center flex justify-center items-center w-[20px] py-0 px-2 text-lg font-bold transition-effect transition-1s hover:bg-slate-400 hover:text-blue-945 hover:border-black"
                onClick={() => addToCart(product.Slug, product)}
                aria-label={`Add ${product.Name} to cart`}
              >
                +
              </button>
            </div>
          </div>
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
