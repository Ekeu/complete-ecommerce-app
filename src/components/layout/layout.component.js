/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header/header.component'
import Footer from '../footer/footer.component'

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query GetCategories {
          allStrapiCategory {
            edges {
              node {
                name
                strapiId
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <Header categories={data.allStrapiCategory.edges} />
          <main>{children}</main>
          <Footer />
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
