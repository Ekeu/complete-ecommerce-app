import React from 'react'
import { currencyFormatter } from '../../utils/functions'

const CheckoutAmount = ({ cartPricingInfos }) => {

  return (
    <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6 font-hind">
      <div>
        <label
          htmlFor="discount-code"
          className="block text-sm font-medium text-gray-700"
        >
          Discount code
        </label>
        <div className="flex space-x-4 mt-1">
          <input
            type="text"
            id="discount-code"
            name="discount-code"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            Apply
          </button>
        </div>
      </div>
      {cartPricingInfos.map(info => (
        <div
          key={info.label}
          className={`flex items-center justify-between ${info.containerStyles}`}
        >
          <dt className={`text-sm ${info.labelStyles}`}>{info.label}</dt>
          <dd
            className={`text-sm font-medium text-blue-gray-800 ${info.pricingStyles}`}
          >
            {currencyFormatter(info.value)}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default CheckoutAmount
