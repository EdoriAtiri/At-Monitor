const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateToken = require('../lib/genToken')
const isEmail = require('../lib/isEmail')

const Member = require('../models/memberModel')
const Registrar = require('../models/registrarModel')
const Admin = require('../models/adminModel')

// check if is member and completed membership status first

// @desc create a new registrar
// @route /api/registrar
// @access Public
const createRegistrar = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  const { fullName, email } = req.body

  // Validation
  if (!fullName || !email) {
    res.status(400)
    throw new Error('Please include all required fields')
  }

  if (!isEmail(email)) {
    res.status(400)
    throw new Error('Please provide a valid email address')
  }

  //  Check if already a registrar
  const registrarExists = await Registrar.findOne({ email })

  if (registrarExists) {
    res.status(400)
    throw new Error('Registrar already exists')
  }

  /*  Check if a member
  const memberExists = await Member.findOne({ email })

  if (!memberExists) {
    res.status(400)
    throw new Error('Not a registered member of this organization')
  }

    Check membership status
    if(memberExists.membershipStatus !== 'completed') {
      res.status(400)
      throw new Error('Has not completed membership training')
    } */

  // Create registrar
  const registrar = await Registrar.create({
    admin: adminId,
    // member: memberExists._id,
    fullName,
    email,
  })

  if (registrar) {
    res.status(200).json({
      _id: registrar._id,
      // member: registrar.member,
      admin: registrar.admin,
      fullName: registrar.fullName,
      email: registrar.email,
      hasAdminPrivilege: registrar.hasAdminPrivilege,
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
  // Get id from request body and check if exists, throw error if not
  const { id } = req.params

  const registrarExists = await Registrar.findById(id)

  // check if registrar already has a password
  if (registrarExists.password) {
    res.status(403)
    throw new Error('This account is already activated')
  }

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

// @desc get registrar for password activation
// @route /api/registrar/:token/activation
// @access Public
const getRegistrarActivation = asyncHandler(async (req, res) => {
  // Get token from params
  const token = req.params.token
  // Verify and decode the token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  // Find the registrar
  const registrar = await Registrar.findById(decodedToken.id)

  // check if registrar already has a password
  if (registrar.password) {
    res.status(403)
    throw new Error('This account is already activated')
  }

  // If the registrar is found return registrar id, name and email, else return error
  if (registrar) {
    res.status(200).json({
      _id: registrar._id,
      fullName: registrar.fullName,
      email: registrar.email,
      hasAdminPrivilege: registrar.hasAdminPrivilege,
    })
  } else {
    res.status(400)
    throw new Error('An error has occurred, contact administrator')
  }
})

// @desc get registrar
// @route /api/registrar/:id/
// @access Public
const getRegistrar = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin
  const admin = await Admin.findById(adminId)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  // Get id from params
  const id = req.params.id
  // Find registrar
  const registrar = await Registrar.findOne({ _id: id, admin: adminId })

  // If the registrar is found return registrar id, name and email, else return error
  if (registrar) {
    res.status(200).json({
      _id: registrar._id,
      fullName: registrar.fullName,
      email: registrar.email,
      admin: registrar.admin,
      // member: registrar.member,
      hasAdminPrivilege: registrar.hasAdminPrivilege,
      isActivated: registrar.isActivated,
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
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin
  const admin = await Admin.findById(adminId)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const registrars = await Registrar.find({ admin: adminId }).select(
    '-password'
  )

  res.status(200).json(registrars)
})

// @desc edit registrar
// @route /api/registrar/
// @access Public
const editRegistrar = asyncHandler(async (req, res) => {
  // Get registrar from req
  const registrar = await Registrar.findById(req.registrar._id)
  console.log(req.registrar._id)

  if (!registrar) {
    res.status(401)
    throw new Error('Registrar not found')
  }

  const { fullName, email, hasAdminPrivilege, isActivated } = req.body

  if (!fullName || !email) {
    res.status(400)
    throw new Error('Fields cannot be empty')
  }

  if (!isEmail(email)) {
    res.status(400)
    throw new Error('Please provide a valid email address')
  }

  if (hasAdminPrivilege || isActivated) {
    res.status(403)
    throw new Error('Not Allowed')
  }

  const updatedRegistrar = await Registrar.findByIdAndUpdate(
    req.registrar._id,
    { fullName: fullName, email: email },
    {
      new: true,
    }
  )

  res.status(200).json({
    fullName: updatedRegistrar.fullName,
    email: updatedRegistrar.email,
  })
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

  if (registrar.password) {
    res.status(401)
    throw new Error('Operation already completed')
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
    { password: hashedPassword, isActivated: true },
    {
      new: true,
    }
  )

  if (updatedRegistrar) {
    res.status(201).json({
      _id: registrar._id,
      // member: registrar.member,
      fullName: registrar.fullName,
      email: registrar.email,
      hasAdminPrivilege: registrar.hasAdminPrivilege,
      token: generateToken(registrar._id, '1d'),
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// @desc Delete registrar record
// @route /api/registrars/id
// @access Public
const deleteRegistrar = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  // Check if Registrar exists
  const registrarId = await Registrar.findById(req.params.id)

  if (!registrarId) {
    res.status(404)
    throw new Error('Registrar not found')
  }

  registrarId.deleteOne()

  res.status(200).json({ success: true })
})

// @desc toggle registrar activation
// @route /api/registrars/id/activation
// @access Public
const toggleRegistrarActivation = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  // Check if Registrar exists
  const registrarId = await Registrar.findById(req.params.id)

  // Check if Registrar has password
  if (registrarId && !registrarId.password) {
    res.status(403)
    throw new Error(
      'Cannot activate a registrar until the registrar activates themselves. Generate a token and forward it to the registrar.'
    )
  }

  if (!registrarId) {
    res.status(404)
    throw new Error('Registrar not found')
  }

  // check if request data type is boolean
  if (typeof req.body.isActivated !== 'boolean') {
    res.status(400)
    throw new Error('Invalid data type')
  }

  await Registrar.findByIdAndUpdate(
    req.params.id,
    { isActivated: req.body.isActivated },
    {
      new: true,
    }
  )
  res.status(200).json({ success: true })
})

// @desc toggle registrar hasAdminPrivileges
// @route /api/registrars/id/privilege
// @access Public
const toggleRegistrarPrivilege = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  // Check if Registrar exists
  const registrarId = await Registrar.findById(req.params.id)

  if (!registrarId) {
    res.status(404)
    throw new Error('Registrar not found')
  }

  // Check if Registrar is activated
  if (registrarId && !registrarId.isActivated) {
    res.status(403)
    throw new Error(
      'Cannot toggle admin privilege until user has activated their registrar profile.'
    )
  }

  // check if request data type is boolean
  if (typeof req.body.hasAdminPrivilege !== 'boolean') {
    res.status(400)
    throw new Error('Invalid data type')
  }

  await Registrar.findByIdAndUpdate(
    req.params.id,
    { hasAdminPrivilege: req.body.hasAdminPrivilege },
    {
      new: true,
    }
  )
  res.status(200).json({ success: true })
})

module.exports = {
  createRegistrar,
  getRegistrar,
  getRegistrars,
  deleteRegistrar,
  toggleRegistrarActivation,
  toggleRegistrarPrivilege,
  getRegistrarActivation,
  generateRegistrarToken,
  createRegistrarPassword,
  editRegistrar,
}
