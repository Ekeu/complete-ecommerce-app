import React from 'react'
import { RadioGroup } from '@headlessui/react'

import { classNames } from '../../utils/functions'

const ProductSizes = ({
  productSizes,
  selectedSize,
  setSelectedSize,
  stockDisplay,
  quantity,
}) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-blue-gray-800">Size</h4>
        <span
          className={`text-sm font-medium ${
            quantity === 0 ? 'text-red-600' : 'text-purple-600'
          }`}
        >
          {stockDisplay}
        </span>
      </div>

      <RadioGroup
        value={selectedSize}
        onChange={setSelectedSize}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-7 gap-2">
          {productSizes.map(size => (
            <RadioGroup.Option
              key={`${size.name}-${Math.random()}`}
              value={size.name}
              className={({ active, checked }) =>
                classNames(
                  'cursor-pointer focus:outline-none',
                  active ? 'ring-2 ring-offset-2 ring-purple-500' : '',
                  checked
                    ? 'bg-purple-600 border-transparent text-white hover:bg-purple-700'
                    : 'bg-white border-blue-gray-200 text-blue-gray-800 hover:bg-blue-gray-50',
                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                )
              }
            >
              <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default ProductSizes
