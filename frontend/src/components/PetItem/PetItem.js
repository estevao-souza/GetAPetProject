// CSS
import './PetItem.css'

// Utils
import { uploads } from '../../utils/config'

// React Router Config
import { Link } from 'react-router-dom'

const PetItem = ({ pet }) => {
  return (
    <div className="pet-item">
      {pet.photos && (
        <img src={`${uploads}/pets/${pet.photos[0]}`} alt={pet.name} />
      )}
      <h3>{pet.name}</h3>
      <p>
        <span className="bold">Weight:</span> {pet.weight}
      </p>
      {pet.available ? (
        <Link to={`pet/${pet._id}`}>More Details</Link>
      ) : (
        <p className="adopted-text">Adopted</p>
      )}
    </div>
  )
}

export default PetItem
