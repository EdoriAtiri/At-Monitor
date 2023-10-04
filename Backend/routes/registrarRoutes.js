const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  createRegistrar,
  generateRegistrarToken,
} = require('../controllers/RegistrarController')

router.route('/').post(protect, createRegistrar)

// router
//   .route('/:id')
//   //   .get(protect, getEvent)
//   .patch(protect, updateMember)
//   .delete(protect, deleteMember)

router.route('/:id/generate').get(protect, generateRegistrarToken)

module.exports = router
