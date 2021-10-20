import React from 'react'

const PlacedOrderAddress = ({ headline, address }) => {
  return (
    <div>
      <dt className="font-medium font-hind text-blue-gray-800 text-base">{headline}</dt>
      <dd className="mt-2 text-sm text-blue-gray-700 font-hind">
        <address className="not-italic">
          <span className="block">{address?.street}</span>
          <span className="block">
            {address?.zip} {address?.city}
          </span>
          <span className="block">{address?.state}</span>
        </address>
      </dd>
    </div>
  )
}

export default PlacedOrderAddress
