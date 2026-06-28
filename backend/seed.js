import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seedTasks = [
  {
    title: "INITIATE NEURAL NETWORK SYNC",
    description: "Synchronize the primary database with the backup quantum cluster.",
    status: "Completed",
    priority: "High",
    category: "Work",
    dueDate: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    title: "DEPLOY TASKFLOW_OS v1.0",
    description: "Finalize deployment of the MERN stack application to public servers.",
    status: "In Progress",
    priority: "High",
    category: "Learning",
    dueDate: new Date(Date.now() + 86400000).toISOString() // Tomorrow
  },
  {
    title: "CALIBRATE UI ANIMATIONS",
    description: "Ensure Framer Motion transitions are perfectly synced with the 60hz refresh rate.",
    status: "In Progress",
    priority: "Medium",
    category: "Work",
    dueDate: new Date(Date.now() + 172800000).toISOString() // 2 days from now
  },
  {
    title: "RUN SECURITY PROTOCOLS",
    description: "Perform penetration testing on the new REST API endpoints.",
    status: "Pending",
    priority: "High",
    category: "Work",
    dueDate: new Date(Date.now() + 259200000).toISOString() // 3 days from now
  },
  {
    title: "RECHARGE HYPER-DRIVE COFFEE",
    description: "Acquire more caffeine to sustain developer performance metrics.",
    status: "Pending",
    priority: "Low",
    category: "Health",
    dueDate: new Date(Date.now() + 43200000).toISOString() // 12 hours from now
  }
];

const seedDB = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected.');

    console.log('⏳ Clearing old tasks...');
    await Task.deleteMany({});
    
    console.log('⏳ Injecting dummy data...');
    await Task.insertMany(seedTasks);
    
    console.log('✅ SYSTEM_OS POPULATED SUCESSFULLY! (Added 5 Tasks)');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Failed:', err);
    process.exit(1);
  }
};

seedDB();
