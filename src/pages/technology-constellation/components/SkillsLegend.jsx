import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsLegend = ({ isVisible = true }) => {
  const proficiencyLevels = [
    {
      level: 'Expert',
      color: 'from-secondary to-primary',
      description: '5+ years, can architect solutions',
      count: 8
    },
    {
      level: 'Advanced',
      color: 'from-primary to-accent',
      description: '3+ years, strong proficiency',
      count: 12
    },
    {
      level: 'Intermediate',
      color: 'from-accent to-warning',
      description: '1+ years, good working knowledge',
      count: 6
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute top-6 right-6 bg-surface/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-surface max-w-xs"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Info" size={16} className="text-primary" />
        <h3 className="text-sm font-semibold text-white">Proficiency Legend</h3>
      </div>
      <div className="space-y-3">
        {proficiencyLevels?.map((item, index) => (
          <motion.div
            key={item?.level}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item?.color} flex-shrink-0`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{item?.level}</span>
                <span className="text-xs text-text-secondary">({item?.count})</span>
              </div>
              <p className="text-xs text-text-secondary mt-1">{item?.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="MousePointer" size={12} />
          <span>Click stars to explore details</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsLegend;