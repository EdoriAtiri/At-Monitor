const asyncHandler = require('express-async-handler')

const Member = require('../models/memberModel')
const Registrar = require('../models/registrarModel')
const Admin = require('../models/adminModel')

// check if is member and completed membership status first

// @desc create a new registrar
// @route /api/registrar
// @access Public
const createRegistrar = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const { fullName, email } = req.body

  // Validation
  if (!fullName || !email) {
    res.status(400)
    throw new Error('Please include all required fields')
  }

  //  Check if already a registrar
  const registrarExists = await Member.findOne({ email })

  if (registrarExists) {
    res.status(400)
    throw new Error('Registration already exists')
  }

  //  Check if a member
  const memberExists = await Member.findOne({ email })

  if (!memberExists) {
    res.status(400)
    throw new Error('Not a registered member')
  }

  //   Check membership status
  //   if(memberExists.membershipStatus !== 'completed') {
  //     res.status(400)
  //     throw new Error('Has not completed membership training')
  //   }

  // Create member
  const member = await Member.create({
    admin: req.admin.id,
    fullName,
    email,
  })

  if (member) {
    res.status(200).json({
      _id: member._id,
      fullName: member.fullName,
      phone: member.phone,
      email: member.email,
      address: member.address,
      gender: member.gender,
      category: member.category,
      membershipStatus: member.membershipStatus,
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})
