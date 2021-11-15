import React from 'react'
import { EMPTY_QUERY_RESULTS } from '../../constants/products.constants'

const AlgoliaEmptyQueryResult = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto py-10 xl:py-24 text-center">
        {EMPTY_QUERY_RESULTS}
        <h3 className="my-6 text-2xl font-medium font-hind text-blue-gray-800">
          We are sorry but there are no results for your search.
        </h3>
        <p className="text-blue-gray-600 font-hind">
          Please try something else.
        </p>
      </div>
    </div>
  )
}

export default AlgoliaEmptyQueryResult
