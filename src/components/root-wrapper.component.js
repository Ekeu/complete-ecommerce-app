import React from 'react'

import { ApolloWrapper } from '../apollo/ApolloWrapper'

const RootWrapper = ({ element }) => {
  return <ApolloWrapper>{element}</ApolloWrapper>
}

export default RootWrapper
