import React, { useEffect, useState, useContext } from 'react'

import {
  handleLocateMe,
  loadGoogleMapsPlacesObject,
} from '../../utils/location'
import { setSnackbar } from '../../contexts/actions'
import { FeedbackContext } from '../../contexts'
import CheckoutUserInfoLocationInputs from './checkout-user-info-location-inputs.component'

const CheckoutUserInfoLocationBilling = ({ register, errors, setValue }) => {
  const [loadingActionButton, setLoadingActionButton] = useState(false)

  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const handleLocate = () => {
    handleLocateMe(
      setLoadingActionButton,
      dispatchFeedback,
      setSnackbar,
      setValue,
      'b_street',
      'b_zip',
      'b_city',
      'b_state'
    )
  }

  useEffect(() => {
    loadGoogleMapsPlacesObject(
      setValue,
      'b_autocomplete',
      'b_zip',
      'b_city',
      'b_state'
    )
  }, [])
  return (
    <CheckoutUserInfoLocationInputs
      register={register}
      errors={errors}
      locateHandler={handleLocate}
      autocompleteId={'b_autocomplete'}
      streetId={'b_street'}
      zipId={'b_zip'}
      cityId={'b_city'}
      stateId={'b_state'}
      loadingActionButton={loadingActionButton}
    />
  )
}

export default CheckoutUserInfoLocationBilling
