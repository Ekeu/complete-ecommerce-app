import React from 'react'
import { graphql } from 'gatsby'
import algoliasearch from 'algoliasearch'
import { InstantSearch, Pagination } from 'react-instantsearch-dom'
import { Configure } from 'react-instantsearch-dom'

import Layout from '../components/layout/layout.component'
import DynamicToolbar from '../components/product-list/dynamic-toolbar.component'

import AlgoliaHits from '../components/algolia/algolia-hits.component'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const ProductList = ({ data, pageContext, location }) => {
  const searchParameters = {
    filters: `product.category:${pageContext?.id}`,
    clickAnalytics: true,
    hitsPerPage: 8,
  }

  return (
    <Layout>
      <main className="pb-24">
        <InstantSearch searchClient={searchClient} indexName="const_variant">
          <Configure {...searchParameters} />
          <DynamicToolbar
            location={location}
            name={pageContext.name}
            description={pageContext.description}
          />
          <AlgoliaHits products={data.products.edges} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-hind flex justify-center">
            <Pagination />
          </div>
        </InstantSearch>
      </main>
    </Layout>
  )
}

export default ProductList

export const query = graphql`
  query GetCategoryProducts($id: String!) {
    products: allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          name
          createdAt
          category {
            name
          }
          variants {
            color
            id
            price
            size
            style
            colorLabel
            gender
            images {
              url
            }
          }
        }
      }
    }
  }
`
