const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const generateToken = require('../lib/genToken')

const Admin = require('../models/adminModel')

// @desc Login admin/registrar
// @route /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
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
