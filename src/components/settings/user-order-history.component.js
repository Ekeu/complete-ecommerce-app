import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts'
import UserOrderHeader from './user-order-header.component'
import UserOrderTable from './user-order-table.component'

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([])

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
  return (
    <div className="space-y-20">
      {orders.map(order => (
        <div key={order.id}>
          <UserOrderHeader order={order} />
          <UserOrderTable order={order} />
        </div>
      ))}
    </div>
  )
}

export default UserOrderHistory
