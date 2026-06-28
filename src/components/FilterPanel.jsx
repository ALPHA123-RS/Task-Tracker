import React from 'react';
import { Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterPanel = ({ filters, setFilters, isOpen }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="glass-card overflow-hidden mt-4 bg-neon-dark border border-neon-pink shadow-neon-pink relative"
      >
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-10 pointer-events-none" />
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          <div>
            <label className="block text-[10px] font-mono font-bold text-neon-pink mb-1.5 uppercase tracking-widest">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full text-sm font-mono tracking-widest bg-black/50 border border-neon-pink/30 text-white rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neon-pink focus:border-neon-pink"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-neon-pink mb-1.5 uppercase tracking-widest">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full text-sm font-mono tracking-widest bg-black/50 border border-neon-pink/30 text-white rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neon-pink focus:border-neon-pink"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-neon-pink mb-1.5 uppercase tracking-widest">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full text-sm font-mono tracking-widest bg-black/50 border border-neon-pink/30 text-white rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neon-pink focus:border-neon-pink"
            >
              <option value="All">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Learning">Learning</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-neon-pink mb-1.5 uppercase tracking-widest">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full text-sm font-mono tracking-widest bg-black/50 border border-neon-pink/30 text-white rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neon-pink focus:border-neon-pink"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">High Priority First</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterPanel;
