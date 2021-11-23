import axios from 'axios'

export const loadGoogleMapsPlacesObject = (
  setValue,
  inputId,
  zipId,
  cityId,
  stateId
) => {
  const autocomplete = new window.google.maps.places.Autocomplete(
    document.getElementById(inputId),
    {
      bounds: new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(48.85341, 2.3488)
      ),
    }
  )
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    setValue(zipId, place.address_components[6]?.long_name || '')
    setValue(cityId, place.address_components[2]?.long_name || '')
    setValue(stateId, place.address_components[4]?.long_name || '')
  })
}

export const getUserAddress = async (
  lat,
  long,
  dispatchFeedback,
  setSnackbar,
  setValue,
  setLoadingActionButton,
  streetId,
  zipId,
  cityId,
  stateId
) => {
  try {
    const googleMapsRes = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`
    )
    if (googleMapsRes.data.error_message) {
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: googleMapsRes.data.error_message,
        })
      )
    } else {
      setValue(streetId, googleMapsRes.data.results[0].formatted_address)
      setValue(
        cityId,
        googleMapsRes.data.results[0].address_components[2].long_name
      )
      setValue(
        zipId,
        googleMapsRes.data.results[0].address_components[6].long_name
      )
      setValue(
        stateId,
        googleMapsRes.data.results[0].address_components[4].long_name
      )
    }
    setLoadingActionButton(false)
  } catch (error) {
    dispatchFeedback(
      setSnackbar({
        status: 'error',
        message: error.message,
      })
    )
    setLoadingActionButton(false)
  }
}

export const handleLocateMe = (
  setLoadingActionButton,
  dispatchFeedback,
  setSnackbar,
  setValue,
  streetId,
  zipId,
  cityId,
  stateId
) => {
  setLoadingActionButton(true)
  if (window?.navigator.geolocation) {
    window?.navigator.geolocation.getCurrentPosition(
      position => {
        getUserAddress(
          position.coords.latitude,
          position.coords.longitude,
          dispatchFeedback,
          setSnackbar,
          setValue,
          setLoadingActionButton,
          streetId,
          zipId,
          cityId,
          stateId
        )
      },
      error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: 'error',
            message:
              'You denied to be located. Please type your address manually.',
          })
        )
        setLoadingActionButton(false)
      }
    )
  } else {
    dispatchFeedback(
      setSnackbar({
        status: 'error',
        message: 'Your browser version does not support Geolocation.',
      })
    )
    setLoadingActionButton(false)
  }
}
