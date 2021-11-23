import moment from 'moment'
import React from 'react'
import { SUBS_FREQUENCIES } from '../../constants/products.constants'
import { currencyFormatter } from '../../utils/functions'

const SubscriptionCard = ({ subscription }) => {
  const frequency = SUBS_FREQUENCIES.find(
    frequency => frequency.enum === subscription?.frequency
  )
  return (
    <>
      <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
        <div className="flex sm:items-baseline sm:space-x-4">
          <h1 className="text-xl font-bold font-osans uppercase tracking-tight text-blue-gray-800 sm:text-2xl">
            Subscription #
            {subscription?.id.slice(
              subscription?.id.length - 8,
              subscription?.id.length
            )}
          </h1>
        </div>
        <p className="text-sm font-hind text-blue-gray-600">
          Subscribed on{' '}
          <span className="font-medium text-rose-500">
            {moment(subscription?.createdAt).format('ll')}
          </span>
        </p>
      </div>
      <div className="bg-white border-t border-b border-blue-gray-300 shadow-sm sm:border sm:rounded-lg mt-6">
        <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
          <div className="sm:flex lg:col-span-7">
            <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
              <img
                src={subscription?.variant?.images[0].url}
                alt={subscription.name}
                className="w-full h-full object-center object-cover sm:w-full sm:h-full"
              />
            </div>

            <div className="mt-6 sm:mt-0 sm:ml-6 font-hind">
              <h3 className="text-base font-medium text-blue-gray-800">
                {subscription.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-blue-gray-900">
                {subscription.variant.style}
              </p>
              <p className="mt-2 text-sm font-medium text-blue-gray-900">
                {currencyFormatter(subscription?.variant?.price)}
              </p>
              <p className="mt-3 text-sm truncate text-blue-gray-500 flex space-x-2">
                <span>Quantity:</span>
                <span className="text-rose-500">{subscription?.quantity}</span>
              </p>
              <p className="mt-3 text-sm truncate text-blue-gray-500 flex space-x-2">
                <span>Frequency:</span>
                <span className="text-rose-500">Every {frequency.label}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:col-span-5">
            <dl className="grid grid-cols-2 gap-x-6 text-sm">
              <div>
                <dt className="font-medium font-hind text-blue-gray-800">
                  Shipping address
                </dt>
                <dd className="mt-3 font-hind text-blue-gray-500">
                  <span className="block">
                    {subscription?.shippingAddress?.street}
                  </span>
                  <span className="block">
                    {subscription?.shippingAddress?.zip},
                    {subscription?.shippingAddress?.city}
                  </span>
                  <span className="block">
                    {subscription?.shippingAddress?.state}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-medium font-hind text-blue-gray-800">
                  Shipping Information
                </dt>
                <dd className="mt-3 font-hind text-blue-gray-500 space-y-3">
                  <p>{subscription?.shippingInformation?.name}</p>
                  <p>{subscription?.shippingInformation?.email}</p>
                  <p>{subscription?.shippingInformation?.phone}</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
          <p className="text-sm font-medium font-hind text-gray-600">
            Next delivery on{' '}
            <span className="text-rose-500">
              {moment(subscription?.next_delivery).format('ll')}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default SubscriptionCard
