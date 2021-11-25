import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@apollo/client'

import PromoFeaturedCard from '../../cards/promo-featured-card.component'
import { GET_INVENTORY_DETAILS } from '../../../apollo/queries'

const FeaturedProduct = ({ product }) => {
  const [rating, setRating] = useState(0)
  const { data } = useQuery(GET_INVENTORY_DETAILS, {
    variables: {
      id: product.key,
    },
  })

  useEffect(() => {
    if (data) {
      setRating(data.product.rating ? data.product.rating : 0)
    }
  }, [data])
  return (
    <Link to={product.href} className="group relative">
      <PromoFeaturedCard
        imageSrc={product.imageSrc}
        imageAlt={product.imageAlt}
        name={product.name}
        price={product.price}
        imageContainerStyles={'w-full h-96 sm:h-auto'}
        rating={rating}
      />
    </Link>
  )
}

export default FeaturedProduct
