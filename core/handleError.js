const { CustomAPIError } = require('./customError')

// Centralized error handling middleware
// Catches all errors and sends appropriate responses to client
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  
  // Log unexpected errors for debugging
  console.error('❌ Unexpected error:', err)
  
  return res.status(500).json({ 
    msg: 'Internal server error occurred while processing task operations.' 
  })
}

module.exports = errorHandlerMiddleware
