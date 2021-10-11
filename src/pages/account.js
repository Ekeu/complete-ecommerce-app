import React, { useContext } from 'react'
import AuthPortal from '../components/auth/auth-portal.component'
import SettingsPortal from '../components/settings/settings-portal.component'
import Layout from '../components/layout/layout.component'

import { UserContext } from '../contexts'
import { setUser } from '../contexts/actions'

const AccountPage = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      {user.jwt && user.onboarding ? (
        <Layout>
          <SettingsPortal />
        </Layout>
      ) : (
        <AuthPortal />
      )}
    </>
  )
}

export default AccountPage
