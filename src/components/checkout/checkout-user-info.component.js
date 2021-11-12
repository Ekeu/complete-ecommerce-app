import React from 'react'
import CheckoutDeliveryMethod from './checkout-delivery-method.component'
import CheckoutUserInfoActions from './checkout-user-info-actions.component'
import CheckoutUserInfoContact from './checkout-user-info-contact.component'
import CheckoutUserInfoLocation from './checkout-user-info-location.component'
import CheckoutUserInfoPayments from './checkout-user-info-payments.componsne'

const CheckoutUserInfo = ({
  register,
  errors,
  user,
  setValue,
  control,
  getValues,
  selectedDetailsSlot,
  setSelectedDetailsSlot,
  selectedLocationSlot,
  setSelectedLocationSlot,
  selectedPaymentSlot,
  setSelectedPaymentSlot,
  detailBilling,
  setDetailBilling,
  locationBilling,
  setLocationBilling,
  deliveryMethods,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  provideDifferentDetailBilling,
  setProvideDifferentDetailBilling,
  provideDifferentLocationBilling,
  setProvideDifferentLocationBilling,
  billingDetails,
  setBillingDetails,
  billingLocation,
  setBillingLocation,
  saveCard,
  setSaveCard,
  setCard,
  cartHasSubscriptions,
}) => {
  const handleCheckDifferentContactBilling = e => {
    setProvideDifferentDetailBilling(e.target.checked)
  }
  const handleCheckDifferentLocationBilling = e => {
    setProvideDifferentLocationBilling(e.target.checked)
  }
  return (
    <div>
      <div>
        <h2 className="text-lg font-medium font-osans text-blue-gray-900">
          Contact information
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <CheckoutUserInfoContact
            register={register}
            errors={errors}
            user={user}
            setValue={setValue}
            control={control}
            getValues={getValues}
            detailBilling={detailBilling}
            selectedDetailsSlot={selectedDetailsSlot}
            billingDetails={billingDetails}
            setBillingDetails={setBillingDetails}
          />
        </div>
        <CheckoutUserInfoActions
          provideDifferentBillingOption={provideDifferentDetailBilling}
          selectedSlot={selectedDetailsSlot}
          register={register}
          errors={errors}
          slotDescription={'Shipping'}
          isContact={true}
          setSelectedSlot={setSelectedDetailsSlot}
          toggleDescription={'Use for billing'}
          enabledBilling={detailBilling}
          setEnabledBilling={setDetailBilling}
          checkBoxId={'use-different-contact-billing'}
          checkBoxHandler={handleCheckDifferentContactBilling}
          checkBoxLabel={'Use different billing info'}
        />
      </div>

      <div className="mt-10 border-t border-blue-gray-200 pt-10">
        <h2 className="text-lg font-medium font-osans text-blue-gray-800">
          Shipping Address
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <CheckoutUserInfoLocation
            register={register}
            errors={errors}
            user={user}
            setValue={setValue}
            control={control}
            getValues={getValues}
            locationBilling={locationBilling}
            selectedLocationSlot={selectedLocationSlot}
            billingLocation={billingLocation}
            setBillingLocation={setBillingLocation}
          />
        </div>
        <CheckoutUserInfoActions
          provideDifferentBillingOption={provideDifferentLocationBilling}
          selectedSlot={selectedLocationSlot}
          setSelectedSlot={setSelectedLocationSlot}
          toggleDescription={'Use for billing'}
          register={register}
          errors={errors}
          slotDescription={'Shipping'}
          setValue={setValue}
          isLocation={true}
          enabledBilling={locationBilling}
          setEnabledBilling={setLocationBilling}
          checkBoxId={'use-different-billing-address'}
          checkBoxHandler={handleCheckDifferentLocationBilling}
          checkBoxLabel={'Use different billing address'}
        />
      </div>

      <div className="mt-10 border-t border-gray-200 pt-10">
        <CheckoutDeliveryMethod
          deliveryMethods={deliveryMethods}
          selectedDeliveryMethod={selectedDeliveryMethod}
          setSelectedDeliveryMethod={setSelectedDeliveryMethod}
        />
      </div>

      <div className="mt-10 border-t border-blue-gray-200 pt-10">
        <h2 className="text-lg font-medium font-osans text-blue-gray-800">
          Payment
        </h2>
        <CheckoutUserInfoPayments
          selectedPaymentSlot={selectedPaymentSlot}
          user={user}
          setCard={setCard}
        />
        {user.jwt && (
          <CheckoutUserInfoActions
            selectedSlot={selectedPaymentSlot}
            setSelectedSlot={setSelectedPaymentSlot}
            slotDescription={'Saved cards'}
            toggleDescription={'Save for future purchase'}
            enabledBilling={saveCard}
            isPayment={true}
            setEnabledBilling={setSaveCard}
            cartHasSubscriptions={cartHasSubscriptions}
          />
        )}
      </div>
    </div>
  )
}

export default CheckoutUserInfo
