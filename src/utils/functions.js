import slugify from 'slugify'

export const currencyFormatter = value => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const createSlug = name =>
  slugify(name, {
    lower: true,
  })

export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const validateEmail = email => {
  const mailFormat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  if (email?.match(mailFormat)) {
    return true
  } else {
    return false
  }
}
