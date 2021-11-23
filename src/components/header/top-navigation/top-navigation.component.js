import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { UserContext } from '../../../contexts'
import { setUser } from '../../../contexts/actions'
import { useIsClient } from '../../../hooks'

const TopNavigation = () => {
  const { user, dispatch, defaultUser } = useContext(UserContext)

  const { key, isClient } = useIsClient()

  const handleLogout = () => {
    dispatch(setUser(defaultUser))
  }

  if (!isClient) return null
  return (
    <div
      key={key}
      className="hidden bg-gradient-to-br from-purple-500 to-indigo-500 lg:block"
    >
      <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
        <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none font-hind">
          All images and content are owned by{' '}
          <a
            rel={'noreferrer'}
            target={'_blank'}
            href={'https://adidas.com/us'}
            className={'font-semibold text-blue-gray-50'}
          >
            Adidas.com
          </a>
        </p>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          <span
            className={
              'text-sm font-hind font-medium text-white hover:text-blue-gray-100'
            }
          >
            {user.jwt ? `Welcome, ${user.username}` : <>👉</>}
          </span>
          <span className="h-6 w-px bg-white" aria-hidden="true" />
          {user.jwt ? (
            <button
              onClick={handleLogout}
              className={
                'text-sm font-hind font-medium text-white cursor-pointer'
              }
            >
              Log out
            </button>
          ) : (
            <Link
              to={'/account'}
              className={
                'text-sm font-hind font-medium text-white hover:text-blue-gray-100'
              }
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopNavigation
