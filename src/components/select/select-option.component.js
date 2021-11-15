import { CheckIcon } from '@heroicons/react/solid'
import React from 'react'
import { classNames } from '../../utils/functions'

const SelectOption = ({ selected, title, active, description }) => {
  return (
    <div className="flex flex-col font-hind">
      <div className="flex justify-between">
        <p className={selected ? 'font-semibold' : 'font-normal'}>{title}</p>
        {selected ? (
          <span className={active ? 'text-white' : 'text-purple-500'}>
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <p
        className={classNames(
          active ? 'text-purple-200' : 'text-blue-gray-500',
          'mt-2'
        )}
      >
        {description}
      </p>
    </div>
  )
}

export default SelectOption
