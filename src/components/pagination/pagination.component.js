import React from 'react'
import ReactPaginate from 'react-paginate'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid'

const Pagination = ({
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  initialPage,
  onPageChange
}) => {
  return (
    <main className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={pageRangeDisplayed}
          initialPage={initialPage}
          onPageChange={onPageChange}
          marginPagesDisplayed={marginPagesDisplayed}
          previousLabel={
            <>
              <ArrowNarrowLeftIcon
                className="mr-3 h-5 w-5 text-blue-gray-400"
                aria-hidden="true"
              />{' '}
              Previous
            </>
          }
          nextLabel={
            <>
              Next
              <ArrowNarrowRightIcon
                className="ml-3 h-5 w-5 text-blue-gray-400"
                aria-hidden="true"
              />
            </>
          }
          breakLabel={
            <span className="border-transparent text-blue-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium font-hind">
              ...
            </span>
          }
          containerClassName={
            'border-t border-blue-gray-200 px-4 flex items-center justify-between sm:px-0'
          }
          pageLinkClassName={
            'border-transparent text-blue-gray-500 hover:text-blue-gray-700 hover:border-blue-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium font-hind'
          }
          activeLinkClassName={
            'border-purple-500 text-purple-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium font-hind'
          }
          previousClassName={'-mt-px w-0 flex-1 flex'}
          nextClassName={'-mt-px w-0 flex-1 flex justify-end'}
          previousLinkClassName={
            'border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }
          nextLinkClassName={
            'border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }
        />
      </div>
    </main>
  )
}

export default Pagination
