import React from 'react'

import Rating from '../rating/rating.component'

const ProductReviews = ({ productRating, productName }) => {
  return (
    <div className="mt-4">
      <h4 className="sr-only">Reviews</h4>
      <div className="flex items-center">
        <p className="text-sm font-osans text-blue-gray-700">
          {productRating}
          <span className="sr-only"> out of 5 stars</span>
        </p>
        <Rating
          rating={productRating}
          productId={productName}
          customStyles={'ml-1 -mt-1'}
        />
        <div className="hidden ml-4 lg:flex lg:items-center">
          <span className="text-blue-gray-300" aria-hidden="true">
            &middot;
          </span>
          <span className="ml-4 text-sm font-semibold font-osans text-purple-600 hover:text-purple-500">
            12 articles left
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductReviews
