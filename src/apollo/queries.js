import { gql } from '@apollo/client'

export const GET_INVENTORY_DETAILS = gql`
  query getDetails($id: ID!) {
    product(id: $id) {
      rating
      variants {
        quantity
      }
    }
  }
`

export const GET_REVIEWS = gql`
  query getReviews($id: ID!) {
    product(id: $id) {
      reviews {
        id
        title
        text
        rating
        updatedAt
        user {
          username
        }
      }
    }
  }
`

export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      id
      name
      description
      category {
        name
      }
      variants {
        color
        id
        price
        size
        style
        colorLabel
        gender
        images {
          url
        }
      }
    }
  }
`
