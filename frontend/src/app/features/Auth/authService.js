const API_URL = '/api/admins'

// Signup admin
const signup = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  try {
    const response = await fetch(API_URL, options)

    if (!response.ok) {
      const message = `An error occurred: ${response.status}, ${response.statusText}`
      throw new Error(message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}

const authService = {
  signup,
}

export default authService
