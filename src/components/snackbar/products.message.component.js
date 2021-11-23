import React from 'react'

const ProductsMessage = ({ unavailableItems }) => {
  return (
    <ul role="list" className="mt-2 divide-y divide-gray-200">
      {unavailableItems.map(item => (
        <li key={item.id} className="py-4 flex">
          <img
            className="h-10 w-10 rounded-md"
            src={item.imageURL}
            alt={item.name}
          />
          <div className="ml-3">
            <p className="text-sm font-medium font-hind text-blue-gray-800">
              {item.name}
            </p>
            <p className="text-sm text-blue-gray-500 font-hind">
              Quantity left: {item.quantity}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ProductsMessage
