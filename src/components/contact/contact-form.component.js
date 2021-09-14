import React from 'react'
import { useForm } from 'react-hook-form'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

const ContactForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  console.log(Object.keys(errors))
  const onSubmit = handleSubmit(({ firstName, lastName, email, message }) => {
    console.table({ firstName, lastName, email, message })
  })
  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
    >
      <FormInput
        id="firstName"
        name="firstName"
        type="text"
        label="firstName"
        labelText="First Name"
        autoComplete="given-name"
        register={register('firstName', {
          required: 'Please enter your First Name',
          maxLength: {
            value: 15,
            message: 'Your First Name is too long',
          },
          minLength: {
            value: 3,
            message: 'Your First Name is too short',
          },
        })}
        ringStyling={
          'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
        }
        placeholder="John"
        error={errors.firstName?.message}
      />
      <FormInput
        id="lastName"
        name="lastName"
        type="text"
        label="lastName"
        labelText="Last Name"
        autoComplete="family-name"
        register={register('lastName', {
          required: 'Please enter your Last Name',
          maxLength: {
            value: 15,
            message: 'Your Last Name is too long',
          },
          minLength: {
            value: 3,
            message: 'Your Last Name is too short',
          },
        })}
        ringStyling={
          'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
        }
        placeholder="Doe"
        error={errors.lastName?.message}
      />
      <FormInput
        id="email"
        name="email"
        type="email"
        label="email"
        labelText="Email Address"
        autoComplete="email"
        register={register('email', {
          required: 'Please enter your email address',
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Please enter a valid email address',
          },
        })}
        placeholder="john.doe@gmail.com"
        formInputWrapperClass={'sm:col-span-2'}
        ringStyling={
          'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
        }
        error={errors.email?.message}
      />
      <FormInput
        id="message"
        name="message"
        multiline
        label="message"
        labelText="Message"
        rows={5}
        hintText={'Max. 500 characters'}
        register={register('message', {
          required: "You can't send an empty message",
          maxLength: {
            value: 500,
            message: "You've reached the maximum amount of characters",
          },
        })}
        formInputWrapperClass={'sm:col-span-2'}
        ringStyling={
          'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
        }
        placeholder="Enter your message!"
        error={errors.message?.message}
      />
      <div className="sm:col-span-2 sm:flex sm:justify-end">
        <CustomButton
          type={'submit'}
          customStyles={
            'mt-2 items-center px-6 py-3 sm:w-auto border-transparent text-white bg-purple-500 hover:bg-purple-600'
          }
        >
          Submit
        </CustomButton>
      </div>
    </form>
  )
}

export default ContactForm
