import React, { useContext } from 'react'
import { UserContext } from '../../contexts'

import Slots from '../slots/slots.component'
import Toggle from '../toggle/toggle.component'
import CheckoutUserInfoInputs from './checkout-user-info-contact-inputs.component'
import CheckoutUserInfoLocationBilling from './checkout-user-info-location-billing.component'

const CheckoutUserInfoActions = ({
  provideDifferentBillingOption,
  selectedSlot,
  setSelectedSlot,
  toggleDescription,
  enabledBilling,
  setEnabledBilling,
  checkBoxId,
  register,
  slotDescription,
  errors,
  setValue,
  isLocation,
  isContact,
  isPayment,
  checkBoxHandler,
  checkBoxLabel,
}) => {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className={`flex justify-between pt-4`}>
        {user.username !== 'Guest' && (
          <Slots
            selectedSlot={selectedSlot}
            description={slotDescription}
            setSelectedSlot={setSelectedSlot}
            containerStyles={'bg-transparent px-0'}
          />
        )}

        {!provideDifferentBillingOption && (
          <Toggle
            description={toggleDescription}
            enabled={enabledBilling === selectedSlot}
            setEnabled={() =>
              setEnabledBilling(
                enabledBilling === selectedSlot ? false : selectedSlot
              )
            }
          />
        )}
      </div>
      {isContact && provideDifferentBillingOption && (
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <CheckoutUserInfoInputs
            register={register}
            errors={errors}
            nameId={'b_name'}
            emailId={'b_email'}
            phoneId={'b_phone'}
          />
        </div>
      )}
      {isLocation && provideDifferentBillingOption && (
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <CheckoutUserInfoLocationBilling
            register={register}
            errors={errors}
            setValue={setValue}
          />
        </div>
      )}
      {(enabledBilling !== selectedSlot && !isPayment) && (
        <div className="mt-6 flex items-center">
          <input
            id={checkBoxId}
            name={checkBoxId}
            type="checkbox"
            onChange={checkBoxHandler}
            className="h-4 w-4 border-gray-300 rounded text-purple-600 cursor-pointer focus:outline-none focus:ring-white"
          />
          <div className="ml-2">
            <label
              htmlFor={checkBoxId}
              className="text-sm font-medium font-hind text-blue-gray-600"
            >
              {checkBoxLabel}
            </label>
          </div>
        </div>
      )}
    </>
  )
}

export default CheckoutUserInfoActions
