import React from 'react'
import Link from 'next/link'
import { Product } from '@/data/propTypes/product'
import { stripText } from '@/utils/functions'

interface ProductCardProps {
  productDetails: Product
  isBestSeller?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  productDetails,
  isBestSeller,
}) => {
  const imageUrl = productDetails.Image[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${productDetails.Image[0].url}`
    : '/images/default-product-image.png'

  const imageAlt =
    productDetails.Image[0]?.alternativeText || `${productDetails.Name} image`

  return (
    <Link href={`/products/${productDetails.Slug}`} passHref>
      <div
        className={`overflow-hidden bg-white p-6 rounded-lg shadow-lg max-w-product-card mx-auto relative transition-transform duration-200 ease-in-out hover:ring-2 hover:ring-black-400 ${
          isBestSeller ? 'ring-2 ring-black-400' : ''
        }`}
      >
        {isBestSeller && (
          <div className="absolute top-0 right-0 bg-blue-400 text-black text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
            Best Seller
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
  )
}

export default ProductCard
