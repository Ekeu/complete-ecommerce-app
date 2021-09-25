import React from 'react'
import { Link } from 'gatsby'

import { currencyFormatter, createSlug } from '../../utils/functions'

const RecentlyViewedProductCard = ({ product, variant, hasGender }) => {
  const imageURL = process.env.GATSBY_STRAPI_URL + variant.images[0].url
  const imageALT =
    process.env.GATSBY_STRAPI_URL + variant.images[0].alternativeText
  const productName = product.node.name
  return (
    <div>
      <div className="relative">
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <img
            src={imageURL}
            alt={imageALT || productName}
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium font-hind text-blue-gray-800 truncate">
            {productName}
          </h3>
          <p className="mt-1 text-sm text-blue-gray-500 font-osans">
            {variant.style}
          </p>
        </div>
        <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-blue-gray-600 opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            {currencyFormatter(variant.price)}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to={`/${product.node.category.name.toLowerCase()}/${createSlug(
            product.node.name
          )}${hasGender && `?gender=${variant.gender}`}`}
          className="relative flex bg-blue-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium font-hind text-blue-gray-800 hover:bg-blue-gray-200"
        >
          View product<span className="sr-only">, {productName}</span>
        </Link>
      </div>
    </div>
  )
}

export default RecentlyViewedProductCard
