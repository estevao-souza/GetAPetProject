// Utils
import { api, requestConfig } from '../utils/config'

// Register Pet
const registerPet = async (data, token) => {
  // Create Post Config with Data, Token and Images
  const config = requestConfig('POST', data, token, true)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets', config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Update Pet
const updatePet = async (data, id, token) => {
  // Create Put Config with Data, Token and Images
  const config = requestConfig('PATCH', data, token, true)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets/' + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Delete Pet
const deletePet = async (id, token) => {
  // Create Delete Config with No Data and Token
  const config = requestConfig('DELETE', null, token)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets/' + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Get All Pets
const getAllPets = async () => {
  // Create Get Config with No Data
  const config = requestConfig('GET', null)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets', config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Get All User Pets
const getAllUserPets = async (token) => {
  // Create Get Config with No Data and Token
  const config = requestConfig('GET', null, token)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets/user', config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Get All User Adoptions
const getAllUserAdoptions = async (token) => {
  // Create Get Config with No Data and Token
  const config = requestConfig('GET', null, token)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets/user/adoptions', config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Get Pet by ID
const getPet = async (id) => {
  // Create Get Config with No Data
  const config = requestConfig('GET', null)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets/' + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Schedule Visit
const scheduleVisit = async (id, token) => {
  // Create Patch Config with No Data and Token
  const config = requestConfig('PATCH', null, token)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets/schedule/' + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Unschedule Visit
const unscheduleVisit = async (id, token) => {
  // Create Patch Config with No Data and Token
  const config = requestConfig('PATCH', null, token)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets/unschedule/' + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Complete Adoption
const completeAdoption = async (id, token) => {
  // Create Patch Config with No Data and Token
  const config = requestConfig('PATCH', null, token)

  // Fetch Request
  try {
    const res = await fetch(api + '/pets/complete-adoption/' + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

const photoService = {
  registerPet,
  updatePet,
  deletePet,
  getAllPets,
  getAllUserPets,
  getAllUserAdoptions,
  getPet,
  scheduleVisit,
  unscheduleVisit,
  completeAdoption,
}

export default photoService
