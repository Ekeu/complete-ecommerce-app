import React from 'react'
import { SearchBox, VoiceSearch, PoweredBy } from 'react-instantsearch-dom'

const AlgoliaSearchBox = () => {
  return (
    <div className="mb-4 mx-auto max-w-md px-4 sm:max-w-lg sm:px-6 lg:px-8 lg:max-w-7xl">
      <div className="transition duration-150 ease-in delay-0 rounded-sm mb-2 relative py-2 acsb">
        <div className="w-full">
          <div className="relative flex items-center p-4 h-16 rounded-lg bg-white shadow-md">
            <div className="relative flex-grow">
              <SearchBox />
            </div>
            <span className="hidden lg:block">
              <PoweredBy />
            </span>
            <VoiceSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlgoliaSearchBox
