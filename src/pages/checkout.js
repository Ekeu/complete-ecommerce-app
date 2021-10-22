import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutPortal from '../components/checkout/checkout-portal.component'
import Layout from '../components/layout/layout.component'

const CheckoutPage = () => {
  const stripe = loadStripe(process.env.GATSBY_STRIPE_PK)

  return (
    <Layout>
      <Elements stripe={stripe}>
        <CheckoutPortal />
      </Elements>
    </Layout>
  )
}

export default CheckoutPage