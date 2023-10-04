const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateToken = require('../lib/genToken')

const Admin = require('../models/adminModel')

// @desc Register a new admin
// @route /api/admins
// @access Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  // Validation
  if (!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('Please include all required fields')
  }

  // Check if admin exists
  const adminExists = await Admin.findOne({ email })

  if (adminExists) {
    res.status(400)
    throw new Error('Admin already exists')
  }

  //   check password length
  if (password.length < 8) {
    res.status(400)
    throw new Error('Password must be at least 8 characters')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create admin
  const admin = await Admin.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  })

  if (admin) {
    res.status(200).json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      token: generateToken(admin._id, '30d'),
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// @desc Login a new admin
// @route /api/admin/login
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })

  //  Check if admin and password match
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(200).json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      token: generateToken(admin._id, '30d'),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

module.exports = {
  registerAdmin,
  loginAdmin,
}
