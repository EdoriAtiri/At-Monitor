const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const generateToken = require('../lib/genToken')

const Admin = require('../models/adminModel')
const Registrar = require('../models/registrarModel')

// @desc Login admin/registrar
// @route /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })
  const registrar = await Registrar.findOne({ email })

  // Check if admin or registrar exists
  if (!admin && !registrar) {
    res.status(401)
    throw new Error('Invalid Credentials')
  }

  // Check if account has been deactivated
  if (!registrar?.isActivated && registrar?.password) {
    res.status(401)
    throw new Error('Account deactivated, contact your admin for help')
  }

  // Check if registrar has a password
  if (registrar && !registrar?.password) {
    res.status(401)
    throw new Error(
      'Account has not been activated, contact your admin for help'
    )
  }

  //  Check if email and password match
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(200).json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      type: 'admin',
      token: generateToken(admin._id, '30d'),
    })
  } else if (
    registrar &&
    (await bcrypt.compare(password, registrar.password))
  ) {
    res.status(200).json({
      _id: registrar._id,
      firstName: registrar.fullName.split(' ')[0],
      lastName: registrar.fullName.split(' ')[1],
      email: registrar.email,
      admin: registrar.admin,
      type: 'registrar',
      hasAdminPrivilege: registrar.hasAdminPrivilege,
      token: generateToken(registrar._id, '30d'),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

module.exports = { login }
