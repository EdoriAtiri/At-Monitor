const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const { createEvent } = require('../controllers/eventController')

router.route('/').post(protect, createEvent)

module.exports = router
