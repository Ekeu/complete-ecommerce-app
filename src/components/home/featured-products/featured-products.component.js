import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

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
                strapiId
                variants {
                  price
                  images {
                    url
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        let featuredProducts = []
        data.allStrapiProduct.edges.map(({ node }) =>
          featuredProducts.push({
            key: node.strapiId,
            href: '/',
            name: node.name,
            imageSrc:
              process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url,
            imageAlt: `image-${node.name}`,
            price: node.variants[0].price,
          })
        )
        return <FeaturedProductsDisplay featuredProducts={featuredProducts} />
      }}
    />
  )
}

export default FeaturedProducts
