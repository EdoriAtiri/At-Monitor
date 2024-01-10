const isEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const isValidEmail = emailRegex.test(email)

  return isValidEmail
}

module.exports = isEmail
