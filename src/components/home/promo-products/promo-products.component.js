import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

import { createSlug } from '../../../utils/functions'
import { hasGender } from '../../../utils/product'

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
                category {
                  name
                }
                strapiId
                description
                variants {
                  images {
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  gender
                  style
                }
              }
            }
          }
        }
      `}
      render={data => {
        let promoProducts = []
        data.allStrapiProduct.edges.map(product => {
          const image = getImage(product.node.variants[0].images[0].localFile)
          return promoProducts.push({
            key: product.node.strapiId,
            href: `/${product.node.category.name.toLowerCase()}/${createSlug(
              product.node.name
            )}${
              hasGender(product) && `?gender=${product.node.variants[0].gender}`
            }`,
            name: product.node.name,
            imageSrc: image,
            imageAlt: `image-${product.node.name}`,
            style: product.node.variants[0].style,
          })
        })
        return <PromoProductsDisplay promoProducts={promoProducts} />
      }}
    />
  )
}

export default PromoProducts
