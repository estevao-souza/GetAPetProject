const { body } = require('express-validator')

// Register Validation
const registerValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('Name is a required field')
      .isLength({ min: 3 })
      .withMessage('Name must have at least 3 characters'),
    body('age')
      .isNumeric()
      .withMessage('Age is a required field and must be numeric'),
    body('weight')
      .isNumeric()
      .withMessage('Weight is a required field and must be numeric'),
    body('type').isString().withMessage('Type is a required field'),
    body('photos').custom((_, { req }) => {
      if (req.files.length === 0) {
        throw new Error('Photo is a required field')
      }
      return true
    }),
  ]
}

// Update Validation
const updateValidation = () => {
  return [
    body('name')
      .optional()
      .isLength({ min: 3 })
      .withMessage('Name must have at least 3 characters'),
    body('age').optional().isNumeric().withMessage('Age must be numeric'),
    body('weight').optional().isNumeric().withMessage('Weight must be numeric'),
    body('type').optional(),
  ]
}

module.exports = {
  registerValidation,
  updateValidation,
}
