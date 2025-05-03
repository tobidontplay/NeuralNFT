import React, { useState } from 'react';
import { GeneratedArt } from '../../types/types';
import ArtCard from './ArtCard';
import { useWallet } from '../../context/WalletContext';
import { Filter, Search } from 'lucide-react';
import { artStyles, colorSchemes, themes, mockArtworks } from '../../utils/mockData';

const Gallery: React.FC = () => {
  const { wallet } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    style: '',
    colorScheme: '',
    theme: '',
  });

  // Simulate artworks from API/database
  const artworks = mockArtworks;

  const filteredArtworks = artworks.filter((art) => {
    // Apply search term filter
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = art.title.toLowerCase().includes(searchLower);
    
    // Apply dropdown filters
    const styleMatch = !filters.style || art.params.style === filters.style;
    const colorMatch = !filters.colorScheme || art.params.colorScheme === filters.colorScheme;
    const themeMatch = !filters.theme || art.params.theme === filters.theme;
    
    return titleMatch && styleMatch && colorMatch && themeMatch;
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      style: '',
      colorScheme: '',
      theme: '',
    });
    setSearchTerm('');
  };

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search artworks..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center"
          >
            <Filter size={18} className="mr-2" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Style Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Art Style
                </label>
                <select
                  value={filters.style}
                  onChange={(e) => handleFilterChange('style', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Styles</option>
                  {artStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Color Scheme Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Color Scheme
                </label>
                <select
                  value={filters.colorScheme}
                  onChange={(e) => handleFilterChange('colorScheme', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Color Schemes</option>
                  {colorSchemes.map((scheme) => (
                    <option key={scheme} value={scheme}>
                      {scheme}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Theme Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Theme
                </label>
                <select
                  value={filters.theme}
                  onChange={(e) => handleFilterChange('theme', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Themes</option>
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-purple-400 hover:text-purple-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((art) => (
            <ArtCard 
              key={art.id} 
              art={art} 
              userWallet={wallet}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No artworks match your filters.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;