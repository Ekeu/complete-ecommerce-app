import React, { useContext, useState } from 'react'
import axios from 'axios'

import { CREDIT_CARD_ICONS } from '../../constants/credit-cards.constants'
import CustomButton from '../custom-button/custom-button.component'
import { FeedbackContext, UserContext } from '../../contexts'
import { setSnackbar, setUser } from '../../contexts/actions'

const CreditCard = ({ card, user, setCard }) => {
  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(UserContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const userHasActiveSubscriptions = user.subscriptions.length > 0

  const removeCard = async () => {
    try {
      const remainingSavedCards = user.paymentMethods.filter(
        method => method.last4 !== ''
      )

      const subscriptionPaymentMethod = user.subscriptions.find(
        subscription => subscription.paymentMethod.last4 === card.last4
      )
      if (
        (userHasActiveSubscriptions && remainingSavedCards.length === 1) ||
        subscriptionPaymentMethod
      ) {
        dispatchFeedback(
          setSnackbar({
            status: 'error',
            message:
              'You cannot remove remove this card because you have an active subscription. Please add another card first.',
          })
        )

        return
      }

      setLoading(true)
      const res = await axios.post(
        process.env.GATSBY_STRAPI_URL + '/orders/remove-card',
        {
          card: card.last4,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      setLoading(false)
      dispatch(setUser({ ...res.data.user, jwt: user.jwt, onboarding: true }))
      setCard({
        brand: '',
        last4: '',
        exp_month: '',
        exp_year: '',
      })
    } catch (error) {
      setLoading(false)
      console.error(error)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message:
            'There was a problem while removing your card. Please try again',
        })
      )
    }
  }
  return (
    <>
      <h4 className="sr-only capitalize">{card.brand}</h4>
      <div className="sm:flex sm:items-start">
        {CREDIT_CARD_ICONS[card.brand]}
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <div className="text-sm font-medium text-blue-gray-800">
            Ending with {card.last4}
          </div>
          <div className="mt-1 text-sm text-blue-gray-600 sm:flex sm:items-center">
            <div>
              Expires {card.exp_month}/{card.exp_year}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
        <CustomButton
          type="button"
          loading={loading}
          onClick={removeCard}
          spinnerColor={'text-blue-gray-800'}
          customStyles="inline-flex items-center px-4 py-2 border-blue-gray-300 text-blue-gray-700 bg-white hover:bg-blue-gray-50 sm:text-sm"
        >
          Remove
        </CustomButton>
      </div>
    </>
  )
}

export default CreditCard
