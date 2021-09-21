import React from 'react'

import ListOfProductsGrid from './list-of-products-grid.component'
import ProductCard from '../cards/product-card.component'

const LisOfProducts = ({ products, page, filterOptions, productsPerPage }) => {
  let productsContent = []
  let isFiltered = false
  let activeFilters = {}
  let filteredProducts = []

  products.map((product, index) =>
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

  return (
    <ListOfProductsGrid>
      {productsContent
        .slice((page - 1) * productsPerPage, page * productsPerPage)
        .map(item => (
          <ProductCard
            key={item.variant.id}
            product={products[item.product]}
            variant={item.variant}
          />
        ))}
    </ListOfProductsGrid>
  )
}

export default LisOfProducts
