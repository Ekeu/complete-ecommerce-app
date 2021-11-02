import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CreditCard from '../cards/credit-card.component'

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

const CheckoutUserInfoPayments = ({ selectedPaymentSlot, user, setCard }) => {
  const elements = useElements()
  const stripe = useStripe()

  const card =
    user.username === 'Guest'
      ? { last4: '', brand: '', exp_month: '', exp_year: '' }
      : user.paymentMethods[selectedPaymentSlot]

  const handleCardChange = async e => {
    if (e.complete) {
      const cardElement = elements.getElement(CardElement)
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })
      setCard({
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
      })
    }
  }

  const cardWrapper = (
    <CardElement options={{ style: style }} onChange={handleCardChange} />
  )
  return (
    <div className="mt-5">
      {card.last4 ? (
        <div className="rounded-md bg-blue-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
          <CreditCard card={card} user={user} setCard={setCard} />
        </div>
      ) : (
        cardWrapper
      )}
    </div>
  )
}

export default CheckoutUserInfoPayments
