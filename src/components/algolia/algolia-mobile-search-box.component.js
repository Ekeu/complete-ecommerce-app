import React from 'react'
import {
  connectSearchBox,
  PoweredBy,
  VoiceSearch,
} from 'react-instantsearch-dom'
import { Image } from 'cloudinary-react'

import { POWEREDBY_URL, SEARCH_ICON } from '../../constants/search.constants'

const SearchBox = ({ currentRefinement, refine }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-4 sm:px-6 pb-10 pt-10 sm:pt-0 lg:px-8 mobile-sb">
        <div className="h-16 px-2 rounded-md flex items-center bg-blue-gray-100 lg:px-8 lg:h-20">
          <button
            className="p-0 appearance-none border-0 bg-transparent cursor-pointer"
            aria-label="Start searching"
          >
            {SEARCH_ICON}
          </button>
          <input
            value={currentRefinement}
            placeholder="Search Adidas..."
            onChange={e => refine(e.currentTarget.value)}
            className="px-4 bg-transparent flex-grow text-blue-gray-800 font-osans appearance-none border-0 text-base lg:text-2xl outline-none placeholder-blue-gray-400"
          />
          <VoiceSearch />
          <PoweredBy
            className={'text-sm text-purple-500 space-x-2 !hidden  sm:!flex'}
          />
          <a
            href={POWEREDBY_URL}
            target="_blank"
            aria-label="Algolia"
            rel="noopener noreferrer"
            className={'flex-shrink-0 w-5 h-5 block sm:hidden'}
          >
            <Image
              alt={'Algolia Logo'}
              cloudName="dmcookpro"
              publicId={'adidas-ecom/algolia-blue-mark'}
              loading="lazy"
              width="20px"
              height="20px"
            ></Image>
          </a>
        </div>
      </div>
    </div>
  )
}

const AlgoliaMobileSearchBox = connectSearchBox(SearchBox)

export default AlgoliaMobileSearchBox
