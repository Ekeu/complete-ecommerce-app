import React from 'react'
import { currencyFormatter } from '../../utils/functions'

const PlacedOrderItem = ({ item }) => {
  return (
    <div className="py-10 border-b border-blue-gray-200 flex space-x-6">
      <img
        src={process.env.GATSBY_STRAPI_URL + item.variant.images[0].url}
        alt={item.name}
        className="flex-none w-20 h-20 object-center object-cover bg-blue-gray-100 rounded-lg sm:w-40 sm:h-40"
      />
      <div className="flex-auto flex flex-col">
        <div className="flex-auto space-y-1 text-sm">
          <h4 className="font-medium font-hind text-blue-gray-800 text-base">
            {item.name}
          </h4>
          <p>{item.variant.style}</p>
          <p className="capitalize">{item.variant.colorLabel}</p>
          <p>{item.variant.size}</p>
        </div>
        <div className="mt-6 flex-1 flex items-end">
          <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6 font-hind">
            <div className="flex">
              <dt className="font-medium text-blue-gray-900">Quantity</dt>
              <dd className="ml-2 text-blue-gray-700">{item.quantity}</dd>
            </div>
            <div className="pl-4 flex sm:pl-6">
              <dt className="font-medium text-blue-gray-900">Price</dt>
              <dd className="ml-2 text-blue-gray-700">
                {currencyFormatter(item.variant.price)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default PlacedOrderItem
