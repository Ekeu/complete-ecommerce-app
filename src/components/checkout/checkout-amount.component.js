import React from 'react'
import { currencyFormatter } from '../../utils/functions'

const CheckoutAmount = ({ cartPricingInfos }) => {
  return (
    <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6 font-hind">
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
