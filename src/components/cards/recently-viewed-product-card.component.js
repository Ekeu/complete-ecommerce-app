import React from 'react'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { navigate } from 'gatsby'

import { currencyFormatter, createSlug } from '../../utils/functions'
import CustomButton from '../custom-button/custom-button.component'
import { StarIcon } from '@heroicons/react/solid'

const RecentlyViewedProductCard = ({
  product,
  variant,
  hasGender,
  onClick,
  onClickFav,
  favId,
  buttonLabel,
  loading,
  success,
  SuccessIcon,
  successText,
}) => {
  const imageURL = getImage(variant?.images[0].localFile)
  const productName = product.node.name

  const navigateLink = `/${product.node.category.name.toLowerCase()}/${createSlug(
    product.node.name || ''
  )}${hasGender && `?gender=${variant?.gender}`}`

  const navigateTo = () => navigate(navigateLink)

  return (
    <div>
      <div className="relative">
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <GatsbyImage
            image={imageURL}
            alt={productName}
            className="w-full h-full object-center object-cover"
            objectFit="cover"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium font-hind text-blue-gray-800 truncate">
            {productName}
          </h3>
          <p className="mt-1 text-sm text-blue-gray-500 font-osans">
            {variant?.style}
          </p>
        </div>
        <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-blue-gray-600 opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            {currencyFormatter(variant?.price)}
          </p>
          {favId && (
            <CustomButton
              type={'button'}
              loading={loading}
              disabled={!!loading}
              onClick={onClickFav}
              spinnerColor={'text-purple-500'}
              customStyles={`m-4 absolute top-0 right-0 border-transparent shadow-none items-center`}
            >
              <StarIcon className="h-5 w-5 flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white" />
            </CustomButton>
          )}
        </div>
      </div>
      <div className="mt-6">
        <CustomButton
          onClick={onClick ? onClick : navigateTo}
          loading={loading}
          success={success}
          SuccessIcon={SuccessIcon}
          successText={successText}
          customStyles="relative flex bg-blue-gray-100 border-transparent py-2 px-8 items-center text-sm text-blue-gray-800 hover:bg-blue-gray-200 w-full shadow-none"
        >
          {buttonLabel || (
            <>
              View product<span className="sr-only">, {productName}</span>
            </>
          )}
        </CustomButton>
      </div>
    </div>
  )
}

export default RecentlyViewedProductCard
