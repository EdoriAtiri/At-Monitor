const mongoose = require('mongoose')

const registrarSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Admin',
    },
    // member: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'Member',
    // },
    fullName: {
      type: String,
      required: [true, 'Please add full name'],
    },
    email: {
      type: String,
    },
    hasAdminPrivilege: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      // required: [true, 'Please add a password'],
    },
    isActivated: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('registrar', registrarSchema)
