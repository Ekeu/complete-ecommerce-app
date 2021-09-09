import React from 'react'

const GridContainer = ({ children }) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
    >
      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
        <div className="flex items-center space-x-6 lg:space-x-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default GridContainer
