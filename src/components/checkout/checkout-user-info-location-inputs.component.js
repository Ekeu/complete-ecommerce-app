import React from 'react'
import { LocationMarkerIcon } from '@heroicons/react/solid'
import FormInput from '../form-input/form-input.component'

const CheckoutUserInfoLocationInputs = ({
  register,
  errors,
  locateHandler,
  loadingActionButton,
  autocompleteId,
  streetId,
  zipId,
  cityId,
  stateId,
}) => {
  return (
    <>
      <FormInput
        id={autocompleteId}
        name="street"
        type="text"
        label="street"
        labelText="Street Address"
        autoComplete="street-address"
        TrailingButton={LocationMarkerIcon}
        loadingActionButton={loadingActionButton}
        actionButton={locateHandler}
        register={register(streetId, {
          required: 'Enter your street address',
        })}
        placeholder="5 Av. Anatole France"
        formInputWrapperClass={'sm:col-span-2'}
        error={errors[streetId]?.message}
      />
      <div className="grid grid-cols-3 gap-2 sm:col-span-2">
        <FormInput
          id="zip"
          name="zip"
          type="text"
          label="zip"
          labelText="ZIP Code"
          autoComplete="postal-code"
          register={register(zipId)}
          placeholder="78643"
          inputStyles={'bg-blue-gray-100 text-blue-gray-400'}
          disabled
          formInputWrapperClass={'sm:col-span-1'}
          error={errors[zipId]?.message}
        />
        <FormInput
          id="city"
          name="city"
          type="text"
          label="city"
          labelText="City"
          autoComplete="address-level2"
          register={register(cityId)}
          placeholder="Villejuif"
          inputStyles={'bg-blue-gray-100 text-blue-gray-400'}
          disabled
          formInputWrapperClass={'sm:col-span-1'}
          error={errors[cityId]?.message}
        />
        <FormInput
          id="state"
          name="state"
          type="text"
          label="state"
          labelText="State"
          autoComplete="address-level1"
          register={register(stateId)}
          placeholder="Ile de France"
          inputStyles={'bg-blue-gray-100 text-blue-gray-400'}
          disabled
          formInputWrapperClass={'sm:col-span-1'}
          error={errors[stateId]?.message}
        />
      </div>
    </>
  )
}

export default CheckoutUserInfoLocationInputs
