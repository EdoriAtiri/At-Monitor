const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// connect Database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('hello')
})

// Routes
// app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admins', require('./routes/adminRoutes'))
app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/members', require('./routes/memberRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log('Server started on port ' + PORT))
