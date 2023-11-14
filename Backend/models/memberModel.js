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
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'none'],
      required: [true, 'Please select gender'],
    },
    category: {
      type: String,
      enum: ['child', 'teenager', 'adult'],
      required: [true, 'Please select gender'],
    },
    membershipStatus: {
      type: String,
      enum: ['completed', 'ongoing', 'paused', 'undone'],
      required: [true, 'Please select an option'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('member', memberSchema)
