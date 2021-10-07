import { SET_SNACKBAR } from '../actions/types.actions'

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline'

export const feedbackReducer = (state, action) => {
  const { status, message, open } = action.payload
  switch (action.type) {
    case SET_SNACKBAR:
      if (open === false) return { ...state, open }
      return {
        open: true,
        icon:
          status === 'error'
            ? { color: 'text-red-400', component: ExclamationCircleIcon }
            : { color: 'text-green-400', component: CheckCircleIcon },
        message,
      }
    default:
      return state
  }
}
