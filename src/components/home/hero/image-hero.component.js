import React from 'react'
import { Image } from 'cloudinary-react'

const ImageHero = ({ customStyles, publicId }) => {
  return (
    <div
      className={`w-44 h-64 rounded-lg overflow-hidden shadow-sm ${customStyles}`}
    >
      <Image
        className="w-full h-full object-center object-cover"
        alt={publicId}
        cloudName="dmcookpro"
        publicId={publicId}
        loading="lazy"
        width="100%"
        height="100%"
      ></Image>
    </div>
  )
}

export default ImageHero
