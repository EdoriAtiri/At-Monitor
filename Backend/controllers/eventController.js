const asyncHandler = require('express-async-handler')

const Admin = require('../models/adminModel')
const Event = require('../models/EventModel')

// @desc Create a new event
// @route /api/events
// @access Private
const createEvent = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  const { eventName, eventDate, description, linkId, registered } = req.body

  if (!eventName || !eventDate) {
    res.status(400)
    throw new Error('Please add event name and date to create event')
  }

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const event = await Event.create({
    admin: req.admin.id,
    eventName,
    eventDate,
    description,
    linkId,
    registered,
  })

  res.status(201).json(event)
})

// @desc Get all admin events
// @route /api/events
// @access Private
const getEvents = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const events = await Event.find({ admin: req.admin.id })

  res.status(200).json(events)
})

// @desc Get an event
// @route /api/events/:id
// @access Private
const getEvent = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const thisEvent = await Event.findById(req.params.id)

  if (!thisEvent) {
    res.status(401)
    throw new Error('Event not found')
  }

  //   Check that the admin that created the event matches the admin making the get request
  if (req.admin.id !== thisEvent.admin.toString()) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(thisEvent)
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

// @desc Delete an event
// @route /api/events/:id
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const thisEvent = await Event.findById(req.params.id)

  if (!thisEvent) {
    res.status(404)
    throw new Error('Event not found')
  }

  if (thisEvent.admin.toString() !== req.admin.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await thisEvent.deleteOne()

  res.status(200).json({ success: true })
})

// @desc update an event register
// @route /api/events/:id/register
// @access Private
const updateRegister = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const admin = await Admin.findById(req.admin.id)
  console.log(req.body)
  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const thisEvent = await Event.findById(req.params.id)

  if (!thisEvent) {
    res.status(404)
    throw new Error('Event not found')
  }

  /* todo: add function to check if event has passed. if it has prevent register update */

  const updateEventRegister = await Event.updateOne(
    { _id: req.params.id },
    { $push: { registered: req.body } }
  )

  res.status(201).json({ success: true })
})

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateRegister,
}
