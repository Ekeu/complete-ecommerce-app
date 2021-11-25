import React from 'react'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

import { classNames } from '../../utils/functions'

const ProductImageTab = ({ image, selected }) => {
  const gatsByImage = getImage(image.localFile)
  return (
    <>
      <span className="absolute inset-0 rounded-md overflow-hidden">
        <GatsbyImage
          image={gatsByImage}
          alt={`image_tab`}
          className="w-full h-full object-center object-cover"
          objectFit="cover"
        />
      </span>
      <span
        className={classNames(
          selected ? 'ring-purple-500' : 'ring-transparent',
          'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
        )}
        aria-hidden="true"
      />
    </>
  )
}

export default ProductImageTab
