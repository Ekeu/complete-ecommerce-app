import React, { useContext } from 'react'
import { BadgeCheckIcon, BanIcon, TrashIcon } from '@heroicons/react/solid'
import { CartContext } from '../../contexts'
import { removeFromCart } from '../../contexts/actions'

const CheckoutItemInfoAndRemove = ({ item }) => {
  const { dispatch } = useContext(CartContext)

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.variant))
  }
  return (
    <div className="flex">
      <div className="min-w-0 flex-1 font-hind">
        <h4 className="text-sm flex space-x-2">
          <span className="font-medium text-blue-gray-700 hover:text-blue-gray-800">
            {item.name}
          </span>
          {item.quantity > 0 ? (
            <BadgeCheckIcon className={'h5 w-5 text-green-500'} />
          ) : (
            <BanIcon className={'h5 w-5 text-rose-500'} />
          )}
        </h4>
        <p className="mt-1 text-sm text-blue-gray-500 capitalize">
          {item.variant.colorLabel}
        </p>
        <p className="mt-1 text-sm text-blue-gray-500">{item.variant.size}</p>
        <p className="mt-1 text-purple-500 capitaliz text-sm">
          {item.variant.style}
        </p>
      </div>

      <div className="ml-4 flex-shrink-0 flow-root">
        <button
          type="button"
          onClick={handleRemoveFromCart}
          className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-blue-gray-400 hover:text-blue-gray-500"
        >
          <span className="sr-only">Remove</span>
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default CheckoutItemInfoAndRemove
