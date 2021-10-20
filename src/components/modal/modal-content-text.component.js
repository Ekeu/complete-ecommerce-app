import React from 'react'
import { Dialog } from '@headlessui/react'

const ModalContentText = ({ title, children }) => {
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <Dialog.Title
        as="h3"
        className="text-lg leading-6 font-medium font-hind text-blue-gray-800"
      >
        {title}
      </Dialog.Title>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export default ModalContentText
