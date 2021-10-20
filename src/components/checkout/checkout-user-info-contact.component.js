import React, { useEffect } from 'react'
import { useWatch } from 'react-hook-form'

import CheckoutUserInfoInputs from './checkout-user-info-contact-inputs.component'

const CheckoutUserInfoContact = ({
  register,
  errors,
  user,
  setValue,
  control,
  getValues,
  selectedDetailsSlot,
  detailBilling,
  billingDetails,
  setBillingDetails,
}) => {
  const name = useWatch({
    control,
    name: 'name',
  })
  const phone = useWatch({
    control,
    name: 'phone',
  })
  const email = useWatch({
    control,
    name: 'email',
  })

  useEffect(() => {
    if (user.username === 'Guest') return
    setValue('name', user.contactInfo[selectedDetailsSlot].name || '')
    setValue('email', user.contactInfo[selectedDetailsSlot].email || '')
    setValue('phone', user.contactInfo[selectedDetailsSlot].phone || '')
  }, [selectedDetailsSlot])

  useEffect(() => {
    if (detailBilling === selectedDetailsSlot) {
      setBillingDetails(getValues(['name', 'phone', 'email']))
    }
  }, [selectedDetailsSlot, detailBilling, name, phone, email])

  useEffect(() => {
    if (detailBilling === selectedDetailsSlot) {
      if (billingDetails.length) {
        setValue('name', billingDetails[0])
        setValue('email', billingDetails[1])
        setValue('phone', billingDetails[2])
      }
    }
  }, [selectedDetailsSlot])

  return (
    <CheckoutUserInfoInputs
      register={register}
      errors={errors}
      nameId={'name'}
      phoneId={'phone'}
      emailId={'email'}
    />
  )
}

export default CheckoutUserInfoContact
