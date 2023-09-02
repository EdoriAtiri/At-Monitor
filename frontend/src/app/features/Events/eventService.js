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

const eventService = {
  getEvents,
}

export default eventService
