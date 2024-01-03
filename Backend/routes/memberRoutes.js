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
  .get(protect, getMember)
  .patch(protect, updateMember)
  .delete(protect, deleteMember)

module.exports = router
