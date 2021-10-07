import React from 'react'
import { ToastContainer } from 'react-toastify'

import { ApolloWrapper } from '../apollo/ApolloWrapper'
import { UserWrapper, FeedbackWrapper } from '../contexts'

const RootWrapper = ({ element }) => {
  return (
    <ApolloWrapper>
      <UserWrapper>
        <FeedbackWrapper>
          <ToastContainer
            hideProgressBar
            closeButton={false}
            style={{ width: '25rem', padding: '0px' }}
          />
          {element}
        </FeedbackWrapper>
      </UserWrapper>
    </ApolloWrapper>
  )
}

export default RootWrapper
