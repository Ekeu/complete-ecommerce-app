import React from 'react'
import { RadioGroup } from '@headlessui/react'

import { classNames } from '../../utils/functions'

const ProductSizes = ({ productSizes, selectedSize, setSelectedSize }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-blue-gray-800">Size</h4>
        <a
          rel={'noreferrer'}
          target={'_blank'}
          href={'https://www.adidas.com.my/en/help-topics-size_charts.html'}
          className={
            'text-sm font-medium text-purple-600 hover:text-purple-500'
          }
        >
          Size guide
        </a>
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
                  size.inStock
                    ? 'cursor-pointer focus:outline-none'
                    : 'opacity-25 cursor-not-allowed',
                  active ? 'ring-2 ring-offset-2 ring-purple-500' : '',
                  checked
                    ? 'bg-purple-600 border-transparent text-white hover:bg-purple-700'
                    : 'bg-white border-blue-gray-200 text-blue-gray-800 hover:bg-blue-gray-50',
                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                )
              }
              disabled={!size.inStock}
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
