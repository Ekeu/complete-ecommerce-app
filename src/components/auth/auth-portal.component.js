import React, { useState } from 'react'
import { Image } from 'cloudinary-react'

import AuthLogin from './auth-login.component'
import AuthSignup from './auth-signup.component'
import AuthComplete from './auth-complete.component'

const AuthPortal = () => {
  const [currentComponent, setCurrentComponent] = useState(0)

  const components = [
    { cpt: AuthLogin, label: 'Login' },
    { cpt: AuthSignup, label: 'Sign Up' },
    { cpt: AuthComplete, label: 'Complete' },
  ]

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {components.map(
            (component, index) =>
              currentComponent === index && (
                <component.cpt
                  key={component.label}
                  setCurrentComponent={setCurrentComponent}
                  components={components}
                />
              )
          )}
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          className={'absolute inset-0 h-full w-full object-cover'}
          alt={'Authentication Image'}
          cloudName="dmcookpro"
          publicId={'adidas-ecom/auth/auth-image'}
          loading="lazy"
          width="100%"
          height="100%"
        ></Image>
      </div>
    </div>
  )
}

export default AuthPortal
