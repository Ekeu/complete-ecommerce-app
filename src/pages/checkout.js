import React, { useContext, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutPortal from '../components/checkout/checkout-portal.component'
import Layout from '../components/layout/layout.component'
import { navigate } from 'gatsby-link'
import { CartContext } from '../contexts'

const CheckoutPage = ({ location }) => {
  const stripe = loadStripe(process.env.GATSBY_STRIPE_PK)

  const { cart } = useContext(CartContext)

  useEffect(() => {
    if (cart.length <= 0 || location.state.cartItems <= 0) {
      navigate('/cart')
    }
  }, [])
  return (
    <Layout>
      <Elements
        stripe={stripe}
        options={{
          fonts: [
            {
              cssSrc:
                'https://fonts.googleapis.com/css2?family=Hind&display=swap',
            },
          ],
        }}
      >
        <CheckoutPortal />
      </Elements>
    </Layout>
  )
}

export default CheckoutPage
