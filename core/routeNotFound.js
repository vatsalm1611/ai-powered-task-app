// Middleware to handle requests to undefined routes
const notFound = (req, res) => {
  res.status(404).json({ msg: 'Route does not exist' })
}

module.exports = notFound
