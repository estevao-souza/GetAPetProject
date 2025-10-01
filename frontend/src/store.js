// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

// Slices
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import petReducer from './slices/petSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    pet: petReducer,
  },
})
