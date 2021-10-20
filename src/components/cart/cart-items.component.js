import React, { useContext } from 'react'

import { CartContext } from '../../contexts'
import CartItem from './cart-item.component'

const CartItems = () => {
  const { cart } = useContext(CartContext)

  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <ul
        role="list"
        className="border-t border-b border-blue-gray-200 divide-y divide-gray-200"
      >
        {cart.map((item) => (
          <li key={item.variant.id} className="flex py-6 sm:py-10">
            <CartItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CartItems
