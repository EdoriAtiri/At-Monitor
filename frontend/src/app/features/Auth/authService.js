import axios from 'axios'
const API_URL = 'http://localhost:5000/api/admins'

// Signup admin
const signup = async (data) => {
  const response = await axios.post(API_URL, data)

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }

  return response.data
}

const authService = {
  signup,
}

export default authService