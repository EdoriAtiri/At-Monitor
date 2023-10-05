const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateToken = require('../lib/genToken')

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
  const admin = await Admin.findById(req.admin.id)

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
  // if (password.length < 8) {
  //   res.status(400)
  //   throw new Error('Password must be at least 8 characters')
  // }

  // Hash Password
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)

  // Create registrar
  const registrar = await Registrar.create({
    admin: req.admin.id,
    member: memberExists._id,
    fullName,
    email,
  })

  if (registrar) {
    res.status(200).json({
      _id: registrar._id,
      member: registrar.member,
      admin: registrar.admin,
      fullName: registrar.fullName,
      email: registrar.email,
      token: generateToken(registrarExists._id, '1d'),
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// @desc generate a token for link for a user to create a password for themselves
// @route /api/registrarToken
// @access Public
const generateRegistrarToken = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  // check if admin
  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  // Get id from request body and check if exists, throw error if not
  const { id } = req.params

  const registrarExists = await Registrar.findById(id)

  if (!registrarExists) {
    res.status(400)
    throw new Error('Registrar does not exist')
  }

  // if registrar exists return a token to the admin
  if (registrarExists) {
    res.status(200).json({ token: generateToken(registrarExists._id, '1d') })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// @desc get registrar
// @route /api/registrar/:id
// @access Public
const getRegistrar = asyncHandler(async (req, res) => {
  // Get token from params
  const token = req.params.id
  // Verify and decode the token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  // Find the registrar
  const registrar = await Registrar.findById(decodedToken.id)

  // If the registrar is found return registrar id, name and email, else return error
  if (registrar) {
    res.status(200).json({
      id: registrar._id,
      fullName: registrar.fullName,
      email: registrar.email,
    })
  } else {
    res.status(400)
    throw new Error('An error has occurred, contact administrator')
  }
})

// @desc get all registrars
// @route /api/registrar/
// @access Public
const getRegistrars = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const registrars = await Registrar.find({ admin: req.admin.id })

  res.status(200).json(registrars)
})

// @desc create registrar password
// @route /api/registrar/:id/createauth
// @access Public
const createRegistrarPassword = asyncHandler(async (req, res) => {
  // Find the registrar
  const registrar = await Registrar.findById(req.params.id)

  // check for registrar
  if (!registrar) {
    res.status(401)
    throw new Error('Registrar not found')
  }
  const { password } = req.body

  //   check password length
  if (password.length < 8) {
    res.status(400)
    throw new Error('Password must be at least 8 characters')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create registrar password
  const updatedRegistrar = await Registrar.findByIdAndUpdate(
    req.params.id,
    { password: hashedPassword },
    {
      new: true,
    }
  )

  if (updatedRegistrar) {
    res.status(201).json({
      id: registrar._id,
      member: registrar.member,
      fullName: registrar.fullName,
      email: registrar.email,
      isAdmin: registrar.isAdmin,
      token: generateToken(registrar._id, '1d'),
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

module.exports = {
  createRegistrar,
  generateRegistrarToken,
  getRegistrar,
  getRegistrars,
  createRegistrarPassword,
}
