import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CHANGE_FREQUENCY,
  TOGGLE_SUBSCRIPTION,
} from './types.actions'

export const addToCart = (
  variant,
  quantity,
  name,
  stock,
  subscription,
  fromCart = false
) => ({
  type: ADD_TO_CART,
  payload: {
    variant,
    quantity,
    name,
    stock,
    subscription,
    fromCart,
  },
})

export const removeFromCart = variant => ({
  type: REMOVE_FROM_CART,
  payload: {
    variant,
  },
})

export const clearCart = () => ({
  type: CLEAR_CART,
})

export const changeFrequency = (variant, frequency) => ({
  type: CHANGE_FREQUENCY,
  payload: {
    variant,
    frequency,
  },
})

export const toggleSubscription = (variant, frequency) => {
  return {
    type: TOGGLE_SUBSCRIPTION,
    payload: {
      variant,
      frequency,
    },
  }
}
