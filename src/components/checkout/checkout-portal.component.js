import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby-link'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { CartContext, FeedbackContext, UserContext } from '../../contexts'
import { setSnackbar, clearCart, setUser } from '../../contexts/actions'
import CheckoutOrder from './checkout-order.component'
import CheckoutUserInfo from './checkout-user-info.component'
import ProductsMessage from '../snackbar/products.message.component'

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
  const [selectedPaymentSlot, setSelectedPaymentSlot] = useState(0)
  const [detailBilling, setDetailBilling] = useState(false)
  const [locationBilling, setLocationBilling] = useState(false)
  const [saveCard, setSaveCard] = useState(false)
  const [card, setCard] = useState({ brand: '', lastFour: '' })
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
  const [clientSecret, setClientSecret] = useState(null)
  const [placedOrder, setPlacedOrder] = useState(null)

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

  const stripe = useStripe()
  const elements = useElements()

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
      localStorage.removeItem('failedPaymentIntent')
      localStorage.removeItem('failedCart')

      if (!stripe || !elements) return

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

      const idempotencyKey = uuidv4()

      const cardElement = elements.getElement(CardElement)

      const result = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              address: {
                city: billingAddress.city,
                state: billingAddress.state,
                line1: billingAddress.street,
              },
              email: billingInformation.email,
              name: billingInformation.name,
              phone: billingInformation.phone,
            },
          },
          setup_future_usage: saveCard ? 'off_session' : undefined,
        },
        { idempotencyKey }
      )

      if (result.error) {
        console.error(result.error.message)
        dispatchFeedback(
          setSnackbar({ status: 'error', message: result.error.message })
        )
        setLoading(false)
        return
      } else if (result.paymentIntent.status === 'succeeded') {
        try {
          const res = await axios.post(
            process.env.GATSBY_STRAPI_URL + '/orders/finalize-order',
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
              transaction: result.paymentIntent.id,
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
          localStorage.removeItem('intentID')
          setClientSecret(null)
          setPlacedOrder(res.data.validOrder)
          localStorage.setItem(
            'placedOrder',
            JSON.stringify(res.data.validOrder)
          )
          navigate('/thankyou')
        } catch (error) {
          setLoading(false)
          console.error(error)
          localStorage.setItem(
            'failedPaymentIntent',
            JSON.stringify(result.paymentIntent.id)
          )
          localStorage.setItem('failedCart', JSON.stringify(cart))
          localStorage.removeItem('intentID')
          setClientSecret(null)
          dispatchFeedback(
            setSnackbar({
              status: 'error',
              message:
                'There was a problem saving your order. Please keep this screen open and contact support.',
            })
          )
        }
      }
    }
  )

  useEffect(() => {
    if (!placedOrder && cart.length !== 0) {
      const storedIntent = localStorage.getItem('intentID')
      const idempotencyKey = uuidv4()

      setClientSecret(null)

      axios
        .post(
          process.env.GATSBY_STRAPI_URL + '/orders/process-order',
          {
            items: cart,
            total: total.toFixed(2),
            deliveryMethod: selectedDeliveryMethod,
            idempotencyKey,
            storedIntent,
            email: getValues('email'),
          },
          {
            headers: user.jwt
              ? {
                  Authorization: `Bearer ${user.jwt}`,
                }
              : undefined,
          }
        )
        .then(res => {
          setClientSecret(res.data.client_secret)
          localStorage.setItem('intentID', res.data.intentID)
        })
        .catch(error => {
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
        })
    }
  }, [cart])

  console.log('CLIENT SECRET ', clientSecret)

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
            selectedPaymentSlot={selectedPaymentSlot}
            setSelectedPaymentSlot={setSelectedPaymentSlot}
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
            saveCard={saveCard}
            setSaveCard={setSaveCard}
            setCard={setCard}
          />
          <CheckoutOrder
            loading={loading || !clientSecret}
            cartPricingInfos={cartPricingInfos}
          />
        </form>
      </div>
    </main>
  )
}

export default CheckoutPortal
