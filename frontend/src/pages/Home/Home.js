// CSS
import './Home.css'

// Hooks
import { useEffect } from 'react'
import { useScrollWindowToTop } from '../../hooks/useScrollWindowToTop'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getAllPets } from '../../slices/petSlice'

// Components
import PetItem from '../../components/PetItem/PetItem'
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader'

const Home = () => {
  const dispatch = useDispatch()

  // Get Initial States from Store
  const { user } = useSelector((state) => state.auth)
  const { pets, loading } = useSelector((state) => state.pet)

  // Scroll Window to the Top when Open the Page
  useScrollWindowToTop()

  // Load All Pets
  useEffect(() => {
    // Call API by Slice
    dispatch(getAllPets())
  }, [dispatch, user])

  // Loading Element
  if (loading) {
    return <SpinnerLoader />
  }

  return (
    <div id="home">
      <div>
        <h1>Adopt a Pet</h1>
        <p>See the details of each one and meet their tutor.</p>
      </div>
      <div id="home-container">
        {pets &&
          pets.length > 0 &&
          pets.map(
            (pet) =>
              pet.available &&
              !pet.adopterId && <PetItem key={pet._id} pet={pet} />
          )}
        {pets &&
          pets.length > 0 &&
          pets.map(
            (pet) =>
              pet.available &&
              pet.adopterId && <PetItem key={pet._id} pet={pet} />
          )}
        {pets &&
          pets.length > 0 &&
          pets.map(
            (pet) => !pet.available && <PetItem key={pet._id} pet={pet} />
          )}
        {pets.message && pets.message[0] !== null && (
          <h3 className="bold">
            There are no pets registered or available at the moment.
          </h3>
        )}
      </div>
    </div>
  )
}

export default Home
