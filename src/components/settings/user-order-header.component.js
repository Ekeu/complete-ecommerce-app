import React from 'react'
import moment from 'moment'
import CustomButton from '../custom-button/custom-button.component'
import { currencyFormatter } from '../../utils/functions'
import { navigate } from 'gatsby-link'

const UserOrderHeader = ({ order }) => {
  return (
    <>
      <div className="bg-blue-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
        <dl className="divide-y divide-gray-200 space-y-6 text-sm text-blue-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
          <div className="flex justify-between sm:block font-hind">
            <dt className="font-medium text-blue-gray-800">Date placed</dt>
            <dd className="sm:mt-1">
              <span>{moment(order.updatedAt).format('MMM Do YY')}</span>
            </dd>
          </div>
          <div className="flex font-hind justify-between pt-6 sm:block sm:pt-0">
            <dt className="font-medium text-blue-gray-800">Order number</dt>
            <dd className="sm:mt-1 uppercase">
              {order.id.slice(order.id.length - 14, order.id.length)}
            </dd>
          </div>
          <div className="flex justify-between pt-6 font-medium font-hind text-blue-gray-800 sm:block sm:pt-0">
            <dt>Total amount</dt>
            <dd className="sm:mt-1">{currencyFormatter(order.total)}</dd>
          </div>
        </dl>
        <CustomButton
          onClick={() => navigate(`/order/${order.id}`)}
          customStyles="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border-blue-gray-300 text-sm text-blue-gray-700 hover:bg-blue-gray-50 sm:w-auto sm:mt-0"
        >
          Order detail
        </CustomButton>
      </div>
    </>
  )
}

export default UserOrderHeader
