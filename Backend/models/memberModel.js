const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(
  {
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
      required: [true, 'Please add an Email'],
    },
    address: {
      type: String,
      required: [true, 'Please add a address'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Please select gender'],
    },
    category: {
      type: String,
      enum: ['Child', 'Teenager', 'Adult'],
      required: [true, 'Please select gender'],
    },
    membershipStatus: {
      type: String,
      enum: ['Completed', 'In Progress', 'Paused', 'Not Started'],
      required: [true, 'Please select an option'],
    },
    FirstTimer: {
      type: Boolean,
      required: [true, 'Please indicate'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('member', memberSchema)
