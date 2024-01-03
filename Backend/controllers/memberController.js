const asyncHandler = require('express-async-handler')

const Member = require('../models/memberModel')
const Admin = require('../models/adminModel')

// @desc Register a new member
// @route /api/users
// @access Public
const registerMember = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  const {
    fullName,
    phone,
    email,
    address,
    dob,
    gender,
    category,
    membershipStatus,
  } = req.body

  // Basic Validation
  if (
    !fullName ||
    !address ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !category ||
    !membershipStatus
  ) {
    res.status(400)
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
    admin: adminId,
    fullName,
    phone,
    email,
    address,
    dob,
    gender,
    category,
    membershipStatus,
  })

  if (member) {
    res.status(200).json({
      _id: member._id,
      admin: member.admin,
      fullName: member.fullName,
      phone: member.phone,
      email: member.email,
      dob: member.dob,
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

// @desc Get all members
// @route /api/members
// @access Private
const getMembers = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin
  const admin = await Admin.findById(adminId)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const members = await Member.find({ admin: adminId })

  res.status(200).json(members)
})

// @desc get member
// @route /api/members/:id/
// @access Public
const getMember = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  // Get id from params
  const id = req.params.id
  // Find member
  const member = await Member.findOne({ _id: id, admin: adminId })

  // If the member is found return member id, name and email, else return error
  if (member) {
    res.status(200).json({
      _id: member._id,
      fullName: member.fullName,
      email: member.email,
      admin: member.admin,
      phone: member.phone,
      dob: member.dob,
      address: member.address,
      gender: member.gender,
      category: member.category,
      membershipStatus: member.membershipStatus,
    })
  } else {
    res.status(400)
    throw new Error('An error has occurred, contact administrator')
  }
})

// @desc Update existing member record
// @route /api/users/id/update
// @access Public
const updateMember = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin
  const admin = await Admin.findById(adminId)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  // Check if member exists
  const memberId = await Member.findById(req.params.id)

  if (!memberId) {
    res.status(404)
    throw new Error('Member not found')
  }

  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(201).json(updatedMember)
})

// @desc Delete member record
// @route /api/users/id
// @access Public
const deleteMember = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin
  const admin = await Admin.findById(adminId)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  // Check if member exists
  const memberId = await Member.findById(req.params.id)

  if (!memberId) {
    res.status(404)
    throw new Error('Member not found')
  }

  memberId.deleteOne()

  res.status(200).json({ success: true })
})

module.exports = {
  registerMember,
  updateMember,
  deleteMember,
  getMembers,
  getMember,
}
