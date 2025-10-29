// Wrapper function to handle async operations and catch errors
// This eliminates the need for try-catch blocks in every controller
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = asyncWrapper
