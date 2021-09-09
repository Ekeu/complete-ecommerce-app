import React from 'react'

const Grid = ({ children }) => {
  return (
    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
      {children}
    </div>
  )
}

export default Grid
