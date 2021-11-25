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
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://adidas.constjs.dev',
        sitemap: 'https://adidas.constjs.dev/sitemap/sitemap-0.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      },
    },
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: 'blurred',
          breakpoints: [
            300, 600, 640, 750, 768, 960, 1024, 1080, 1280, 1366, 1536, 1920,
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Adidas Dev Ecom`,
        short_name: `Dev Ecom`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#C084FC`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
