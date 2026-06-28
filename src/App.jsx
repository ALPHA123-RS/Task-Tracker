import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-cyber-grid bg-neon-dark bg-cyber-grid transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-neon-dark/80 pointer-events-none" />
      <div className="relative z-10">
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'bg-neon-surface text-neon-cyan border border-neon-cyan shadow-neon-cyan',
            style: {
              borderRadius: '12px',
            },
          }} 
        />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
