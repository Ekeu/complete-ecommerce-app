import React, { useState, useContext, useRef } from 'react'
import { CalendarIcon } from '@heroicons/react/solid'

import { CartContext, FeedbackContext, UserContext } from '../../contexts'
import {
  setSnackbar,
  addToCart,
  toggleSubscription,
} from '../../contexts/actions'
import CustomButton from '../custom-button/custom-button.component'
import Modal from '../modal/modal.component'
import ModalContent from '../modal/modal-content.component'
import ModalContentIcon from '../modal/modal-content-icon.component'
import ModalContentText from '../modal/modal-content-text.component'
import ModalActions from '../modal/modal-actions.component'
import FormInput from '../form-input/form-input.component'
import {
  QUANTITY_SUBS_CONFIG,
  SUBS_FREQUENCIES,
} from '../../constants/products.constants'
import { useForm } from 'react-hook-form'

const Subscription = ({
  iconClassName,
  buttonClassName,
  iconLocation,
  stockQuantity,
  variant,
  productName,
  label,
  cartFrequency,
}) => {
  const cancelButtonRef = useRef(null)
  const { user, dispatch } = useContext(UserContext)
  const { cart, dispatch: dispatchCart } = useContext(CartContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)
  const [open, setOpen] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'all',
  })

  let buttonLocationClassName
  let iconLocationClassName

  if (iconLocation === 'pDetail') {
    buttonLocationClassName = 'bg-purple-600 hover:bg-purple-700'
    iconLocationClassName = 'text-white'
  } else {
    buttonLocationClassName = 'bg-transparent'
    iconLocationClassName = 'text-purple-600'
  }

  const onSubmit = handleSubmit(async ({ sub_qty, sub_frq }) => {
    const checkVariant = cart.find(product => product.variant.id === variant.id)
    if (
      checkVariant?.quantity >= 10 ||
      checkVariant?.quantity + Number(sub_qty) >= 10
    ) {
      setOpen(false)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: 'Limited to 10 item(s) per purchase',
        })
      )
      return
    }

    dispatchCart(
      addToCart(variant, Number(sub_qty), productName, stockQuantity, sub_frq)
    )
    setOpen(false)
    dispatchFeedback(
      setSnackbar({
        status: 'success',
        message: 'Subscription added to cart.',
      })
    )
  })

  const handleOpenSubsDialog = () => {
    if (iconLocation === 'cart') {
      dispatchCart(toggleSubscription(variant, cartFrequency))
      return
    }
    if (user.username === 'Guest') {
      dispatch(
        setSnackbar({
          status: 'error',
          message: 'You must be logged in to create a subscription.',
        })
      )
      return
    } else {
      setOpen(true)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <CustomButton
        type={'button'}
        onClick={handleOpenSubsDialog}
        customStyles={`items-center ${buttonClassName} ${buttonLocationClassName}`}
      >
        <CalendarIcon
          className={`flex-shrink-0 ${iconClassName} ${iconLocationClassName}`}
          aria-hidden="true"
        />
        {label && <span className="text-sm">{label}</span>}
      </CustomButton>

      <Modal
        modalOpen={open}
        setModalOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      >
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form onSubmit={onSubmit}>
            <ModalContent>
              <ModalContentIcon bgColor={'bg-purple-100'}>
                <CalendarIcon className="h-6 w-6 text-purple-600" />
              </ModalContentIcon>
              <ModalContentText title={'Subscription'}>
                <p className="font-osans text-sm text-blue-gray-500 mb-4">
                  Before subscribing to this product, please tell us what
                  quantity and delivery frequency you desire.
                </p>
                <div className="space-y-6">
                  <FormInput
                    id={`sub_qty`}
                    name={`sub_qty`}
                    type={'number'}
                    placeholder={'Ex: 10'}
                    register={register('sub_qty', { ...QUANTITY_SUBS_CONFIG })}
                    labelText={`Quantity`}
                    label={`quantity`}
                    formInputWrapperClass={'space-y-1'}
                    error={errors.sub_qty?.message}
                  />
                  <FormInput
                    id={`sub_frq`}
                    name={`sub_frq`}
                    select
                    register={register('sub_frq', {
                      required: true,
                    })}
                    labelText={`Delivery Frequency`}
                    label={`deliver`}
                    error={errors.sub_frq?.message}
                    formInputWrapperClass={'space-y-1'}
                    selectOptions={SUBS_FREQUENCIES}
                    inputStyles={'cursor-pointer'}
                  />
                </div>
              </ModalContentText>
            </ModalContent>
            <ModalActions>
              <CustomButton
                type={'submit'}
                loading={false}
                customStyles={
                  'w-full inline-flex border-transparent px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 sm:ml-3 sm:w-auto sm:text-sm'
                }
              >
                Add to cart
              </CustomButton>
              <CustomButton
                type={'button'}
                customStyles={
                  'mt-3 w-full inline-flex border-blue-gray-300 px-4 py-2 bg-white text-blue-gray-700 hover:bg-blue-gray-50 sm:mt-0 sm:w-auto sm:text-sm'
                }
                onClick={handleCancel}
                disabled={false}
                ref={cancelButtonRef}
              >
                Cancel
              </CustomButton>
            </ModalActions>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Subscription
