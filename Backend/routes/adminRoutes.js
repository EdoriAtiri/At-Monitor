const express = require('express')
const router = express.Router()

const {
  registerAdmin,
  loginAdmin,
  editAdmin,
} = require('../controllers/adminController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerAdmin)
router.patch('/', protect, editAdmin)

router.post('/login', loginAdmin)

module.exports = router
