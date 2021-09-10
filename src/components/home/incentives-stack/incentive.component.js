import React from 'react'

const Incentive = ({ stack }) => {
  return (
    <div className='text-center '>
      <img src={stack.imageSrc} alt={stack.name} className="h-24 w-auto mx-auto" />
      <h3 className="mt-6 text-sm font-hind font-medium text-blue-gray-900">
        {stack.name}
      </h3>
      <p className="mt-2 text-sm font-osans text-blue-gray-500">
        {stack.description}
      </p>
    </div>
  )
}

export default Incentive
