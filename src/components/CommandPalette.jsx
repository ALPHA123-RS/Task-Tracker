import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Layout, LayoutList, Filter } from 'lucide-react';

const CommandPalette = ({ isOpen, onClose, onAction }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    { id: 'add-task', title: 'Create new task', icon: Plus, category: 'Actions' },
    { id: 'view-list', title: 'Switch to List View', icon: LayoutList, category: 'Views' },
    { id: 'view-kanban', title: 'Switch to Kanban View', icon: Layout, category: 'Views' },
    { id: 'toggle-filters', title: 'Toggle Filters', icon: Filter, category: 'Views' },
  ];

  const filteredActions = actions.filter(action => 
    action.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/40 backdrop-blur-sm">
        <div 
          className="fixed inset-0"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-xl relative overflow-hidden glass-card bg-white dark:bg-[#111111]"
        >
          <div className="flex items-center px-4 py-4 border-b border-neon-border bg-neon-dark relative z-10">
            <Search className="w-5 h-5 text-neon-cyan animate-pulse-glow" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ENTER COMMAND OR QUERY..."
              className="flex-1 px-4 py-2 bg-transparent outline-none placeholder-neon-cyan/30 text-neon-cyan font-mono tracking-widest text-sm"
            />
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {filteredActions.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No commands found.
              </div>
            ) : (
              filteredActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => {
                      onAction(action.id);
                      onClose();
                      setQuery('');
                    }}
                    className="w-full flex items-center px-4 py-4 text-left hover:bg-neon-cyan/10 transition-colors group border-l-2 border-transparent hover:border-neon-cyan relative z-10"
                  >
                    <Icon className="w-4 h-4 mr-3 text-neon-pink group-hover:text-neon-cyan transition-colors" />
                    <span className="text-sm font-mono font-bold tracking-widest text-gray-300 group-hover:text-neon-cyan transition-colors uppercase">{action.title}</span>
                    <span className="ml-auto text-[10px] font-mono tracking-widest text-neon-cyan/50 uppercase">{action.category}</span>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
