import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react'

import PlacedOrderAddress from '../components/placed-order/placed-order-address.component'
import ThankyouHeader from '../components/thankyou/thankyou-header.component'
import ThankyouItem from '../components/thankyou/thankyou-item.component'
import ThankyouOrderSummary from '../components/thankyou/thankyou-order-summary.component'
import ThankyouPaymentInfo from '../components/thankyou/thankyou-payment-info.component'
import { navigate } from 'gatsby-link'

const ThankYouPage = () => {
  const [placedOrder, setPlacedOrder] = useState(null)

  useEffect(() => {
    document.documentElement.classList.add('bg-white')
    document.documentElement.classList.add('h-full')
    document.body.classList.add('h-full')
    const getPlacedOrder = JSON.parse(localStorage.getItem('placedOrder'))
    setPlacedOrder({ ...getPlacedOrder })
  }, [])

  const handleContinueShopping = () => {
    localStorage.removeItem('placedOrder')
    navigate('/hats')
  }

  return (
    <main className="relative lg:min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
        <Image
          className={'h-full w-full object-center object-cover'}
          alt={'Thank You!'}
          cloudName="dmcookpro"
          publicId={'adidas-ecom/order/thanks_for_ordering'}
          loading="lazy"
          width="100%"
          height="100%"
        ></Image>
      </div>

      <div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
          <div className="lg:col-start-2">
            <ThankyouHeader order={placedOrder} />
            <ul
              role="list"
              className="mt-6 text-sm font-medium text-blue-gray-500 border-t border-blue-gray-200 divide-y divide-gray-200"
            >
              {placedOrder?.items.map(item => (
                <ThankyouItem item={item} key={item.variant.id} />
              ))}
            </ul>

            <ThankyouOrderSummary
              subtotal={placedOrder?.subtotal}
              shipping={placedOrder?.deliveryMethod.price}
              tax={placedOrder?.tax}
              total={placedOrder?.total}
            />

            <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-blue-gray-600">
              <PlacedOrderAddress
                headline="Shipping address"
                address={placedOrder?.shippingAddress}
              />
              <ThankyouPaymentInfo order={placedOrder} />
            </dl>

            <div className="mt-16 border-t border-blue-gray-200 py-6 text-right">
              <span
                onClick={handleContinueShopping}
                className="text-sm font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
              >
                Continue Shopping<span aria-hidden="true"> &rarr;</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ThankYouPage
