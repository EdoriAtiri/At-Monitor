const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const { createRegistrar } = require('../controllers/RegistrarController')

router.route('/').post(protect, createRegistrar)

// router
//   .route('/:id')
//   //   .get(protect, getEvent)
//   .patch(protect, updateMember)
//   .delete(protect, deleteMember)

// router.route('/:id/update').post(protect, updateMember)

module.exports = router
