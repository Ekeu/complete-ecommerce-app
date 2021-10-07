import React, { useContext } from 'react'
import AuthPortal from '../components/auth/auth-portal.component'
import Layout from '../components/layout/layout.component'

import { UserContext } from '../contexts'
import { setUser } from '../contexts/actions'

const AccountPage = () => {
  const { user, dispatch, defaultUser } = useContext(UserContext)

  const handleLogout = () => {
    dispatch(setUser(defaultUser))
  }

  return (
    <>
      {user.jwt && user.onboarding ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <AuthPortal />
      )}
    </>
  )
}

export default AccountPage
