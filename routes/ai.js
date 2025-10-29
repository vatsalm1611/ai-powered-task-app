const express = require('express')
const router = express.Router()

const {
  parseTask,
  createAITask,
  getInsights,
  getNextTask,
  analyzeTasks,
} = require('../controllers/ai')

// Parse natural language input (preview without creating)
router.post('/parse', parseTask)

// Create task from natural language input
router.post('/create', createAITask)

// Get AI insights and analytics
router.get('/insights', getInsights)

// Get AI suggestion for next task
router.get('/next-task', getNextTask)

// Analyze and update task priorities
router.post('/analyze', analyzeTasks)

module.exports = router
