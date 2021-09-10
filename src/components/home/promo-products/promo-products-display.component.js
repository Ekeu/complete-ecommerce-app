import React from 'react'

import PromoProduct from './promo-product.component'

const PromoProductsDisplay = ({ promoProducts }) => {
  return (
    <div className="bg-white">
      <div className="max-w-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-hind font-extrabold tracking-tight text-blue-gray-800">
          Check our New Products
        </h2>
        <p className="mt-4 font-osans text-base text-blue-gray-500">
          Each season, we collaborate with world-class designers to create a
          collection inspired by the natural world.
        </p>

        <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {promoProducts.map(product => (
            <PromoProduct product={product} key={product.key} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromoProductsDisplay
