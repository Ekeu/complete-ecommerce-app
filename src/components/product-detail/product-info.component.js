import React, { useState, useEffect, useContext } from 'react'

import { currencyFormatter } from '../../utils/functions'
import { colorIndex } from '../../utils/product'

import ProductActionButtons from './product-action-buttons.component'
import ProductReviews from '../product/product-reviews.component'
import ProductColors from '../product/product-colors.component'
import ProductSizes from '../product/product-sizes.component'
import ProductDetails from './product-details.component'
import { UserContext, FeedbackContext } from '../../contexts'
import { setSnackbar } from '../../contexts/actions'

export const getStockDisplay = (stock, variant) => {
  switch (stock) {
    case undefined:
    case null:
      return 'Loading...'
    case -1:
      return 'Error loading inventory.'
    default:
      if (stock[variant]?.quantity === 0) {
        return 'Out of stock!'
      } else {
        return `${stock[variant]?.quantity} left in stock.`
      }
  }
}

const ProductInfo = ({
  id,
  name,
  stock,
  description,
  variants,
  specifications,
  selectedVariant,
  setSelectedVariant,
  setEdit,
  rating,
}) => {
  const [selectedColor, setSelectedColor] = useState(null)
  const { user } = useContext(UserContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)
  const [selectedSize, setSelectedSize] = useState(
    variants[selectedVariant].size
  )

  const imageIndex = colorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  )

  const sizes = []
  const colors = []

  variants.forEach(variant => {
    if (variant.gender === variants[selectedVariant].gender) {
      sizes.push({ name: variant.size })
      if (!colors.includes(variant.color) && variant.size === selectedSize) {
        colors.push(variant.color)
      }
    }
  })

  const handleEditReview = () => {
    if (user.username === 'Guest') {
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: 'You must be logged in to leave a review',
        })
      )
      return
    }
    setEdit(true)
    const reviewFormRef = document.getElementById('reviews-heading')
    reviewFormRef.scrollIntoView({
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    setSelectedColor(null)
    const newVariant = variants.find(
      variant =>
        variant.size === selectedSize &&
        variant.gender === variants[selectedVariant].gender &&
        variant.color === colors[0]
    )
    setSelectedVariant(variants.indexOf(newVariant))
  }, [selectedSize])

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex])

  const stockDisplay = getStockDisplay(stock, selectedVariant)

  return (
    <>
      <h1 className={'text-3xl font-bold tracking-tight text-blue-gray-800'}>
        {name}
      </h1>

      <div className={'mt-3'}>
        <h2 className={'sr-only'}>Product information</h2>
        <p className={'text-3xl text-blue-gray-800 font-osans'}>
          {currencyFormatter(variants[selectedVariant].price)}
        </p>
      </div>

      <ProductReviews productRating={rating} productName={name}>
        <div aria-hidden={'true'} className={'ml-4 text-sm text-blue-gray-300'}>
          ·
        </div>
        <div className={'ml-4 flex'}>
          <span
            role={'button'}
            onClick={handleEditReview}
            className={
              'text-sm font-medium text-purple-600 hover:text-purple-500'
            }
          >
            Leave a review
          </span>
        </div>
      </ProductReviews>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6">
          <p className={'text-base text-blue-gray-700  font-osans'}>
            {description}
          </p>
        </div>
      </div>

      <div className={'mt-6'}>
        <div>
          <ProductColors
            productColors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <ProductSizes
            productSizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            stockDisplay={stockDisplay}
            quantity={stock && stock[selectedVariant].quantity}
          />
        </div>
      </div>
      <ProductActionButtons
        stock={stock}
        selectedVariant={selectedVariant}
        productName={name}
        productId={id}
        variants={variants}
      />
      <ProductDetails details={specifications.details} />
    </>
  )
}

export default ProductInfo
