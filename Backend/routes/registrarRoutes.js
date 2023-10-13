const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  createRegistrar,
  generateRegistrarToken,
  getRegistrarActivation,
  createRegistrarPassword,
  getRegistrars,
  getRegistrars,
  deleteRegistrar,
  toggleRegistrarActivation,
} = require('../controllers/RegistrarController')

router.route('/').post(protect, createRegistrar).get(protect, getRegistrars)

router
  .route('/:id')
  .get(protect, getRegistrar)
  // .patch(protect, createRegistrarPassword)
  .delete(protect, deleteRegistrar)

router.route('/:id/generate').get(protect, generateRegistrarToken)
router.route('/:token/activation').get(protect, getRegistrarActivation)
router.route('/:id/activation').patch(protect, toggleRegistrarActivation)
// set header for this
router.route('/:id/auth/create').patch(createRegistrarPassword)

module.exports = router
