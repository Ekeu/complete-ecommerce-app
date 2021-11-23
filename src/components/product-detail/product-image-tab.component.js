import React from 'react'

import { classNames } from '../../utils/functions'

const ProductImageTab = ({ image, selected }) => {
  return (
    <>
      <span className="sr-only">{image.name}</span>
      <span className="absolute inset-0 rounded-md overflow-hidden">
        <img
          src={image.url}
          alt={image.alternativeText || image.name}
          className="w-full h-full object-center object-cover"
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
