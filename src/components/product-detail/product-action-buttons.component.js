import React, { useContext } from 'react'
import { HeartIcon, CalendarIcon } from '@heroicons/react/outline'

import { CartContext } from '../../contexts'
import { addToCart } from '../../contexts/actions'

import CustomButton from '../custom-button/custom-button.component'

const ProductActionButtons = (
  stock,
  variants,
  selectedVariant,
  productName
) => {
  const { cart, dispatch } = useContext(CartContext)

  const handleAddToCart = () => {
    dispatch(
      addToCart(
        variants[selectedVariant],
        1,
        productName,
        stock[selectedVariant].quantity
      )
    )
  }
  return (
    <div className={'mt-6'}>
      <div className={'mt-10 flex sm:flex-col1'}>
        <CustomButton
          type={'button'}
          customStyles={
            'max-w-xs flex-1 bg-purple-600 border-transparent py-3 px-8 flex text-white hover:bg-purple-700 sm:w-full'
          }
        >
          Add to cart
        </CustomButton>

        <CustomButton
          type={'button'}
          customStyles={
            'ml-4 py-3 px-3 flex items-center text-blue-gray-400 hover:bg-blue-gray-100 hover:text-blue-gray-500'
          }
        >
          <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
          <span className="sr-only">Add to favorites</span>
        </CustomButton>
        <CustomButton
          type={'button'}
          customStyles={
            'ml-4 py-3 px-3 flex items-center text-blue-gray-400 hover:bg-blue-gray-100 hover:text-blue-gray-500'
          }
        >
          <CalendarIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
          <span className="sr-only">Subscribe</span>
        </CustomButton>
      </div>
    </div>
  )
}

export default ProductActionButtons
