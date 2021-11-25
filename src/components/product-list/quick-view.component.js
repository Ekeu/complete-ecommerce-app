import React, { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useQuery } from '@apollo/client'

import { GET_INVENTORY_DETAILS } from '../../apollo/queries'

import QuickViewProductCard from '../cards/quick-view-product-card.component'

import { hasGender } from '../../utils/product'
import Modal from '../modal/modal.component'

const QuickView = ({
  open,
  setOpen,
  imageURL,
  imageALT,
  productName,
  productPrice,
  productRating,
  product,
  variant,
}) => {
  const productSizes = []
  const productColors = []

  const [selectedSize, setSelectedSize] = useState(variant.size)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [stock, setStock] = useState(null)

  const { error, data } = useQuery(GET_INVENTORY_DETAILS, {
    variables: { id: product.node.strapiId },
  })

  product.node.variants?.forEach(item => {
    if (item.gender === variant.gender) {
      productSizes.push(item.size)
      if (!productColors.includes(item.color) && item.size === selectedSize) {
        productColors.push(item.color)
      }
    }
  })

  useEffect(() => {
    if (error) {
      console.error(error)
      setStock(-1)
    } else if (data) {
      setStock(data.product.variants)
    }
  }, [error, data])

  useEffect(() => {
    setSelectedColor(null)
    const newVariant = product.node.variants?.find(
      item =>
        item.size === selectedSize &&
        item.gender === variant.gender &&
        item.color === productColors[0]
    )
    setSelectedVariant(newVariant)
  }, [selectedSize])

  return (
    <Modal modalOpen={open} setModalOpen={setOpen}>
      <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
        <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <button
            type="button"
            className="absolute top-4 right-4 text-blue-gray-400 hover:text-blue-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:items-center lg:gap-x-8">
            <QuickViewProductCard
              imageURL={imageURL}
              imageALT={imageALT}
              productName={productName}
              productPrice={productPrice}
              productRating={productRating}
              productSizes={productSizes}
              productColors={productColors}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              product={product}
              variant={selectedVariant || variant}
              stock={stock}
              hasGender={hasGender(product)}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default QuickView
