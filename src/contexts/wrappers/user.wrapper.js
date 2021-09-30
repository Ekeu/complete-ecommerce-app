import React, { useReducer, createContext } from 'react'

import setUserReducer from '../reducers/user.reducers'

import { setUser } from '../actions/user.actions'

export const UserContext = createContext()

const UserProvider = UserContext.Provider

const UserWrapper = ({ children }) => {
  const defaultUser = { username: 'Guest User' }
  const [user, dispatchUser] = useReducer(setUserReducer, defaultUser)

  return (
    <UserProvider value={{ user, dispatchUser, defaultUser }}>
      {children}
    </UserProvider>
  )
}

export default UserWrapper
