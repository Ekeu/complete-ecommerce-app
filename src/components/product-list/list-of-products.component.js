import React from 'react'

import ListOfProductsGrid from './list-of-products-grid.component'
import ProductCard from '../cards/product-card.component'

const LisOfProducts = ({ products, productsContent, page, productsPerPage }) => {

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
