const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const Registrar = require('../models/registrarModel')

const checkAdminPrivileges = asyncHandler(async (req, res, next) => {
  try {
    // Get Admin using the Id in the jwt
    const adminId = req.admin?.id || req.registrar?.admin || ''
    const admin = await Admin.findById(adminId)
    const registrar = (await Registrar.findById(req.registrar?._id)) || ''

    // Check for admin
    if (!admin) {
      res.status(401)
      throw new Error('Not found')
    }

    // Check if req is by registrar and if they have admin privileges
    if (admin && registrar && !registrar.hasAdminPrivilege) {
      res.status(401)
      throw new Error('Not Authorized. Contact your admin')
    }

    next()
  } catch (error) {
    next(error)
  }
})

module.exports = checkAdminPrivileges
