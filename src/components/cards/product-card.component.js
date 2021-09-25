import React, { useState } from 'react'

import { currencyFormatter } from '../../utils/functions'
import Rating from '../rating/rating.component'
import QuickView from '../product-list/quick-view.component'

const ProductCard = ({ product, variant }) => {
  const [open, setOpen] = useState(false)

  const imageURL = process.env.GATSBY_STRAPI_URL + variant.images[0].url
  const productName = product.node.name
  return (
    <>
      <div
        className={
          'group relative p-4 border-r border-b border-blue-gray-200 sm:p-6'
        }
        onClick={() => setOpen(true)}
      >
        <div
          className={
            'rounded-lg overflow-hidden bg-blue-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75'
          }
        >
          <img
            src={process.env.GATSBY_STRAPI_URL + variant.images[0].url}
            alt={productName}
            className={'w-full h-full object-center object-cover'}
          />
        </div>
        <div className={'pt-10 pb-4 text-center cursor-pointer'}>
          <h3 className={'text-sm font-medium font-hind text-blue-gray-800'}>
            <div className={'cursor-pointer'}>
              <span aria-hidden={'true'} className={'absolute inset-0'} />
              {productName}
            </div>
          </h3>
          <div className="mt-3 flex flex-col items-center">
            <p className="sr-only">4 out of 5 stars</p>
            <Rating rating={4} productId={productName} customStyles={'mt-1'} />
            <p className="mt-1 text-sm text-blue-gray-500">4 reviews</p>
          </div>
          <p className="mt-4 text-base font-medium text-blue-gray-900">
            {currencyFormatter(variant.price)}
          </p>
        </div>
      </div>
      <QuickView
        open={open}
        setOpen={setOpen}
        imageURL={imageURL}
        imageALT={productName}
        productName={productName}
        productPrice={variant.price}
        productRating={4}
        product={product}
        variant={variant}
      />
    </>
  )
}

export default ProductCard
