<p align="center">
  <a href="https://strapi.constjs.dev">
    <img alt="Gatsby" src="/src/images/favicon.png" width="60" />
  </a>
</p>
<h1 align="center">
  Adidas Ecom Platform for Developers - Frontend
</h1>

---

## What is it? 🧐

This is the frontend part of full e-commerce web app. The main purpose is to help developers start fast when building their own e-commerce web App.

---

## Stack Used

I used the following technologies:

1. [GatsbyJS](https://nextjs.org/) as frontend framework
2. [Tailwind](https://tailwindui.com/) as my css framework
3. [Algolia](https://www.algolia.com/) for search.
4. [Strapi](https://strapi.io/) as my CMS
5. [Google Maps API](https://developers.google.com/maps) for networking

## Want to try it out?

You can see it working online by visiting [Adidas Dev Ecom](https://adidas.constjs.dev/)

##### OR

1. Follow the instructions in Strapi Backend folder and run it.

2. Create and add in your `.env` the below keys

```env
GATSBY_STRAPI_URL=http://localhost:1337
GATSBY_GOOGLE_MAPS_API_KEY='YOUR GOOGLE MAPS API KEY'
GATSBY_STRIPE_PK='YOUR STRIPE PRIVATE KEY'
GATSBY_ALGOLIA_APPLICATION_ID='YOUR ALGOLIA APPLICATION ID'
GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY='YOUR ALGOLIA SEARCH ONLY API KEY'
```

1. Run the server

```npm
- npm install
- npm run develop or gatsby develop (if you have the gatsby cli)
```

4. Open your browser and go to http://localhost:8000 to see the result.
