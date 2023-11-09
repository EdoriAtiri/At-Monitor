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
  console.log(response.data)
  return response.data
}

// Create a Registrar
const createRegistrar = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, data, config)

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

// Delete a registrar
const deleteRegistrar = async (registrarId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + registrarId, config)

  return response.data
}

// Generate token for registrar activation link and password creation
const generateActivationToken = async (registrarId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + registrarId + '/generate', config)
  return response.data
}

const registrarService = {
  getRegistrars,
  getRegistrar,
  toggleRegistrarActivation,
  deleteRegistrar,
  createRegistrar,
  generateActivationToken,
}

export default registrarService
