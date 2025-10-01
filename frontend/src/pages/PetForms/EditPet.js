// CSS
import './PetForm.css'

// React Router Config
import { useNavigate, useParams } from 'react-router-dom'

// Hooks
import { useEffect } from 'react'
import { useScrollWindowToTop } from '../../hooks/useScrollWindowToTop'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useSendPetPhotoTypeErrorMessage } from '../../hooks/useSendPetPhotoTypeErrorMessage'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getPet, updatePet, setError, reset } from '../../slices/petSlice'

// Components
import PetForm from '../../components/Form/PetForm'
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader'

const EditPet = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sendPetPhotoTypeError = useSendPetPhotoTypeErrorMessage(
    dispatch,
    setError,
    reset
  )
  const resetMessage = useResetComponentMessage(dispatch, reset)

  // Get Initial States from Store
  const { pet, loading, redirect } = useSelector((state) => state.pet)

  // Scroll Window to the Top when Open the Page
  useScrollWindowToTop()

  // Load Pet Data
  useEffect(() => {
    // Call API by Slice
    dispatch(getPet(id))
  }, [dispatch, id])

  // Redirect to My Pets Page if Success
  useEffect(() => {
    if (redirect) {
      navigate('/my-pets')
    }
  }, [dispatch, navigate, redirect])

  // Edit Pet Handle Submit
  const handleSubmit = (formData) => {
    // Call API by Slice
    dispatch(updatePet({ pet: formData, id }))

    // Reset All Pet States (Message) after Timeout
    resetMessage()
  }

  return (
    <div id="edit-pet">
      <div>
        <h1>Editing Pet: {pet.name}</h1>
      </div>
      {pet && pet._id === id ? (
        <PetForm
          handleSubmit={handleSubmit}
          sendPhotoTypeErrorMessage={sendPetPhotoTypeError}
          petData={pet}
          buttonText="Update"
          loading={loading}
        />
      ) : (
        <SpinnerLoader />
      )}
    </div>
  )
}

export default EditPet
