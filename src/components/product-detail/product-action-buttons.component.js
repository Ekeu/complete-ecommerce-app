import React, { useContext, useEffect, useState } from 'react'
import { CalendarIcon } from '@heroicons/react/outline'

import { CartContext, FeedbackContext } from '../../contexts'
import { addToCart, setSnackbar } from '../../contexts/actions'

import CustomButton from '../custom-button/custom-button.component'
import Favorite from '../favorite/favorite.component'
import { CheckCircleIcon } from '@heroicons/react/solid'
import Subscription from '../subscription/subscription.component'

const ProductActionButtons = ({
  stock,
  variants,
  selectedVariant,
  productName,
}) => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { cart, dispatch } = useContext(CartContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const handleAddToCart = () => {
    setLoading(true)
    const checkVariant = cart.find(
      product => product.variant.id === variants[selectedVariant].id
    )
    if (checkVariant?.quantity >= 10) {
      setLoading(false)
      setSuccess(false)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: 'Limited to 10 item(s) per purchase',
        })
      )
      return
    }
    setLoading(false)
    setSuccess(true)
    dispatch(
      addToCart(
        variants[selectedVariant],
        1,
        productName,
        stock[selectedVariant].quantity
      )
    )
  }

  useEffect(() => {
    let timer
    if (success) {
      timer = setTimeout(() => setSuccess(false), 1500)
    }
    return () => clearTimeout(timer)
  }, [success])

  return (
    <div className={'mt-6'}>
      <div className={'mt-10 flex sm:flex-col1'}>
        <CustomButton
          type={'button'}
          onClick={handleAddToCart}
          loading={loading}
          success={success}
          SuccessIcon={CheckCircleIcon}
          successText={'Product added!'}
          customStyles={
            'max-w-xs flex-1 bg-purple-600 border-transparent py-3 px-8 flex text-white hover:bg-purple-700 sm:w-full'
          }
        >
          Add to cart
        </CustomButton>

        <Favorite
          variant={variants[selectedVariant].id}
          iconClassName={'h-6 w-6'}
          buttonClassName={'ml-4 py-3 px-3 flex'}
          iconLocation={'pDetail'}
        />
        <Subscription
          iconClassName={'h-6 w-6'}
          stockQuantity={stock?.[selectedVariant].quantity}
          variant={variants[selectedVariant]}
          productName={productName}
          buttonClassName={'ml-4 py-3 px-3 flex'}
          iconLocation={'pDetail'}
        />
      </div>
    </div>
  )
}

export default ProductActionButtons
