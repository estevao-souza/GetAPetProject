const express = require('express')

// Routes
const router = express()
router.use('/api/users', require('./UserRoutes'))
router.use('/api/pets', require('./PetRoutes'))

module.exports = router
