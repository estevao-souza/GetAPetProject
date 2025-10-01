// React Router Config
import { Link } from 'react-router-dom'

// Hooks
import { useState, useEffect } from 'react'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../slices/authSlice'

// Component
import Input from '../../components/Input/Input'

const Login = () => {
  const [user, setUser] = useState({})
  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch, reset)

  // Get Initial States from Store
  const { loading } = useSelector((state) => state.auth)

  // Handle Every Form Field Change
  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // Login Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Call API by Slice
    dispatch(login(user))

    // Reset All Auth States (Message) after Timeout
    resetMessage()
  }

  // Reset All Auth States
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className="form-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Type your email"
          handleOnChange={handleOnChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type your password"
          handleOnChange={handleOnChange}
        />
        {!loading && <input type="submit" value="Sign In" />}
        {loading && <input type="submit" value="Wait..." disabled />}
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="bold">
          Click here
        </Link>
      </p>
    </div>
  )
}

export default Login
