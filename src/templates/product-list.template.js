import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/layout.component'
import DynamicToolbar from '../components/product-list/dynamic-toolbar.component'
import LisOfProducts from '../components/product-list/list-of-products.component'
import Pagination from '../components/pagination/pagination.component'

import { alphabetical, time, price } from '../utils/sort'

const ProductList = ({ data, pageContext }) => {
  const [page, setPage] = useState(1)
  const [reset, setReset] = useState(false)
  const [isFiltered, setIsFiltered] = useState(false)
  const [activeFilters, setActiveFilters] = useState({})
  const [filteredProducts, setFilteredProducts] = useState([])
  const [productsContent, setProductsContent] = useState([])
  const [filterOptions, setFilterOptions] = useState(pageContext.filterOptions)
  const [sortOptions, setSortOptions] = useState([
    { name: 'A-Z', current: true, sort: data => alphabetical(data, 'asc') },
    {
      name: 'Z-A',
      current: false,
      sort: data => alphabetical(data, 'desc'),
    },
    { name: 'Newest', current: false, sort: data => time(data, 'asc') },
    { name: 'Oldest', current: false, sort: data => time(data, 'desc') },
    { name: 'Reviews', current: false, sort: data => data },
    {
      name: 'Price: Low to High',
      current: false,
      sort: data => price(data, 'asc'),
    },
    {
      name: 'Price: High to Low',
      current: false,
      sort: data => price(data, 'desc'),
    },
  ])

  useEffect(() => {
    const selectedSortOption = sortOptions.filter(
      sortOption => sortOption.current
    )[0]
    const sortedProducts = selectedSortOption.sort(data.products.edges)
    const prvProductsContent = []
    sortedProducts.map((product, index) =>
      product.node.variants.map(variant =>
        prvProductsContent.push({ product: index, variant })
      )
    )
    setProductsContent(prvProductsContent)
  }, [data.products.edges, sortOptions])

  useEffect(() => {
    if (page > 1) {
      setPage(1)
      setReset(true)
    }

    let prvActiveFilters = {}
    let prvFilteredProducts = []

    setIsFiltered(false)

    Object.keys(filterOptions)
      .filter(option => filterOptions[option] !== null)
      .map(option => {
        filterOptions[option].forEach(value => {
          if (value.checked) {
            setIsFiltered(true)
            if (prvActiveFilters[option] === undefined) {
              prvActiveFilters[option] = []
            }
            if (!prvActiveFilters[option].includes(value)) {
              prvActiveFilters[option].push(value)
            }
            productsContent.forEach(item => {
              if (option === 'Color') {
                if (
                  item.variant.colorLabel === value.label.toLowerCase() &&
                  !prvFilteredProducts.includes(item)
                ) {
                  prvFilteredProducts.push(item)
                }
              } else if (
                item.variant[option.toLowerCase()] === value.label &&
                !prvFilteredProducts.includes(item)
              ) {
                prvFilteredProducts.push(item)
              }
            })
          }
        })
      })

    Object.keys(prvActiveFilters).forEach(filter => {
      prvFilteredProducts = prvFilteredProducts.filter(item => {
        let validFilteredProduct

        prvActiveFilters[filter].some(filterValue => {
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

    setActiveFilters(prvActiveFilters)
    setFilteredProducts(prvFilteredProducts)
  }, [filterOptions, productsContent])

  const productsPerPage = 8
  let productsToRender = []

  productsToRender = isFiltered ? filteredProducts : productsContent

  const numberOfPages = Math.ceil(productsToRender.length / productsPerPage)

  return (
    <Layout>
      <main className="pb-24">
        <DynamicToolbar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
          name={pageContext.name}
          description={pageContext.description}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <LisOfProducts
          page={page}
          filterOptions={filterOptions}
          productsPerPage={productsPerPage}
          products={data.products.edges}
          productsContent={productsToRender}
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
