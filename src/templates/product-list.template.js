import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/layout.component'
import DynamicToolbar from '../components/product-list/dynamic-toolbar.component'
import LisOfProducts from '../components/product-list/list-of-products.component'
import Pagination from '../components/pagination/pagination.component'

const ProductList = ({ data, pageContext }) => {
  const [page, setPage] = useState(1)
  const [filterOptions, setFilterOptions] = useState(pageContext.filterOptions)
  const productsPerPage = 8
  let numberOfVariants = 0

  data.products.edges.map(
    ({ node }) => (numberOfVariants += node.variants.length)
  )

  const numberOfPages = Math.ceil(numberOfVariants / productsPerPage)

  return (
    <Layout>
      <main className="pb-24">
        <DynamicToolbar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          name={pageContext.name}
          description={pageContext.description}
        />
        <LisOfProducts
          page={page}
          filterOptions={filterOptions}
          productsPerPage={productsPerPage}
          products={data.products.edges}
        />
        <Pagination
          pageCount={numberOfPages}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={({ selected }) => setPage(selected + 1)}
        />
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
