import React, { useContext } from 'react'
import { PRODUCT_QUANTITY_OPTIONS } from '../../constants/products.constants'
import { CartContext } from '../../contexts'
import { addToCart } from '../../contexts/actions'

import { currencyFormatter } from '../../utils/functions'
import FormInput from '../form-input/form-input.component'

const CheckoutItemPriceAndQty = ({ item }) => {
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
  return (
    <div className="flex-1 pt-2 flex items-end justify-between">
      <p className="mt-1 text-sm font-medium font-hind text-blue-gray-800">
        {currencyFormatter(item.variant.price)}
      </p>

      <div className="ml-4">
        <FormInput
          id={`quantity-${item.variant.id}`}
          name={`quantity-${item.variant.id}`}
          select
          value={item.quantity}
          labelText={`Quantity`}
          labelClassName={'sr-only'}
          label={`quantity-${item.variant.id}`}
          onChange={handleAddToCart}
          style={{ padding: '0.5rem  2.5rem 0.5rem 0.75rem' }}
          inputStyles={'text-left cursor-pointer text-base'}
          selectOptions={PRODUCT_QUANTITY_OPTIONS}
        />
      </div>
    </div>
  )
}

export default CheckoutItemPriceAndQty
