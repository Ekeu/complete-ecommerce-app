import { BadgeCheckIcon, BanIcon } from '@heroicons/react/solid'
import React from 'react'
import { currencyFormatter } from '../../utils/functions'

const CartItemInfo = ({ item }) => {
  return (
    <div className="flex justify-between sm:grid sm:grid-cols-2">
      <div className="pr-6 font-hind">
        <h3 className="text-sm flex space-x-2">
          <span className="font-medium font-hind text-blue-gray-700 hover:text-blue-gray-800">
            {item.name}
          </span>
          {item.quantity > 0 ? (
            <BadgeCheckIcon className={'h5 w-5 text-green-500'} />
          ) : (
            <BanIcon className={'h5 w-5 text-rose-500'} />
          )}
        </h3>
        <p className="mt-1 text-sm text-blue-gray-500 capitalize">
          {item.variant.colorLabel}
        </p>

        <p className="mt-1 text-sm text-blue-gray-500">{item.variant.size}</p>
        <p className="mt-1 text-purple-500 capitaliz text-sm">
          {item.variant.style}
        </p>
      </div>

      <p className="text-sm font-medium font-hind text-blue-gray-800 text-right">
        {currencyFormatter(item.variant.price)}
      </p>
    </div>
  )
}

export default CartItemInfo
