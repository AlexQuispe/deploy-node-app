const express = require('express')
const cors = require('cors')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.PORT = process.env.PORT || 8080

const app = express()

// json parser
app.use(express.json())

// Set security options
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    preflightContinue: true,
    allowedHeaders: 'Authorization,Content-Type,Content-Length',
  }),
)

// Service to see the service status
app.get('/', (req, res) => {
  return res.json({ msg: `Service active in ${process.env.NODE_ENV} mode` })
})

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})

module.exports = app
