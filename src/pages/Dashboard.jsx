import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Layout, LayoutList, Filter, Moon, Sun, Loader2 } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import StatsCards from '../components/StatsCards';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import KanbanBoard from '../components/KanbanBoard';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import CommandPalette from '../components/CommandPalette';
import EmptyState from '../components/EmptyState';
import TaskChart from '../components/TaskChart';
import { format } from 'date-fns';

const Dashboard = () => {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  
  const [view, setView] = useState('list');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    category: 'All',
    sortBy: 'newest',
  });

  const [timeIST, setTimeIST] = useState(() => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(new Date()) + ' IST';
  });

  // Live IST Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(new Date());
      setTimeIST(timeString + ' IST');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandAction = (actionId) => {
    switch (actionId) {
      case 'add-task':
        setEditingTask(null);
        setIsFormOpen(true);
        break;
      case 'view-list':
        setView('list');
        break;
      case 'view-kanban':
        setView('kanban');
        break;
      case 'toggle-filters':
        setIsFilterOpen(!isFilterOpen);
        break;
      default:
        break;
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (taskData) => {
    let success = false;
    if (editingTask) {
      success = await updateTask(editingTask._id, taskData);
    } else {
      success = await addTask(taskData);
    }
    
    if (success) {
      setIsFormOpen(false);
      setEditingTask(null);
    }
  };

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus = filters.status === 'All' || task.status === filters.status;
      const matchPriority = filters.priority === 'All' || task.priority === filters.priority;
      const matchCategory = filters.category === 'All' || task.category === filters.category;
      
      return matchSearch && matchStatus && matchPriority && matchCategory;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priority':
          const priorityWeight = { High: 3, Medium: 2, Low: 1 };
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [tasks, searchQuery, filters]);

  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');

  if (loading && tasks.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
            <span className="text-xs font-mono text-neon-cyan/70 tracking-widest uppercase">{timeIST}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-display font-bold tracking-tight mb-2 text-white flex items-center"
          >
            TASK TRACKER <span className="text-gradient ml-2">v1.0</span>
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-8 bg-neon-cyan ml-2"
            />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-neon-cyan/70 font-mono text-sm uppercase tracking-widest mt-2"
          >
            {currentDate} • ALL SYSTEMS NOMINAL
          </motion.p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 rounded-lg shadow-neon-cyan transition-all font-bold uppercase tracking-wider text-sm"
          >
            <Plus className="w-5 h-5" />
            <span>INITIALIZE TASK</span>
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <StatsCards tasks={tasks} />

      {/* Analytics Section */}
      <TaskChart tasks={tasks} />

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex bg-neon-surface/80 p-1 rounded-lg border border-neon-border shadow-neon-cyan/20 backdrop-blur-md">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md flex items-center transition-colors ${view === 'list' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-neon-cyan/40 hover:text-neon-cyan'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('kanban')}
              className={`p-2 rounded-md flex items-center transition-colors ${view === 'kanban' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-neon-cyan/40 hover:text-neon-cyan'}`}
            >
              <Layout className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 bg-neon-surface/80 border rounded-lg backdrop-blur-md transition-all text-sm font-bold uppercase tracking-wider ${isFilterOpen ? 'text-neon-pink border-neon-pink shadow-neon-pink' : 'text-neon-cyan border-neon-cyan hover:shadow-neon-cyan'}`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <FilterPanel 
        filters={filters} 
        setFilters={setFilters} 
        isOpen={isFilterOpen} 
      />

      {/* Content Section */}
      <main className="mt-8">
        {filteredTasks.length === 0 ? (
          <EmptyState 
            title={tasks.length === 0 ? "No tasks yet" : "No tasks match your search"}
            description={tasks.length === 0 ? "Create your first task to get started." : "Try adjusting your filters or search query."}
            action={
              tasks.length === 0 && (
                  <button
                  onClick={() => {
                    setEditingTask(null);
                    setIsFormOpen(true);
                  }}
                  className="px-8 py-3 bg-transparent border-2 border-neon-cyan text-neon-cyan font-bold font-mono tracking-widest uppercase hover:bg-neon-cyan hover:text-neon-dark rounded-lg shadow-neon-cyan transition-all"
                >
                  INITIALIZE TASK
                </button>
              )
            }
          />
        ) : (
          <AnimatePresence mode="wait">
            {view === 'list' ? (
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="kanban-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <KanbanBoard 
                  tasks={filteredTasks}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  onEdit={handleEditTask}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmitForm}
        editData={editingTask}
      />
      
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onAction={handleCommandAction}
      />
    </div>
  );
};

export default Dashboard;
