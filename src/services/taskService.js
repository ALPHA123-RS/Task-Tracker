import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = baseUrl.endsWith('/tasks') ? baseUrl : `${baseUrl}/tasks`;

// Get all tasks
const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

// Create a task
const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data.data;
};

// Update a task
const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data.data;
};

// Delete a task
const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data.data;
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
