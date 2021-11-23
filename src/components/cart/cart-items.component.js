import React from 'react'

import CartItem from './cart-item.component'
import { useIsClient } from '../../hooks'

const CartItems = ({ cart }) => {
  const { isClient, key } = useIsClient()
  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <ul
        role="list"
        key={key}
        className="border-t border-b border-blue-gray-200 divide-y divide-gray-200"
      >
        {!isClient
          ? null
          : cart.map(item => (
              <li key={item.variant.id} className="flex py-6 sm:py-10">
                <CartItem item={item} />
              </li>
            ))}
      </ul>
    </section>
  )
}

export default CartItems
