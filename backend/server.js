import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://task-tracker-eight-lilac.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean).map(url => url.replace(/\/$/, '')); // Remove trailing slashes

// Enable CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Remove trailing slash from origin just in case
    const originWithoutSlash = origin.replace(/\/$/, '');
    
    if (allowedOrigins.indexOf(originWithoutSlash) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Mount routers
app.use('/api/tasks', taskRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
