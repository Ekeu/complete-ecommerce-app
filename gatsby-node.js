/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const slugify = require('slugify')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const graphQLRes = await graphql(`
    query LisProductsAndCategories {
      products: allStrapiProduct {
        edges {
          node {
            name
            strapiId
            description
            category {
              name
            }
            specifications_json {
              details {
                items
                name
              }
            }
            variants {
              id
              color
              size
              style
              price
              gender
              colorLabel
              images {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
      categories: allStrapiCategory {
        edges {
          node {
            name
            strapiId
            description
            filterOptions {
              Size {
                value
                label
                checked
              }
              Gender {
                value
                label
                checked
              }
              Color {
                value
                label
                checked
              }
              Style {
                value
                label
                checked
              }
            }
          }
        }
      }
    }
  `)

  if (graphQLRes.errors) throw graphQLRes.errors

  const { products, categories } = graphQLRes.data

  products.edges.forEach(product => {
    createPage({
      path: `/${product.node.category.name.toLowerCase()}/${slugify(
        product.node.name,
        {
          lower: true,
        }
      )}`,
      component: require.resolve('./src/templates/product-detail.template.js'),
      context: {
        name: product.node.name,
        category: product.node.category.name,
        specifications: product.node.specifications_json,
        id: product.node.strapiId,
        description: product.node.description,
        variants: product.node.variants,
        product,
      },
    })
  })

  categories.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.name.toLowerCase()}`,
      component: require.resolve('./src/templates/product-list.template.js'),
      context: {
        name: node.name,
        description: node.description,
        id: node.strapiId,
        filterOptions: node.filterOptions,
      },
    })
  })
}
