import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

import { UserContext } from '../../contexts'
import PlacedOrderItem from '../../components/placed-order/placed-order-item.component'
import PlacedOrderAddress from '../../components/placed-order/placed-order-address.component'
import PlacedOrderSummary from '../../components/placed-order/placed-order-summary.component'
import Layout from '../../components/layout/layout.component'

const OrderDetailPage = props => {
  const { user } = useContext(UserContext)
  const [placedOrder, setPlacedOrder] = useState(null)
  const { id } = props.params
  useEffect(() => {
    axios
      .get(process.env.GATSBY_STRAPI_URL + `/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then(res => {
        setPlacedOrder(res.data)
      })
      .catch(error => console.error(error))
  }, [id])

  const getExpectedNumberOfDays = () => {
    switch (placedOrder?.deliveryMethod.title) {
      case 'Standard':
        return moment(placedOrder?.createdAt).add(8, 'd').format('LL')
      case 'Express':
        return moment(placedOrder?.createdAt).add(3, 'd').format('LL')
      default:
        return moment(placedOrder?.createdAt).add(14, 'd').format('LL')
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

              <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
                <div>
                  <dt className="font-medium font-hind text-gray-800">
                    Payment method
                  </dt>
                  <dd className="mt-2 text-blue-gray-700">
                    <p className="capitalize">
                      {placedOrder?.paymentMethod.brand}
                    </p>
                    <p>
                      <span aria-hidden="true">•••• </span>
                      <span className="sr-only">Ending in </span>
                      {placedOrder?.paymentMethod.last4}
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium font-hind text-gray-900">
                    Shipping method
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <p>{placedOrder?.deliveryMethod.title}</p>
                    <p>{placedOrder?.deliveryMethod.turnaround}s</p>
                  </dd>
                </div>
              </dl>

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
export default OrderDetailPage
