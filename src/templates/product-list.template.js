import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/layout.component'
import DynamicToolbar from '../components/product-list/dynamic-toolbar.component'
import LisOfProducts from '../components/product-list/list-of-products.component'
import Pagination from '../components/pagination/pagination.component'

const ProductList = ({ data, pageContext }) => {
  const [page, setPage] = useState(1)
  const [reset, setReset] = useState(false)
  const [filterOptions, setFilterOptions] = useState(pageContext.filterOptions)
  const productsPerPage = 8

  let productsContent = []
  let isFiltered = false
  let activeFilters = {}
  let filteredProducts = []

  data.products.edges.map((product, index) =>
    product.node.variants.map(variant =>
      productsContent.push({ product: index, variant })
    )
  )

  Object.keys(filterOptions)
    .filter(option => filterOptions[option] !== null)
    .map(option => {
      filterOptions[option].forEach(value => {
        if (value.checked) {
          isFiltered = true
          if (activeFilters[option] === undefined) {
            activeFilters[option] = []
          }
          if (!activeFilters[option].includes(value)) {
            activeFilters[option].push(value)
          }
          productsContent.forEach(item => {
            if (option === 'Color') {
              if (
                item.variant.colorLabel === value.label.toLowerCase() &&
                !filteredProducts.includes(item)
              ) {
                filteredProducts.push(item)
              }
            } else if (
              item.variant[option.toLowerCase()] === value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item)
            }
          })
        }
      })
    })

  Object.keys(activeFilters).forEach(filter => {
    filteredProducts = filteredProducts.filter(item => {
      let validFilteredProduct

      activeFilters[filter].some(filterValue => {
        if (filter === 'Color') {
          if (item.variant.colorLabel === filterValue.label.toLowerCase()) {
            validFilteredProduct = item
          }
        } else if (item.variant[filter.toLowerCase()] === filterValue.label) {
          validFilteredProduct = item
        }
      })

      return validFilteredProduct
    })
  })

  if (isFiltered) {
    productsContent = filteredProducts
  }

  const numberOfPages = Math.ceil(productsContent.length / productsPerPage)

  useEffect(() => {
    if (page > 1) {
      setPage(1)
      setReset(true)
    }
  }, [filterOptions])

  return (
    <Layout>
      <main className="pb-24">
        {JSON.stringify(page)}
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
          productsContent={productsContent}
        />
        <Pagination
          pageCount={numberOfPages}
          pageRangeDisplayed={1}
          forcePage={reset && 0}
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
