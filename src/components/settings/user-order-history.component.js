import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts'
import UserOrderHeader from './user-order-header.component'
import UserOrderTable from './user-order-table.component'
import Pagination from '../pagination/pagination.component'
import Message from '../message/message.component'
import { ShoppingBagIcon, ClockIcon } from '@heroicons/react/solid'
import { navigate } from 'gatsby-link'

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(0)

  const { user } = useContext(UserContext)

  useEffect(() => {
    axios
      .get(process.env.GATSBY_STRAPI_URL + '/orders/history', {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then(res => {
        setOrders(res.data.orders)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const itemsCountPerPage = 3
  const totalItemsCount = Math.ceil(orders.length / itemsCountPerPage)

  return (
    <>
      {orders.length ? (
        <>
          <div className="space-y-20">
            {orders
              .slice(
                (page + 1 - 1) * itemsCountPerPage,
                (page + 1) * itemsCountPerPage
              )
              .map(order => (
                <div key={order.id}>
                  <UserOrderHeader order={order} />
                  <UserOrderTable order={order} />
                </div>
              ))}
          </div>
          <Pagination
            pageCount={totalItemsCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            onPageChange={({ selected }) => setPage(selected)}
          />
        </>
      ) : (
        <Message
          headline={'0 items'}
          description={
            'You have not yet made an order. Start shopping and make your first order!'
          }
          MessageIconComponent={ClockIcon}
          ButtonIconComponent={ShoppingBagIcon}
          buttonText={'Go Shopping'}
          onButtonClick={() => navigate('/hats')}
          buttonBackgroundStyle={
            'bg-gradient-to-br from-emerald-400 to-cyan-500'
          }
        />
      )}
    </>
  )
}

export default UserOrderHistory
