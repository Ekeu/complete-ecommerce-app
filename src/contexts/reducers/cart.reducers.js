import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CHANGE_FREQUENCY,
  TOGGLE_SUBSCRIPTION,
} from '../actions/types.actions'

export default function cartReducer(state, action) {
  let newCart = [...state]

  let existingIndex

  if (action.payload) {
    existingIndex = state.findIndex(
      item => item.variant.id === action.payload.variant.id
    )
  }

  const saveData = cart => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  switch (action.type) {
    case ADD_TO_CART:
      if (existingIndex !== -1) {
        let newQuantity

        if (action.payload.fromCart) {
          newQuantity = action.payload.quantity
        } else {
          newQuantity =
            newCart[existingIndex].quantity + action.payload.quantity
        }
        if (newQuantity > action.payload.stock) {
          newQuantity = action.payload.stock
        }
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newQuantity,
          subscription: action.payload.subscription,
        }
      } else {
        newCart.push(action.payload)
      }
      saveData(newCart)
      return newCart
    case REMOVE_FROM_CART:
      newCart = newCart.filter(item => item.variant !== action.payload.variant)
      saveData(newCart)
      return newCart
    case CHANGE_FREQUENCY:
      newCart[existingIndex].subscription = action.payload.frequency
      saveData(newCart)
      return newCart
    case TOGGLE_SUBSCRIPTION:
      const existingSubscription = !!newCart[existingIndex].subscription

      if (existingSubscription) {
        delete newCart[existingIndex].subscription
      } else {
        newCart[existingIndex].subscription = action.payload.frequency
      }
      saveData(newCart)
      return newCart
    case CLEAR_CART:
      localStorage.removeItem('cart')
      return []
    default:
      return state
  }
}
