import React from 'react'
import { RadioGroup } from '@headlessui/react'
import { classNames, currencyFormatter } from '../../utils/functions'
import { CheckCircleIcon } from '@heroicons/react/solid'

const CheckoutDeliveryMethod = ({ deliveryMethods, selectedDeliveryMethod, setSelectedDeliveryMethod }) => {
  return (
    <RadioGroup
      value={selectedDeliveryMethod}
      onChange={setSelectedDeliveryMethod}
    >
      <RadioGroup.Label className="text-lg font-medium font-osans text-blue-gray-800">
        Delivery method
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {deliveryMethods.map(deliveryMethod => (
          <RadioGroup.Option
            key={deliveryMethod.id}
            value={deliveryMethod}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-blue-gray-300',
                active ? 'ring-2 ring-purple-500' : '',
                'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <div className="flex-1 flex">
                  <div className="flex flex-col font-hind">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-blue-gray-800"
                    >
                      {deliveryMethod.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-blue-gray-500"
                    >
                      {deliveryMethod.turnaround}
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium text-blue-gray-800"
                    >
                      {currencyFormatter(deliveryMethod.price)}
                    </RadioGroup.Description>
                  </div>
                </div>
                {checked ? (
                  <CheckCircleIcon
                    className="h-5 w-5 text-purple-600"
                    aria-hidden="true"
                  />
                ) : null}
                <div
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-purple-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg pointer-events-none'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default CheckoutDeliveryMethod
