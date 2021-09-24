import React, { useState, useEffect } from 'react'

import { currencyFormatter } from '../../utils/functions'
import { colorIndex } from '../../utils/product'

import ProductActionButtons from './product-action-buttons.component'
import ProductReviews from '../product/product-reviews.component'
import ProductColors from '../product/product-colors.component'
import ProductSizes from '../product/product-sizes.component'
import ProductDetails from './product-details.component'

const ProductInfo = ({
  name,
  description,
  variants,
  specifications,
  selectedVariant,
  setSelectedVariant,
}) => {
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)

  const imageIndex = colorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  )

  const sizes = []
  const colors = []

  variants.forEach(item => {
    if (item.gender === variants[selectedVariant].gender) {
      sizes.push({ name: item.size, inStock: true })
      if (!colors.includes(item.color)) {
        colors.push(item.color)
      }
    }
  })

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex])

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

      <ProductReviews productRating={4} productName={name}>
        <div aria-hidden={'true'} className={'ml-4 text-sm text-blue-gray-300'}>
          ·
        </div>
        <div className={'ml-4 flex'}>
          <span
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
          />
        </div>
      </div>
      <ProductActionButtons />
      <ProductDetails details={specifications.details} />
    </>
  )
}

export default ProductInfo
