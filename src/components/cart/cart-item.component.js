import React from 'react'
import { CalendarIcon, StarIcon } from '@heroicons/react/solid'

import CartItemInfo from './cart-item-info.component'
import CartItemQuantity from './cart-item-quantity.component'
import Badge from '../badge/badge.component'

const CartItem = ({ item }) => {
  const actions = [
    { icon: StarIcon, label: 'Favorite', color: 'text-yellow-400' },
    { icon: CalendarIcon, label: 'Subscribe', color: 'text-purple-400' },
  ]
  return (
    <>
      <div className="flex-shrink-0">
        <img
          src={process.env.GATSBY_STRAPI_URL + item.variant.images[0].url}
          alt={item.variant.id}
          className="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32"
        />
      </div>
      <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div>
          <CartItemInfo item={item} />
          <CartItemQuantity item={item} />
        </div>
        <div className="mt-4 flex text-sm font-hind p-0">
          {actions.map((action, idx) => (
            <span
              key={idx}
              role={'button'}
              className={`${
                idx !== 0 ? 'ml-2 pl-2 lg:pl-3 lg:ml-4' : ''
              } cursor-pointer`}
            >
              <Badge styles="space-x-2 bg-transparent text-blue-gray-700 items-center">
                <action.icon
                  className={`flex-shrink-0 h-5 w-5 ${action.color}`}
                />

                <span>{action.label}</span>
              </Badge>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default CartItem
