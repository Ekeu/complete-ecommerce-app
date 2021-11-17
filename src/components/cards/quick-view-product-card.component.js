import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { CheckCircleIcon } from '@heroicons/react/solid'

import { currencyFormatter, createSlug } from '../../utils/functions'
import { colorIndex } from '../../utils/product'

import { CartContext } from '../../contexts'
import { addToCart } from '../../contexts/actions'

import { getStockDisplay } from '../product-detail/product-info.component'
import ProductReviews from '../product/product-reviews.component'
import ProductSizes from '../product/product-sizes.component'
import ProductColors from '../product/product-colors.component'
import CustomButton from '../custom-button/custom-button.component'
import { useLocation } from '@reach/router'

const QuickViewProductCard = ({
  imageURL,
  imageALT,
  product,
  variant,
  stock,
  hasGender,
  productName,
  productPrice,
  productRating,
  productSizes,
  productColors,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const location = useLocation()

  const possibleSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']
  const actualSizes = possibleSizes
    .filter(size => new Set(productSizes).has(size))
    .map(size => ({ name: size, inStock: true }))

  const imageIndex = colorIndex(product, variant, selectedColor)

  const selectedColorImageURL =
    imageIndex !== -1
      ? process.env.GATSBY_STRAPI_URL +
        product.node.variants?.[imageIndex]?.images[0].url
      : imageURL

  let selectedVariant

  if (location.pathname === '/search') {
    const s_variant = product.node.variants.find(
      pvariant => pvariant.id === variant.id
    )
    selectedVariant =
      imageIndex === -1 ? product.node.variants?.indexOf(s_variant) : imageIndex
  } else {
    selectedVariant =
      imageIndex === -1 ? product.node.variants?.indexOf(variant) : imageIndex
  }

  const stockDisplay = getStockDisplay(stock, selectedVariant)

  const { dispatch } = useContext(CartContext)

  const handleAddToCart = () => {
    setLoading(true)
    setLoading(false)
    setSuccess(true)
    dispatch(
      addToCart(variant, 1, productName, stock[selectedVariant].quantity)
    )
  }

  useEffect(() => {
    let timer
    if (success) {
      timer = setTimeout(() => setSuccess(false), 1500)
    }
    return () => clearTimeout(timer)
  }, [success])

  return (
    <>
      <div className="aspect-w-2 aspect-h-3 rounded-lg bg-blue-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
        <img
          src={selectedColorImageURL}
          alt={imageALT}
          className="object-center object-cover"
        />
        <div
          className="flex items-end p-4 group-hover:opacity-100 sm:hidden"
          aria-hidden="true"
        >
          <Link
            to={`/${product.node.category?.name.toLowerCase()}/${createSlug(
              product.node.name
            )}${hasGender && `?gender=${variant.gender}`}`}
            className={
              'w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium font-hind text-blue-gray-800 text-center'
            }
          >
            View full details
          </Link>
        </div>
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <h2 className="text-xl font-medium font-hind text-blue-gray-800 sm:pr-12">
          {productName}
        </h2>

        <section aria-labelledby="information-heading" className="mt-1">
          <h3 id="information-heading" className="sr-only">
            Product information
          </h3>
          <p className="font-medium font-osans text-blue-gray-800">
            {currencyFormatter(productPrice)}
          </p>

          <ProductReviews
            productRating={productRating}
            productName={productName}
          >
            <div className="hidden ml-4 lg:flex lg:items-center">
              <span className="text-blue-gray-300" aria-hidden="true">
                &middot;
              </span>
              <span className="ml-4 text-sm font-semibold font-osans text-purple-600 hover:text-purple-500">
                Leave a review
              </span>
            </div>
          </ProductReviews>
        </section>

        <section aria-labelledby="options-heading" className="mt-8">
          <h3 id="options-heading" className="sr-only">
            Product options
          </h3>

          <div>
            <ProductColors
              productColors={productColors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
            <ProductSizes
              productSizes={actualSizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              stockDisplay={stockDisplay}
              quantity={stock && stock[selectedVariant]?.quantity}
            />
            <CustomButton
              type={'button'}
              onClick={handleAddToCart}
              loading={loading}
              success={success}
              SuccessIcon={CheckCircleIcon}
              successText={'Product added!'}
              customStyles={
                'mt-8 bg-purple-600 border-transparent py-3 px-8 flex items-center text-white hover:bg-purple-700 w-full'
              }
            >
              Add to cart
            </CustomButton>
            <p className="absolute top-4 left-4 text-center sm:static sm:mt-8">
              <Link
                to={`/${product.node.category?.name.toLowerCase()}/${createSlug(
                  product.node.name
                )}${hasGender && `?gender=${variant.gender}`}`}
                className="font-medium font-hind text-purple-600 hover:text-purple-500"
              >
                View full details
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default QuickViewProductCard
