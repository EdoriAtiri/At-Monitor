const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEvent,
} = require('../controllers/eventController')

router.route('/').get(protect, getEvents).post(protect, createEvent)

router
  .route('/:id')
  .get(protect, getEvent)
  .patch(protect, updateEvent)
  .delete(protect, deleteEvent)

module.exports = router
