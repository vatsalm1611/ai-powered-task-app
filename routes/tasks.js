const express = require('express')
const router = express.Router()

const {
  fetchTasks,
  addTask,
  getSingleTask,
  modifyTask,
  removeTask,
  searchTasks,
} = require('../controllers/tasks')

// Base routes for all tasks
router.route('/').get(fetchTasks).post(addTask)

// Search route - must come before /:id to avoid route conflicts
router.route('/search').get(searchTasks)

// Individual task routes
router.route('/:id').get(getSingleTask).patch(modifyTask).delete(removeTask)

module.exports = router
