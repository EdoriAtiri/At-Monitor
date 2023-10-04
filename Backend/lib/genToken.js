const jwt = require('jsonwebtoken')

// Generate token
const generateToken = (id, expires) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expires,
  })
}

module.exports = generateToken
