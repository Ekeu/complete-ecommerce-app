import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { UserContext, FeedbackContext } from '../../contexts/'
import { setSnackbar, setUser } from '../../contexts/actions'

import UserSettingsDetails from './user-settings-details.component'
import UserSettingsLocation from './user-settings-location.component'
import UserSettingsPayments from './user-settings-payments.component'
import UserSettingsEdit from './user-settings-edit.component'
import UserSettingsConfirmation from './user-settings-confirmation.component'

const UserSettings = () => {
  const { user, dispatch } = useContext(UserContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const [edit, setEdit] = useState(false)
  const [changesMade, setChangesMade] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLocationSlot, setSelectedLocationSlot] = useState(0)
  const [selectedDetailsSlot, setSelectedDetailsSlot] = useState(0)

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    watch,
    setValue,
  } = useForm()

  const watchDetailFields = watch(['name', 'email', 'phone'])
  const watchLocationFields = watch(['street', 'zip', 'city', 'state'])
  const watchAllFields = watch()

  const onSubmit = handleSubmit(async formData => {
    try {
      const { name, email, phone, street, zip, city, state, password } =
        formData

      if (password !== '') {
        setModalOpen(true)
      }

      if (edit && changesMade) {
        setLoading(true)
        const res = await axios.post(
          process.env.GATSBY_STRAPI_URL + '/users-permissions/set-settings',
          {
            details: {
              name,
              email,
              phone,
            },
            detailSlot: selectedDetailsSlot,
            location: {
              zip,
              city,
              state,
              street,
            },
            locationSlot: selectedLocationSlot,
          },
          {
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
          }
        )
        setLoading(false)
        setEdit(!edit)
        dispatchFeedback(
          setSnackbar({
            status: 'success',
            message: 'Settings saved successully!',
          })
        )
        dispatch(setUser({ ...res.data, jwt: user.jwt, onboarding: true }))
      } else {
        setEdit(!edit)
      }
    } catch (error) {
      setLoading(false)
      setEdit(!edit)
      console.error(error)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message:
            'An error occured while trying to save your settings. Please try again.',
        })
      )
    }
  })

  useEffect(() => {
    clearErrors(['name', 'email', 'phone'])
  }, [selectedDetailsSlot])

  useEffect(() => {
    clearErrors(['street', 'zip'])
  }, [selectedLocationSlot])

  return (
    <>
      <form onSubmit={onSubmit} className={'space-y-6'}>
        <UserSettingsDetails
          user={user}
          register={register}
          errors={errors}
          edit={edit}
          setValue={setValue}
          watchDetailFields={watchDetailFields}
          watchAllFields={watchAllFields}
          setChangesMade={setChangesMade}
          selectedSlot={selectedDetailsSlot}
          setSelectedSlot={setSelectedDetailsSlot}
        />
        <UserSettingsLocation
          user={user}
          register={register}
          errors={errors}
          edit={edit}
          setValue={setValue}
          watchLocationFields={watchLocationFields}
          watchAllFields={watchAllFields}
          setChangesMade={setChangesMade}
          selectedSlot={selectedLocationSlot}
          setSelectedSlot={setSelectedLocationSlot}
          dispatchFeedback={dispatchFeedback}
          setSnackbar={setSnackbar}
        />
        <UserSettingsPayments user={user} edit={edit} />
        <UserSettingsEdit
          edit={edit}
          setEdit={setEdit}
          user={user}
          loading={loading}
        />
      </form>
      <UserSettingsConfirmation
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        user={user}
        dispatchFeedback={dispatchFeedback}
        setSnackbar={setSnackbar}
      />
    </>
  )
}

export default UserSettings
