const asyncHandler = require('express-async-handler')

const Admin = require('../models/adminModel')
const Event = require('../models/EventModel')

// @desc Create a new event
// @route /api/events
// @access Public
const createEvent = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const { eventName, eventDate, description, linkId } = req.body
  const admin = await Admin.findById(req.admin.id)

  if (!eventName || !eventDate) {
    res.status(400)
    throw new Error('Please add event name and date to create event')
  }

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const event = await Event.create({
    eventName,
    eventDate,
    description,
    linkId,
    admin: req.admin.id,
  })

  res.status(201).json(event)
})

module.exports = {
  createEvent,
}
