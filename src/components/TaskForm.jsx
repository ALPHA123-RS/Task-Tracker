import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TaskForm = ({ isOpen, onClose, onSubmit, editData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    category: 'Personal',
    dueDate: '',
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        description: editData.description || '',
        status: editData.status || 'Pending',
        priority: editData.priority || 'Medium',
        category: editData.category || 'Personal',
        dueDate: editData.dueDate ? new Date(editData.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        category: 'Personal',
        dueDate: '',
      });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!payload.dueDate) {
      delete payload.dueDate;
    }
    onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg overflow-hidden glass-card bg-neon-dark border-2 border-neon-cyan shadow-neon-cyan relative"
        >
          <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-20 pointer-events-none" />
          
          <div className="flex items-center justify-between p-6 border-b border-neon-border relative z-10">
            <h2 className="text-2xl font-display font-bold tracking-widest text-neon-cyan uppercase">
              {editData ? 'Edit Task Data' : 'Initialize Task'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-neon-pink hover:bg-neon-pink/10 rounded-lg transition-colors border border-transparent hover:border-neon-pink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 relative z-10">
            <div>
              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="What needs to be done?"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Add some details..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Learning">Learning</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neon-border mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-mono font-bold tracking-widest text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors uppercase border border-transparent hover:border-white/20"
              >
                Abort
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-mono font-bold tracking-widest text-neon-dark bg-neon-cyan hover:bg-white hover:text-neon-cyan rounded-lg shadow-neon-cyan transition-all uppercase"
              >
                {editData ? 'Update Data' : 'Execute'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskForm;
