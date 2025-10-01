// CSS
import './Navbar.css'

// Logo
import Logo from '../../assets/img/logo.png'

// React Router Config
import { NavLink, useNavigate } from 'react-router-dom'

// Hooks
import { useAuth } from '../../hooks/useAuth'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { useDispatch } from 'react-redux'
import { logout, reset } from '../../slices/authSlice'

const Navbar = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch, reset)

  // Handle Log Out
  const handleLogout = () => {
    // Call Slice Action
    dispatch(logout())

    // Reset All Auth States (Message) after Timeout
    resetMessage()

    // Redirect to Home Page
    navigate('/')
  }

  return (
    <nav id="nav">
      <div id="nav-logo">
        <img src={Logo} alt="Get a Pet" />
        <h2>Get a Pet</h2>
      </div>
      <ul id="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {auth ? (
          <>
            <li>
              <NavLink to="/my-adoptions">My adoptions</NavLink>
            </li>
            <li>
              <NavLink to="/my-pets">My pets</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li onClick={handleLogout}>
              <span>Sign Out</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/signin">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
