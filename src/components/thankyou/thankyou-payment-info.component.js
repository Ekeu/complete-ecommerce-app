import React from 'react'
import { CREDIT_CARD_ICONS } from '../../constants/credit-cards.constants'

const ThankyouPaymentInfo = ({ order }) => {
  return (
    <div>
      <dt className="font-medium font-hind text-blue-gray-800">
        Payment Information
      </dt>
      <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
        <div className="flex-none">
          {CREDIT_CARD_ICONS[order?.paymentMethod.brand]}
        </div>
        <div className="flex-auto">
          <p className="text-blue-gray-800">
            Ending with {order?.paymentMethod.last4}
          </p>
          <p>
            Expires {order?.paymentMethod.exp_month} /{' '}
            {order?.paymentMethod.exp_year}
          </p>
        </div>
      </dd>
    </div>
  )
}

export default ThankyouPaymentInfo
