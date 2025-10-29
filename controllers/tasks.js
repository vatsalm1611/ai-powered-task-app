const Task = require('../models/Task')
const asyncWrapper = require('../core/asyncWrapper')
const { createCustomError } = require('../core/customError')

// Fetch all tasks from database
const fetchTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks, count: tasks.length })
})

// Add a new task to the database
const addTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

// Retrieve a single task by its ID
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  
  if (!task) {
    return next(createCustomError(`Task with ID ${taskID} not found`, 404))
  }

  res.status(200).json({ task })
})

// Remove a task from the database
const removeTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  
  if (!task) {
    return next(createCustomError(`Task with ID ${taskID} not found`, 404))
  }
  
  res.status(200).json({ task, msg: 'Task deleted successfully' })
})

// Modify an existing task
const modifyTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`Task with ID ${taskID} not found`, 404))
  }

  res.status(200).json({ task })
})

// Search tasks by name (case-insensitive)
const searchTasks = asyncWrapper(async (req, res) => {
  const { name } = req.query
  
  if (!name) {
    return res.status(400).json({ msg: 'Please provide a search term' })
  }
  
  // Use regex for case-insensitive partial matching
  const tasks = await Task.find({
    name: { $regex: name, $options: 'i' }
  })
  
  res.status(200).json({ tasks, count: tasks.length })
})

module.exports = {
  fetchTasks,
  addTask,
  getSingleTask,
  modifyTask,
  removeTask,
  searchTasks,
}
