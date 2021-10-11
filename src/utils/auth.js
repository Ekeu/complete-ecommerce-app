export const handleSocialAuth = provider => {
  return `${process.env.GATSBY_STRAPI_URL}/connect/${provider}`
}
