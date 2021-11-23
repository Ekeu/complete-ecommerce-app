import React from 'react'
import CheckoutItemInfoAndRemove from './checkout-item-info-and-remove.component'
import CheckoutItemPriceAndQty from './checkout-item-price-and-qty.component'
const CheckoutItem = ({ item }) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img
          src={item.variant.images[0].url}
          alt={item.variant.id}
          className="w-20 rounded-md"
        />
      </div>
      <div className="ml-6 flex-1 flex flex-col">
        <CheckoutItemInfoAndRemove item={item} />
        <CheckoutItemPriceAndQty item={item} />
      </div>
    </>
  )
}

export default CheckoutItem
