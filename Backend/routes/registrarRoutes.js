const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  createRegistrar,
  generateRegistrarToken,
  getRegistrar,
} = require('../controllers/RegistrarController')

router.route('/').post(protect, createRegistrar)

router.route('/:id').get(protect, getRegistrar)
//   .patch(protect, updateMember)
//   .delete(protect, deleteMember)

router.route('/:id/generate').get(protect, generateRegistrarToken)

module.exports = router
