import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { format } from 'date-fns';

const priorityColors = {
  Low: 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-neon-cyan',
  Medium: 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50 shadow-neon-pink',
  High: 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50 shadow-neon-purple',
};

const statusColors = {
  'Pending': 'bg-white/5 text-gray-300 border border-white/20',
  'In Progress': 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30',
  'Completed': 'bg-neon-green/10 text-neon-green border border-neon-green/30',
};

const categoryColors = {
  'Work': 'border-l-neon-purple shadow-neon-purple',
  'Personal': 'border-l-neon-green shadow-neon-green',
  'Learning': 'border-l-neon-cyan shadow-neon-cyan',
  'Health': 'border-l-neon-pink shadow-neon-pink',
};

const TaskCard = ({ task, onUpdate, onDelete, onEdit }) => {
  return (
    <motion.div
      layout
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task._id);
        e.dataTransfer.effectAllowed = 'move';
        // Add a slight transparency while dragging
        setTimeout(() => {
          if (e.target) e.target.style.opacity = '0.5';
        }, 0);
      }}
      onDragEnd={(e) => {
        if (e.target) e.target.style.opacity = '1';
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`glass-card p-5 border-l-[3px] ${categoryColors[task.category]} group relative overflow-hidden backdrop-blur-xl bg-neon-surface/90 hover:bg-neon-surface cursor-grab active:cursor-grabbing`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[scan_1.5s_ease-in-out_infinite] pointer-events-none z-0" />
      
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all flex space-x-2 z-50">
        <button 
          onClick={() => onEdit(task)}
          className="p-1.5 bg-neon-dark border border-neon-border rounded-lg text-neon-cyan hover:text-neon-pink hover:border-neon-pink hover:shadow-neon-pink transition-all"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(task._id)}
          className="p-1.5 bg-neon-dark border border-neon-border rounded-lg text-neon-pink hover:text-white hover:bg-neon-pink hover:shadow-neon-pink transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start justify-between mb-4 relative z-20 pointer-events-none">
        <div className="flex gap-2">
          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-widest ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-widest ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
      </div>

      <h4 className="text-xl font-display font-bold mb-2 pr-16 line-clamp-1 group-hover:text-neon-cyan transition-colors relative z-10">
        {task.title}
      </h4>
      
      {task.description && (
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 relative z-10">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest font-mono text-gray-500 mt-auto pt-4 border-t border-neon-border relative z-10">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-neon-cyan/70" />
          <span>
            {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-neon-pink/70" />
          <span>{format(new Date(task.createdAt), 'MMM d')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
