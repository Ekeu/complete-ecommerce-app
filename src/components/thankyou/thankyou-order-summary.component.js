import React from 'react'
import { currencyFormatter } from '../../utils/functions'

const ThankyouOrderSummary = ({ subtotal, shipping, tax, total }) => {
  const summaryInfo = [
    {
      label: 'Subtotal',
      amount: subtotal,
      constainerClass: '',
      labelClass: '',
      valueClass: 'text-gray-900',
    },
    {
      label: 'Shipping',
      amount: shipping,
      constainerClass: '',
      labelClass: '',
      valueClass: 'text-gray-900',
    },
    {
      label: 'Taxes',
      amount: tax,
      constainerClass: '',
      labelClass: '',
      valueClass: 'text-gray-900',
    },
    {
      label: 'Total',
      amount: total,
      constainerClass:
        'items-center border-t border-blue-gray-200 text-blue-gray-800 pt-6',
      labelClass: 'text-base',
      valueClass: 'text-base',
    },
  ]
  return (
    <dl className="text-sm font-medium font-hind text-blue-gray-500 space-y-6 border-t border-blue-gray-200 pt-6">
      {summaryInfo.map(info => (
        <div className={`flex justify-between ${info.constainerClass}`} key={info.label}>
          <dt className={info.labelClass}>{info.label}</dt>
          <dd className={info.valueClass}>{currencyFormatter(info.amount)}</dd>
        </div>
      ))}
    </dl>
  )
}

export default ThankyouOrderSummary
