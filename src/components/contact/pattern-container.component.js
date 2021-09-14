import React from 'react'

const PatternContainer = ({ children, customStyles }) => {
  return (
    <div className={`absolute pointer-events-none ${customStyles}`} aria-hidden={'true'}>
      {children}
    </div>
  )
}

export default PatternContainer
