import slugify from 'slugify'

export const currencyFormatter = value => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const createSlug = name =>
  slugify(name, {
    lower: true,
  })
