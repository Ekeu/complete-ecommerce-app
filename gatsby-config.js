require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Adidas Dev Ecom`,
    description: `Adidas ecommerce platform for developers!.`,
    author: `@constjavascript`,
    siteUrl: `https://adidas.constjs.dev`,
    twitterUsername: `@constjavascript`,
    defaultImage: ``,
    keywords: [
      'clothing',
      'devloper',
      'programmer',
      'coding',
      'code',
      'websites',
      'web developer',
      'hats',
      'shirts',
      'hoodies',
      'adidas',
      'web apps',
      'algolia',
      'strapi',
      'reactjs',
      'javascript',
      'learning',
    ],
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_STRAPI_URL,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`product`, `category`, `variant`],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `open sans\:300,400,500,600,700,800`,
          `hind\:300,400,500,600,700`,
        ],
        display: 'swap',
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /* {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    }, */
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
