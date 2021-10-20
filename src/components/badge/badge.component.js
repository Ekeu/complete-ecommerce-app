import React from 'react'

const Badge = ({ children, styles, ...rest }) => {
  return (
    <span
      {...rest}
      className={`inline-flex items-center rounded-md text-sm font-medium ${styles}`}
    >
      {children}
    </span>
  )
}

export default Badge
