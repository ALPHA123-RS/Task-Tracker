import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative flex-1 max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-neon-cyan animate-pulse-glow" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-2.5 bg-neon-surface/80 border border-neon-border rounded-lg leading-5 placeholder-neon-cyan/30 text-neon-cyan font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan sm:text-sm transition-all shadow-neon-cyan/20 backdrop-blur-md uppercase"
        placeholder="SEARCH ARCHIVES... (CTRL+K)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
