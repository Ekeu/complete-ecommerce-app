import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { UserContext, FeedbackContext } from '../../contexts'
import { setSnackbar } from '../../contexts/actions'

const UserSubscriptions = () => {
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(FeedbackContext)

  const [subscriptions, setSubscriptions] = useState()

  useEffect(() => {
    axios
      .get(process.env.GATSBY_STRAPI_URL + '/subscriptions/me', {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then(res => setSubscriptions(res.data))
      .catch(error => {
        console.error(error)
        dispatch(
          setSnackbar({
            status: 'error',
            message:
              'There was a problem retrieving your subscriptions. Please try again.',
          })
        )
      })
  }, [])

  console.log(subscriptions)

  return <div>Subscriptions</div>
}

export default UserSubscriptions
