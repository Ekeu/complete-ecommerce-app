import React from 'react'
import { Link } from 'gatsby'

import { currencyFormatter, createSlug } from '../../utils/functions'
import { colorIndex } from '../../utils/product'

import ProductReviews from '../product/product-reviews.component'
import ProductSizes from '../product/product-sizes.component'
import ProductColors from '../product/product-colors.component'
import CustomButton from '../custom-button/custom-button.component'

const QuickViewProductCard = ({
  imageURL,
  imageALT,
  product,
  variant,
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
  const possibleSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']
  const actualSizes = possibleSizes
    .filter(size => new Set(productSizes).has(size))
    .map(size => ({ name: size, inStock: true }))

  const imageIndex = colorIndex(product, variant, selectedColor)

  const selectedColorImageURL =
    imageIndex !== -1
      ? process.env.GATSBY_STRAPI_URL +
        product.node.variants[imageIndex].images[0].url
      : imageURL

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
            to={`/${product.node.category.name.toLowerCase()}/${createSlug(
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
                12 articles left
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
            />
            <CustomButton
              type={'submit'}
              customStyles={
                'mt-8 bg-purple-600 border-transparent py-3 px-8 flex items-center text-white hover:bg-purple-700 w-full'
              }
            >
              Add to bag
            </CustomButton>
            <p className="absolute top-4 left-4 text-center sm:static sm:mt-8">
              <Link
                to={`/${product.node.category.name.toLowerCase()}/${createSlug(
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
