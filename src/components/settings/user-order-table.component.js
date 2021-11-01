import React from 'react'

import UserOrderTableBody from './user-order-table-body.component'
import UserOrderTableHead from './user-order-table-head.component'

const UserOrderTable = ({ order }) => {
  return (
    <table className="mt-4 w-full text-blue-gray-500 sm:mt-6">
      <UserOrderTableHead />
      <UserOrderTableBody order={order} />
    </table>
  )
}

export default UserOrderTable
