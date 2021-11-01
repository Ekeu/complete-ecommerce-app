import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { DotsVerticalIcon } from '@heroicons/react/solid'

const Dropdown = ({ options }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-blue-gray-400 hover:text-blue-gray-600">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-blue-gray-800 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map(options => options.component)}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
