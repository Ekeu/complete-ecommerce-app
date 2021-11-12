import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'

import { classNames } from '../../utils/functions'
import SelectOption from './select-option.component'

const Select = ({
  selected,
  setSelected,
  description,
  selectOptions,
  ...otherProps
}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">{description}</Listbox.Label>
          <div className="relative w-full mt-1">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                <div className="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium font-hind">
                    {selected.title}
                  </p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-purple-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10">
                  <span className="sr-only">{description}</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-blue-gray-200 ring-1 ring-blue-gray-200 ring-opacity-5 focus:outline-none">
                {selectOptions.map(option => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'text-white bg-purple-500'
                          : 'text-blue-gray-800',
                        'cursor-default select-none relative p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <SelectOption
                        selected={selected}
                        title={option.title}
                        active={active}
                        description={option.description}
                      />
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Select
