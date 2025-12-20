// Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


//Import routes
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies

// Test route
app.get('/', (req, res) => {
  res.send('Employee Management System API is running! 🚀');
});

//API Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});