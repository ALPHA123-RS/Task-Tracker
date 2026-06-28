import React from 'react';
import { motion } from 'framer-motion';
import { LayoutList } from 'lucide-react';

const EmptyState = ({ title = "No tasks found", description = "Get started by creating a new task.", icon: Icon = LayoutList, action }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center glass-card min-h-[400px] border-neon-cyan shadow-neon-cyan relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-30 pointer-events-none group-hover:animate-[scan_2s_linear_infinite]" />
      <div className="w-24 h-24 mb-6 rounded-full bg-neon-cyan/10 border border-neon-cyan/50 flex items-center justify-center relative z-10 shadow-neon-cyan animate-pulse-glow">
        <Icon className="w-12 h-12 text-neon-cyan" />
      </div>
      <h3 className="text-2xl font-display font-bold tracking-widest text-white mb-2 uppercase relative z-10">{title}</h3>
      <p className="text-neon-cyan/70 font-mono tracking-widest text-sm max-w-sm mb-6 uppercase relative z-10">
        {description}
      </p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
