import React, { useReducer, createContext } from 'react'

import cartReducer from '../reducers/cart.reducers'

export const CartContext = createContext()

const CartProvider = CartContext.Provider

export const CartWrapper = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem('cart'))
  const [cart, dispatch] = useReducer(cartReducer, storedCart || [])
  return <CartProvider value={{ cart, dispatch }}>{children}</CartProvider>
}
