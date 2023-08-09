const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const { registerMember } = require('../controllers/memberController')

router.route('/').post(protect, registerMember)

// router
//   .route('/:id')
//   .get(protect, getEvent)
//   .patch(protect, updateEvent)
//   .delete(protect, deleteEvent)

module.exports = router
