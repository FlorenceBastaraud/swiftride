import React, { useContext } from 'react'
import Link from 'next/link'
import { Product } from '@/types/product'
import { stripText } from '@/utils/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import CartContext from '@/context/cartContext'

interface ProductCardProps {
  productDetails: Product
  isBestSeller?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  productDetails,
  isBestSeller,
}) => {
  const { addToCart, getProductQuantityInCart, removeFromCart } =
    useContext(CartContext)

  const imageUrl = productDetails.Image[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${productDetails.Image[0].url}`
    : '/images/default-product-image.png'

  const imageAlt =
    productDetails.Image[0]?.alternativeText || `${productDetails.Name} image`

  const isOutOfStock = productDetails.Stock === 0

  const quantity = getProductQuantityInCart(productDetails.Slug)

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

      <div
        onClick={(e) => {
          e.stopPropagation()
          addToCart(productDetails.Slug, productDetails)
        }}
        className="absolute bottom-4 right-4 flex gap-2 items-center justify-center text-black"
        aria-label={`Add ${productDetails.Name} to cart`}
      >
        {quantity > 0 && (
          <button
            className="text-black bg-slate-200 text-center flex justify-center items-center w-[20px] py-0 px-2 text-lg font-bold transition-effect transition-1s hover:bg-slate-400 hover:text-blue-945 hover:border-black"
            onClick={(e) => {
              e.stopPropagation()
              removeFromCart(productDetails.Slug)
            }}
            aria-label={`Remove ${productDetails.Name} from cart`}
          >
            -
          </button>
        )}

        <div className="relative">
          <FontAwesomeIcon
            icon={faCartShopping}
            className={`hover:text-blue-800 transition-effect ${
              quantity > 0 ? 'text-blue-800' : ''
            }`}
          />
          {quantity > 0 && (
            <span className="absolute top-[-10px] right-[-10px] bg-blue-800 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {quantity}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
