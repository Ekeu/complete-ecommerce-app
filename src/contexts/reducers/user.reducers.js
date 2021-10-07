import { SET_USER } from '../actions/types.actions'

export const userReducer = (state = {}, action) => {
  const { user } = action.payload
  switch (action.type) {
    case SET_USER:
      if (user.username === 'Guest User') {
        localStorage.removeItem('user')
      } else {
        localStorage.setItem('user', JSON.stringify(user))
      }
      return { ...user }
    default:
      return state
  }
}
