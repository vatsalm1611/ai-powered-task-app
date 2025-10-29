const mongoose = require('mongoose')

// Enhanced Task schema with AI-powered features
// Supports natural language input and intelligent task management
const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Task name is required'],
      trim: true,
      maxlength: [200, 'Task name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // AI-powered priority: High, Medium, Low
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    // AI-generated category
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Shopping', 'Health', 'Learning', 'Other'],
      default: 'Other',
    },
    // Due date parsed from natural language
    dueDate: {
      type: Date,
    },
    // AI-estimated completion time in minutes
    estimatedTime: {
      type: Number,
      min: 0,
    },
    // Flag indicating if task was created via AI
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    // Original natural language input
    originalInput: {
      type: String,
    },
    // Tags for better organization
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
  }
)

// Index for faster queries
TaskSchema.index({ priority: 1, dueDate: 1 })
TaskSchema.index({ category: 1 })
TaskSchema.index({ completed: 1 })

module.exports = mongoose.model('Task', TaskSchema)
