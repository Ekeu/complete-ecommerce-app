import React from 'react'
import { currencyFormatter } from '../../utils/functions'

const UserOrderTableBody = ({ order }) => {
  return (
    <tbody className="border-b border-blue-gray-200 divide-y divide-gray-200 text-sm sm:border-t font-hind">
      {order.items.map(item => (
        <tr key={item.variant.id}>
          <td className="py-6 pr-8">
            <div className="flex items-center">
              <img
                src={process.env.GATSBY_STRAPI_URL + item.variant.images[0].url}
                alt={item.name}
                className="w-16 h-16 object-center object-cover rounded mr-6"
              />
              <div>
                <div className="font-medium text-blue-gray-800">
                  {item.name}
                </div>
                <div className="mt-1 sm:hidden">
                  {currencyFormatter(item.variant.price)}
                </div>
              </div>
            </div>
          </td>
          <td className="hidden py-6 pr-8 sm:table-cell">
            {currencyFormatter(item.variant.price)}
          </td>
          <td className="hidden py-6 pr-8 sm:table-cell capitalize">
            {order.status}
          </td>
          <td className="py-6 font-medium text-right whitespace-nowrap">
            <span className="text-purple-600">
              Buy<span className="hidden lg:inline"> again</span>
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default UserOrderTableBody
