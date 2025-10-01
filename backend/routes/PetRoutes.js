const express = require('express')

// Controller
const {
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
} = require('../controllers/PetController')

// Middlewares
const { imageUpload } = require('../middlewares/imageUpload')
const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidation')
const {
  registerValidation,
  updateValidation,
} = require('../middlewares/petValidations')

// Routes
const router = express.Router()
router.get('/', getAllPets)
router.get('/user', authGuard, getAllUserPets)
router.get('/user/adoptions', authGuard, getAllUserAdoptions)
router.get('/:id', getPetById)
router.post(
  '/',
  authGuard,
  imageUpload.array('photos'),
  registerValidation(),
  validate,
  registerPet
)
router.patch(
  '/:id',
  authGuard,
  imageUpload.array('photos'),
  updateValidation(),
  validate,
  updatePet
)
router.patch('/schedule/:id', authGuard, scheduleVisit)
router.patch('/unschedule/:id', authGuard, unscheduleVisit)
router.patch('/complete-adoption/:id', authGuard, completeAdoption)
router.delete('/:id', authGuard, deletePetById)

module.exports = router
