import React, { Fragment, useContext } from 'react'
import AuthPortal from '../components/auth/auth-portal.component'
import SettingsPortal from '../components/settings/settings-portal.component'
import Layout from '../components/layout/layout.component'

import { UserContext } from '../contexts'
import { useIsClient } from '../hooks'

const AccountPage = () => {
  const { user } = useContext(UserContext)

  const { isClient, key } = useIsClient()

  if (!isClient) return null
  return (
    <>
      {user.jwt && user.onboarding ? (
        <Layout key={key}>
          <SettingsPortal />
        </Layout>
      ) : (
        <Fragment key={key}>
          <AuthPortal />
        </Fragment>
      )}
    </>
  )
}

export default AccountPage
