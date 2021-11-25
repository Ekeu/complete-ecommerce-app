import React from 'react'

const ImageHero = ({ customStyles, children }) => {
  return (
    <div
      className={`w-44 h-64 rounded-lg overflow-hidden shadow-sm ${customStyles}`}
    >
      {children}
    </div>
  )
}

export default ImageHero
