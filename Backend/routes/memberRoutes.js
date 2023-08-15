const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  registerMember,
  updateMember,
  deleteMember,
} = require('../controllers/memberController')

router.route('/').post(protect, registerMember)

router
  .route('/:id')
  //   .get(protect, getEvent)
  .patch(protect, updateMember)
  .delete(protect, deleteMember)

router.route('/:id/update').post(protect, updateMember)

module.exports = router
