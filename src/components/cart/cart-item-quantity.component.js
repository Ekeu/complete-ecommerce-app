import React, { useContext } from 'react'
import { PRODUCT_QUANTITY_OPTIONS } from '../../constants/products.constants'
import { CartContext } from '../../contexts'
import { addToCart, removeFromCart } from '../../contexts/actions'
import FormInput from '../form-input/form-input.component'

const CartItemQuantity = ({ item }) => {
  const { dispatch } = useContext(CartContext)

  const handleAddToCart = e => {
    dispatch(
      addToCart(
        item.variant,
        Number(e.target.value),
        item.name,
        item.stock,
        null,
        true
      )
    )
  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.variant))
  }
  return (
    <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
      <FormInput
        id={`quantity-${item.variant.id}`}
        name={`quantity-${item.variant.id}`}
        select
        value={item.quantity}
        labelText={`Quantity, ${item.name}`}
        labelClassName={'sr-only'}
        label={`quantity-${item.variant.id}`}
        onChange={handleAddToCart}
        style={{ padding: '0.375rem  2.5rem 0.375rem 0.75rem' }}
        inputStyles={
          'block max-w-full leading-5 text-left cursor-pointer text-base'
        }
        selectOptions={PRODUCT_QUANTITY_OPTIONS}
      />

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
