# 🚀 TaskMate AI - Quick Start Guide

## First Time Setup

### 1. Install Backend Dependencies
```bash
npm install
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 3. Check .env File
Make sure your `.env` file has:
```env
MONGO_URI=mongodb+srv://vatsalm1611:mongodbfortaskapp%401@cluster0.gzoyd8i.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
GEMINI_API_KEY=AIzaSyAQlVZZ5eXAwbx_LoHj_Oh1n7GMqpPVT6w
```

## Running the Application

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
npm run dev
```
Wait for: "✅ MongoDB connection established successfully"

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Option 2: PowerShell Script (Windows)

Save this as `start.ps1`:
```powershell
# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

# Wait 5 seconds for backend to start
Start-Sleep -Seconds 5

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm start"
```

Then run: `.\start.ps1`

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: See README.MD

## Test the AI Features

1. **Create Task with Natural Language**
   - Type: "Urgent: Submit assignment by Friday 5pm"
   - Click "Create with AI"
   - Watch AI extract priority, category, due date!

2. **View AI Insights**
   - Check the right sidebar for statistics
   - See AI-generated recommendations
   - View "What to work on next" suggestion

3. **Analyze Tasks**
   - Click "Analyze Tasks" button
   - AI will update all task priorities

## Troubleshooting

### Backend won't start?
- Check if MongoDB URI is correct
- Ensure Gemini API key is valid
- Make sure port 5000 is not in use

### Frontend won't connect?
- Verify backend is running on port 5000
- Check for CORS errors in console
- Ensure axios is installed

### AI not working?
- Verify GEMINI_API_KEY in .env
- Check if you have internet connection
- Look for errors in backend console

## Development Tips

- Backend auto-restarts on changes (nodemon)
- Frontend hot-reloads on changes
- Use browser DevTools to debug
- Check backend console for API errors

## Demo Data

Try these natural language inputs:
1. "Buy groceries tomorrow at 5pm"
2. "Urgent: Complete project report by Friday"
3. "Call mom this evening"
4. "Workout for 30 minutes daily"
5. "Review code before Monday meeting"

Each will showcase different AI features!

## Need Help?

- Read the full README.MD
- Check CHANGES.md for what was refactored
- Email: vatsalm1611@gmail.com
