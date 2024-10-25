import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/types/product'
import { stripText } from '@/utils/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { addToCart, getCart, updateCart } from '@/utils/functions'

interface ProductCardProps {
  productDetails: Product
  isBestSeller?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  productDetails,
  isBestSeller,
}) => {
  const [quantity, setQuantity] = useState(0)

  const imageUrl = productDetails.Image[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${productDetails.Image[0].url}`
    : '/images/default-product-image.png'

  const imageAlt =
    productDetails.Image[0]?.alternativeText || `${productDetails.Name} image`

  const isOutOfStock = productDetails.Stock === 0

  useEffect(() => {
    const cart = getCart()
    const itemQuantity = cart[productDetails.Slug]?.quantity || 0
    setQuantity(itemQuantity)
  }, [productDetails.Slug])

  const handleAddToCart = () => {
    addToCart(productDetails.Slug)
    setQuantity((prev) => {
      const newQuantity = prev + 1
      const cart = getCart()
      cart[productDetails.Slug] = { quantity: newQuantity }
      updateCart(cart)
      return newQuantity
    })
  }

  return (
    <div
      className={`relative w-80 md:w-full overflow-hidden bg-white p-6 rounded-lg shadow-lg max-w-product-card mx-auto transition-transform duration-200 ease-in-out hover:ring-2 hover:ring-black-400 ${
        isBestSeller ? 'ring-2 ring-black-400' : ''
      }`}
    >
      <Link
        href={`/shop/${productDetails.Slug}`}
        passHref
        className="hover:scale-[1.005] transition-effect"
      >
        <div>
          {isBestSeller && (
            <div className="absolute top-0 right-0 bg-blue-400 text-black text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
              Best Seller
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              Out of Stock
            </div>
          )}

          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-48 object-contain rounded-t-lg mb-4"
          />
          <h3 className="text-xl font-bold mb-2">{productDetails.Name}</h3>
          <p className="text-gray-600">
            {stripText(productDetails.Description[0].children[0].text, 100)}
          </p>
          <p className="text-lg font-semibold mt-2">
            ${productDetails.Price.toFixed(2)}
          </p>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handleAddToCart()
        }}
        className="absolute bottom-4 right-4 flex gap-2 items-center justify-center text-black"
        aria-label={`Add ${productDetails.Name} to cart`}
      >
        <FontAwesomeIcon
          icon={faCartShopping}
          className={`hover:text-blue-800 transition-effect ${
            quantity > 0 ? 'text-blue-800' : ''
          }`}
        />
        {quantity > 0 && (
          <span className={`font-semibold text-blue-800`}>{quantity}</span>
        )}
      </button>
    </div>
  )
}

export default ProductCard
