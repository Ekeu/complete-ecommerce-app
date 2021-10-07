import React, { useReducer, createContext, useEffect } from 'react'
import axios from 'axios'

import { userReducer } from '../reducers/user.reducers'
import { setUser } from '../actions'

export const UserContext = createContext()

const UserProvider = UserContext.Provider

export const UserWrapper = ({ children }) => {
  const defaultUser = { username: 'Guest User' }
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const [user, dispatch] = useReducer(userReducer, storedUser || defaultUser)

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await axios.get(
          process.env.GATSBY_STRAPI_URL + '/users/me',
          {
            headers: {
              Authorization: `Bearer ${storedUser.jwt}`,
            },
          }
        )
        dispatch(setUser({ ...res.data, jwt: storedUser.jwt, onboarding: true }))
      } catch (error) {
        console.error(error)
        dispatch(setUser(defaultUser))
      }
    }
    if (storedUser) {
      checkUserStatus()
    }
  }, [])
  return (
    <UserProvider value={{ user, dispatch, defaultUser }}>
      {children}
    </UserProvider>
  )
}
