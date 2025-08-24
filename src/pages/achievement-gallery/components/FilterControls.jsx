import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterControls = ({ 
  activeFilter, 
  onFilterChange, 
  viewMode, 
  onViewModeChange, 
  searchQuery, 
  onSearchChange,
  sortBy,
  onSortChange 
}) => {
  const filterOptions = [
    { key: 'all', label: 'All Achievements', icon: 'Grid3x3', count: null },
    { key: 'certification', label: 'Certifications', icon: 'Award', count: null },
    { key: 'education', label: 'Education', icon: 'GraduationCap', count: null },
    { key: 'achievement', label: 'Achievements', icon: 'Trophy', count: null },
    { key: 'course', label: 'Courses', icon: 'BookOpen', count: null }
  ];

  const sortOptions = [
    { key: 'date-desc', label: 'Newest First', icon: 'ArrowDown' },
    { key: 'date-asc', label: 'Oldest First', icon: 'ArrowUp' },
    { key: 'title', label: 'Alphabetical', icon: 'AlphabeticalSort' },
    { key: 'type', label: 'By Type', icon: 'Filter' }
  ];

  const viewModes = [
    { key: 'grid', label: 'Grid View', icon: 'Grid3x3' },
    { key: 'timeline', label: 'Timeline View', icon: 'Timeline' }
  ];

  const controlsVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={controlsVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Search Bar */}
      <motion.div variants={itemVariants} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <input
            type="text"
            placeholder="Search achievements, skills, or institutions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter and View Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Filter Tabs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              iconName={filter.icon}
              iconPosition="left"
              className={`transition-all duration-300 ${
                activeFilter === filter.key 
                  ? 'cosmic-glow' :'hover:bg-surface/50'
              }`}
            >
              {filter.label}
              {filter.count && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                  {filter.count}
                </span>
              )}
            </Button>
          ))}
        </motion.div>

        {/* View and Sort Controls */}
        <motion.div variants={itemVariants} className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowUpDown"
              iconPosition="left"
              className="group-hover:border-primary/30"
            >
              Sort
            </Button>
            
            <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-surface opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => onSortChange(option.key)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-all duration-300 first:rounded-t-lg last:rounded-b-lg ${
                    sortBy === option.key
                      ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-primary hover:bg-muted/50'
                  }`}
                >
                  <Icon name={option.icon} size={16} className="mr-3" />
                  {option.label}
                  {sortBy === option.key && (
                    <Icon name="Check" size={14} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface border border-border rounded-lg p-1">
            {viewModes.map((mode) => (
              <Button
                key={mode.key}
                variant={viewMode === mode.key ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange(mode.key)}
                iconName={mode.icon}
                className={`transition-all duration-300 ${
                  viewMode === mode.key 
                    ? 'cosmic-glow shadow-none' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <span className="sr-only">{mode.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Filters Display */}
      {(activeFilter !== 'all' || searchQuery) && (
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2 pt-2 border-t border-border"
        >
          <span className="text-sm text-text-secondary">Active filters:</span>
          
          {activeFilter !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
              {filterOptions.find(f => f.key === activeFilter)?.label}
              <button
                onClick={() => onFilterChange('all')}
                className="ml-2 hover:text-primary-foreground transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {searchQuery && (
            <span className="inline-flex items-center px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
              "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="ml-2 hover:text-secondary-foreground transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onFilterChange('all');
              onSearchChange('');
            }}
            className="text-text-secondary hover:text-primary"
          >
            Clear all
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterControls;