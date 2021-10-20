import React, { useEffect } from 'react'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'

import { setUser } from '../../contexts/actions'

import CustomButton from '../custom-button/custom-button.component'
import { AUTH_COMPLETE_SVG } from '../../constants/auth.constants'

const AuthComplete = ({ user, dispatch }) => {

  useEffect(() => {
    return () => {
      dispatch(setUser({...user, onboarding: true}))
    }
  }, [])

  return (
    <div className="text-center">
      {AUTH_COMPLETE_SVG}
      <h2 className="mt-2 text-lg font-medium font-hind text-blue-gray-900">
        Account created!
      </h2>
      <p className="mt-1 font-osans text-sm text-blue-gray-500">
        Your account has been successfully created. Start shopping now! 😎
      </p>
      <div className="mt-6">
        <CustomButton
          type={'button'}
          customStyles={
            'inline-flex items-center px-4 py-2 border-transparent shadow-sm text-white bg-purple-600 hover:bg-purple-700'
          }
        >
          Let's go!
          <ArrowNarrowRightIcon
            className="ml-3 -mr-1 h-5 w-5"
            aria-hidden="true"
          />
        </CustomButton>
      </div>
    </div>
  )
}

export default AuthComplete
