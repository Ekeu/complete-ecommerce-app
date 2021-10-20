import React, { useContext } from 'react'
import { CartContext } from '../../contexts'
import { addToCart } from '../../contexts/actions'

import { currencyFormatter } from '../../utils/functions'

const CheckoutItemPriceAndQty = ({ item }) => {
  const { dispatch } = useContext(CartContext)

  const handleAddToCart = e => {
    dispatch(
      addToCart(
        item.variant,
        Number(e.target.value),
        item.name,
        item.stock,
        true
      )
    )
  }
  return (
    <div className="flex-1 pt-2 flex items-end justify-between">
      <p className="mt-1 text-sm font-medium font-hind text-blue-gray-800">
        {currencyFormatter(item.variant.price)}
      </p>

      <div className="ml-4">
        <label htmlFor={`quantity-${item.variant.id}`} className="sr-only">
          Quantity
        </label>
        <select
          id={`quantity-${item.variant.id}`}
          name={`quantity-${item.variant.id}`}
          onChange={handleAddToCart}
          value={item.quantity}
          className="rounded-md border border-blue-gray-300 text-base font-medium text-blue-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm cursor-pointer"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
    </div>
  )
}

export default CheckoutItemPriceAndQty
