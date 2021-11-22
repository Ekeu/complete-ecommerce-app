import React from 'react'

import {
  ClockIcon,
  CogIcon,
  StarIcon,
  CalendarIcon,
} from '@heroicons/react/outline'

import { classNames } from '../../utils/functions'

const SettingsSideNav = ({ options, selectedOption, setSelectedOption }) => {
  const sideNavigation = [
    { name: 'Settings', icon: CogIcon },
    { name: 'Order History', icon: ClockIcon },
    { name: 'Wishlist', icon: StarIcon },
    { name: 'Subscriptions', icon: CalendarIcon },
  ]

  const handleSelectOption = name => {
    const option = options.find(option => option.label === name)
    setSelectedOption(option)
  }
  return (
    <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
      <nav className="space-y-1">
        {sideNavigation.map((item, idx) => (
          <span
            key={item.name + 'side-nav' + idx}
            onClick={() => handleSelectOption(item.name)}
            className={classNames(
              item.name === selectedOption.label
                ? `bg-blue-gray-100 ${selectedOption.color} hover:bg-white`
                : 'text-blue-gray-800 hover:text-blue-gray-800 hover:bg-blue-gray-100',
              'group rounded-md px-3 py-2 flex items-center text-sm font-medium font-hind cursor-pointer'
            )}
          >
            <item.icon
              className={classNames(
                item.name === selectedOption.label
                  ? `${selectedOption.color}`
                  : 'text-blue-gray-400 group-hover:text-blue-gray-500',
                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
              )}
            />
            <span className="truncate">{item.name}</span>
          </span>
        ))}
      </nav>
    </aside>
  )
}

export default SettingsSideNav
