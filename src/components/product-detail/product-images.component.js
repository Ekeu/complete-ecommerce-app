import React from 'react'
import { Tab } from '@headlessui/react'

import ProductImageTab from './product-image-tab.component'

const ProductImages = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map(image => (
            <Tab
              key={image.id}
              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-blue-gray-800 cursor-pointer hover:bg-blue-gray-50 focus:outline-none focus:ring-purple-300 focus:ring-offset-4 focus:ring-opacity-50"
            >
              {({ selected }) => (
                <ProductImageTab image={image} selected={selected} />
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
        {images.map(image => (
          <Tab.Panel key={image.id}>
            <img
              src={process.env.GATSBY_STRAPI_URL + image.url}
              alt={image.alternativeText || image.name}
              className="w-full h-full object-center object-cover sm:rounded-lg"
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default ProductImages
