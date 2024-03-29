import axios from "axios";
const API_URL = import.meta.env.VITE_BASEURL + "events/";

// Get admin events
const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log("get:" + response);

  return response.data;
};

// Get an admin event
const getEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + eventId, config);

  return response.data;
};

// create an event
const createEvent = async (newEventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, newEventData, config);

  return response.data;
};

// Edit an event
const editEvent = async (updatedEvent, eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(API_URL + eventId, updatedEvent, config);

  return response.data;
};

// Delete an event
const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + eventId, config);
  console.log("delete:" + response);

  return response.data;
};

// Update event register
const updateEventRegister = async (newAttendee, eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}${eventId}/registration`,
    newAttendee,
    config,
  );

  return response.data;
};

const eventService = {
  getEvents,
  getEvent,
  createEvent,
  editEvent,
  deleteEvent,
  updateEventRegister,
};

export default eventService;
