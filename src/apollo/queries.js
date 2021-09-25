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
