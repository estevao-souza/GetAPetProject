// CSS
import './PetDetails.css'

// Utils
import { uploads } from '../../utils/config'

// React Router Config
import { useParams, Link } from 'react-router-dom'

// Hooks
import { useEffect } from 'react'
import { useScrollWindowToTop } from '../../hooks/useScrollWindowToTop'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
  getPet,
  scheduleVisit,
  unscheduleVisit,
  reset,
} from '../../slices/petSlice'

const PetDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch, reset)

  // Get Initial States from Store
  const { user } = useSelector((state) => state.auth)
  const { pet, loading, error } = useSelector((state) => state.pet)

  // Scroll Window to the Top when Open the Page
  useScrollWindowToTop()

  // Load Pet Data
  useEffect(() => {
    // Call API by Slice
    dispatch(getPet(id))

    // Reset all States after Component Dismount
    return () => {
      dispatch(reset())
    }
  }, [dispatch, id])

  // Schedule a Visit Handle Submit
  const handleSchedule = () => {
    // Call API by Slice
    dispatch(scheduleVisit(id))

    // Reset All Pet States (Message) after Timeout
    resetMessage()
  }

  // Unchedule a Visit Handle Submit
  const handleUnschedule = () => {
    // Call API by Slice
    dispatch(unscheduleVisit(id))

    // Reset All Pet States (Message) after Timeout
    resetMessage()
  }

  return (
    <div className="pet-details">
      {pet && error !== 'Pet not found' && (
        <>
          <div className="pet-details-header">
            <h1>Meet {pet.name}</h1>
            <p>If you are interested, schedule a visit to meet it.</p>
          </div>
          <div className="pet-details-photos">
            {pet.photos &&
              pet.photos.map((photo, index) => (
                <img
                  src={`${uploads}/pets/${photo}`}
                  alt={pet.name}
                  key={`${pet.name}+${index}`}
                />
              ))}
          </div>
          <p>
            <span className="bold">Weight:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Age:</span> {pet.age} years
          </p>
          {user && !loading && pet.available && !pet.adopterId && (
            <button
              onClick={() => {
                handleSchedule()
              }}
            >
              Request a Visit
            </button>
          )}
          {user && !loading && pet.available && user._id === pet.adopterId && (
            <button
              className="cancel-button"
              onClick={() => {
                handleUnschedule()
              }}
            >
              Cancel Visit
            </button>
          )}
          {user &&
            !loading &&
            pet.available &&
            pet.adopterId &&
            user._id !== pet.adopterId && (
              <button className="adopted-button">Scheduled visit</button>
            )}
          {!loading && !pet.available && (
            <button className="adopted-button">Adopted</button>
          )}
          {loading && <button disabled>Wait</button>}
          {!user && (
            <p>
              You need{' '}
              <Link to="/signin" className="bold">
                an account
              </Link>{' '}
              to request a visit.
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default PetDetails
