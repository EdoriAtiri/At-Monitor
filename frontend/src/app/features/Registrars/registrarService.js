import axios from 'axios'

const API_URL = 'http://localhost:5000/api/registrars/'

const getRegistrars = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get a Registrar
const getRegistrar = async (registrarId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + registrarId, config)

  return response.data
}

// Toggle Registrar Activation
const toggleRegistrarActivation = async (data, registrarId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.patch(
    `${API_URL}${registrarId}/activation`,
    data,
    config
  )

  return response.data
}

// Delete an event
const deleteRegistrar = async (registrarId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + registrarId, config)

  return response.data
}

const registrarService = {
  getRegistrars,
  getRegistrar,
  toggleRegistrarActivation,
  deleteRegistrar,
}

export default registrarService
