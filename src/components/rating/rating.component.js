import React from 'react'
import StarRatings from 'react-star-ratings'

const Rating = ({ rating, productId, customStyles }) => {
  return (
    <div className={`${customStyles} flex items-center`}>
      <StarRatings
        name={productId}
        numberOfStars={5}
        starDimension="16px"
        starSpacing="3px"
        starHoverColor="#D8B4FE"
        starEmptyColor="#94A3B8"
        starRatedColor="#A855F7"
        rating={rating}
        isSelectable={false}
      />
    </div>
  )
}

export default Rating
