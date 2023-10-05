const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  createRegistrar,
  generateRegistrarToken,
  getRegistrar,
  createRegistrarPassword,
  getRegistrars,
} = require('../controllers/RegistrarController')

router.route('/').post(protect, createRegistrar).get(protect, getRegistrars)

router.route('/:id').get(protect, getRegistrar)
// .patch(protect, createRegistrarPassword)
//   .delete(protect, deleteMember)

router.route('/:id/generate').get(protect, generateRegistrarToken)
router.route('/:id/auth/create').patch(createRegistrarPassword)

module.exports = router
