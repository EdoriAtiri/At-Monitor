const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController')

router.route('/').post(protect, createEvent)

router.route('/:id').patch(protect, updateEvent).delete(protect, deleteEvent)

module.exports = router
