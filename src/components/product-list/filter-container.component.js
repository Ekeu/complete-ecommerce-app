import React from 'react'

const FilterContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
      {children}
    </div>
  )
}

export default FilterContainer
