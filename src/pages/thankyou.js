import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Layout from '../components/layout/layout.component'
import PlacedOrderItem from '../components/placed-order/placed-order-item.component'
import PlacedOrderAddress from '../components/placed-order/placed-order-address.component'
import PlacedOrderSummary from '../components/placed-order/placed-order-summary.component'

const ThankYouPage = () => {
  const [placedOrder, setPlacedOrder] = useState(null)

  useEffect(() => {
    const getPlacedOrder = JSON.parse(localStorage.getItem('placedOrder'))
    setPlacedOrder({ ...getPlacedOrder })
  }, [])

  const getExpectedNumberOfDays = () => {
    switch (placedOrder?.deliveryMethod.title) {
      case 'Standard':
        return moment().add(8, 'd').format('LL')
      case 'Express':
        return moment().add(3, 'd').format('LL')
      default:
        return moment().add(14, 'd').format('LL')
    }
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-sm font-semibold font-hind uppercase tracking-wide text-purple-600">
              Thank You!
            </h1>
            <p className="mt-2 text-4xl font-extrabold font-osans text-blue-gray-800 tracking-tight sm:text-5xl">
              It's on the way!
            </p>
            <p className="mt-2 text-base font-hind text-blue-gray-500">
              Your order will be expected by {getExpectedNumberOfDays()}.
            </p>

            <dl className="mt-12 text-sm font-medium font-hind">
              <dt className="text-blue-gray-800">Tracking number</dt>
              <dd className="text-purple-600 mt-2 uppercase">
                {placedOrder?.id.slice(
                  placedOrder?.id.length - 14,
                  placedOrder?.id.length
                )}
              </dd>
            </dl>
          </div>

          <div className="mt-10 border-t border-blue-gray-200">
            <h2 className="sr-only">Your order</h2>

            <h3 className="sr-only">Items</h3>
            {placedOrder?.items.map(item => (
              <PlacedOrderItem item={item} key={item.variant.id} />
            ))}

            <div className="sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>

              <h4 className="sr-only">Addresses</h4>
              <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
                <PlacedOrderAddress
                  headline="Shipping address"
                  address={placedOrder?.shippingAddress}
                />
                <PlacedOrderAddress
                  headline="Billing address"
                  address={placedOrder?.billingAddress}
                />
              </dl>

              {/* <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
                <div>
                  <dt className="font-medium text-gray-900">Payment method</dt>
                  <dd className="mt-2 text-gray-700">
                    <p>Apple Pay</p>
                    <p>Mastercard</p>
                    <p>
                      <span aria-hidden="true">•••• </span>
                      <span className="sr-only">Ending in </span>1545
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Shipping method</dt>
                  <dd className="mt-2 text-gray-700">
                    <p>DHL</p>
                    <p>Takes up to 3 working days</p>
                  </dd>
                </div>
              </dl> */}

              <PlacedOrderSummary
                subtotal={placedOrder?.subtotal}
                shipping={placedOrder?.deliveryMethod.price}
                tax={placedOrder?.tax}
                total={placedOrder?.total}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ThankYouPage
