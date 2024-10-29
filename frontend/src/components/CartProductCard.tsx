import CartContext from '@/context/cartContext'
import { CartItem } from '@/types/cart'
import React, { useContext } from 'react'

type TCartProductCard = {
  item: CartItem
}

const CartProductCard: React.FC<TCartProductCard> = ({ item }) => {
  const { addToCart, removeFromCart } = useContext(CartContext)

  return (
    <div className="flex items-center p-4 border-b border-gray-200 gap-4 max-sm:flex-col">
      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={process.env.NEXT_PUBLIC_STRAPI_URL + item.product.Image[0].url}
          className="object-cover w-full h-full"
          alt={item.product.Image[0]?.alternativeText}
        />
      </div>
      <div className="flex-1 ml-4 max-sm:ml-0 max-sm:text-center">
        <p className="text-lg font-medium text-gray-800">{item.product.Name}</p>
        <p className="text-sm text-gray-500">
          Price: ${item.product.Price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>

      <div className="text-lg font-semibold text-gray-800">
        ${(item.product.Price * item.quantity).toFixed(2)}
      </div>
      <div className="flex">
        <button
          className="text-black bg-slate-200 text-center flex justify-center items-center w-[20px] py-0 px-2 text-lg font-bold transition-effect transition-1s hover:bg-slate-400 hover:text-blue-945 hover:border-black"
          onClick={() => removeFromCart(item.slug)}
          aria-label={`Remove ${item.product.Name} from cart`}
        >
          -
        </button>
        <button
          className="text-white bg-black text-center flex justify-center items-center w-[20px] py-0 px-2 text-lg font-bold transition-effect transition-1s hover:bg-slate-400 hover:text-blue-945 hover:border-black"
          onClick={() => addToCart(item.slug, item.product)}
          aria-label={`Add ${item.product.Name} to cart`}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default CartProductCard
