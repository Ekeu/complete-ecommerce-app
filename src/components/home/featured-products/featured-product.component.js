import React from 'react'

import PromoFeaturedCard from '../../cards/promo-featured-card.component'

const FeaturedProduct = ({ product }) => {
  return (
    <div className="group relative">
      <PromoFeaturedCard
        imageSrc={product.imageSrc}
        imageAlt={product.imageAlt}
        name={product.name}
        price={product.price}
        imageContainerStyles={
          'w-full h-96 sm:h-auto sm:aspect-w-2 sm:aspect-h-3'
        }
        rating={4}
      />
    </div>
  )
}

export default FeaturedProduct
