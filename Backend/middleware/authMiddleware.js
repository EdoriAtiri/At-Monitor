const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get admin from token
      req.admin = (await Admin.findById(decoded.id).select('-password')) || null
      req.user = (await User.findById(decoded.id).select('-password')) || null

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized')
  }
})

module.exports = { protect }
