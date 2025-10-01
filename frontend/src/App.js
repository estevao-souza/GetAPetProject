// CSS
import './App.css'

// React Router Config
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Hook
import { useAuth } from './hooks/useAuth'

// Redux
import { useSelector } from 'react-redux'

// Components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Message from './components/Message/Message'
import SpinnerLoader from './components/SpinnerLoader/SpinnerLoader'

// Pages
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Profile from './pages/Profile/Profile'
import AddPet from './pages/PetForms/AddPet'
import EditPet from './pages/PetForms/EditPet'
import PetDetails from './pages/PetDetails/PetDetails'
import MyPets from './pages/PetsDashboard/MyPets'
import MyAdoptions from './pages/PetsDashboard/MyAdoptions'

function App() {
  // Get User Authentication
  const { auth, loading } = useAuth()

  // Get Initial States from Store
  const { message: authMessage, error: authError } = useSelector(
    (state) => state.auth
  )
  const { message: userMessage, error: userError } = useSelector(
    (state) => state.user
  )
  const { message: petMessage, error: petError } = useSelector(
    (state) => state.pet
  )

  // Loading Element
  if (loading) {
    return <SpinnerLoader />
  }

  return (
    <div id="App">
      <BrowserRouter>
        <Navbar />
        <div id="app-message-container">
          {authMessage && <Message msg={authMessage} type="success" />}
          {userMessage && <Message msg={userMessage} type="success" />}
          {petMessage && <Message msg={petMessage} type="success" />}
          {authError && <Message msg={authError} type="error" />}
          {petError && <Message msg={petError} type="error" />}
          {userError && <Message msg={userError} type="error" />}
        </div>
        <div id="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route
              path="/signup"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/signin"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={auth ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/pet/register"
              element={auth ? <AddPet /> : <Navigate to="/" />}
            />
            <Route
              path="/pet/update/:id"
              element={auth ? <EditPet /> : <Navigate to="/" />}
            />
            <Route
              path="/my-pets"
              element={auth ? <MyPets /> : <Navigate to="/" />}
            />
            <Route
              path="/my-adoptions"
              element={auth ? <MyAdoptions /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
