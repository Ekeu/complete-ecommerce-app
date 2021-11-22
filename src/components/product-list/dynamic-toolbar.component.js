import React from 'react'
import { Disclosure } from '@headlessui/react'
import { FilterIcon } from '@heroicons/react/solid'

import FilterContainer from './filter-container.component'
import DescriptionContainer from './description-container.component'
import AlgoliaSearchBox from '../algolia/algolia-search-box.component'
import AlgoliaRefinementList from '../algolia/algolia-refinement-list.component'
import AlgoliaSortBy from '../algolia/algolia-sort-by.component'
import AlgoliaCurrentRefinements from '../algolia/algolia-current-refinements.component'
import AlgoliaClearRefinements from '../algolia/algolia-clear-refinements.component'

const DynamicToolbar = ({ name, description, location }) => {
  return (
    <>
      {location.pathname !== '/search' && (
        <>
          <DescriptionContainer name={name} description={description} />
          <AlgoliaSearchBox />
        </>
      )}
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
                <AlgoliaCurrentRefinements />
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <AlgoliaClearRefinements />
            </div>
          </div>
        </div>
        <Disclosure.Panel
          unmount={false}
          className="border-t border-blue-gray-200 py-10"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <FilterContainer>
              <AlgoliaRefinementList
                label={'Color'}
                attribute={'color'}
                isColor
              />
              <AlgoliaRefinementList label={'Gender'} attribute={'gender'} />
            </FilterContainer>
            <FilterContainer>
              <AlgoliaRefinementList label={'Size'} attribute={'size'} />
              <AlgoliaRefinementList label={'Style'} attribute={'style'} />
            </FilterContainer>
          </div>
        </Disclosure.Panel>
        <AlgoliaSortBy
          items={[
            { value: 'const_variant', label: 'Rating' },
            { value: 'const_variant_date_desc', label: 'Newest' },
            { value: 'const_variant_date_asc', label: 'Oldest' },
            { value: 'const_variant_price_asc', label: 'Price: Low to High' },
            {
              value: 'const_variant_price_desc',
              label: 'Price: High to Low',
            },
          ]}
          defaultRefinement={'const_variant'}
        />
      </Disclosure>
    </>
  )
}

export default DynamicToolbar
