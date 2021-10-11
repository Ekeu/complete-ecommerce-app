import React from 'react'
import moment from 'moment'

import CustomButton from '../custom-button/custom-button.component'

const UserSettingsEdit = ({ user, edit, setEdit, loading }) => {
  const handleEdit = () => {
    setEdit(!edit)
  }
  return (
    <>
      <div className="pt-8">
        <p className="text-sm text-blue-gray-500 font-osans">
          This account was created on{' '}
          <time dateTime={user.createdAt}>
            {moment(user.createdAt).format('MMMM Do YYYY')}
          </time>
          .
        </p>
      </div>

      <div className="pt-8 flex justify-end">
        {edit && (
          <CustomButton
            type={'submit'}
            loading={loading}
            customStyles={
              'ml-3 w-24 inline-flex justify-center py-2 px-4 border border-transparent text-white bg-purple-600 hover:bg-purple-700'
            }
          >
            Save
          </CustomButton>
        )}
        {!edit && (
          <CustomButton
            type={'button'}
            onClick={handleEdit}
            customStyles={
              'w-24 flex justify-center py-2 px-4 border border-blue-gray-300 text-blue-gray-800 bg-white hover:bg-blue-gray-50'
            }
          >
            Edit
          </CustomButton>
        )}
      </div>
    </>
  )
}

export default UserSettingsEdit
