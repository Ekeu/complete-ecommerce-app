import React, { useContext, useState } from 'react'
import { Image } from 'cloudinary-react'

import { UserContext } from '../../contexts'

import UserSettings from './user-settings.component'
import SettingsSideNav from './settings-side-nav.component'

const SettingsPortal = () => {
  const { user } = useContext(UserContext)
  const [selectedOption, setSelectedOption] = useState(null)

  const options = [
    {
      id: 'adidas-ecom/account/settings',
      label: 'Settings',
      component: UserSettings,
      description:
        'See all your personal data in your account and choose what activity is saved to personalize your experience',
      color: 'text-purple-500',
      gradient: {
        from: 'from-purple-500',
        to: 'to-indigo-500',
      },
    },
    {
      id: 'adidas-ecom/account/order_history',
      label: 'Order History',
      description: 'You can have a view on all your previous purchases',
      color: 'text-emerald-400',
      gradient: {
        from: 'from-emerald-400',
        to: 'to-cyan-500',
      },
    },
    {
      id: 'adidas-ecom/account/favorites',
      label: 'Favorites',
      description: 'See all your favorites products',
      color: 'text-orange-500',
      gradient: {
        from: 'from-yellow-400',
        to: 'to-orange-500',
      },
    },
    {
      id: 'adidas-ecom/account/subscriptions',
      label: 'Subscriptions',
      description: 'See all your psubscriptions',
      color: 'text-rose-500',
      gradient: {
        from: 'from-pink-500',
        to: 'to-rose-500',
      },
    },
  ]

  const handleSelectOption = option => {
    setSelectedOption(option)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 space-y-12">
        <div className="space-y-12  text-center">
          <div className="space-y-5 sm:space-y-4 sm:mx-auto md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2
              className={`text-3xl font-hind font-medium ${
                selectedOption
                  ? `bg-clip-text text-transparent bg-gradient-to-br ${selectedOption.gradient.from} ${selectedOption.gradient.to}`
                  : 'text-blue-gray-800'
              } tracking-tight sm:text-4xl`}
            >
              {selectedOption
                ? selectedOption.label
                : `Welcome, ${user.username}`}
            </h2>
            <p className="text-xl text-blue-gray-500">
              {selectedOption
                ? selectedOption.description
                : 'Manage your settings, subscriptions, order history, and favorites to make Adidas work better for you.'}
            </p>
          </div>
          {!selectedOption && (
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8"
            >
              {options.map(option => (
                <li
                  key={option.id}
                  className="cursor-pointer"
                  onClick={() => handleSelectOption(option)}
                >
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <Image
                        className="object-cover shadow-lg rounded-lg"
                        alt={option.id}
                        cloudName="dmcookpro"
                        publicId={option.id}
                        loading="lazy"
                        width="100%"
                        height="100%"
                      ></Image>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <p className="text-blue-gray-600 font-osans">
                          {option.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedOption && (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <SettingsSideNav
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <selectedOption.component />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsPortal
