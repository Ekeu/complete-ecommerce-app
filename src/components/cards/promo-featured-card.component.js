import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { currencyFormatter } from '../../utils/functions'

import Rating from '../rating/rating.component'

const PromoFeaturedCard = ({
  imageSrc,
  imageAlt,
  name,
  style,
  price,
  rating,
  imageContainerStyles,
}) => {
  return (
    <>
      <div
        className={`${imageContainerStyles} rounded-lg overflow-hidden group-hover:opacity-75`}
      >
        <GatsbyImage
          image={imageSrc}
          alt={imageAlt}
          className={'w-full h-full object-center object-cover'}
          objectFit="cover"
        />
      </div>
      <h3
        className={'mt-4 text-base font-semibold font-hind text-blue-gray-800'}
      >
        {name}
      </h3>
      <Rating rating={rating} productId={name} customStyles={'mt-1'} />
      <p className={'mt-3 font-osans text-sm text-blue-gray-500'}>
        {style || currencyFormatter(price)}
      </p>
    </>
  )
}

export default PromoFeaturedCard
