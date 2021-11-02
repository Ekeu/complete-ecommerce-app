import React from 'react'
import { Menu } from '@headlessui/react'
import { classNames } from '../../utils/functions'

const DropdownOption = ({ Icon, onClick, description }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <span
          role="button"
          onClick={onClick}
          className={classNames(
            active
              ? 'bg-blue-gray-100 text-blue-gray-800'
              : 'text-blue-gray-700',
            'flex px-4 py-2 text-sm cursor-pointer'
          )}
        >
          <Icon
            className="mr-3 h-5 w-5 text-blue-gray-400"
            aria-hidden="true"
          />
          <span>{description}</span>
        </span>
      )}
    </Menu.Item>
  )
}

export default DropdownOption
