import { SET_SNACKBAR } from './types.actions'

export const setSnackbar = ({ status, message, open }) => ({
  type: SET_SNACKBAR,
  payload: { status, message, open },
})
