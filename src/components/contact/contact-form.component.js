import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { EMAIL_CONFIG } from '../../constants/auth.constants'
import axios from 'axios'
import { setSnackbar } from '../../contexts/actions'
import { FeedbackContext } from '../../contexts'

const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const onSubmit = handleSubmit(async ({ name, email, subject, message }) => {
    try {
      setLoading(true)
      await axios.post(
        'https://ruby-spider-1183.twil.io/send-email',
        new URLSearchParams({
          email,
          message,
          name,
          subject,
        }).toString(),
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        }
      )
      setLoading(false)
      setValue('name', '')
      setValue('email', '')
      setValue('subject', '')
      setValue('message', '')
      dispatchFeedback(
        setSnackbar({ status: 'success', message: 'Thanks for your message!' })
      )
    } catch (error) {
      console.error(error)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: 'Something went wrong. Please try again!',
        })
      )
    }
  })
  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
    >
      <FormInput
        id="name"
        name="name"
        type="text"
        label="name"
        labelText="Name"
        autoComplete="given-name"
        register={register('name', {
          required: 'Please enter your Name',
          maxLength: {
            value: 15,
            message: 'Your Name is too long',
          },
          minLength: {
            value: 3,
            message: 'Your Name is too short',
          },
        })}
        ringStyling={
          'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
        }
        placeholder="John"
        error={errors.name?.message}
      />
      <FormInput
        id="email"
        name="email"
        type="email"
        label="email"
        labelText="Email Address"
        autoComplete="email"
        register={register('email', { ...EMAIL_CONFIG })}
        placeholder="john.doe@gmail.com"
        ringStyling={
          'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
        }
        error={errors.email?.message}
      />
      <FormInput
        id="subject"
        name="subject"
        type="text"
        label="subject"
        labelText="Subject"
        register={register('subject', {
          required: 'Please provide a subject to your message.',
        })}
        formInputWrapperClass={'sm:col-span-2'}
        ringStyling={
          'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
        }
        placeholder="You need to provide a subject to send your message."
        error={errors.subject?.message}
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
          disabled={loading}
          loading={loading}
          customStyles={
            'mt-2 items-center flex px-6 py-3 sm:w-auto border-transparent text-white bg-purple-600 hover:bg-purple-700 w-full'
          }
        >
          Send message
        </CustomButton>
      </div>
    </form>
  )
}

export default ContactForm
