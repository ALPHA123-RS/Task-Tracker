import React from 'react';
import { motion } from 'framer-motion';
import TaskCard from './TaskCard';

const KanbanBoard = ({ tasks, onUpdate, onDelete, onEdit }) => {
  const columns = [
    { id: 'Pending', title: 'TO DO', color: 'bg-neon-pink shadow-neon-pink' },
    { id: 'In Progress', title: 'IN PROGRESS', color: 'bg-neon-cyan shadow-neon-cyan' },
    { id: 'Completed', title: 'DONE', color: 'bg-neon-green shadow-neon-green' }
  ];

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
      {columns.map((column) => {
        const columnTasks = tasks.filter(task => task.status === column.id);
        
        return (
          <div key={column.id} className="flex flex-col min-w-[320px] w-full max-w-sm">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${column.color} animate-pulse-glow`} />
                <h3 className="font-display font-bold text-white tracking-widest text-lg">
                  {column.title}
                </h3>
              </div>
              <span className="px-3 py-1 text-xs font-mono font-bold text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/30 rounded-md">
                {columnTasks.length}
              </span>
            </div>
            
            <div 
              className="flex-1 p-3 rounded-2xl bg-neon-surface/50 border border-neon-border backdrop-blur-sm transition-colors"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('bg-neon-cyan/5');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('bg-neon-cyan/5');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('bg-neon-cyan/5');
                const taskId = e.dataTransfer.getData('taskId');
                if (taskId) {
                  const task = tasks.find(t => t._id === taskId);
                  if (task && task.status !== column.id) {
                    onUpdate(taskId, { ...task, status: column.id });
                  }
                }
              }}
            >
              <div className="space-y-3 min-h-[100px]">
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))}
                {columnTasks.length === 0 && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-500">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
