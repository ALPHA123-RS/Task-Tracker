import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// Validation rules
const validateTask = [
  body('title').optional().notEmpty().withMessage('Title is required').trim(),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Invalid priority'),
  body('category')
    .optional()
    .isIn(['Work', 'Personal', 'Learning', 'Health'])
    .withMessage('Invalid category'),
];

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      error: errors.array().map(e => e.msg).join(', ') 
    });
  }
  next();
};

router.route('/')
  .get(getTasks)
  .post(
    body('title').notEmpty().withMessage('Title is required for creation').trim(), // Make title required for POST
    validateTask, 
    handleValidationErrors, 
    createTask
  );

router.route('/:id')
  .put(validateTask, handleValidationErrors, updateTask)
  .delete(deleteTask);

export default router;
