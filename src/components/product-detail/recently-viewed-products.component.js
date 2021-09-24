import React from 'react'

import RecentlyViewedProductCard from '../cards/recently-viewed-product-card.component'

import { hasGender } from '../../utils/product'

const RecentlyViewedProducts = ({ products }) => {
  return (
    <>
      {products && (
        <section
          aria-labelledby="related-heading"
          className="mt-10 border-t border-blue-gray-200 py-16 px-4 sm:px-0"
        >
          <h2
            id="related-heading"
            className="text-xl font-bold font-hind text-blue-gray-800"
          >
            Recently viewed products
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map(product => (
              <RecentlyViewedProductCard
                key={product.node.variants[product.selectedVariant].id}
                product={product}
                variant={product.node.variants[product.selectedVariant]}
                hasGender={hasGender(product)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default RecentlyViewedProducts
