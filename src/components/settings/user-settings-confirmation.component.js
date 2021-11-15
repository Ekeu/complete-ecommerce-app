import React, { useRef, useState } from 'react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import Modal from '../modal/modal.component'
import ModalContent from '../modal/modal-content.component'
import ModalContentIcon from '../modal/modal-content-icon.component'
import ModalContentText from '../modal/modal-content-text.component'
import ModalActions from '../modal/modal-actions.component'
import CustomButton from '../custom-button/custom-button.component'
import FormInput from '../form-input/form-input.component'

import { PASSWORD_CONFIG } from '../../constants/auth.constants'

const UserSettingsConfirmation = ({
  modalOpen,
  setModalOpen,
  user,
  dispatchFeedback,
  setSnackbar,
}) => {
  const cancelButtonRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm()

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = handleSubmit(async ({ old_password, new_password }) => {
    setLoading(true)
    try {
      const resCheckPassword = await axios.post(
        process.env.GATSBY_STRAPI_URL + '/auth/local',
        {
          identifier: user.email,
          password: old_password,
        }
      )
      try {
        const resChangePassword = await axios.post(
          process.env.GATSBY_STRAPI_URL + '/users-permissions/change-password',
          {
            password: new_password,
          },
          {
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
          }
        )
        setLoading(false)
        setModalOpen(false)
        dispatchFeedback(
          setSnackbar({
            status: 'success',
            message: 'Password changed successfully.',
          })
        )
        setValue('old_password', '')
        setValue('new_password', '')
      } catch (error) {
        setLoading(false)
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: 'error',
            message:
              'An error occured while changing your password. Please try again.',
          })
        )
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
      dispatchFeedback(
        setSnackbar({ status: 'error', message: 'Old password invalid' })
      )
    }
  })

  const handleCancel = () => {
    setModalOpen(false)
    dispatchFeedback(
      setSnackbar({
        status: 'error',
        message: 'Your password has NOT been changed.',
      })
    )
  }

  return (
    <Modal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={onSubmit}>
          <ModalContent>
            <ModalContentIcon bgColor={'bg-yellow-100'}>
              <ExclamationIcon className="h-6 w-6 text-yellow-600" />
            </ModalContentIcon>
            <ModalContentText title={'Change password'}>
              <p className="font-osans text-sm text-blue-gray-500 mb-4">
                You are changing your account password. Please confirm old
                password and new password.
              </p>
              <div className="space-y-6">
                <FormInput
                  id="old_password"
                  name="old_password"
                  type={showPassword ? 'text' : 'password'}
                  labelText="Old password"
                  label="old_password"
                  autoComplete="current-password"
                  placeholder={'********'}
                  register={register('old_password', { ...PASSWORD_CONFIG })}
                  showPassword={showPassword}
                  togglePassword={togglePassword}
                  error={errors.old_password?.message}
                  formInputWrapperClass={'space-y-1'}
                  passwordEyeIcon
                />

                <FormInput
                  id="new_password"
                  name="new_password"
                  type={showPassword ? 'text' : 'password'}
                  labelText="New password"
                  label="new_password"
                  autoComplete="new-password"
                  placeholder={'********'}
                  register={register('new_password', {
                    ...PASSWORD_CONFIG,
                    required: 'Please enter your new password',
                  })}
                  showPassword={showPassword}
                  togglePassword={togglePassword}
                  error={errors.new_password?.message}
                  formInputWrapperClass={'space-y-1'}
                  passwordEyeIcon
                />
              </div>
            </ModalContentText>
          </ModalContent>
          <ModalActions>
            <CustomButton
              type={'submit'}
              loading={loading}
              customStyles={
                'w-full inline-flex border-transparent px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 sm:ml-3 sm:w-auto sm:text-sm'
              }
            >
              Change password
            </CustomButton>
            <CustomButton
              type={'button'}
              customStyles={
                'mt-3 w-full inline-flex border-blue-gray-300 px-4 py-2 bg-white text-blue-gray-700 hover:bg-blue-gray-50 sm:mt-0 sm:w-auto sm:text-sm'
              }
              onClick={handleCancel}
              disabled={loading}
              ref={cancelButtonRef}
            >
              Cancel
            </CustomButton>
          </ModalActions>
        </form>
      </div>
    </Modal>
  )
}

export default UserSettingsConfirmation
