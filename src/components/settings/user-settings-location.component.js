import React, { useState, useEffect } from 'react'
import { LocationMarkerIcon } from '@heroicons/react/solid'

import FormInput from '../form-input/form-input.component'
import Slots from '../slots/slots.component'

import {
  loadGoogleMapsPlacesObject,
  handleLocateMe,
} from '../../utils/location'

const UserSettingsLocation = ({
  user,
  register,
  errors,
  setValue,
  edit,
  setChangesMade,
  watchAllFields,
  watchLocationFields,
  selectedSlot,
  setSelectedSlot,
  dispatchFeedback,
  setSnackbar,
}) => {
  const [loadingActionButton, setLoadingActionButton] = useState(false)

  const handleLocateUser = () => {
    handleLocateMe(
      setLoadingActionButton,
      dispatchFeedback,
      setSnackbar,
      setValue,
      'street',
      'zip',
      'city',
      'state'
    )
  }

  useEffect(() => {
    if (user.username === 'Guest') return 
    setValue('street', user.locations[selectedSlot].street || '')
    setValue('zip', user.locations[selectedSlot].zip || '')
    setValue('city', user.locations[selectedSlot].city || '')
    setValue('state', user.locations[selectedSlot].state || '')
  }, [selectedSlot])

  useEffect(() => {
    const changed = Object.keys(user.locations[selectedSlot]).some(
      field => watchAllFields[field] !== user.locations[selectedSlot][field]
    )
    setChangesMade(changed)
  }, [watchLocationFields])

  useEffect(() => {
    if (!window.google) {
      const googleMapsScript = document.createElement('script')
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&libraries=places`
      googleMapsScript.async = true
      window.document.body.appendChild(googleMapsScript)
      googleMapsScript.addEventListener('load', () =>
        loadGoogleMapsPlacesObject(
          setValue,
          'autocomplete',
          'zip',
          'city',
          'state'
        )
      )
      return () =>
        googleMapsScript.removeEventListener(`load`, () =>
          loadGoogleMapsPlacesObject(
            setValue,
            'autocomplete',
            'zip',
            'city',
            'state'
          )
        )
    } else {
      loadGoogleMapsPlacesObject(
        setValue,
        'autocomplete',
        'zip',
        'city',
        'state'
      )
    }
  }, [])

  return (
    <section aria-labelledby="location-details-heading">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 sm:p-6">
          <div>
            <h2
              id="location-details-heading"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Billing Address
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your billing address. Please note that you can only add 3
              billing addresses.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-6">
            <FormInput
              id="autocomplete"
              name="street"
              type="text"
              label="street"
              labelText="Street Address"
              autoComplete="street-address"
              TrailingButton={LocationMarkerIcon}
              loadingActionButton={loadingActionButton}
              actionButton={handleLocateUser}
              register={register('street')}
              disabledActionButton={!edit}
              disabled={!edit}
              placeholder="5 Av. Anatole France"
              formInputWrapperClass={'col-span-4 sm:col-span-2'}
              error={errors.street?.message}
            />
            <FormInput
              id="zip"
              name="zip"
              type="text"
              label="zip"
              labelText="ZIP Code"
              autoComplete="postal-code"
              register={register('zip')}
              placeholder="78643"
              inputStyles={'bg-blue-gray-100 text-blue-gray-400'}
              disabled
              formInputWrapperClass={'col-span-4 sm:col-span-2'}
              error={errors.zip?.message}
            />
            <FormInput
              id="city"
              name="city"
              type="text"
              label="city"
              labelText="City"
              autoComplete="address-level2"
              register={register('city')}
              placeholder="Villejuif"
              inputStyles={'bg-blue-gray-100 text-blue-gray-400'}
              disabled
              formInputWrapperClass={'col-span-4 sm:col-span-2'}
              error={errors.city?.message}
            />
            <FormInput
              id="state"
              name="state"
              type="text"
              label="state"
              labelText="State"
              autoComplete="address-level1"
              register={register('state')}
              placeholder="Ile de France"
              inputStyles={'bg-blue-gray-100 text-blue-gray-400'}
              disabled
              formInputWrapperClass={'col-span-4 sm:col-span-2'}
              error={errors.state?.message}
            />
          </div>
        </div>
        <Slots selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      </div>
    </section>
  )
}

export default UserSettingsLocation
