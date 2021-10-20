import { SET_SNACKBAR } from './types.actions'

export const setSnackbar = ({ status, message, component, open }) => ({
  type: SET_SNACKBAR,
  payload: { status, message, component, open },
})
