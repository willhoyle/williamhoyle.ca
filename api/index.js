const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const pages = require('./routes/pages')

// Import API Routes
app.use("/pages", pages)

// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
}