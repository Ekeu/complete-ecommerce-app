import React from 'react'
import { currencyFormatter } from '../../utils/functions'

const PlacedOrderSummary = ({ subtotal, shipping, tax, total }) => {
  const summaryInfo = [
    {
      label: 'Subtotal',
      amount: subtotal,
    },
    {
      label: 'Shipping',
      amount: shipping,
    },
    {
      label: 'Taxes',
      amount: tax,
    },
    {
      label: 'Total',
      amount: total,
    },
  ]
  return (
    <dl className="space-y-6 border-t border-blue-gray-200 text-sm pt-10">
      {summaryInfo.map(info => (
        <div key={info.label} className="flex justify-between text-base font-hind">
          <dt className="font-medium text-blue-gray-800">{info.label}</dt>
          <dd className="text-blue-gray-700">{currencyFormatter(info.amount)}</dd>
        </div>
      ))}
    </dl>
  )
}

export default PlacedOrderSummary
