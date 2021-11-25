import React from 'react'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

import CheckoutItemInfoAndRemove from './checkout-item-info-and-remove.component'
import CheckoutItemPriceAndQty from './checkout-item-price-and-qty.component'

const CheckoutItem = ({ item }) => {
  const image = getImage(item.variant.images[0].localFile)
  return (
    <>
      <div className="flex-shrink-0">
        <GatsbyImage
          image={image}
          alt={item.variant.id}
          className="w-20 rounded-md"
          objectFit="cover"
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
