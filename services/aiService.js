const { GoogleGenerativeAI } = require('@google/generative-ai')

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

// AI Feature 1: Parse natural language task input
const parseTaskWithAI = async (naturalLanguageInput) => {
  try {
    const prompt = `
You are a task management assistant. Parse the following task input and extract structured data.

Task Input: "${naturalLanguageInput}"

Extract and return ONLY a JSON object with these fields:
{
  "name": "clean task name (string)",
  "description": "detailed description if mentioned (string or null)",
  "priority": "High/Medium/Low based on urgency keywords",
  "category": "Work/Personal/Shopping/Health/Learning/Other",
  "dueDate": "ISO date string if mentioned, else null",
  "estimatedTime": "estimated minutes as number, else null",
  "tags": ["array", "of", "relevant", "tags"]
}

Rules:
- Priority: "urgent", "asap", "important" = High; "soon", "this week" = Medium; else Low
- Category: infer from context
- dueDate: parse relative dates (today, tomorrow, next week, Friday, etc.)
- estimatedTime: estimate based on task complexity
- Return ONLY valid JSON, no markdown or explanations
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Clean the response and parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response')
    }
    
    const parsedData = JSON.parse(jsonMatch[0])
    
    return {
      success: true,
      data: {
        ...parsedData,
        aiGenerated: true,
        originalInput: naturalLanguageInput,
      },
    }
  } catch (error) {
    console.error('AI parsing error:', error)
    
    // Fallback: basic parsing
    return {
      success: true,
      data: {
        name: naturalLanguageInput,
        priority: 'Medium',
        category: 'Other',
        aiGenerated: false,
      },
      warning: 'Using fallback parsing - AI unavailable',
    }
  }
}

// AI Feature 2: Smart task prioritization
const analyzePriority = (task) => {
  let score = 0
  const taskText = `${task.name} ${task.description || ''}`.toLowerCase()
  
  // Urgency keywords
  const urgentKeywords = ['urgent', 'asap', 'emergency', 'critical', 'immediately', 'now']
  const importantKeywords = ['important', 'priority', 'deadline', 'meeting', 'presentation']
  
  // Check for urgent keywords
  urgentKeywords.forEach(keyword => {
    if (taskText.includes(keyword)) score += 3
  })
  
  // Check for important keywords
  importantKeywords.forEach(keyword => {
    if (taskText.includes(keyword)) score += 2
  })
  
  // Due date proximity
  if (task.dueDate) {
    const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
    if (daysUntilDue <= 1) score += 5
    else if (daysUntilDue <= 3) score += 3
    else if (daysUntilDue <= 7) score += 1
  }
  
  // Determine priority
  if (score >= 5) return 'High'
  if (score >= 2) return 'Medium'
  return 'Low'
}

// AI Feature 3: Generate insights and analytics
const generateInsights = async (tasks) => {
  try {
    // Calculate statistics
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.completed).length
    const pendingTasks = totalTasks - completedTasks
    const overdueTasks = tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
    ).length
    
    // Priority breakdown
    const highPriority = tasks.filter(t => t.priority === 'High' && !t.completed).length
    const mediumPriority = tasks.filter(t => t.priority === 'Medium' && !t.completed).length
    const lowPriority = tasks.filter(t => t.priority === 'Low' && !t.completed).length
    
    // Category breakdown
    const categoryStats = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    }, {})
    
    // Calculate completion rate
    const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0
    
    // Get AI-generated summary and recommendations
    const prompt = `
You are a productivity coach analyzing task management data. Provide insights and recommendations.

Statistics:
- Total Tasks: ${totalTasks}
- Completed: ${completedTasks}
- Pending: ${pendingTasks}
- Overdue: ${overdueTasks}
- High Priority Pending: ${highPriority}
- Completion Rate: ${completionRate}%

Category Distribution: ${JSON.stringify(categoryStats)}

Generate:
1. A brief summary (2-3 sentences)
2. Top 3 actionable recommendations
3. Productivity tip

Return as JSON:
{
  "summary": "string",
  "recommendations": ["rec1", "rec2", "rec3"],
  "productivityTip": "string",
  "motivationalQuote": "string"
}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const aiInsights = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      summary: 'Keep up the good work on managing your tasks!',
      recommendations: ['Focus on high-priority tasks first', 'Set realistic deadlines', 'Break large tasks into smaller ones'],
      productivityTip: 'Use the 2-minute rule: if it takes less than 2 minutes, do it now.',
      motivationalQuote: 'The secret of getting ahead is getting started.'
    }
    
    return {
      success: true,
      statistics: {
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks,
        completionRate: parseFloat(completionRate),
        priorityBreakdown: {
          high: highPriority,
          medium: mediumPriority,
          low: lowPriority,
        },
        categoryStats,
      },
      aiInsights,
      nextActions: tasks
        .filter(t => !t.completed)
        .sort((a, b) => {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        })
        .slice(0, 3),
    }
  } catch (error) {
    console.error('AI insights error:', error)
    
    return {
      success: false,
      error: 'Failed to generate insights',
    }
  }
}

// Suggest next task to work on
const suggestNextTask = (tasks) => {
  const pendingTasks = tasks.filter(t => !t.completed)
  
  if (pendingTasks.length === 0) {
    return null
  }
  
  // Score each task
  const scoredTasks = pendingTasks.map(task => {
    let score = 0
    
    // Priority weight
    if (task.priority === 'High') score += 100
    else if (task.priority === 'Medium') score += 50
    else score += 10
    
    // Due date weight
    if (task.dueDate) {
      const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
      if (daysUntilDue <= 0) score += 200 // Overdue
      else if (daysUntilDue <= 1) score += 150 // Due today/tomorrow
      else if (daysUntilDue <= 3) score += 80
      else if (daysUntilDue <= 7) score += 40
    }
    
    // Shorter tasks get slight boost (for quick wins)
    if (task.estimatedTime && task.estimatedTime <= 30) {
      score += 20
    }
    
    return { task, score }
  })
  
  // Sort by score and return top task
  scoredTasks.sort((a, b) => b.score - a.score)
  return scoredTasks[0].task
}

module.exports = {
  parseTaskWithAI,
  analyzePriority,
  generateInsights,
  suggestNextTask,
}
