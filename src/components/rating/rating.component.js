import React from 'react'
import StarRatings from 'react-star-ratings'

const Rating = ({
  rating,
  productId,
  customStyles,
  changeRating,
  isAggregateRating = true,
  isSelectable = false,
}) => {
  return (
    <div className={`${customStyles} flex items-center`}>
      <StarRatings
        name={productId}
        numberOfStars={5}
        starDimension="16px"
        starSpacing="1px"
        starHoverColor="#D8B4FE"
        starEmptyColor="#94A3B8"
        starRatedColor="#A855F7"
        rating={rating}
        isSelectable={isSelectable}
        svgIconPath="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        svgIconViewBox="0 0 20 20"
        isAggregateRating={isAggregateRating}
        changeRating={changeRating}
      />
    </div>
  )
}

export default Rating
