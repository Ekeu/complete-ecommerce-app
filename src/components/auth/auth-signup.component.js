import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import AuthHeader from './auth-header.component'
import AuthSocials from './auth-socials.component'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { setUser, setSnackbar } from '../../contexts/actions'

import { PASSWORD_CONFIG, EMAIL_CONFIG } from '../../constants/auth.constants'

import { handleSocialAuth } from '../../utils/auth'

const AuthSignup = ({
  components,
  setCurrentComponent,
  dispatch,
  dispatchFeedback,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    try {
      setLoading(true)
      const res = await axios.post(
        process.env.GATSBY_STRAPI_URL + '/auth/local/register',
        {
          username: name,
          email,
          password,
        }
      )
      setLoading(false)
      dispatch(setUser({ ...res.data.user, jwt: res.data.jwt }))

      const completeComponent = components.find(
        component => component.label === 'Complete'
      )
      setCurrentComponent(components.indexOf(completeComponent))
    } catch (error) {
      const { message } = error.response.data.message[0].messages[0]
      setLoading(false)
      dispatchFeedback(setSnackbar({ status: 'error', message }))
    }
  })

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const navigateToSignin = () => {
    const signinComponent = components.find(
      component => component.label === 'Login'
    )
    setCurrentComponent(components.indexOf(signinComponent))
  }
  
  return (
    <>
      <AuthHeader
        headline={"Let's get started!"}
        sub_headline={'Log in to your account.'}
        handleChange={navigateToSignin}
      />
      <div className="mt-8">
        <AuthSocials
          headline={'Sign up with'}
          loading={loading}
          handleSocialAuth={handleSocialAuth}
        />
        <div className="mt-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <FormInput
              id="name"
              name="name"
              type="text"
              label="name"
              labelText="Name"
              autoComplete="username"
              register={register('name', {
                required: 'Enter your name',
                maxLength: {
                  value: 15,
                  message: 'Your name is too long',
                },
                minLength: {
                  value: 3,
                  message: 'Your name is too short',
                },
              })}
              placeholder="John Doe"
              error={errors.name?.message}
            />
            <FormInput
              id="email"
              name="email"
              type="email"
              label="email"
              labelText="E-mail"
              autoComplete="email"
              register={register('email', { ...EMAIL_CONFIG })}
              placeholder="johndoe@gmail.com"
              formInputWrapperClass={'space-y-1'}
              error={errors.email?.message}
            />
            <FormInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              labelText="Password"
              label="password"
              placeholder="********"
              register={register('password', { ...PASSWORD_CONFIG })}
              showPassword={showPassword}
              togglePassword={togglePassword}
              error={errors.password?.message}
              formInputWrapperClass={'space-y-1'}
              passwordEyeIcon
            />
            <div>
              <CustomButton
                type={'submit'}
                loading={loading}
                customStyles={
                  'w-full flex justify-center py-2 px-5 border-transparent text-white bg-purple-600 hover:bg-purple-700'
                }
              >
                Register
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthSignup
