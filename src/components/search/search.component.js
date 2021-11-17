import React, { Fragment } from 'react'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import AlgoliaAutocomplete from '../algolia/algolia-autocomplete.component'
import insightsClient from 'search-insights'
import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import { currencyFormatter } from '../../utils/functions'

import Rating from '../rating/rating.component'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

insightsClient('init', {
  appId: process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  apiKey: process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY,
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

function ProductItem({ hit, insights, components }) {
  return (
    <span className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop !rounded-lg !border !border-none">
          <img
            src={process.env.GATSBY_STRAPI_URL + hit?.images[0].url}
            alt={hit?.product.name}
            width="40"
            height="40"
            className={'!object-center !object-cover !p-0'}
          />
        </div>
        <div className="aa-ItemContentBody">
          <div className="flex-auto space-y-0 text-sm">
            <h4 className="font-medium font-hind text-blue-gray-800 text-base">
              <components.Snippet hit={hit} attribute={['product', 'name']} />
            </h4>
            <p className={'font-hind text-blue-gray-800'}>{hit?.style}</p>
            <Rating
              rating={hit?.product.rating || 0}
              productId={hit?.product.name}
              customStyles={'!mb-2'}
            />
            <p className={'font-hind text-blue-gray-800'}>
              {currencyFormatter(hit?.price)}
            </p>
          </div>
        </div>
      </div>
      <div className="aa-ItemActions">
        <button
          className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
          type="button"
          title="Select"
          style={{ pointerEvents: 'none' }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
          </svg>
        </button>
        <button
          className="aa-ItemActionButton"
          type="button"
          title="Add to cart"
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()

            insights.convertedObjectIDsAfterSearch({
              eventName: 'Added to cart',
              index: hit.__autocomplete_indexName,
              objectIDs: [hit?.objectID],
              queryID: hit.__autocomplete_queryID,
            })
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19 5h-14l1.5-2h11zM21.794 5.392l-2.994-3.992c-0.196-0.261-0.494-0.399-0.8-0.4h-12c-0.326 0-0.616 0.156-0.8 0.4l-2.994 3.992c-0.043 0.056-0.081 0.117-0.111 0.182-0.065 0.137-0.096 0.283-0.095 0.426v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.219-0.071-0.422-0.189-0.585-0.004-0.005-0.007-0.010-0.011-0.015zM4 7h16v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707zM15 10c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121c0-0.552-0.448-1-1-1s-1 0.448-1 1c0 1.38 0.561 2.632 1.464 3.536s2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536c0-0.552-0.448-1-1-1s-1 0.448-1 1z" />
          </svg>
        </button>
      </div>
    </span>
  )
}

const Search = () => {
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
                    <ProductItem
                      hit={item}
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
