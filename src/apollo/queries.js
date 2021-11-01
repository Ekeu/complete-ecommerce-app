import { gql } from '@apollo/client'

export const GET_INVENTORY_DETAILS = gql`
  query getDetails($id: ID!) {
    product(id: $id) {
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
