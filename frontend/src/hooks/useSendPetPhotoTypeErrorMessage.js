// Hook
import { useResetComponentMessage } from '../hooks/useResetComponentMessage'

// Send Error Message linked to Photo Type
export const useSendPetPhotoTypeErrorMessage = (
  dispatch,
  setError,
  resetMethod
) => {
  const resetMessage = useResetComponentMessage(dispatch, resetMethod)

  const sendError = () => {
    // Scroll Window to the Top
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Send Error Message by Slice
    dispatch(setError('Please, upload only PNG or JPG Photos'))

    // Reset All Pet States (Message) after Timeout
    resetMessage()
  }

  return sendError
}
