import React from 'react'
import { Link } from 'gatsby'

import Logo from '../../images/icon-adidas-logo.svg'

const AuthHeader = ({ headline, sub_headline, handleChange }) => {
  return (
    <div>
      <Link to={'/'}>
        <img className="h-12 w-auto" src={Logo} alt={'Adidas'} />
      </Link>
      <h2 className="mt-6 text-3xl font-extrabold text-blue-gray-800 font-hind">
        {headline}
      </h2>
      {sub_headline && (
        <p className="mt-2 text-sm text-blue-gray-600 font-osans">
          Or{' '}
          <span
            onClick={handleChange}
            className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
          >
            {sub_headline}
          </span>
        </p>
      )}
    </div>
  )
}

export default AuthHeader
