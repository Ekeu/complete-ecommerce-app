import React from 'react'
import { XIcon } from '@heroicons/react/solid'

const SnackBar = ({ closeToast, message, icon, Component }) => {
  return (
    <div className="max-w-sm w-full bg-white font-hind shadow-md rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <icon.component
              className={`h-6 w-6 ${icon.color}`}
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm text-blue-gray-600">{message}</p>
            {Component}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={closeToast}
              className="bg-white rounded-md inline-flex text-blue-gray-400 hover:text-blue-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SnackBar
