const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Member = require('../models/memberModel')
const Registrar = require('../models/registrarModel')
const Admin = require('../models/adminModel')

// check if is member and completed membership status first

// @desc create a new registrar
// @route /api/registrar
// @access Public
const createRegistrar = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  //   const admin = await Admin.findById(req.admin.id)
  const admin = await Admin.findById(req.body.admin)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const { fullName, email, password } = req.body

  // Validation
  if (!fullName || !email) {
    res.status(400)
    throw new Error('Please include all required fields')
  }

  //  Check if already a registrar
  const registrarExists = await Registrar.findOne({ email })

  if (registrarExists) {
    res.status(400)
    throw new Error('Registrar already exists')
  }

  //  Check if a member
  const memberExists = await Member.findOne({ email })

  if (!memberExists) {
    res.status(400)
    throw new Error('Not a registered member of this organization')
  }

  //   Check membership status
  //   if(memberExists.membershipStatus !== 'completed') {
  //     res.status(400)
  //     throw new Error('Has not completed membership training')
  //   }

  //   check password length
  if (password.length < 8) {
    res.status(400)
    throw new Error('Password must be at least 8 characters')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create registrar
  const registrar = await Registrar.create({
    admin: req.body.admin,
    member: memberExists._id,
    fullName,
    email,
    hashedPassword,
  })

  if (registrar) {
    res.status(200).json({
      _id: registrar._id,
      member: registrar.member,
      admin: registrar.admin,
      fullName: registrar.fullName,
      email: registrar.email,
      token: generateToken(registrar._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  createRegistrar,
}
