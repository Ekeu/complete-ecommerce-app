import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import AuthHeader from './auth-header.component'
import AuthSocials from './auth-socials.component'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { EMAIL_CONFIG } from '../../constants/auth.constants'

import { setUser, setSnackbar } from '../../contexts/actions'

import { handleSocialAuth } from '../../utils/auth'

const AuthLogin = ({
  components,
  setCurrentComponent,
  dispatch,
  dispatchFeedback,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [forgot, setForgot] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => setForgot(false), 6000)

    return () => clearTimeout(timer)
  }, [success])

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setLoading(true)
      if (forgot) {
        await axios.post(
          process.env.GATSBY_STRAPI_URL + '/auth/forgot-password',
          {
            email,
          }
        )
        setLoading(false)
        dispatchFeedback(
          setSnackbar({ status: 'success', message: 'Reset code sent!' })
        )
      } else {
        const res = await axios.post(
          process.env.GATSBY_STRAPI_URL + '/auth/local',
          {
            identifier: email,
            password,
          }
        )
        setLoading(false)
        setSuccess(true)
        dispatch(
          setUser({ ...res.data.user, jwt: res.data.jwt, onboarding: true })
        )
      }
    } catch (error) {
      const { message } = error.response.data.message[0].messages[0]
      setLoading(false)
      dispatchFeedback(setSnackbar({ status: 'error', message }))
    }
  })

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const navigateToSignup = () => {
    const signupComponent = components.find(
      component => component.label === 'Sign Up'
    )
    setCurrentComponent(components.indexOf(signupComponent))
  }

  return (
    <>
      <AuthHeader
        headline={forgot ? 'Reset your password' : 'Log in to your account'}
        sub_headline={
          forgot ? 'Log in to your account.' : 'Create a new account.'
        }
        handleChange={forgot ? () => setForgot(false) : navigateToSignup}
      />
      <div className="mt-8">
        {!forgot && (
          <AuthSocials
            loading={loading}
            headline={'Sign in with'}
            init
            handleSocialAuth={handleSocialAuth}
          />
        )}
        <div className="mt-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <FormInput
              id="email"
              name="email"
              type="email"
              label="email"
              labelText="E-mail"
              autoComplete="email"
              register={register('email', { ...EMAIL_CONFIG })}
              placeholder="johndoe@gmail.com"
              error={errors.email?.message}
            />

            {!forgot && (
              <>
                <FormInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  labelText="Password"
                  label="password"
                  placeholder="********"
                  register={register('password', {
                    required: 'Enter your password',
                  })}
                  showPassword={showPassword}
                  togglePassword={togglePassword}
                  error={errors.password?.message}
                  formInputWrapperClass={'space-y-1'}
                  passwordEyeIcon
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">😫</div>

                  <div className="text-sm">
                    <span
                      onClick={() => setForgot(true)}
                      className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
                    >
                      Forgot your password?
                    </span>
                  </div>
                </div>
              </>
            )}

            <div>
              <CustomButton
                type={'submit'}
                loading={loading}
                customStyles={
                  'w-full flex justify-center py-2 px-5 border-transparent text-white bg-purple-600 hover:bg-purple-700'
                }
              >
                {forgot ? 'Reset password' : 'Log in'}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthLogin
