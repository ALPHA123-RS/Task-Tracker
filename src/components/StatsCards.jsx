import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ListTodo, TrendingUp, Clock } from 'lucide-react';

const StatsCards = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'text-neon-cyan',
      bg: 'bg-neon-cyan/10 border border-neon-cyan/30'
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-neon-green',
      bg: 'bg-neon-green/10 border border-neon-green/30'
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'text-neon-pink',
      bg: 'bg-neon-pink/10 border border-neon-pink/30'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-neon-purple',
      bg: 'bg-neon-purple/10 border border-neon-purple/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative">
      <div className="absolute inset-0 bg-neon-cyan/5 blur-3xl pointer-events-none rounded-full" />
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex items-center justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <p className="text-xs font-mono font-bold text-neon-cyan/70 mb-2 uppercase tracking-widest">
                {stat.title}
              </p>
              <h3 className="text-3xl font-display font-bold text-white tracking-wider">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-lg backdrop-blur-md relative z-10 shadow-lg ${stat.bg}`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
