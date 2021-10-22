import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const style = {
  base: {
    fontFamily: 'Hind',
    color: '#1F2937',
    fontWeight: '400',
    fontSize: '14px',
    iconColor: '#6B7280',
    '::placeholder': {
      color: '#6B7280',
    },
  },
}

const CheckoutUserInfoPayments = ({ selectedPaymentSlot, setCard }) => {
  const elements = useElements()
  const stripe = useStripe()

  const handleCardChange = async e => {
    if (e.complete) {
      const cardElement = elements.getElement(CardElement)
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })
    }
  }

  const cardWrapper = (
    <CardElement options={{ style: style }} onChange={handleCardChange} />
  )
  return <>{cardWrapper}</>
}

export default CheckoutUserInfoPayments
