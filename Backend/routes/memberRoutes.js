const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  registerMember,
  updateMember,
} = require('../controllers/memberController')

router.route('/').post(protect, registerMember)

router
  .route('/:id')
  //   .get(protect, getEvent)
  .patch(protect, updateMember)
//   .delete(protect, deleteEvent)

router.route('/:id/update').post(protect, updateMember)

module.exports = router
