const asyncHandler = require('express-async-handler')

const Admin = require('../models/adminModel')
const Event = require('../models/eventModel')
const Registrar = require('../models/registrarModel')

// @desc Create a new event
// @route /api/events
// @access Private
const createEvent = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  const { eventName, eventDate, description, linkId, registered } = req.body

  if (!eventName || !eventDate) {
    res.status(400)
    throw new Error('Please add event name and date to create event')
  }

  const event = await Event.create({
    admin: adminId,
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
  const adminId = req.admin?.id || req.registrar.admin
  const admin = await Admin.findById(adminId)

  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const events = await Event.find({ admin: adminId })

  res.status(200).json(events)
})

// @desc Get an event
// @route /api/events/:id
// @access Private
const getEvent = asyncHandler(async (req, res) => {
  // Get Admin using the Id in the jwt
  const adminId = req.admin?.id || req.registrar.admin
  const admin = await Admin.findById(adminId)

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
  if (admin._id.toString() !== thisEvent.admin.toString()) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(thisEvent)
})

// @desc Update an event
// @route /api/events/:id
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  const eventId = await Event.findById(req.params.id)

  // If event does not exist return error message
  if (!eventId) {
    res.status(404)
    throw new Error('Event not found')
  }

  // If the event was not created by the admin trying to update it, disallow and return err
  if (eventId.admin.toString() !== adminId.toString()) {
    res.status(404)
    throw new Error('Not Authorized')
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(201).json(updatedEvent)
})

// @desc Delete an event
// @route /api/events/:id
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin

  const thisEvent = await Event.findById(req.params.id)

  // If event does not exist, return errorMessage
  if (!thisEvent) {
    res.status(404)
    throw new Error('Event not found')
  }

  // If the admin trying to delete event did not create it, deny them and return error
  if (thisEvent.admin.toString() !== adminId.toString()) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await thisEvent.deleteOne()

  res.status(200).json({ _id: req.params.id })
})

// @desc update an event register
// @route /api/events/:id/registration
// @access Private
const updateRegister = asyncHandler(async (req, res) => {
  // Get AdminId from req
  const adminId = req.admin?.id || req.registrar?.admin
  const admin = await Admin.findById(adminId)

  // Check if admin is authorized to perform action
  if (!admin) {
    res.status(401)
    throw new Error('Admin not found')
  }

  const thisEvent = await Event.findById(req.params.id)

  // Check if event exists
  if (!thisEvent) {
    res.status(404)
    throw new Error('Event not found')
  }

  // Check if a person with the same name and email has been registered already
  const registered = await thisEvent.registered
  const newPerson = registered.find(
    (reg) => reg.email === req.body.email && reg.fullName === req.body.fullName
  )
  if (newPerson) {
    res.status(404)
    throw new Error('Already registered this person')
  }

  /* todo: add function to check if event has passed. if it has prevent register update */
  function hasEventPassed(eventDate) {
    const currentDate = new Date()
    return currentDate > eventDate
  }

  if (hasEventPassed(thisEvent.eventDate)) {
    res.status(404)
    throw new Error('Event concluded. Registration not allowed.')
  }

  // Add new attendee to event register
  const updateEventRegister = await Event.updateOne(
    { _id: req.params.id },
    { $push: { registered: req.body } }
  )

  res.status(201).json(req.body)
})

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateRegister,
}
