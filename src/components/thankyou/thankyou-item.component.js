import React from 'react'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { currencyFormatter } from '../../utils/functions'

const ThankyouItem = ({ item }) => {
  const image = getImage(item.variant.images[0].localFile)
  return (
    <li className="flex py-6 space-x-6">
      <GatsbyImage
        image={image}
        alt={item.name}
        className="flex-none w-24 h-24 bg-gray-100 rounded-md object-center object-cover"
        objectFit="cover"
      />
      <div className="flex-auto space-y-1 font-hind">
        <h3 className="text-gray-900">{item.name}</h3>
        <p>{item.variant.style}</p>
        <p className="capitalize">{item.variant.colorLabel}</p>
        <p>{item.variant.size}</p>
      </div>
      <p className="flex-none font-medium font-hind text-gray-900">
        {currencyFormatter(item.variant.price)}
      </p>
    </li>
  )
}

export default ThankyouItem
