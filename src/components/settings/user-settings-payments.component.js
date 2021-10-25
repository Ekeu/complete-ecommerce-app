import React, { useState } from 'react'
import CreditCard from '../cards/credit-card.component'

import Slots from '../slots/slots.component'

const UserSettingsPayments = ({ user, selectedSlot, setSelectedSlot }) => {
  const card =
    user.username === 'Guest'
      ? { last4: '', brand: '' }
      : user.paymentMethods[selectedSlot]
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium font-hind text-blue-gray-900">
          Payment methods
        </h3>
        <div className="mt-5">
          <div className="rounded-md bg-blue-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
            {card.last4 ? (
              <CreditCard card={card} user={user} />
            ) : (
              <div className="text-sm font-medium font-osans text-blue-gray-800">
                Add a new card during checkout.
              </div>
            )}
          </div>
        </div>
      </div>
      <Slots selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
    </div>
  )
}

export default UserSettingsPayments
