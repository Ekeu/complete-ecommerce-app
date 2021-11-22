import React, { Fragment, useContext } from 'react'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import AlgoliaAutocomplete from '../algolia/algolia-autocomplete.component'
import insightsClient from 'search-insights'
import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'

import AlgoliaProductItem from '../algolia/algolia-product-item.component'
import { CartContext, FeedbackContext, UserContext } from '../../contexts'
import { navigate } from 'gatsby-link'
import { createSlug } from '../../utils/functions'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

insightsClient('init', {
  appId: process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  apiKey: process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY,
  useCookie: true,
})

const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient })

const querySuggestionsPLugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'const_variant_query_suggestions',
  getSearchParams() {
    return {
      hitsPerPage: 5,
    }
  },
})

const Search = () => {
  const { user } = useContext(UserContext)
  const { cart, dispatch } = useContext(CartContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)
  return (
    <>
      <AlgoliaAutocomplete
        openOnFocus={true}
        placeholder={'Search Adidas...'}
        classNames={{
          form: '!border !border-transparent !bg-gray-100 !rounded-md !leading-5 focus-within:!shadow-none focus-within:!outline-none',
          submitButton: '!text-purple-500',
          root: '!text-blue-gray-800 !sm:text-sm !font-hind !leading-5',
          panel: '!z-10',
          panelLayout:
            'scrollbar-w-2 scrollbar-track-blue-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-blue-gray scrolling-touch',
        }}
        defaultActiveItemId={0}
        plugins={[algoliaInsightsPlugin, querySuggestionsPLugin]}
        getSources={({ query, state }) => {
          if (!query) {
            return []
          }

          return [
            {
              sourceId: 'products',
              getItemUrl({ item }) {
                return `/${item?.product?.category?.name?.toLowerCase()}/${createSlug(
                  item?.product?.name
                )}?gender=${item?.gender}`
              },
              getItems() {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'const_variant',
                      query,
                      params: {
                        clickAnalytics: true,
                        hitsPerPage: 6,
                        attributesToSnippet: ['product.name'],
                        attributesToHighlight: ['product.name'],
                        snippetEllipsisText: '...',
                      },
                    },
                  ],
                  transformResponse({ hits }) {
                    const index = searchClient.initIndex('const_category')
                    const hitArr = hits[0]
                    const newHits = hitArr.map(hit => {
                      index
                        .search('', {
                          filters: `objectID:${hit?.product?.category}`,
                        })
                        .then(res => {
                          hit.product.category = res.hits[0]
                        })
                      return hit
                    })
                    return [newHits]
                  },
                })
              },
              templates: {
                header() {
                  return (
                    <Fragment>
                      <span className="aa-SourceHeaderTitle font-hind !text-purple-600">
                        Products
                      </span>
                      <div className="aa-SourceHeaderLine !border !border-purple-400" />
                    </Fragment>
                  )
                },
                item({ item, components }) {
                  return (
                    <AlgoliaProductItem
                      hit={item}
                      user={user}
                      cart={cart}
                      dispatchFeedback={dispatchFeedback}
                      dispatch={dispatch}
                      components={components}
                      insights={state.context.algoliaInsightsPlugin.insights}
                    />
                  )
                },
                noResults() {
                  return 'No products for this query.'
                },
              },
            },
          ]
        }}
      />
    </>
  )
}

export default Search
