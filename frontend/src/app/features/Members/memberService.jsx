import axios from 'axios'

const API_URL = 'http://localhost:5000/api/members/'

// Get admin members
const getMembers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  console.log(response.data)
  return response.data
}

const memberService = {
  getMembers,
}

export default memberService
