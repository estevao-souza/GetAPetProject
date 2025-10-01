// CSS
import './PetsDashboard.css'

// Utils
import { uploads } from '../../utils/config'

// Hooks
import { useEffect } from 'react'
import { useScrollWindowToTop } from '../../hooks/useScrollWindowToTop'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
  getAllUserAdoptions,
  unscheduleVisit,
  reset,
} from '../../slices/petSlice'

// Components
import RoundedImage from '../../components/RoundedImage/RoundedImage'
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader'

const MyAdoptions = () => {
  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch, reset)

  // Get Initial States from Store
  const { pets, loading } = useSelector((state) => state.pet)

  // Scroll Window to the Top when Open the Page
  useScrollWindowToTop()

  // Load Pets Data
  useEffect(() => {
    // Call API by Slice
    dispatch(getAllUserAdoptions())
  }, [dispatch])

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
    <div id="my-adoptions">
      <div className="my-pets-header">
        <h1>My Adoptions</h1>
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
                  <div className="contacts">
                    <p>
                      <span className="bold">Owner:</span> {pet.userId.name}
                    </p>
                    <p>
                      <span className="bold">Phone:</span>{' '}
                      {pet.userId.phone
                        ?.toString()
                        .match(/.{1,3}/g)
                        .join(' ')}
                    </p>
                  </div>
                  <div className="actions">
                    {pet.available ? (
                      <>
                        <p>
                          <span className="bold">Adoption in progress...</span>
                        </p>
                        <button
                          className="cancel-visit-button"
                          onClick={() => {
                            handleUnschedule(pet._id)
                          }}
                        >
                          Cancel Visit
                        </button>
                      </>
                    ) : (
                      <button className="adopted-button">Adopted</button>
                    )}
                  </div>
                </div>
              )
          )}
        {pets.length > 0 &&
          pets.map(
            (pet) =>
              !pet.available &&
              pet.adopterId && (
                <div className="my-pets-row" key={pet._id}>
                  <RoundedImage
                    src={`${uploads}/pets/${pet.photos[0]}`}
                    alt={pet.name}
                    width="small"
                  />
                  <span className="bold">{pet.name}</span>
                  <div className="contacts">
                    <p>
                      <span className="bold">Owner:</span> {pet.userId.name}
                    </p>
                    <p>
                      <span className="bold">Phone:</span>{' '}
                      {pet.userId.phone
                        ?.toString()
                        .match(/.{1,3}/g)
                        .join(' ')}
                    </p>
                  </div>
                  <div className="actions">
                    {pet.available ? (
                      <>
                        <span className="bold">Adoption in progress...</span>
                      </>
                    ) : (
                      <button className="adopted-button">Adopted</button>
                    )}
                  </div>
                </div>
              )
          )}
        {pets.message && pets.message[0] !== null && (
          <h3 className="bold">There are no adopted pets.</h3>
        )}
      </div>
    </div>
  )
}

export default MyAdoptions
