const Pet = require('../models/Pet')

// Helpers
const { imageArrayRemoval } = require('../helpers/images-storage-manager')

// Main Operation: Register Pet
const registerPet = async (req, res) => {
  // Get User Info from Token
  const user = req.user

  // Get Pet Fields
  const { name, age, weight, type } = req.body
  const available = true
  const photos = req.files.map((photo) => photo.filename)

  try {
    // Mongoose Operation: Create Pet
    const pet = await Pet.create({
      name,
      age,
      weight,
      type,
      available,
      photos: photos,
      userId: user._id,
    })

    // Successful Response: Pet with Message
    res.status(201).json({ pet, message: 'Pet registered successfully' })
  } catch (error) {
    // Remove Photos from Local Storage before Error Response
    imageArrayRemoval(photos)

    // Error Response
    res
      .status(500)
      .json({ errors: ['An error occurred, please try again later'] })
  }
}

// Main Operation: Update Pet
const updatePet = async (req, res) => {
  // Get User Info from Token
  const user = req.user

  // Get Pet ID from URL
  const { id } = req.params

  // Get Pet Fields
  const { name, age, weight, type } = req.body

  // Get Photo Files
  let photos = null
  if (req.files.length > 0) {
    photos = req.files.map((photo) => photo.filename)
  }

  try {
    // Mongoose Operation: Get Pet by ID
    const pet = await Pet.findById(id)

    // Check if Pet Exists
    if (!pet) {
      throw new Error('404')
    }

    // Check if Pet Belongs to User
    if (!pet.userId.equals(user._id)) {
      throw new Error('403')
    }

    // Set Name if it has Changed
    if (name) {
      pet.name = name
    }

    // Set Age if it has Changed
    if (age) {
      pet.age = age
    }

    // Set Weight if it has Changed
    if (weight) {
      pet.weight = weight
    }

    // Set Type if it has Changed
    if (type) {
      pet.type = type
    }

    // Set Photos if it has Changed
    if (photos) {
      // Remove Photos from Local Storage before Setting the New Ones to Pet
      imageArrayRemoval(pet.photos)
      pet.photos = photos
    }

    // Mongoose Operation: Update Pet Changes
    await pet.save()

    // Successful Response: Pet with Message
    res.status(200).json({ pet, message: 'Pet updated successfully' })
  } catch (error) {
    // Remove Photos from Local Storage before Error Response
    imageArrayRemoval(photos)

    // Error Response Handler
    if (error.message.includes('404')) {
      res.status(404).json({ errors: ['Pet not found'] })
    } else if (error.message.includes('403')) {
      res
        .status(403)
        .json({ errors: ['This pet does not belong to the current user'] })
    } else {
      res
        .status(500)
        .json({ errors: ['An error occurred, please try again later'] })
    }
  }
}

// Main Operation: Delete Pet
const deletePetById = async (req, res) => {
  // Get User Info from Token
  const user = req.user

  // Get Pet ID from URL
  const { id } = req.params

  try {
    // Mongoose Operation: Get Pet by ID
    const pet = await Pet.findById(id)

    // Check if Pet Exists
    if (!pet) {
      res.status(404).json({ errors: ['Pet not found'] })
      return
    }

    // Check if Pet Belongs to User
    if (!pet.userId.equals(user._id)) {
      res
        .status(403)
        .json({ errors: ['This pet does not belong to the current user'] })
      return
    }

    // Mongoose Operation: Delete Pet by ID
    await Pet.findByIdAndDelete(pet._id)

    // Remove Deleted Pet Photos from Local Storage
    imageArrayRemoval(pet.photos)

    // Successful Response: Deleted Pet ID and Message
    res.status(200).json({ id: pet._id, message: 'Pet deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ errors: ['An error occurred, please try again later'] })
  }
}

// Main Operation: Get All Pets
const getAllPets = async (req, res) => {
  try {
    // Mongoose Operation: Find All Pets and Sort
    const pets = await Pet.find({})
      .sort([['createdAt', 1]])
      .exec()

    // Check if Pets Exist
    if (pets.length === 0) {
      res.status(200).json({ message: ['No pets found'] })
      return
    }

    // Successful Response: Pets
    res.status(200).json(pets)
  } catch (error) {
    res
      .status(500)
      .json({ errors: ['An error occurred, please try again later'] })
  }
}

// Main Operation: Get All User Pets
const getAllUserPets = async (req, res) => {
  // Get User Info from Token
  const user = req.user

  try {
    // Mongoose Operation: Find All User Pets and Sort
    const pets = await Pet.find({ userId: user._id })
      .sort([['createdAt', 1]])
      .exec()

    // Check if Pets Exist
    if (pets.length === 0) {
      res.status(200).json({ message: ['No pets found for this user'] })
      return
    }

    // Successful Response: Pets
    res.status(200).json(pets)
  } catch (error) {
    res
      .status(500)
      .json({ errors: ['An error occurred, please try again later'] })
  }
}

// Main Operation: Get All User Adoptions
const getAllUserAdoptions = async (req, res) => {
  // Get User Info from Token
  const user = req.user

  try {
    // Mongoose Operation: Find All User Adoptions and Sort
    const pets = await Pet.find({ adopterId: user._id })
      .sort([['createdAt', -1]])
      .populate('userId', '_id name email phone profilePhoto')
      .exec()

    // Check if Pets Exist
    if (pets.length === 0) {
      res.status(200).json({ message: ['No pets found for this user'] })
      return
    }

    // Successful Response: Pets
    res.status(200).json(pets)
  } catch (error) {
    res
      .status(500)
      .json({ errors: ['An error occurred, please try again later'] })
  }
}

// Main Operation: Get Pet by ID
const getPetById = async (req, res) => {
  // Get Pet ID from URL
  const { id } = req.params

  try {
    // Mongoose Operation: Get Pet by ID
    const pet = await Pet.findById(id)

    // Check if Pet Exists
    if (!pet) {
      throw new Error()
    }

    // Successful Response: Pet
    res.status(200).json(pet)
  } catch (error) {
    res.status(404).json({ errors: ['Pet not found'] })
  }
}

// Main Operation: Schedule Visit
const scheduleVisit = async (req, res) => {
  // Get User Info from Token
  const user = req.user

  // Get Pet ID from URL
  const { id } = req.params

  try {
    // Mongoose Operation: Get Pet by ID
    const pet = await Pet.findById(id)

    // Check if Pet Exists
    if (!pet) {
      res.status(404).json({ errors: ['Pet not found'] })
      return
    }

    // Check if Pet Belongs to User
    if (pet.userId.equals(user._id)) {
      res
        .status(422)
        .json({ errors: ['You cannot schedule a visit with your own pet'] })
      return
    }

    // Check if Pet has a scheduled visit or is already Adopted
    if (pet.adopterId) {
      res.status(422).json({
        errors: ['The pet has a scheduled visit or is already adopted'],
      })
      return
    }

    // Schedule a Visit
    pet.adopterId = user._id

    // Mongoose Operation: Update Pet Changes
    await pet.save()

    // Successful Response: Pet with Message
    res.status(200).json({
      pet,
      message: 'The visit was successfully scheduled',
    })
  } catch (error) {
    res
      .status(500)
      .json({ errors: ['An error occurred, please try again later'] })
  }
}

// Main Operation: Unschedule Visit
const unscheduleVisit = async (req, res) => {
  // Get User Info from Token
  const user = req.user

  // Get Pet ID from URL
  const { id } = req.params

  try {
    // Mongoose Operation: Get Pet by ID
    const pet = await Pet.findById(id)

    // Check if Pet Exists
    if (!pet) {
      res.status(404).json({ errors: ['Pet not found'] })
      return
    }

    // Check if Pet is already Adopted
    if (!pet.available) {
      res.status(422).json({
        errors: ['The pet is already adopted'],
      })
      return
    }

    // Check if Pet does not have a Scheduled Visit
    if (!pet.adopterId) {
      res.status(422).json({
        errors: ['The pet does not have any scheduled visit'],
      })
      return
    }

    // Check if it is not the User or the Adopter
    if (!user._id.equals(pet.userId) && !user._id.equals(pet.adopterId)) {
      res.status(422).json({
        errors: ['You cannot cancel this visit'],
      })
      return
    }

    // Unschedule a Visit
    pet.adopterId = null

    // Mongoose Operation: Update Pet Changes
    await pet.save()

    // Successful Response: Pet with Message
    res.status(200).json({
      pet,
      message: 'The visit was cancelled',
    })
  } catch (error) {
    res
      .status(500)
      .json({ errors: ['An error occurred, please try again later'] })
  }
}

// Main Operation: Complete Adoption
const completeAdoption = async (req, res) => {
  // Get User Info from Token
  const user = req.user

  // Get Pet ID from URL
  const { id } = req.params

  try {
    // Mongoose Operation: Get Pet by ID
    const pet = await Pet.findById(id)

    // Check if Pet Exists
    if (!pet) {
      res.status(404).json({ errors: ['Pet not found'] })
      return
    }

    // Check if Pet has a Scheduled Visit
    if (!pet.adopterId) {
      res
        .status(422)
        .json({ errors: ['The pet does not have a scheduled visit'] })
      return
    }

    // Check if Pet Belongs to User
    if (!pet.userId.equals(user._id)) {
      res
        .status(403)
        .json({ errors: ['This pet does not belong to the current user'] })
      return
    }

    // Check if Pet is still Available
    if (!pet.available) {
      res
        .status(422)
        .json({ errors: ['The pet is no longer available for adoption'] })
      return
    }

    // Complete Adoption
    pet.available = false

    // Mongoose Operation: Update Pet Changes
    await pet.save()

    // Successful Response: Pet with Message
    res.status(200).json({
      pet,
      message: 'Congratulations, the adoption was completed successfully',
    })
  } catch (error) {
    res
      .status(500)
      .json({ errors: ['An error occurred, please try again later'] })
  }
}

module.exports = {
  registerPet,
  updatePet,
  deletePetById,
  getAllPets,
  getAllUserPets,
  getAllUserAdoptions,
  getPetById,
  scheduleVisit,
  unscheduleVisit,
  completeAdoption,
}
