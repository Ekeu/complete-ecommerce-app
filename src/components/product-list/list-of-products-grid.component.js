import React from 'react'

const ListOfProductsGrid = ({ children }) => {
  return (
    <section className={'max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8'}>
      <div
        className={
          '-mx-px border-l border-blue-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4'
        }
      >
        {children}
      </div>
    </section>
  )
}

export default ListOfProductsGrid
