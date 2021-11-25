import React from 'react'
import { Link } from 'gatsby'

import PromoFeaturedCard from '../../cards/promo-featured-card.component'

const PromoProduct = ({ product }) => {
  return (
    <Link to={product.href} className="group block">
      <PromoFeaturedCard
        imageSrc={product.imageSrc}
        imageAlt={product.imageAlt}
        name={product.name}
        style={product.style}
      />
    </Link>
  )
}

export default PromoProduct
