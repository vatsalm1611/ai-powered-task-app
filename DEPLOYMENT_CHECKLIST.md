# ✅ TaskMate AI - Deployment Checklist

## 🎯 Quick Steps (Copy-Paste Ready)

### 1️⃣ GitHub Upload (5 mins)

```bash
# Open PowerShell in project folder
cd C:\Users\DELL\Downloads\task-manager

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TaskMate AI"

# Link to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/taskmate-ai.git

# Push
git branch -M main
git push -u origin main
```

**Create repo first at:** https://github.com/new
- Name: `taskmate-ai`
- Public
- Don't add README

---

### 2️⃣ Deploy Backend on Render (10 mins)

1. **Create account:** https://render.com (use GitHub)

2. **New Web Service** → Select `taskmate-ai` repo

3. **Settings:**
   ```
   Name: taskmate-ai-backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables:**
   ```
   MONGO_URI = mongodb+srv://vatsalm1611_db_user:taskappp@cluster0.ssbdfvb.mongodb.net/task-app?retryWrites=true&w=majority&appName=Cluster0
   
   GEMINI_API_KEY = AIzaSyAQlVZZ5eXAwbx_LoHj_Oh1n7GMqpPVT6w
   
   PORT = 5000
   ```

5. **Click Deploy** → Wait 5-10 mins

6. **Copy your backend URL:**
   ```
   https://taskmate-ai-backend.onrender.com
   ```

---

### 3️⃣ Update Frontend for Production

**Edit `client/src/App.js` line 15:**

```javascript
// Change FROM:
const API_URL = 'http://localhost:5000/api/v1';

// Change TO (use your actual Render URL):
const API_URL = 'https://taskmate-ai-backend.onrender.com/api/v1';
```

**Commit changes:**
```bash
git add .
git commit -m "Update API URL for production"
git push
```

---

### 4️⃣ Deploy Frontend on Vercel (5 mins)

1. **Create account:** https://vercel.com (use GitHub)

2. **Import Project** → Select `taskmate-ai`

3. **Settings:**
   ```
   Framework: Create React App
   Root Directory: client
   Build Command: npm run build
   Output Directory: build
   ```

4. **Deploy** → Wait 2-3 mins

5. **Copy your frontend URL:**
   ```
   https://taskmate-ai.vercel.app
   ```

---

### 5️⃣ Update CORS (Final Step)

**Edit `app.js` line 12:**

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://taskmate-ai.vercel.app'  // Add your Vercel URL here
  ]
}));
```

**Push update:**
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-redeploy in 2-3 mins!

---

## 🎉 Testing Your Live App

1. **Backend Test:**
   ```
   https://taskmate-ai-backend.onrender.com/api/v1/tasks
   ```
   Should show: `{"tasks":[],"count":0}`

2. **Frontend Test:**
   ```
   https://taskmate-ai.vercel.app
   ```
   Should show TaskMate AI app!

3. **Create a task** using AI and verify it works!

---

## 📝 Important Notes

### Render Free Tier:
- Sleeps after 15 mins of inactivity
- Takes 30-60 seconds to wake up on first request
- Perfect for portfolio/demo

### Future Updates:
```bash
# Make code changes
git add .
git commit -m "your changes"
git push

# Both Render & Vercel auto-deploy!
```

---

## 🔗 Your Live Links

**Frontend:**
```
https://taskmate-ai.vercel.app
```

**Backend API:**
```
https://taskmate-ai-backend.onrender.com
```

**GitHub Repo:**
```
https://github.com/YOUR_USERNAME/taskmate-ai
```

---

## ⏱️ Total Time: ~25 minutes

- GitHub: 5 mins
- Render: 10 mins
- Vercel: 5 mins
- CORS update: 5 mins

---

**Follow these steps exactly and you'll be live! 🚀**

**For detailed explanations, see `GITHUB_DEPLOYMENT_GUIDE.md`**
