import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const TaskChart = ({ tasks }) => {
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;

  const data = [
    { name: 'TO DO', value: pending, color: '#ff2a85' }, // neon-pink
    { name: 'IN PROGRESS', value: inProgress, color: '#00f0ff' }, // neon-cyan
    { name: 'DONE', value: completed, color: '#39ff14' }, // neon-green
  ];

  if (tasks.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 mb-8 bg-neon-dark border border-neon-border relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-10 pointer-events-none" />
      <h3 className="text-sm font-mono font-bold text-neon-cyan mb-4 uppercase tracking-widest relative z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
        SYSTEM DIAGNOSTICS: TASK DISTRIBUTION
      </h3>
      <div className="h-64 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.filter(d => d.value > 0)}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={1500}
            >
              {data.filter(d => d.value > 0).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 0 8px ${entry.color}80)` }} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#050505', border: '1px solid #00f0ff', color: '#fff', fontFamily: 'monospace', borderRadius: '8px' }}
              itemStyle={{ color: '#00f0ff' }}
            />
            <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px', color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TaskChart;
