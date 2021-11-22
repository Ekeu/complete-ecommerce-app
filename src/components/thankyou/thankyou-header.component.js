import React from 'react'

const ThankyouHeader = ({ order }) => {
  return (
    <>
      <h1 className="text-sm font-medium font-hind text-purple-600">
        Payment successful
      </h1>
      <p className="mt-2 text-4xl font-bold font-hind tracking-tight text-blue-gray-800 sm:text-5xl">
        Thanks for ordering
      </p>
      <p className="mt-2 text-base font-osans text-blue-gray-500">
        We appreciate your order, we’re currently processing it. So hang tight
        and we’ll send you confirmation very soon!
      </p>

      <dl className="mt-16 text-sm font-medium font-hind">
        <dt className="text-blue-gray-800">Tracking number</dt>
        <dd className="mt-2 text-purple-600 uppercase">
          {order?.id.slice(order?.id.length - 8, order?.id.length)}
        </dd>
      </dl>
    </>
  )
}

export default ThankyouHeader
