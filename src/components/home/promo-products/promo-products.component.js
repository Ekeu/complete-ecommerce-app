import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import PromoProductsDisplay from './promo-products-display.component'

const PromoProducts = () => {
  return (
    <StaticQuery
      query={graphql`
        query GetPromoProducts {
          allStrapiProduct(filter: { promo: { eq: true } }) {
            edges {
              node {
                name
                strapiId
                description
                variants {
                  images {
                    url
                  }
                  style
                }
              }
            }
          }
        }
      `}
      render={data => {
        let promoProducts = []
        data.allStrapiProduct.edges.map(({ node }) =>
          promoProducts.push({
            key: node.strapiId,
            href: '/',
            name: node.name,
            imageSrc:
              process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url,
            imageAlt: `image-${node.name}`,
            style: node.variants[0].style,
          })
        )
        return <PromoProductsDisplay promoProducts={promoProducts} />
      }}
    />
  )
}

export default PromoProducts
