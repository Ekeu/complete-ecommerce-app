import React, { useState, useContext, useEffect } from 'react'
import { Image } from 'cloudinary-react'
import axios from 'axios'

import AuthLogin from './auth-login.component'
import AuthSignup from './auth-signup.component'
import AuthComplete from './auth-complete.component'
import AuthReset from './auth-reset.component'

import { UserContext, FeedbackContext } from '../../contexts'
import { setUser, setSnackbar } from '../../contexts/actions'

import { capitalize } from '../../utils/functions'

const AuthPortal = () => {
  const [currentComponent, setCurrentComponent] = useState(0)
  const { user, dispatch } = useContext(UserContext)
  const { feedback, dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const components = [
    { cpt: AuthLogin, label: 'Login' },
    { cpt: AuthSignup, label: 'Sign Up' },
    { cpt: AuthComplete, label: 'Complete' },
    { cpt: AuthReset, label: 'Reset' },
  ]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const access_token = params.get('access_token')
    const access_secret = params.get('access_secret')

    if (code) {
      const resetComponent = components.find(
        component => component.label === 'Reset'
      )
      setCurrentComponent(components.indexOf(resetComponent))
    } else if (access_token) {
      const provider = localStorage.getItem('requestedProvider')
      axios
        .get(process.env.GATSBY_STRAPI_URL + `/auth/${provider}/callback`, {
          params: {
            access_token,
            access_secret,
          },
        })
        .then(res => {
          dispatch(
            setUser({ ...res.data.user, jwt: res.data.jwt, onboarding: true })
          )
          localStorage.removeItem('requestedProvider')
          window.history.replaceState(null, null, window.location.pathname)
        })
        .catch(error => {
          console.error(error)
          localStorage.removeItem('requestedProvider')
          dispatchFeedback(
            setSnackbar({
              status: 'error',
              message: `Connecting to ${capitalize(
                provider
              )} failed, please try again`,
            })
          )
        })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {components.map(
            (component, index) =>
              currentComponent === index && (
                <component.cpt
                  key={component.label}
                  user={user}
                  feedback={feedback}
                  dispatch={dispatch}
                  dispatchFeedback={dispatchFeedback}
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
