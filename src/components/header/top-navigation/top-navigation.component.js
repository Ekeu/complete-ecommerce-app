import React from 'react'
import { Link } from 'gatsby'

const TopNavigation = () => {
  return (
    <div className="hidden bg-gradient-to-br from-purple-500 to-indigo-500 lg:block">
      <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          <Link
            to={'/signup'}
            className="text-sm font-hind font-medium text-white hover:text-blue-gray-100"
          >
            Create an account
          </Link>
          <span className="h-6 w-px bg-white" aria-hidden="true" />
          <Link
            to={'/signin'}
            className="text-sm font-hind font-medium text-white hover:text-blue-gray-100"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopNavigation
