import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Highlight } from 'react-instantsearch-dom'
import { currencyFormatter } from '../../utils/functions'
import Rating from '../rating/rating.component'
import QuickView from '../product-list/quick-view.component'
import { GET_INVENTORY_DETAILS, GET_REVIEWS } from '../../apollo/queries'

const ProductCard = ({ product, variant, hit }) => {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviews, setReviews] = useState(0)
  const imageURL = variant.images[0].url
  const productName = product.node.name

  const { data } = useQuery(GET_INVENTORY_DETAILS, {
    variables: {
      id: product.node.strapiId,
    },
  })

  const { data: dataReviews } = useQuery(GET_REVIEWS, {
    variables: {
      id: product.node.strapiId,
    },
  })

  useEffect(() => {
    if (data) {
      setRating(data.product.rating ? data.product.rating : 0)
    }
  }, [data])

  useEffect(() => {
    if (dataReviews) {
      setReviews(dataReviews.product.reviews)
    }
  }, [dataReviews])
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
            src={variant.images[0].url}
            alt={productName}
            className={'w-full h-full object-center object-cover'}
          />
        </div>
        <div className={'pt-10 pb-4 text-center cursor-pointer'}>
          <h3 className={'text-sm font-medium font-hind text-blue-gray-800'}>
            <div className={'cursor-pointer'}>
              <span aria-hidden={'true'} className={'absolute inset-0'} />
              <Highlight hit={hit} attribute={'product.name'} />
            </div>
          </h3>
          <div className="mt-3 flex flex-col items-center">
            <p className="sr-only">{rating} out of 5 stars</p>
            <Rating
              rating={rating}
              productId={productName}
              customStyles={'mt-1'}
            />
            <p className="mt-1 text-sm text-blue-gray-500">
              {reviews.length} reviews
            </p>
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
        productRating={rating}
        product={product}
        variant={variant}
      />
    </>
  )
}

export default ProductCard
