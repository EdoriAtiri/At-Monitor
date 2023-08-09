const mongoose = require('mongoose')

const firstTimerData = mongoose.Schema(
  {
    isFirstTimer: {
      type: Boolean,
      default: false,
      required: [true, 'Please provide a response'],
    },
  },
  { timestamps: true }
)

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
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Please select gender'],
    },
    category: {
      type: String,
      enum: ['child', 'teenager', 'adult'],
      required: [true, 'Please select gender'],
    },
    membershipStatus: {
      type: String,
      enum: ['Completed', 'In Progress', 'Paused', 'Not Started'],
      required: [true, 'Please select an option'],
    },
    firstTimer: firstTimerData,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('member', memberSchema)
