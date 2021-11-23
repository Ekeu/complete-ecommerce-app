import React, { useContext } from 'react'
import { CartContext, FeedbackContext } from '../../contexts'
import { addToCart, setSnackbar } from '../../contexts/actions'
import { currencyFormatter } from '../../utils/functions'

import Badge from '../badge/badge.component'

const UserOrderTableBody = ({ order }) => {
  const { cart, dispatch } = useContext(CartContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const handleAddToCart = product => {
    const checkVariant = cart.find(p => p.variant.id === product.id)
    if (checkVariant?.quantity >= 10) {
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: 'Limited to 10 item(s) per purchase',
        })
      )
      return
    }
    dispatch(addToCart(product.variant, 1, product.variant.quantity))
  }
  return (
    <tbody className="border-b border-blue-gray-200 divide-y divide-gray-200 text-sm sm:border-t font-hind">
      {order.items.map(item => (
        <tr key={item.variant.id}>
          <td className="py-6 pr-8">
            <div className="flex items-center">
              <img
                src={item.variant.images[0].url}
                alt={item.name}
                className="w-16 h-16 object-center object-cover rounded mr-6"
              />
              <div>
                <div className="font-medium text-blue-gray-800">
                  {item.name}
                </div>
                {item.subscription && (
                  <Badge styles="mt-1 px-2 py-0.5 text-xs font-hind bg-purple-100 text-purple-800">
                    Subscribed
                  </Badge>
                )}
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
            <span
              className="text-purple-600 cursor-pointer"
              onClick={() => handleAddToCart(item)}
            >
              Buy<span className="hidden lg:inline"> again</span>
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default UserOrderTableBody
