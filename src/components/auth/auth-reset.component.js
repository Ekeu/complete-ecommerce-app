import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import AuthHeader from './auth-header.component'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { PASSWORD_CONFIG } from '../../constants/auth.constants'

import { setSnackbar } from '../../contexts/actions'

const AuthReset = ({ components, setCurrentComponent, dispatchFeedback }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = handleSubmit(async ({ password, confirm_password }) => {
    try {
      setLoading(true)
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      await axios.post(process.env.GATSBY_STRAPI_URL + '/auth/reset-password', {
        code,
        password,
        passwordConfirmation: confirm_password,
      })
      setLoading(false)
      setSuccess(true)
      dispatchFeedback(
        setSnackbar({
          status: 'success',
          message: 'Your password was successfully changed',
        })
      )
    } catch (error) {
      const { message } = error.response.data.message[0].messages[0]
      setLoading(false)
      dispatchFeedback(setSnackbar({ status: 'error', message }))
    }
  })

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => {
      window.history.replaceState(null, null, window.location.pathname)
      const loginComponent = components.find(
        component => component.label === 'Login'
      )
      setCurrentComponent(components.indexOf(loginComponent))
    }, 5000)
    return () => clearTimeout(timer)
  }, [success])

  return (
    <>
      <AuthHeader headline={'Change your password'} />
      <div className="mt-8">
        <div className="mt-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <FormInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
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

            <FormInput
              id="confirm_password"
              name="confirm_password"
              type={showPassword ? 'text' : 'password'}
              labelText="Confirm password"
              label="confirm_password"
              placeholder="********"
              register={register('confirm_password', {
                ...PASSWORD_CONFIG,
                required: 'Please confirm your password',
                validate: value =>
                  value === password.current || 'The passwords do not match',
              })}
              showPassword={showPassword}
              togglePassword={togglePassword}
              error={errors.confirm_password?.message}
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
                Submit
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthReset
