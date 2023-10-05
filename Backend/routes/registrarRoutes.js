const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  createRegistrar,
  generateRegistrarToken,
  getRegistrar,
  createRegistrarPassword,
} = require('../controllers/RegistrarController')

router.route('/').post(protect, createRegistrar)

router.route('/:id').get(protect, getRegistrar)
// .patch(protect, createRegistrarPassword)
//   .delete(protect, deleteMember)

router.route('/:id/generate').get(protect, generateRegistrarToken)
router.route('/:id/createauth').patch(createRegistrarPassword)

module.exports = router
