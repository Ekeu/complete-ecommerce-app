import React from 'react'

import FeaturedProduct from './featured-product.component'

const FeaturedProductsDisplay = ({ featuredProducts }) => {
  return (
    <section aria-labelledby="favorites-heading">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2
            id="favorites-heading"
            className="text-2xl font-hind font-extrabold tracking-tight text-blue-gray-800"
          >
            Trending Products
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
          {featuredProducts.map((product) => (
            <FeaturedProduct product={product} key={product.key} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProductsDisplay
