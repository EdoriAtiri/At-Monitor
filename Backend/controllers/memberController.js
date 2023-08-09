const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Member = require('../models/memberModel')
const Admin = require('../models/adminModel')

// @desc Register a new member
// @route /api/users
// @access Public
const registerMember = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const {
    fullName,
    phone,
    email,
    address,
    gender,
    category,
    membershipStatus,
  } = req.body

  // Validation
  if (
    !fullName ||
    !address ||
    !email ||
    !phone ||
    !gender ||
    !category ||
    !membershipStatus
  ) {
    req.statusCode(400)
    throw new Error('Please include all required fields')
  }

  //  Check if member is already registered
  const memberExists = await Member.findOne({ email })

  if (category === 'adult' && memberExists) {
    res.status(400)
    throw new Error('Member already exists')
  }

  // Create member
  const member = await Member.create({
    fullName,
    phone,
    email,
    address,
    gender,
    category,
    membershipStatus,
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

module.exports = {
  registerMember,
}
