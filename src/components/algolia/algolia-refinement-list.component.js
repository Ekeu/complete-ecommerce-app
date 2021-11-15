import React from 'react'
import { connectRefinementList } from 'react-instantsearch-dom'
import { PRODUCT_COLORS } from '../../constants/products.constants'

const RefinementList = ({ items, refine, label, isColor }) => {
  return (
    <fieldset>
      <legend className="block font-medium capitalize font-hind">
        {label}
      </legend>
      <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
        {items.map(item => (
          <div
            key={item.label}
            className="flex items-center text-base font-hind sm:text-sm"
          >
            <input
              id={item.label}
              name="rls"
              onClick={() => refine(item.value)}
              type={'checkbox'}
              className={
                'flex-shrink-0 h-4 w-4 border-blue-gray-300 rounded text-purple-600 focus:ring-white cursor-pointer'
              }
            />
            <label
              htmlFor={item.label}
              className="ml-3 min-w-0 flex-1 text-blue-gray-600 capitalize"
            >
              {isColor ? PRODUCT_COLORS[item.label].name : item.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

const AlgoliaRefinementList = connectRefinementList(RefinementList)

export default AlgoliaRefinementList
