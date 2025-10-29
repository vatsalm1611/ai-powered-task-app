// Custom error class to provide consistent error structure across the API
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

// Factory function to create custom errors with specific status codes
const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomAPIError }
