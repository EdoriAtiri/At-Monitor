const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  registerMember,
  updateMember,
  deleteMember,
  getMembers,
  getMember,
} = require('../controllers/memberController')
const checkAdminPrivileges = require('../middleware/rolePrivilegeMiddleware')

router.route('/').post(protect, checkAdminPrivileges, registerMember)
router.route('/').get(protect, getMembers)

router
  .route('/:id')
  .get(protect, checkAdminPrivileges, getMember)
  .patch(protect, checkAdminPrivileges, updateMember)
  .delete(protect, checkAdminPrivileges, deleteMember)

module.exports = router
