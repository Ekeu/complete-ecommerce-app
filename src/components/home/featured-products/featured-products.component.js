import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { createSlug } from '../../../utils/functions'
import { hasGender } from '../../../utils/product'

import FeaturedProductsDisplay from './featured-products-display.component'

const FeaturedProducts = () => {
  return (
    <StaticQuery
      query={graphql`
        query GetFeatured {
          allStrapiProduct(filter: { featured: { eq: true } }) {
            edges {
              node {
                name
                category {
                  name
                }
                strapiId
                variants {
                  price
                  images {
                    url
                  }
                  gender
                }
              }
            }
          }
        }
      `}
      render={data => {
        let featuredProducts = []
        data.allStrapiProduct.edges.map(product =>
          featuredProducts.push({
            key: product.node.strapiId,
            href: `/${product.node.category.name.toLowerCase()}/${createSlug(
              product.node.name
            )}${
              hasGender(product) && `?gender=${product.node.variants[0].gender}`
            }`,
            name: product.node.name,
            imageSrc:
              process.env.GATSBY_STRAPI_URL +
              product.node.variants[0].images[0].url,
            imageAlt: `image-${product.name}`,
            price: product.node.variants[0].price,
          })
        )
        return <FeaturedProductsDisplay featuredProducts={featuredProducts} />
      }}
    />
  )
}

export default FeaturedProducts
