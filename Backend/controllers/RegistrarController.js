const asyncHandler = require('express-async-handler')

const Member = require('../models/memberModel')
const Registrar = require('../models/registrarModel')
const Admin = require('../models/adminModel')

// check if is member and completed membership status first
