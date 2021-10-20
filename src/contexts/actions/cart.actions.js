import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './types.actions'

export const addToCart = (
  variant,
  quantity,
  name,
  stock,
  fromCart = false
) => ({
  type: ADD_TO_CART,
  payload: {
    variant,
    quantity,
    name,
    stock,
    fromCart,
  },
})

export const removeFromCart = (variant) => ({
  type: REMOVE_FROM_CART,
  payload: {
    variant,
  },
})

export const clearCart = () => ({
  type: CLEAR_CART,
})
