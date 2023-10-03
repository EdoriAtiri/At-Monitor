const mongoose = require('mongoose')

const memberSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Admin',
    },
    fullName: {
      type: String,
      required: [true, 'Please add full name'],
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('member', memberSchema)
