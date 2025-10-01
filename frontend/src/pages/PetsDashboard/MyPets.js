// CSS
import './PetsDashboard.css'

// Utils
import { uploads } from '../../utils/config'

// React Router Config
import { Link } from 'react-router-dom'

// Hooks
import { useState, useEffect } from 'react'
import { useScrollWindowToTop } from '../../hooks/useScrollWindowToTop'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
  getAllUserPets,
  completeAdoption,
  unscheduleVisit,
  deletePet,
  reset,
} from '../../slices/petSlice'

// Components
import RoundedImage from '../../components/RoundedImage/RoundedImage'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader'

const MyPets = () => {
  const [showConfirmBox, setShowConfirmBox] = useState(null)
  const [petToDelete, setPetToDelete] = useState('')
  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch, reset)

  // Get Initial States from Store
  const { pets, loading } = useSelector((state) => state.pet)

  // Scroll Window to the Top when Open the Page
  useScrollWindowToTop()

  // Load Pets Data
  useEffect(() => {
    // Call API by Slice
    dispatch(getAllUserPets())
  }, [dispatch])

  // Open Confirm Dialog
  const handleDelete = (id) => {
    setPetToDelete(id)
    setShowConfirmBox(true)
  }

  // Confirm Delete Pet Action (Delete Photo Handle Submit)
  const confirmDelete = () => {
    // Call API by Slice
    dispatch(deletePet(petToDelete))

    // Scroll Window to the Top
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Reset All Pet States (Message) after Timeout
    resetMessage()

    // Close Confirm Dialog
    setShowConfirmBox(false)
  }

  // Cancel Delete Pet Action
  const cancelDelete = () => {
    // Close Confirm Dialog
    setShowConfirmBox(false)
  }

  // Adoption Conclusion Handle Submit
  const handleAdoptionConclusion = (id) => {
    // Call API by Slice
    dispatch(completeAdoption(id))

    // Scroll Window to the Top
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Reset All Pet States (Message) after Timeout
    resetMessage()
  }

  // Unchedule a Visit Handle Submit
  const handleUnschedule = (id) => {
    // Call API by Slice
    dispatch(unscheduleVisit(id))

    // Scroll Window to the Top
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Reset All Pet States (Message) after Timeout
    resetMessage()
  }

  // Loading Element
  if (loading) {
    return <SpinnerLoader />
  }

  return (
    <div id="my-pets">
      <div className="my-pets-header">
        <h1>My Pets</h1>
        <Link to="/pet/register">Register Pets</Link>
      </div>
      <div className="my-pets-container">
        {pets.length > 0 &&
          pets.map(
            (pet) =>
              pet.available &&
              pet.adopterId && (
                <div className="my-pets-row" key={pet._id}>
                  <RoundedImage
                    src={`${uploads}/pets/${pet.photos[0]}`}
                    alt={pet.name}
                    width="small"
                  />
                  <span className="bold">{pet.name}</span>
                  <div className="actions">
                    <Link
                      to={`/pet/update/${pet._id}`}
                      className="dashboard-link"
                    >
                      Update
                    </Link>
                    <button
                      className="dashboard-button"
                      onClick={() => {
                        handleDelete(pet._id)
                      }}
                    >
                      Delete
                    </button>
                    {pet.adopterId && (
                      <button
                        className="conclude-adoption-button"
                        onClick={() => {
                          handleAdoptionConclusion(pet._id)
                        }}
                      >
                        Conclude Adoption
                      </button>
                    )}
                    {pet.adopterId && (
                      <button
                        className="cancel-visit-button"
                        onClick={() => {
                          handleUnschedule(pet._id)
                        }}
                      >
                        Cancel Visit
                      </button>
                    )}
                  </div>
                </div>
              )
          )}
        {pets.length > 0 &&
          pets.map(
            (pet) =>
              pet.available &&
              !pet.adopterId && (
                <div className="my-pets-row" key={pet._id}>
                  <RoundedImage
                    src={`${uploads}/pets/${pet.photos[0]}`}
                    alt={pet.name}
                    width="small"
                  />
                  <span className="bold">{pet.name}</span>
                  <div className="actions">
                    <Link
                      to={`/pet/update/${pet._id}`}
                      className="dashboard-link"
                    >
                      Update
                    </Link>
                    <button
                      className="dashboard-button"
                      onClick={() => {
                        handleDelete(pet._id)
                      }}
                    >
                      Delete
                    </button>
                    {pet.adopterId && (
                      <button
                        className="conclude-adoption-button"
                        onClick={() => {
                          handleAdoptionConclusion(pet._id)
                        }}
                      >
                        Conclude Adoption
                      </button>
                    )}
                    {pet.adopterId && (
                      <button
                        className="cancel-visit-button"
                        onClick={() => {
                          handleUnschedule(pet._id)
                        }}
                      >
                        Cancel Visit
                      </button>
                    )}
                  </div>
                </div>
              )
          )}
        {pets.length > 0 &&
          pets.map(
            (pet) =>
              !pet.available && (
                <div className="my-pets-row" key={pet._id}>
                  <RoundedImage
                    src={`${uploads}/pets/${pet.photos[0]}`}
                    alt={pet.name}
                    width="small"
                  />
                  <span className="bold">{pet.name}</span>
                  <div className="actions">
                    <button className="adopted-button">Adopted</button>
                    <button
                      className="dashboard-button"
                      onClick={() => {
                        handleDelete(pet._id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        {pets.message && pets.message[0] !== null && (
          <h3 className="bold">
            There are no pets registered or available at the moment.
          </h3>
        )}
        {showConfirmBox && (
          <ConfirmBox
            message="Are you sure you want to delete this pet?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  )
}

export default MyPets
