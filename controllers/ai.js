const Task = require('../models/Task')
const asyncWrapper = require('../core/asyncWrapper')
const { parseTaskWithAI, analyzePriority, generateInsights, suggestNextTask } = require('../services/aiService')

// Parse natural language task input using AI
const parseTask = asyncWrapper(async (req, res) => {
  const { input } = req.body

  if (!input) {
    return res.status(400).json({ msg: 'Please provide task input' })
  }

  const result = await parseTaskWithAI(input)

  res.status(200).json(result)
})

// Create task from AI-parsed input
const createAITask = asyncWrapper(async (req, res) => {
  const { input } = req.body

  if (!input) {
    return res.status(400).json({ msg: 'Please provide task input' })
  }

  // Parse with AI
  const parseResult = await parseTaskWithAI(input)

  // Create task in database
  const task = await Task.create(parseResult.data)

  res.status(201).json({ 
    task, 
    aiUsed: parseResult.data.aiGenerated,
    warning: parseResult.warning 
  })
})

// Get AI-powered insights and analytics
const getInsights = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})

  if (tasks.length === 0) {
    return res.status(200).json({
      msg: 'No tasks found. Create some tasks to see insights!',
      statistics: {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        overdueTasks: 0,
        completionRate: 0,
      }
    })
  }

  const insights = await generateInsights(tasks)

  res.status(200).json(insights)
})

// Get AI suggestion for next task to work on
const getNextTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({ completed: false })

  if (tasks.length === 0) {
    return res.status(200).json({
      msg: 'No pending tasks! Time to relax or add new tasks.',
      nextTask: null
    })
  }

  const nextTask = suggestNextTask(tasks)

  res.status(200).json({
    msg: 'AI suggests working on this task next',
    nextTask,
    reason: 'Based on priority, due date, and estimated time'
  })
})

// Analyze and update priority for existing tasks
const analyzeTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({ completed: false })

  let updatedCount = 0

  for (const task of tasks) {
    const suggestedPriority = analyzePriority(task)
    
    if (task.priority !== suggestedPriority) {
      task.priority = suggestedPriority
      await task.save()
      updatedCount++
    }
  }

  res.status(200).json({
    msg: `AI analyzed ${tasks.length} tasks and updated ${updatedCount} priorities`,
    totalAnalyzed: tasks.length,
    updated: updatedCount
  })
})

module.exports = {
  parseTask,
  createAITask,
  getInsights,
  getNextTask,
  analyzeTasks,
}
