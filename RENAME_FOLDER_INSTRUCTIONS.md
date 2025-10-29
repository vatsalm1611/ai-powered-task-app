# 📁 Folder Rename Instructions

## Current Status: ✅ Code Updated

All code has been updated to **TaskMate AI**!

---

## 🔄 How to Rename Folder to `ai-powered-task-app`

### Step 1: Stop All Servers

**Terminal 1 (Backend):**
```
Press Ctrl + C
```

**Terminal 2 (Frontend):**
```
Press Ctrl + C
```

**Wait for both to fully stop!**

---

### Step 2: Close All Terminal Windows

Close **both** PowerShell windows completely.

---

### Step 3: Rename Folder

**Option A: Using File Explorer (Easiest)**
1. Open File Explorer
2. Go to: `C:\Users\DELL\Downloads\`
3. Right-click on `task-manager` folder
4. Click **Rename**
5. Type: `ai-powered-task-app`
6. Press Enter

**Option B: Using PowerShell**
```powershell
cd C:\Users\DELL\Downloads
Rename-Item -Path "task-manager" -NewName "ai-powered-task-app"
```

---

### Step 4: Open New Folder

```powershell
cd C:\Users\DELL\Downloads\ai-powered-task-app
```

---

### Step 5: Restart Servers

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

---

## ✅ What's Been Updated:

- ✅ Backend package name: `taskmate-ai-api`
- ✅ Frontend package name: `taskmate-ai-client`
- ✅ App header: **TaskMate AI**
- ✅ Browser title: **TaskMate AI - Intelligent Task Manager**
- ✅ README.md: Updated with TaskMate AI branding
- ✅ All documentation: Updated paths to `ai-powered-task-app`

---

## 🎉 After Rename:

Your project will be:
```
C:\Users\DELL\Downloads\ai-powered-task-app\
```

And when you open the app, you'll see:
```
🤖 TaskMate AI
Powered by Gemini AI
```

---

## ⚠️ Important:

**Don't rename while servers are running!**
Always stop both servers first.

---

Ready to rename? Follow the steps above! 🚀
