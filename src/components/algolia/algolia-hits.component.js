import React from 'react'
import { connectHits } from 'react-instantsearch-dom'
import ProductCard from '../cards/product-card.component'

import ListOfProductsGrid from '../product-list/list-of-products-grid.component'
import AlgoliaEmptyQueryResult from './algolia-empty-query-result.component'

const Hits = ({ hits, products }) => {
  return (
    <>
      {hits.length ? (
        <ListOfProductsGrid>
          {hits.map(hit => {
            const product = products?.find(
              product => product?.node.strapiId === hit.product.id
            )
            const hitProduct = {
              node: {
                ...hit.product,
                strapiId: hit.product.id,
                variants: product?.node.variants,
                category: product?.node.category,
              },
            }
            return (
              <ProductCard
                key={hit.id}
                product={hitProduct}
                variant={hit}
                hit={hit}
              />
            )
          })}
        </ListOfProductsGrid>
      ) : (
        <AlgoliaEmptyQueryResult />
      )}
    </>
  )
}

const AlgoliaHits = connectHits(Hits)

export default AlgoliaHits
