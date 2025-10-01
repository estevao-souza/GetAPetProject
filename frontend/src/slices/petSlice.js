// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Service
import petService from '../services/petService'

// Set Initial States
const initialState = {
  pets: [],
  pet: {},
  loading: false,
  success: false,
  redirect: false,
  error: null,
  message: null,
}

// Register Pet
export const registerPet = createAsyncThunk(
  'pet/register',
  async (pet, thunkAPI) => {
    // Get Token
    const token = thunkAPI.getState().auth.user.token

    // Call Service
    const data = await petService.registerPet(pet, token)

    // Check Errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Update Pet
export const updatePet = createAsyncThunk(
  'pet/update',
  async ({ pet, id }, thunkAPI) => {
    // Get Token
    const token = thunkAPI.getState().auth.user.token

    // Call Service
    const data = await petService.updatePet(pet, id, token)

    // Check Errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Delete Pet
export const deletePet = createAsyncThunk(
  'pet/delete',
  async (id, thunkAPI) => {
    // Get Token
    const token = thunkAPI.getState().auth.user.token

    // Call Service
    const data = await petService.deletePet(id, token)

    // Check Errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Get All Pets
export const getAllPets = createAsyncThunk(
  'pet/get-all',
  async (_, thunkAPI) => {
    // Call Service
    const data = await petService.getAllPets()

    return data
  }
)

// Get All User Pets
export const getAllUserPets = createAsyncThunk(
  'pet/my-pets',
  async (_, thunkAPI) => {
    // Get Token
    const token = thunkAPI.getState().auth.user.token

    // Call Service
    const data = await petService.getAllUserPets(token)

    return data
  }
)

// Get All User Adoptions
export const getAllUserAdoptions = createAsyncThunk(
  'pet/my-adoptions',
  async (_, thunkAPI) => {
    // Get Token
    const token = thunkAPI.getState().auth.user.token

    // Call Service
    const data = await petService.getAllUserAdoptions(token)

    return data
  }
)

// Get Pet by ID
export const getPet = createAsyncThunk('pet/get-pet', async (id, thunkAPI) => {
  // Call Service
  const data = await petService.getPet(id)

  // Check Errors
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0])
  }

  return data
})

// Schedule Visit
export const scheduleVisit = createAsyncThunk(
  'pet/schedule',
  async (id, thunkAPI) => {
    // Get Token
    const token = thunkAPI.getState().auth.user.token

    // Call Service
    const data = await petService.scheduleVisit(id, token)

    // Check Errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Unschedule Visit
export const unscheduleVisit = createAsyncThunk(
  'pet/unschedule',
  async (id, thunkAPI) => {
    // Get Token
    const token = thunkAPI.getState().auth.user.token

    // Call Service
    const data = await petService.unscheduleVisit(id, token)

    // Check Errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Complete Adoption
export const completeAdoption = createAsyncThunk(
  'pet/complete-adoption',
  async (id, thunkAPI) => {
    // Get Token
    const token = thunkAPI.getState().auth.user.token

    // Call Service
    const data = await petService.completeAdoption(id, token)

    // Check Errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Build Pet Slice
export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.success = false
      state.redirect = false
      state.error = null
      state.message = null
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPet.pending, (state) => {
        state.loading = true
        state.success = false
        state.redirect = false
        state.error = null
      })
      .addCase(registerPet.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.redirect = true
        state.error = null
        state.pet = action.payload.pet
        state.message = action.payload.message
      })
      .addCase(registerPet.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.redirect = false
        state.error = action.payload
        state.pet = {}
      })
      .addCase(updatePet.pending, (state) => {
        state.loading = true
        state.success = false
        state.redirect = false
        state.error = null
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.redirect = true
        state.error = null
        state.pet = action.payload.pet
        state.message = action.payload.message
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.redirect = false
        state.error = action.payload
      })
      .addCase(deletePet.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.pets = state.pets.filter((pet) => {
          return pet._id !== action.payload.id
        })
        state.message = action.payload.message
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
      .addCase(getAllPets.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getAllPets.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.pets = action.payload
      })
      .addCase(getAllUserPets.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getAllUserPets.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.pets = action.payload
      })
      .addCase(getAllUserAdoptions.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getAllUserAdoptions.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.pets = action.payload
      })
      .addCase(getPet.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getPet.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.pet = action.payload
      })
      .addCase(getPet.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
      .addCase(scheduleVisit.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(scheduleVisit.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.pet = action.payload.pet
        state.message = action.payload.message
      })
      .addCase(scheduleVisit.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
      .addCase(unscheduleVisit.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(unscheduleVisit.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.pet = action.payload.pet
        state.pets = state.pets.map((pet) =>
          pet._id === state.pet._id ? state.pet : pet
        )
        state.message = action.payload.message
      })
      .addCase(unscheduleVisit.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
      .addCase(completeAdoption.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(completeAdoption.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.pet = action.payload.pet
        state.pets = state.pets.map((pet) =>
          pet._id === state.pet._id ? state.pet : pet
        )
        state.message = action.payload.message
      })
      .addCase(completeAdoption.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
  },
})

export const { reset, setError } = petSlice.actions
export default petSlice.reducer
