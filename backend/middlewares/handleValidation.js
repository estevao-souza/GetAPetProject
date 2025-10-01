const { validationResult } = require('express-validator')

// Helpers
const {
  imageRemoval,
  imageArrayRemoval,
} = require('../helpers/images-storage-manager')

const validate = (req, res, next) => {
  // Express-Validator Operation: Get Request Errors
  const errors = validationResult(req)

  // Skip Operation if there is no Errors
  if (errors.isEmpty()) {
    return next()
  }

  // Map Errors into an Array
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push(err.msg))

  // Segment Image Removal from Local Storage by Endpoint Path
  if (req.baseUrl.includes('users')) {
    const photo = req.file
    if (photo) {
      imageRemoval('users', photo.filename)
    }
  } else if (req.baseUrl.includes('pets')) {
    const photos = req.files
    if (photos && photos.length > 0) {
      imageArrayRemoval(photos.map((photo) => photo.filename))
    }
  }

  // Return 422 Error with a JSON Array
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = validate
