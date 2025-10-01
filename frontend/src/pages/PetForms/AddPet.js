// CSS
import './PetForm.css'

// React Router Config
import { useNavigate } from 'react-router-dom'

// Hooks
import { useEffect } from 'react'
import { useScrollWindowToTop } from '../../hooks/useScrollWindowToTop'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useSendPetPhotoTypeErrorMessage } from '../../hooks/useSendPetPhotoTypeErrorMessage'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { registerPet, setError, reset } from '../../slices/petSlice'

// Components
import PetForm from '../../components/Form/PetForm'

const AddPet = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sendPetPhotoTypeError = useSendPetPhotoTypeErrorMessage(
    dispatch,
    setError,
    reset
  )
  const resetMessage = useResetComponentMessage(dispatch, reset)

  // Get Initial States from Store
  const { loading, redirect } = useSelector((state) => state.pet)

  // Scroll Window to the Top when Open the Page
  useScrollWindowToTop()

  // Redirect to My Pets Page if Success
  useEffect(() => {
    if (redirect) {
      navigate('/my-pets')
    }
  }, [dispatch, navigate, redirect])

  // Register Pet Handle Submit
  const handleSubmit = (formData) => {
    // Call API by Slice
    dispatch(registerPet(formData))

    // Reset All Pet States (Message) after Timeout
    resetMessage()
  }

  return (
    <div id="add-pet">
      <div>
        <h1>Register a Pet</h1>
        <p>Then it will be available for adoption.</p>
      </div>
      <PetForm
        handleSubmit={handleSubmit}
        sendPhotoTypeErrorMessage={sendPetPhotoTypeError}
        buttonText="Register"
        loading={loading}
      />
    </div>
  )
}

export default AddPet
