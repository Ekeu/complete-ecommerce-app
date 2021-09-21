import React from 'react'

const DescriptionContainer = ({ name, description }) => {
  return (
    <div className={'text-center py-16 px-4 sm:px-6 lg:px-8'}>
      <h1
        className={
          'text-4xl font-extrabold font-hind tracking-tight text-blue-gray-800 capitalize'
        }
      >
        {name} Category
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-base text-blue-gray-500 font-osans">
        {description}
      </p>
    </div>
  )
}

export default DescriptionContainer
