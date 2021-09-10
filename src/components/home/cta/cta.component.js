import React from 'react'

import CustomLink from '../../custom-link/custom-link.component'

const Cta = () => {
  return (
    <div className="bg-purple-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-hind font-extrabold text-white sm:text-4xl">
          <span className="block">
            Got any questions about this Web App or want to get in touch?
          </span>
        </h2>
        <p className="mt-4 font-osans text-lg leading-6 text-purple-200">
          Just hit the below contact button and send me a message, and I will
          answer you as fast as I can!
        </p>
        <CustomLink
          type={'link-button'}
          link={'/contact'}
          customStyles={
            'mt-8 w-full inline-flex items-center justify-center px-5 py-3 text-base text-purple-600 bg-white hover:bg-purple-50 sm:w-auto'
          }
        >
          Contact Us
        </CustomLink>
      </div>
    </div>
  )
}

export default Cta
