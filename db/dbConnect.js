const mongoose = require('mongoose')

// Establish connection to MongoDB Atlas
// Handle DB connection gracefully to prevent app crash
const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB
