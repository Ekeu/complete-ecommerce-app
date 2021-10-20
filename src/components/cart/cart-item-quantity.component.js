import React, { useContext } from 'react'
import { CartContext } from '../../contexts'
import { addToCart, removeFromCart } from '../../contexts/actions'

const CartItemQuantity = ({ item }) => {
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

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.variant))
  }
  return (
    <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
      <label htmlFor={`quantity-${item.variant.id}`} className="sr-only">
        Quantity, {item.name}
      </label>
      <select
        id={`quantity-${item.variant.id}`}
        name={`quantity-${item.variant.id}`}
        onChange={handleAddToCart}
        value={item.quantity}
        className="block max-w-full rounded-md border border-blue-gray-300 py-1.5 text-base leading-5 font-medium text-blue-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm cursor-pointer"
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

      <button
        type="button"
        onClick={handleRemoveFromCart}
        className="ml-4 text-sm font-medium text-purple-600 hover:text-purple-500 sm:ml-0 sm:mt-3"
      >
        <span>Remove</span>
      </button>
    </div>
  )
}

export default CartItemQuantity
