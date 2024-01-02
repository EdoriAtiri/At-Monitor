const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const checkAdminPrivileges = require('../middleware/rolePrivilegeMiddleware')

const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEvent,
  updateRegister,
} = require('../controllers/eventController')

router.route('/').get(protect, getEvents).post(protect, createEvent)

router
  .route('/:id')
  .get(protect, getEvent)
  .patch(protect, checkAdminPrivileges, updateEvent)
  .delete(protect, deleteEvent)

router.route('/:id/registration').post(protect, updateRegister)

module.exports = router
