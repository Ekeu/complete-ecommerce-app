import React from 'react'
import { Switch } from '@headlessui/react'
import { classNames } from '../../utils/functions'

const Toggle = ({ description, enabled, setEnabled }) => {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-purple-600' : 'bg-blue-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium font-osans text-blue-gray-600">
          {description}
        </span>
      </Switch.Label>
    </Switch.Group>
  )
}

export default Toggle
