import React from 'react'
import { RadioGroup } from '@headlessui/react'

import { PRODUCT_COLORS } from '../../constants/products.constants'
import { classNames } from '../../utils/functions'

const ProductColors = ({ productColors, selectedColor, setSelectedColor }) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-blue-gray-800">Color</h4>

      <RadioGroup
        value={selectedColor}
        onChange={setSelectedColor}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {productColors.sort().map(color => (
            <RadioGroup.Option
              key={color}
              value={color}
              className={({ active, checked }) =>
                classNames(
                  PRODUCT_COLORS[color].ringColor,
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                )
              }
            >
              <RadioGroup.Label as="p" className="sr-only">
                {PRODUCT_COLORS[color].name}
              </RadioGroup.Label>
              <span
                aria-hidden="true"
                className={classNames(
                  PRODUCT_COLORS[color].bgColor,
                  'h-8 w-8 border border-black border-opacity-10 rounded-full'
                )}
              />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default ProductColors
