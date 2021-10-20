import React, { useContext } from 'react'
import { navigate } from 'gatsby-link'

import CartItems from '../components/cart/cart-items.component'
import CustomLink from '../components/custom-link/custom-link.component'
import CustomButton from '../components/custom-button/custom-button.component'
import Layout from '../components/layout/layout.component'

import { UserContext } from '../contexts'

const CartPage = () => {
  const { user } = useContext(UserContext)
  return (
    <Layout>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto pt-16">
            <h1 className="text-3xl font-bold font-hind tracking-tight text-blue-gray-800">
              {user.username.split(' ').length >= 2
                ? `${user.username.split(' ')[0]}'s Shopping Cart`
                : `${user.username}'s Shopping Cart`}
            </h1>

            <div className="mt-12">
              <CartItems />
              <section className="mt-10">
                <div className="mt-10">
                  <CustomButton
                    type="button"
                    onClick={() => navigate('/checkout')}
                    customStyles={
                      'w-full bg-purple-600 border-transparent py-3 px-4 text-white hover:bg-purple-700'
                    }
                  >
                    Checkout
                  </CustomButton>
                </div>
                <div className="mt-6 text-sm text-center text-blue-gray-500 font-hind">
                  <p>
                    or{' '}
                    <CustomLink
                      link={'/hats'}
                      customStyles="text-purple-600 font-medium hover:text-purple-500"
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </CustomLink>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default CartPage
