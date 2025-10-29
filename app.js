const express = require('express');
const cors = require('cors');
const app = express();
const tasks = require('./routes/tasks');
const aiRoutes = require('./routes/ai');
const connectDB = require('./db/dbConnect');
require('dotenv').config();
const notFound = require('./core/routeNotFound');
const errorHandlerMiddleware = require('./core/handleError');

// Middleware setup
// CORS configuration for production and development
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://taskmate-ai.vercel.app',
    'https://taskmate-ai.netlify.app',
    // Add your deployed frontend URL here after deployment
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.static('./public'));
app.use(express.json());

// API Routes
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/ai', aiRoutes); // AI-powered endpoints

// Error handling middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Initialize server and database connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('✅ MongoDB connection established successfully');
    
    app.listen(port, () =>
      console.log(`🚀 Server active on port: ${port}`)
    );
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

start();
