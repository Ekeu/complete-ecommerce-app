import React, { useState, useEffect } from 'react'

import FormInput from '../form-input/form-input.component'
import Slots from '../slots/slots.component'

import {
  EMAIL_CONFIG,
  PASSWORD_CONFIG,
  PHONE_CONFIG,
} from '../../constants/auth.constants'

const UserSettingsDetails = ({
  user,
  register,
  errors,
  setValue,
  edit,
  setChangesMade,
  watchAllFields,
  watchDetailFields,
  selectedSlot,
  setSelectedSlot,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    setValue('name', user.contactInfo[selectedSlot].name || '')
    setValue('email', user.contactInfo[selectedSlot].email || '')
    setValue('phone', user.contactInfo[selectedSlot].phone || '')
    setValue('password', '')
  }, [selectedSlot])

  useEffect(() => {
    const changed = Object.keys(user.contactInfo[selectedSlot]).some(
      field => watchAllFields[field] !== user.contactInfo[selectedSlot][field]
    )
    setChangesMade(changed)
  }, [watchDetailFields])

  return (
    <section aria-labelledby="payment-details-heading">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 sm:p-6">
          <div>
            <h2
              id="payment-details-heading"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Billing Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Feel free to edit any of your details below so your account is up
              to date. You can only add 3 user information.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-6">
            <FormInput
              id="name"
              name="name"
              type="text"
              label="name"
              labelText="Name"
              autoComplete="cc-name"
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
              disabled={!edit}
              placeholder="John Doe"
              formInputWrapperClass={'col-span-4 sm:col-span-2'}
              error={errors.name?.message}
            />
            <FormInput
              id="phone"
              name="phone"
              type="text"
              label="phone"
              labelText="Phone Number"
              autoComplete="tel"
              register={register('phone', {
                pattern: { ...PHONE_CONFIG.pattern },
              })}
              disabled={!edit}
              placeholder="+33776633142"
              formInputWrapperClass={'col-span-4 sm:col-span-2'}
              error={errors.phone?.message}
            />
            <FormInput
              id="email"
              name="email"
              type="email"
              label="email"
              labelText="E-mail"
              autoComplete="email"
              register={register('email', { ...EMAIL_CONFIG })}
              disabled={!edit}
              placeholder="johndoe@gmail.com"
              formInputWrapperClass={'col-span-4 sm:col-span-2'}
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
              register={register('password', {
                pattern: { ...PASSWORD_CONFIG.pattern },
              })}
              disabled={!edit}
              showPassword={showPassword}
              togglePassword={togglePassword}
              error={errors.password?.message}
              formInputWrapperClass={'col-span-4 sm:col-span-2'}
              passwordEyeIcon
            />
          </div>
        </div>
        <Slots selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      </div>
    </section>
  )
}

export default UserSettingsDetails
