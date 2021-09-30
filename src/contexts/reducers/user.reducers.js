import { SET_USER } from '../actions/types.actions'

export const setUserReducer = (state = {}, action) => {
  const { user } = action.payload
  switch (action.type) {
    case SET_USER:
      localStorage.setItem('user', JSON.stringify(user))
      return { ...user }
    default:
      return state
  }
}
