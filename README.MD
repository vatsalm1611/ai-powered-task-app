# 🤖 TaskMate AI

**Your Intelligent Task Management Companion**

TaskMate AI is a smart task management system powered by **Google Gemini AI**. Create tasks using natural language, get intelligent priority suggestions, and receive personalized productivity insights!

## ✨ AI Features

### 1. 🧠 Natural Language Task Creation
- **Create tasks conversationally**: "Remind me to submit assignment next Friday at 5pm"
- AI automatically extracts:
  - Task name
  - Priority (High/Medium/Low)
  - Category (Work/Personal/Shopping/Health/Learning)
  - Due date (from natural language)
  - Estimated time
  - Relevant tags

### 2. 🎯 Smart Task Prioritization
- AI analyzes keywords and context to assign priorities
- Automatically detects urgent vs. important tasks
- Considers due date proximity
- Updates priorities based on task complexity

### 3. 📊 AI-Powered Insights & Analytics
- **Weekly AI summaries** of your productivity
- **Personalized recommendations** based on your patterns
- **"What to work on next"** suggestions
- Productivity tips tailored to your work style
- Motivational quotes from AI

## 🚀 Additional Features

- ✅ Full CRUD operations for managing tasks
- 🔍 Search functionality to filter tasks by name
- ⏰ Automatic timestamps for task creation and updates
- 🛡️ Custom middleware for error handling
- 🎨 Beautiful React UI with modern design
- 📱 Responsive design for all devices
- ☁️ Ready to deploy on Render / Railway with MongoDB Atlas

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **AI**: Google Gemini AI (generative-ai)
- **Tools**: Postman, Nodemon, Dotenv, CORS

### Frontend
- **Library**: React 19
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Styling**: Custom CSS with modern gradients & animations

## API Endpoints

### Task Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | Get all tasks |
| POST | `/api/v1/tasks` | Create a new task |
| GET | `/api/v1/tasks/:id` | Get a single task by ID |
| PATCH | `/api/v1/tasks/:id` | Update a task |
| DELETE | `/api/v1/tasks/:id` | Delete a task |
| GET | `/api/v1/tasks/search?name=keyword` | Search tasks by name |

### AI Endpoints (NEW! 🤖)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/ai/parse` | Parse natural language input (preview) |
| POST | `/api/v1/ai/create` | Create task from natural language |
| GET | `/api/v1/ai/insights` | Get AI-powered analytics & insights |
| GET | `/api/v1/ai/next-task` | Get AI suggestion for next task |
| POST | `/api/v1/ai/analyze` | Analyze and update task priorities |

## How to Run

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-powered-task-app
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   PORT=5000
   GEMINI_API_KEY=<your_gemini_api_key>
   ```

4. **Get your Gemini API Key (FREE)**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Click "Get API Key"
   - Copy and paste into `.env`

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ✅ MongoDB connection established successfully
   🚀 Server active on port: 5000
   ```

### Frontend Setup

6. **Open a new terminal** and navigate to client folder:
   ```bash
   cd client
   ```

7. **Install frontend dependencies**
   ```bash
   npm install
   ```

8. **Start the React app**
   ```bash
   npm start
   ```
   
   App will open at `http://localhost:3000`

### 🎉 You're Ready!

Now you have:
- **Backend** running on `http://localhost:5000`
- **Frontend** running on `http://localhost:3000`
- **AI** powered by Gemini

## 🎯 How to Use AI Features

### 1. Natural Language Task Creation

Simply type in plain English:
- "Buy groceries tomorrow at 5pm"
- "Urgent: Submit project report by Friday"
- "Call mom this evening"
- "Workout for 30 minutes daily"

The AI will automatically:
- ✅ Extract the task name
- 🎯 Assign appropriate priority
- 📅 Parse the due date
- ⏱️ Estimate completion time
- 🏷️ Categorize the task

### 2. AI Task Analysis

Click the **"Analyze Tasks"** button to:
- Update priorities based on current urgency
- Identify overdue tasks
- Reorder by importance

### 3. View AI Insights

The sidebar shows:
- 📊 Real-time statistics
- 🤖 AI-generated summary
- ✨ Personalized recommendations
- 🔥 "What to work on next" suggestion
- 💡 Productivity tips

## Example API Requests

**Create Task with AI (POST `/api/v1/ai/create`)**
```json
{
  "input": "Urgent: Complete project report by Friday 5pm"
}
```

**Response:**
```json
{
  "task": {
    "_id": "...",
    "name": "Complete project report",
    "priority": "High",
    "category": "Work",
    "dueDate": "2025-11-01T17:00:00.000Z",
    "estimatedTime": 120,
    "aiGenerated": true
  },
  "aiUsed": true
}
```

**Get AI Insights (GET `/api/v1/ai/insights`)**
```json
{
  "statistics": {
    "totalTasks": 15,
    "completedTasks": 8,
    "pendingTasks": 7,
    "overdueTasks": 2,
    "completionRate": 53.3
  },
  "aiInsights": {
    "summary": "You've completed 8 out of 15 tasks with a 53% completion rate...",
    "recommendations": [
      "Focus on 2 overdue tasks first",
      "Break down large tasks into subtasks",
      "Schedule high-priority items for morning"
    ],
    "productivityTip": "Use the 2-minute rule: if it takes less than 2 minutes, do it now."
  }
}
```

## Project Structure

```
ai-powered-task-app/
├── client/              # React Frontend
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   └── App.css      # Modern CSS styles
│   └── package.json
├── controllers/         # Request handlers
│   ├── tasks.js         # Task CRUD operations
│   └── ai.js            # AI endpoint handlers
├── core/                # Middleware and utilities
│   ├── asyncWrapper.js
│   ├── customError.js
│   ├── handleError.js
│   └── routeNotFound.js
├── db/                  # Database connection
│   └── dbConnect.js
├── models/              # Mongoose schemas
│   └── Task.js          # Enhanced Task model with AI fields
├── routes/              # API routes
│   ├── tasks.js         # Task routes
│   └── ai.js            # AI routes
├── services/            # Business logic
│   └── aiService.js     # Gemini AI integration
├── public/              # Static files
├── app.js               # Express app setup
├── package.json
├── .env                 # Environment variables
├── README.MD            # Project documentation
├── START_HERE.md        # Quick start guide
└── AI_FEATURES_SHOWCASE.md  # AI features details
```

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Add environment variables (MONGO_URI, GEMINI_API_KEY, PORT)
4. Deploy!

### Frontend (Vercel/Netlify)
1. Build React app: `cd client && npm run build`
2. Deploy `build` folder
3. Update API_URL in App.js to production backend URL

## 📚 Learning Outcomes

This project demonstrates:
- ✅ RESTful API design
- ✅ MongoDB & Mongoose ODM
- ✅ **AI/ML integration** (Gemini API)
- ✅ React hooks (useState, useEffect)
- ✅ Async/await error handling
- ✅ **Natural Language Processing**
- ✅ Modern UI/UX design
- ✅ Environment-based configuration
- ✅ Full-stack application architecture

## Developer

**Vatsal Mishra**  
📧 vatsalm1611@gmail.com  
💻 [GitHub](https://github.com/vatsalm1611)

## License

ISC
