import React from 'react'
import { Disclosure } from '@headlessui/react'
import { FilterIcon } from '@heroicons/react/solid'

import Filter from './filter.component'
import FilterContainer from './filter-container.component'
import Sort from './sort.component'
import DescriptionContainer from './description-container.component'

const sortOptions = [
  { name: 'A-Z', href: '#', current: true },
  { name: 'Z-A', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Oldest', href: '#', current: false },
  { name: 'Reviews', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const DynamicToolbar = ({
  filterOptions,
  setFilterOptions,
  name,
  description,
}) => {
  return (
    <>
      <DescriptionContainer name={name} description={description} />
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="relative z-10 border-t border-b border-blue-gray-200 grid items-center"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm font-hind px-4 sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button className="group text-blue-gray-700 font-medium flex items-center">
                <FilterIcon
                  className="flex-none w-5 h-5 mr-2 text-blue-gray-400 group-hover:text-blue-gray-500"
                  aria-hidden="true"
                />
                2 Filters
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button type="button" className="text-blue-gray-500">
                Clear all
              </button>
            </div>
          </div>
        </div>
        <Disclosure.Panel className="border-t border-blue-gray-200 py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <FilterContainer>
              <Filter
                name={'Color'}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
              />
              <Filter
                name={'Gender'}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
              />
            </FilterContainer>
            <FilterContainer>
              <Filter
                name={'Size'}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
              />
              <Filter
                name={'Style'}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
              />
            </FilterContainer>
          </div>
        </Disclosure.Panel>
        <Sort sortOptions={sortOptions} />
      </Disclosure>
    </>
  )
}

export default DynamicToolbar
