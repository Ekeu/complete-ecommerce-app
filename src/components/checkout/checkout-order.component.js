import React, { useContext } from 'react'

import { CartContext } from '../../contexts'
import CheckoutAmount from './checkout-amount.component'
import CheckoutItem from './checkout-item.component'
import CustomButton from '../custom-button/custom-button.component'

const CheckoutOrder = ({ cartPricingInfos, loading }) => {
  const { cart } = useContext(CartContext)
  const { isClient, key } = useIsClient()
  return (
    <div className={'mt-10 lg:mt-0'}>
      <h2 className={'text-lg font-medium font-osans text-blue-gray-800'}>
        Order summary
      </h2>
      <div
        className={
          'mt-4 bg-white border border-blue-gray-200 rounded-lg shadow-sm'
        }
      >
        <h3 className={'sr-only'}>Items in your cart</h3>
        <ul role={'list'} key={key} className={'divide-y divide-gray-200'}>
          {!isClient
            ? null
            : cart.map(item => (
                <li key={item.variant.id} className={'flex py-6 px-4 sm:px-6'}>
                  <CheckoutItem item={item} />
                </li>
              ))}
        </ul>
        <CheckoutAmount cartPricingInfos={cartPricingInfos} />
        <div className={'border-t border-gray-200 py-6 px-4 sm:px-6'}>
          <CustomButton
            type={'submit'}
            loading={loading}
            customStyles={
              'w-full flex justify-center bg-purple-600 border-transparent py-3 px-4 text-white hover:bg-purple-700'
            }
          >
            Confirm order
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default CheckoutOrder
