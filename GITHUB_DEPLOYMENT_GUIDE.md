# 🚀 GitHub & Render Deployment Guide

## Part 1: Upload to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click **New Repository** (green button)
3. Repository name: `taskmate-ai` or `ai-powered-task-app`
4. Description: "TaskMate AI - Intelligent task manager powered by Gemini AI"
5. Select: **Public**
6. ❌ **DO NOT** check "Add README" (we already have one)
7. Click **Create Repository**

---

### Step 2: Initialize Git in Your Project

**Open PowerShell in your project folder:**

```bash
cd C:\Users\DELL\Downloads\task-manager
```

**Initialize Git:**
```bash
git init
```

---

### Step 3: Create .gitignore

Create `.gitignore` file to exclude sensitive data:

```bash
# Create .gitignore
@"
# Dependencies
node_modules/
client/node_modules/

# Environment variables
.env

# Production build
client/build/
build/

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Misc
combined_code_base.txt
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

---

### Step 4: Add Files to Git

```bash
git add .
```

---

### Step 5: Commit Files

```bash
git commit -m "Initial commit: TaskMate AI - AI-powered task manager with Gemini"
```

---

### Step 6: Link to GitHub

**Replace `YOUR_USERNAME` with your GitHub username:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/taskmate-ai.git
```

**Example:**
```bash
git remote add origin https://github.com/vatsalm1611/taskmate-ai.git
```

---

### Step 7: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

**If asked for credentials:**
- Username: Your GitHub username
- Password: Use **Personal Access Token** (not password)

**To create token:**
1. GitHub → Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic)
3. Select: `repo` permissions
4. Copy token and use as password

---

## Part 2: Deploy Backend on Render

### Step 1: Prepare for Render Deployment

**Create `render.yaml` for configuration:**

```yaml
services:
  - type: web
    name: taskmate-ai-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 18.17.0
      - key: MONGO_URI
        sync: false
      - key: GEMINI_API_KEY
        sync: false
      - key: PORT
        value: 5000
```

---

### Step 2: Update package.json for Production

Make sure your `package.json` has:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

### Step 3: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

---

### Step 4: Deploy Backend

1. **New Web Service**
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Select `taskmate-ai` repository

3. **Configure Service**
   - Name: `taskmate-ai-backend`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: Leave empty
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: **Free**

4. **Add Environment Variables**
   Click "Add Environment Variable":
   ```
   MONGO_URI = mongodb+srv://vatsalm1611_db_user:taskappp@cluster0.ssbdfvb.mongodb.net/task-app?retryWrites=true&w=majority&appName=Cluster0
   
   GEMINI_API_KEY = AIzaSyAQlVZZ5eXAwbx_LoHj_Oh1n7GMqpPVT6w
   
   PORT = 5000
   ```

5. **Click "Create Web Service"**

**Wait 5-10 minutes for deployment...**

---

### Step 5: Get Backend URL

After deployment, you'll get URL like:
```
https://taskmate-ai-backend.onrender.com
```

**Test it:**
```
https://taskmate-ai-backend.onrender.com/api/v1/tasks
```

---

## Part 3: Deploy Frontend on Vercel/Netlify

### Option A: Vercel (Recommended)

**Step 1: Update API URL in Frontend**

Edit `client/src/App.js`:

```javascript
// Change this line:
const API_URL = 'http://localhost:5000/api/v1';

// To your Render backend URL:
const API_URL = 'https://taskmate-ai-backend.onrender.com/api/v1';
```

**Commit and push:**
```bash
git add .
git commit -m "Update API URL for production"
git push
```

**Step 2: Deploy to Vercel**

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import `taskmate-ai` repository
5. Configure:
   - Framework Preset: **Create React App**
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Click "Deploy"

**Done! You'll get URL like:**
```
https://taskmate-ai.vercel.app
```

---

### Option B: Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. "Add new site" → "Import an existing project"
4. Connect GitHub → Select `taskmate-ai`
5. Configure:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`
6. Deploy

---

## Part 4: Update CORS for Production

**Edit `app.js`:**

```javascript
// Update CORS to allow your frontend domain
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://taskmate-ai.vercel.app',  // Add your Vercel URL
    'https://your-netlify-app.netlify.app'  // Or Netlify URL
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

**Commit and push:**
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-redeploy!

---

## 🎉 Final Checklist

- [ ] GitHub repository created
- [ ] All files pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Backend URL tested
- [ ] Frontend API URL updated
- [ ] Frontend deployed on Vercel/Netlify
- [ ] CORS updated with frontend URL
- [ ] Full app tested live

---

## 🔗 Your Live URLs

**Backend API:**
```
https://taskmate-ai-backend.onrender.com
```

**Frontend App:**
```
https://taskmate-ai.vercel.app
```

---

## 📝 Common Issues

### Backend not starting on Render?
- Check environment variables are set
- Verify MongoDB connection string
- Check Render logs

### Frontend can't connect to backend?
- Verify API_URL in App.js
- Check CORS settings
- Ensure backend is running

### Render free tier sleeping?
- Free tier sleeps after 15 min inactivity
- First request takes 30-60 seconds to wake up

---

## 🚀 Quick Deploy Commands

```bash
# After any code change:
git add .
git commit -m "Your commit message"
git push

# Render will auto-deploy backend
# Vercel will auto-deploy frontend
```

---

**Follow these steps and your app will be live! 🌐**
