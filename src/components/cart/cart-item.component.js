import React, { useState } from 'react'

import CartItemInfo from './cart-item-info.component'
import CartItemQuantity from './cart-item-quantity.component'
import Favorite from '../favorite/favorite.component'
import Subscription from '../subscription/subscription.component'
import { SUBS_FREQUENCIES } from '../../constants/products.constants'

const CartItem = ({ item }) => {
  const userSelectedFrquency = SUBS_FREQUENCIES.find(
    frequency => frequency.label === item.subscription
  )
  const [selectedFrequency, setSelectedFrequency] = useState(
    userSelectedFrquency || SUBS_FREQUENCIES[0]
  )
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
          <CartItemInfo
            item={item}
            selectedFrequency={selectedFrequency}
            setSelectedFrequency={setSelectedFrequency}
          />
          <CartItemQuantity item={item} />
        </div>
        <div className="mt-4 flex text-sm font-hind p-0">
          <Favorite
            variant={item.variant.id}
            iconClassName={'h-5 w-5'}
            buttonClassName={
              'py-0 px-0 flex space-x-2 border-transparent shadow-none text-blue-gray-700'
            }
            iconLocation={'cart'}
            label={'Favorite'}
          />
          <Subscription
            iconClassName={'h-5 w-5'}
            stockQuantity={item.stock}
            variant={item.variant}
            productName={item.name}
            buttonClassName={
              'ml-2 lg:ml-4 py-0 px-0 flex space-x-2 border-transparent shadow-none text-blue-gray-700'
            }
            iconLocation={'cart'}
            label={'Subscribe'}
            cartFrequency={selectedFrequency?.label}
          />
        </div>
      </div>
    </>
  )
}

export default CartItem
