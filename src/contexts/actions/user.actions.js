import { SET_USER } from './types.actions'

export const setUser = user => ({
  type: SET_USER,
  payload: {
    user,
  },
})
