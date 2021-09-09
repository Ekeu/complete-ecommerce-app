import React from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'

const CustomLink = ({ link, customStyles, children, type, ...otherProps }) => {
  let Component
  const location = useLocation()
  if (type === 'nav') {
    Component = (
      <Link
        to={link}
        {...otherProps}
        className={`${
          location.pathname === link
            ? 'border-purple-500 text-blue-gray-800'
            : 'border-transparent text-blue-gray-500 hover:border-blue-gray-300 hover:text-blue-gray-700'
        } capitalize text-sm font-hind font-medium border-b-2 ${customStyles}`}
      >
        {children}
      </Link>
    )
  } else if (type === 'mobile') {
    Component = (
      <Link
        to={link}
        {...otherProps}
        className={`${
          location.pathname === link
            ? 'bg-purple-50 border-purple-500 text-purple-700'
            : 'border-transparent text-blue-gray-500 hover:bg-blue-gray-50 hover:border-blue-gray-300 hover:text-blue-gray-700'
        } -m-2 p-2 block font-hind border-l-4 font-medium ${customStyles}`}
      >
        {children}
      </Link>
    )
  } else {
    Component = (
      <Link to={link} {...otherProps} className={customStyles}>
        {children}
      </Link>
    )
  }
  return Component
}

export default CustomLink
