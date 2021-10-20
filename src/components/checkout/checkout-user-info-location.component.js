import React, { useEffect, useState, useContext } from 'react'
import { useWatch } from 'react-hook-form'

import {
  handleLocateMe,
  loadGoogleMapsPlacesObject,
} from '../../utils/location'
import { setSnackbar } from '../../contexts/actions'
import { FeedbackContext } from '../../contexts'
import CheckoutUserInfoLocationInputs from './checkout-user-info-location-inputs.component'

const CheckoutUserInfoLocation = ({
  register,
  errors,
  user,
  setValue,
  control,
  getValues,
  selectedLocationSlot,
  locationBilling,
  billingLocation,
  setBillingLocation,
}) => {
  const [loadingActionButton, setLoadingActionButton] = useState(false)

  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const street = useWatch({
    control,
    name: 'street',
  })

  const handleLocate = () => {
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
    setValue('street', user.locations[selectedLocationSlot].street || '')
    setValue('zip', user.locations[selectedLocationSlot].zip || '')
    setValue('city', user.locations[selectedLocationSlot].city || '')
    setValue('state', user.locations[selectedLocationSlot].state || '')
  }, [selectedLocationSlot])

  useEffect(() => {
    if (locationBilling === selectedLocationSlot) {
      setBillingLocation(getValues(['street', 'zip', 'city', 'state']))
    }
  }, [selectedLocationSlot, locationBilling, street])

  useEffect(() => {
    if (locationBilling === selectedLocationSlot) {
      if (billingLocation.length) {
        setValue('street', billingLocation[0])
        setValue('zip', billingLocation[1])
        setValue('city', billingLocation[2])
        setValue('state', billingLocation[3])
      }
    }
  }, [selectedLocationSlot])

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
    <CheckoutUserInfoLocationInputs
      register={register}
      errors={errors}
      locateHandler={handleLocate}
      autocompleteId={'autocomplete'}
      streetId={'street'}
      zipId={'zip'}
      cityId={'city'}
      stateId={'state'}
      loadingActionButton={loadingActionButton}
    />
  )
}

export default CheckoutUserInfoLocation
