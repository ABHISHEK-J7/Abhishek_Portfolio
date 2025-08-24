import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'All': 'Globe',
    'Frontend': 'Monitor',
    'Backend': 'Server',
    'Database': 'Database',
    'Tools': 'Wrench',
    'Cloud': 'Cloud'
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-4">
      {categories?.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-primary text-white cosmic-glow' :'bg-surface text-text-secondary hover:text-primary hover:bg-surface/80 border border-border'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon 
            name={categoryIcons?.[category] || 'Circle'} 
            size={16} 
            className={activeCategory === category ? 'text-white' : 'text-text-secondary'}
          />
          <span>{category}</span>
          {activeCategory === category && (
            <motion.div
              className="w-2 h-2 rounded-full bg-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;