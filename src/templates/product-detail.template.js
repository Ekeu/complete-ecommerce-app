import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import Layout from '../components/layout/layout.component'
import ProductImages from '../components/product-detail/product-images.component'
import ProductInfo from '../components/product-detail/product-info.component'
import RecentlyViewedProducts from '../components/product-detail/recently-viewed-products.component'

import { GET_INVENTORY_DETAILS } from '../apollo/queries'


const ProductDetail = ({ pageContext }) => {
  const { id, name, description, variants, specifications, product } =
    pageContext

  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [stock, setStock] = useState(null)

  const { loading, error, data } = useQuery(GET_INVENTORY_DETAILS, {
    variables: { id }
  })

  useEffect(() => {
    if (error) {
      setStock(-1)
    } else if (data) {
      setStock(data.product.variants)
    }
  }, [error, data])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const genderVariant = variants.filter(
      variant => variant.gender === params.get('gender')
    )[0]

    const variantIndex = variants.indexOf(genderVariant)
    let recentlyViewedProducts = JSON.parse(
      localStorage.getItem('recentlyViewedProducts')
    )
    if (recentlyViewedProducts) {
      if (recentlyViewedProducts.length === 4) {
        recentlyViewedProducts.shift()
      }
      if (
        !recentlyViewedProducts.some(
          product =>
            product.node.name === name &&
            product.selectedVariant === variantIndex
        )
      ) {
        recentlyViewedProducts.push({
          ...product,
          selectedVariant: variantIndex,
        })
      }
    } else {
      recentlyViewedProducts = [{ ...product, selectedVariant: variantIndex }]
    }
    localStorage.setItem(
      'recentlyViewedProducts',
      JSON.stringify(recentlyViewedProducts)
    )
    setSelectedVariant(variantIndex)
  }, [])

  return (
    <Layout>
      <div className="bg-white">
        <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              <ProductImages
                images={variants[selectedVariant].images}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <ProductInfo
                  name={name}
                  description={description}
                  variants={variants}
                  specifications={specifications}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                  stock={stock}
                />
              </div>
            </div>

            <RecentlyViewedProducts
              products={JSON.parse(
                localStorage.getItem('recentlyViewedProducts')
              )}
            />
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default ProductDetail
