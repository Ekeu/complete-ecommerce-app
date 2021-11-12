import React from 'react'

const Badge = ({ children, role, styles, ...rest }) => {
  return (
    <span
      {...rest}
      role={role}
      className={`inline-flex items-center rounded-md font-medium ${styles}`}
    >
      {children}
    </span>
  )
}

export default Badge
