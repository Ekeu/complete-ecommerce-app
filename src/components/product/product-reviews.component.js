import React from 'react'

import Rating from '../rating/rating.component'

const ProductReviews = ({ productRating, productName, children }) => {
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
        {children}
      </div>
    </div>
  )
}

export default ProductReviews
