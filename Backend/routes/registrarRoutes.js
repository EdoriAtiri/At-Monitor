const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const checkAdminPrivileges = require('../middleware/rolePrivilegeMiddleware')

const {
  createRegistrar,
  generateRegistrarToken,
  getRegistrarActivation,
  createRegistrarPassword,
  getRegistrar,
  getRegistrars,
  deleteRegistrar,
  toggleRegistrarActivation,
  toggleRegistrarPrivilege,
  editRegistrar,
} = require('../controllers/RegistrarController')

router
  .route('/')
  .post(protect, checkAdminPrivileges, createRegistrar)
  .get(protect, checkAdminPrivileges, getRegistrars)
  .patch(protect, editRegistrar)

router
  .route('/:id')
  .get(protect, checkAdminPrivileges, getRegistrar)
  .delete(protect, checkAdminPrivileges, deleteRegistrar)

router
  .route('/:id/generate')
  .get(protect, checkAdminPrivileges, generateRegistrarToken)

router
  .route('/:id/activation')
  .patch(protect, checkAdminPrivileges, toggleRegistrarActivation)

router
  .route('/:id/privilege')
  .patch(protect, checkAdminPrivileges, toggleRegistrarPrivilege)

router.route('/:token/activation').get(getRegistrarActivation)
// set header for this
router.route('/:id/auth/create').patch(createRegistrarPassword)

module.exports = router
