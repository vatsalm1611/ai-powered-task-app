# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Your `.env` file is already configured with:
```
MONGO_URI=mongodb+srv://vatsalm1611:mongodbfortaskapp%401@cluster0.gzoyd8i.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

### 3. Start the Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB connection established successfully
🚀 Server active on port: 5000
```

## 📝 Test the API

### Using Browser
Open: `http://localhost:5000`

### Using Postman

**1. Get All Tasks**
```
GET http://localhost:5000/api/v1/tasks
```

**2. Create a Task**
```
POST http://localhost:5000/api/v1/tasks
Content-Type: application/json

{
  "name": "Learn Node.js",
  "completed": false
}
```

**3. Search Tasks**
```
GET http://localhost:5000/api/v1/tasks/search?name=learn
```

**4. Update a Task**
```
PATCH http://localhost:5000/api/v1/tasks/{task_id}
Content-Type: application/json

{
  "completed": true
}
```

**5. Delete a Task**
```
DELETE http://localhost:5000/api/v1/tasks/{task_id}
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm start` | Start production server |

## 📂 Project Overview

```
final/
├── app.js              # Main application entry
├── core/               # Middleware & error handling
├── controllers/        # Business logic
├── db/                 # Database connection
├── models/             # Mongoose schemas
├── routes/             # API endpoints
└── public/             # Frontend files
```

## 🎯 Next Steps

1. Test all endpoints in Postman
2. Customize task schema in `models/Task.js`
3. Add authentication (JWT)
4. Deploy to Render/Railway
5. Add frontend integration

## 💡 Tips

- Use `npm run dev` for development (auto-restart on changes)
- Check `CHANGES.md` for detailed refactoring notes
- All timestamps are automatic (createdAt, updatedAt)
- Search is case-insensitive and supports partial matches

## 🐛 Troubleshooting

**MongoDB Connection Failed?**
- Verify `.env` has correct MONGO_URI
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

**Port Already in Use?**
- Change PORT in `.env` to another value (e.g., 3000)

**Module Not Found?**
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall
