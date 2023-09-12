import axios from 'axios'

const API_URL = 'http://localhost:5000/api/events/'

// Get admin events
const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get an admin event
const getEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + eventId, config)

  return response.data
}

// Edit an admin event
const editEvent = async (updatedEvent, eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(API_URL + eventId, updatedEvent, config)

  return response.data
}

const eventService = {
  getEvents,
  getEvent,
  editEvent,
}

export default eventService
