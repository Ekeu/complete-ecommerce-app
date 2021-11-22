import React, { useEffect, useState } from 'react'
import { Configure, InstantSearch } from 'react-instantsearch-core'
import algoliasearch from 'algoliasearch'
import { Pagination } from 'react-instantsearch-dom'
import { useQuery } from '@apollo/client'

import Layout from '../components/layout/layout.component'
import AlgoliaMobileSearchBox from '../components/algolia/algolia-mobile-search-box.component'
import { GET_PRODUCTS } from '../apollo/queries'
import AlgoliaHits from '../components/algolia/algolia-hits.component'
import DynamicToolbar from '../components/product-list/dynamic-toolbar.component'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const SearchPage = ({ location }) => {
  const [products, setProducts] = useState(null)
  const { data } = useQuery(GET_PRODUCTS)

  useEffect(() => {
    if (data) {
      const updatedProducts = data.products.map(product => ({
        node: {
          ...product,
          strapiId: product?.id,
        },
      }))
      setProducts(updatedProducts)
    }
  }, [data])

  return (
    <Layout>
      <main className="pb-24">
        <div className="hidden sm:block max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold font-hind tracking-tight text-blue-gray-800">
            How can we help you?
          </h1>
          <p className="mt-4 max-w-xl text-sm text-blue-gray-700 font-osans">
            Search anything. It's our pleasure to make you happy!
          </p>
        </div>

        <InstantSearch searchClient={searchClient} indexName={'const_variant'}>
          <Configure hitsPerPage={8} />
          <AlgoliaMobileSearchBox />
          <DynamicToolbar location={location} />
          <AlgoliaHits products={products} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-hind flex justify-center">
            <Pagination />
          </div>
        </InstantSearch>
      </main>
    </Layout>
  )
}

export default SearchPage
