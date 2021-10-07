import React, { useReducer, createContext } from 'react'
import { toast } from 'react-toastify'

import SnackBar from '../../components/snackbar/snackbar.component'

import { setSnackbar } from '../actions'
import { feedbackReducer } from '../reducers/feedback.reducers'

export const FeedbackContext = createContext()
const FeedbackProvider = FeedbackContext.Provider

export const FeedbackWrapper = ({ children }) => {
  const [feedback, dispatch] = useReducer(feedbackReducer, {
    open: false,
    icon: { color: '', component: () => <></> },
    message: '',
  })

  const openSnackbar = () => {
    toast(<SnackBar message={feedback.message} icon={feedback.icon} />, {
      onClose: () => dispatch(setSnackbar({ open: false })),
    })
  }

  return (
    <FeedbackProvider value={{ feedback, dispatch }}>
      {children}
      {feedback.open && openSnackbar()}
    </FeedbackProvider>
  )
}
