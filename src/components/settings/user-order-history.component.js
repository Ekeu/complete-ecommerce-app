import React, { useContext } from 'react'
import { UserContext } from '../../contexts'
import { InstantSearch, Pagination, Configure } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch'
import AlgoliaOrderHits from '../algolia/algolia-order-hits.component'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const UserOrderHistory = () => {
  const { user } = useContext(UserContext)

  const searchParameters = {
    filters: `user.id:${user?.id}`,
    clickAnalytics: true,
    hitsPerPage: 3,
  }

  return (
    <div className="space-y-20">
      <InstantSearch searchClient={searchClient} indexName="const_order">
        <Configure {...searchParameters} />
        <AlgoliaOrderHits />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-hind flex justify-center">
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  )
}

export default UserOrderHistory
