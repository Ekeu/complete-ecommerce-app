import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { CartContext, FeedbackContext, UserContext } from '../../contexts'
import { setSnackbar, clearCart, setUser } from '../../contexts/actions'
import CheckoutOrder from './checkout-order.component'
import CheckoutUserInfo from './checkout-user-info.component'
import ProductsMessage from '../snackbar/products.message.component'
import { navigate } from 'gatsby-link'

const deliveryMethods = [
  {
    id: 1,
    title: 'Free',
    turnaround: '9–15 business days',
    price: 0,
  },
  {
    id: 2,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: 9.99,
  },
  {
    id: 3,
    title: 'Express',
    turnaround: '2–5 business days',
    price: 29.99,
  },
]

const CheckoutPortal = () => {
  const { user, dispatch } = useContext(UserContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)
  const { cart, dispatch: dispatchCart } = useContext(CartContext)

  const [selectedLocationSlot, setSelectedLocationSlot] = useState(0)
  const [selectedDetailsSlot, setSelectedDetailsSlot] = useState(0)
  const [detailBilling, setDetailBilling] = useState(false)
  const [locationBilling, setLocationBilling] = useState(false)
  const [provideDifferentDetailBilling, setProvideDifferentDetailBilling] =
    useState(false)
  const [provideDifferentLocationBilling, setProvideDifferentLocationBilling] =
    useState(false)
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  )
  const [billingDetails, setBillingDetails] = useState([])
  const [billingLocation, setBillingLocation] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    getValues,
    setError,
    watch,
  } = useForm()

  const subtotal = cart.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  )
  const tax = subtotal * 0.2
  const total = subtotal + tax + selectedDeliveryMethod.price

  const cartPricingInfos = [
    {
      label: 'Subtotal',
      value: subtotal,
      labelStyles: '',
      containerStyles: '',
      pricingStyles: '',
    },
    {
      label: 'Shipping',
      value: selectedDeliveryMethod.price,
      labelStyles: '',
      containerStyles: '',
      pricingStyles: '',
    },
    {
      label: 'Taxes',
      value: tax,
      labelStyles: '',
      containerStyles: '',
      pricingStyles: '',
    },
    {
      label: 'Total',
      value: total,
      labelStyles: 'text-base',
      containerStyles: 'border-t border-blue-gray-200 pt-6',
      pricingStyles: 'text-base',
    },
  ]

  const onSubmit = handleSubmit(
    async ({
      name,
      email,
      phone,
      street,
      zip,
      city,
      state,
      b_name,
      b_email,
      b_phone,
      b_street,
      b_zip,
      b_city,
      b_state,
    }) => {
      setLoading(true)
      if (
        (!(detailBilling !== false) || provideDifferentDetailBilling) &&
        (detailBilling !== false || !provideDifferentDetailBilling)
      ) {
        dispatchFeedback(
          setSnackbar({
            status: 'error',
            message: 'Please provide your billing information.',
          })
        )
        setLoading(false)
        return
      }

      if (
        (!(locationBilling !== false) || provideDifferentLocationBilling) &&
        (locationBilling !== false || !provideDifferentLocationBilling)
      ) {
        dispatchFeedback(
          setSnackbar({
            status: 'error',
            message: 'Please provide your billing address.',
          })
        )
        setLoading(false)
        return
      }
      const shippingInformation = {
        name,
        email,
        phone,
      }
      const shippingAddress = {
        street,
        zip,
        city,
        state,
      }

      let billingInformation = {}
      let billingAddress = {}

      if (detailBilling !== false) {
        billingInformation = { ...shippingInformation }
      }

      if (locationBilling !== false) {
        billingAddress = { ...shippingAddress }
      }

      if (provideDifferentDetailBilling) {
        billingInformation.name = b_name
        billingInformation.email = b_email
        billingInformation.phone = b_phone
      }

      if (provideDifferentLocationBilling) {
        billingAddress.street = b_street
        billingAddress.zip = b_zip
        billingAddress.city = b_city
        billingAddress.state = b_state
      }

      if (user.username !== 'Guest') {
        try {
          const res = await axios.post(
            process.env.GATSBY_STRAPI_URL + '/users-permissions/set-settings',
            {
              details: shippingInformation,
              detailSlot: selectedDetailsSlot,
              location: shippingAddress,
              locationSlot: selectedLocationSlot,
            },
            {
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          )
          dispatch(setUser({ ...res.data, jwt: user.jwt, onboarding: true }))
        } catch (error) {
          setLoading(false)
          console.error(error)
          dispatchFeedback(
            setSnackbar({
              status: 'error',
              message:
                'There was a problem while saving your information. Please try again.',
            })
          )
        }
      }
      try {
        const res = await axios.post(
          process.env.GATSBY_STRAPI_URL + '/orders/place-order',
          {
            shippingAddress,
            billingAddress,
            shippingInformation,
            billingInformation,
            deliveryMethod: selectedDeliveryMethod,
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
            items: cart,
          },
          {
            headers:
              user.username === 'Guest'
                ? undefined
                : {
                    Authorization: `Bearer ${user.jwt}`,
                  },
          }
        )
        setLoading(false)
        dispatchCart(clearCart())
        localStorage.setItem('placedOrder', JSON.stringify(res.data.validOrder))
        navigate('/thankyou')
      } catch (error) {
        setLoading(false)
        console.error(error)
        switch (error.response.status) {
          case 400:
            dispatchFeedback(
              setSnackbar({
                status: 'error',
                message: 'Invalid cart.',
              })
            )
            break
          case 409:
            dispatchFeedback(
              setSnackbar({
                status: 'error',
                message: `The following items are not available at the requested quantity. Please update your cart and try again.`,
                component: (
                  <ProductsMessage
                    unavailableItems={error.response.data.unavailableItems}
                  />
                ),
              })
            )
            break

          default:
            dispatchFeedback(
              setSnackbar({
                status: 'error',
                message: `Something went wrong, please refresh the page and try again. You have NOT been charged.`,
              })
            )
        }
      }
    }
  )

  return (
    <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>
        <form
          onSubmit={onSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <CheckoutUserInfo
            register={register}
            errors={errors}
            user={user}
            setValue={setValue}
            setError={setError}
            watch={watch}
            getValues={getValues}
            control={control}
            selectedLocationSlot={selectedLocationSlot}
            setSelectedLocationSlot={setSelectedLocationSlot}
            selectedDetailsSlot={selectedDetailsSlot}
            setSelectedDetailsSlot={setSelectedDetailsSlot}
            detailBilling={detailBilling}
            setDetailBilling={setDetailBilling}
            locationBilling={locationBilling}
            setLocationBilling={setLocationBilling}
            provideDifferentDetailBilling={provideDifferentDetailBilling}
            setProvideDifferentDetailBilling={setProvideDifferentDetailBilling}
            provideDifferentLocationBilling={provideDifferentLocationBilling}
            setProvideDifferentLocationBilling={
              setProvideDifferentLocationBilling
            }
            deliveryMethods={deliveryMethods}
            selectedDeliveryMethod={selectedDeliveryMethod}
            setSelectedDeliveryMethod={setSelectedDeliveryMethod}
            billingDetails={billingDetails}
            setBillingDetails={setBillingDetails}
            billingLocation={billingLocation}
            setBillingLocation={setBillingLocation}
          />
          <CheckoutOrder
            loading={loading}
            cartPricingInfos={cartPricingInfos}
          />
        </form>
      </div>
    </main>
  )
}

export default CheckoutPortal
