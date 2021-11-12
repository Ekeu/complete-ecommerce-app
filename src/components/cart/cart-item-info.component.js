import React, { useContext, useState } from 'react'

import { CartContext } from '../../contexts'
import { changeFrequency } from '../../contexts/actions'

import { SUBS_FREQUENCIES } from '../../constants/products.constants'
import { currencyFormatter } from '../../utils/functions'
import Select from '../select/select.component'

const CartItemInfo = ({ item, selectedFrequency, setSelectedFrequency }) => {
  const { dispatch } = useContext(CartContext)

  const handleFrequencyChange = newFrequency => {
    dispatch(changeFrequency(item.variant, newFrequency.label))
    setSelectedFrequency(newFrequency)
  }

  return (
    <div className="flex justify-between sm:grid sm:grid-cols-2">
      <div className="pr-6 font-hind">
        <h3 className="text-sm flex space-x-2">
          <span className="font-medium font-hind text-blue-gray-700 hover:text-blue-gray-800">
            {item.name}
          </span>
        </h3>
        <p className="mt-1 text-sm text-blue-gray-500 capitalize">
          {item.variant.colorLabel}
        </p>

        <p className="mt-1 text-sm text-blue-gray-500">{item.variant.size}</p>
        <p className="mt-1 text-purple-500 capitaliz text-sm">
          {item.variant.style}
        </p>
        {item.subscription && (
          <Select
            selected={selectedFrequency}
            setSelected={handleFrequencyChange}
            selectOptions={SUBS_FREQUENCIES}
            description={'Change delivery frquency'}
          />
        )}
      </div>

      <p className="text-sm font-medium font-hind text-blue-gray-800 text-right">
        {currencyFormatter(item.variant.price)}
      </p>
    </div>
  )
}

export default CartItemInfo
