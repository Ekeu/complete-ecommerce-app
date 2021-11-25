import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

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
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
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
        data.allStrapiProduct.edges.map(product => {
          const image = getImage(product.node.variants[0].images[0].localFile)
          featuredProducts.push({
            key: product.node.strapiId,
            href: `/${product.node.category.name.toLowerCase()}/${createSlug(
              product.node.name
            )}${
              hasGender(product) && `?gender=${product.node.variants[0].gender}`
            }`,
            name: product.node.name,
            imageSrc: image,
            imageAlt: `image-${product.name}`,
            price: product.node.variants[0].price,
          })
        })
        return <FeaturedProductsDisplay featuredProducts={featuredProducts} />
      }}
    />
  )
}

export default FeaturedProducts
