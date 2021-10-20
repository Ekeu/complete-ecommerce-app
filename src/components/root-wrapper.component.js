import React from 'react'
import { ToastContainer } from 'react-toastify'

import { ApolloWrapper } from '../apollo/ApolloWrapper'
import { UserWrapper, FeedbackWrapper, CartWrapper } from '../contexts'

const RootWrapper = ({ element }) => {
  return (
    <ApolloWrapper>
      <UserWrapper>
        <FeedbackWrapper>
          <CartWrapper>
            <ToastContainer
              hideProgressBar
              closeButton={false}
              style={{ width: '25rem', padding: '0px' }}
            />
            {element}
          </CartWrapper>
        </FeedbackWrapper>
      </UserWrapper>
    </ApolloWrapper>
  )
}

export default RootWrapper
