const asyncHandler = require('express-async-handler')

const Admin = require('../models/adminModel')
const Event = require('../models/EventModel')

// @desc Create a new event
// @route /api/events
// @access Private
const createEvent = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  const { eventName, eventDate, description, linkId } = req.body

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

// @desc Update an event
// @route /api/events/:id
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const eventId = await Event.findById(req.params.id)

  if (!eventId) {
    res.status(404)
    throw new Error('Event not found')
  }

  //   if (event.admin !== admin) {
  //     res.status(404)
  //     throw new Error('Not Authorized')
  //   }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(201).json(updatedEvent)
})

module.exports = {
  createEvent,
  updateEvent,
}
