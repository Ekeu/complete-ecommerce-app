import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import AuthHeader from './auth-header.component'
import AuthSocials from './auth-socials.component'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { PASSWORD_CONFIG, EMAIL_CONFIG } from '../../constants/auth.constants'

const AuthLogin = ({ components, setCurrentComponent }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [forgot, setForgot] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const res = await axios.post(
        process.env.GATSBY_STRAPI_URL + '/auth/local',
        {
          identifier: email,
          password,
        }
      )
      console.log(res.data)
    } catch (error) {
      console.error(error)
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
        {!forgot && <AuthSocials headline={'Log in with'} />}
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
                loading={false}
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
