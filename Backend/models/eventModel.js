const mongoose = require('mongoose')

const registeredSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  fullName: String,
  email: String,
  phone: String,
  gender: String,
})

const eventSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Admin',
    },
    eventName: {
      type: String,
      required: [true, 'Please add an event name'],
    },
    eventDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    linkId: {
      type: String,
      required: true,
    },
    registered: [registeredSchema],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
