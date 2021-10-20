import React from 'react'

import FormInput from '../form-input/form-input.component'

import {
  EMAIL_CONFIG,
  NAME_CONFIG,
  PHONE_CONFIG,
} from '../../constants/auth.constants'

const CheckoutUserInfoInputs = ({
  register,
  errors,
  nameId,
  phoneId,
  emailId,
}) => {
  return (
    <>
      <FormInput
        id="name"
        name="name"
        type="text"
        label="name"
        labelText="Name"
        autoComplete="cc-name"
        register={register(nameId, { ...NAME_CONFIG })}
        placeholder="John Doe"
        error={errors[nameId]?.message}
      />

      <FormInput
        id="phone"
        name="phone"
        type="text"
        label="phone"
        labelText="Phone Number"
        autoComplete="tel"
        register={register(phoneId, {
          pattern: { ...PHONE_CONFIG.pattern },
        })}
        placeholder="+33776633142"
        error={errors[phoneId]?.message}
      />

      <FormInput
        id="email"
        name="email"
        type="email"
        label="email"
        labelText="Email address"
        autoComplete="email"
        register={register(emailId, { ...EMAIL_CONFIG })}
        placeholder="johndoe@gmail.com"
        formInputWrapperClass={'sm:col-span-2'}
        error={errors[emailId]?.message}
      />
    </>
  )
}

export default CheckoutUserInfoInputs
