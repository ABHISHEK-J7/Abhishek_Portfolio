import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActions = ({ onDownloadResume, onContact }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState('');

  const actions = [
    {
      id: 'resume',
      label: 'Download Resume',
      icon: 'Download',
      onClick: onDownloadResume,
      color: 'from-primary to-accent'
    },
    {
      id: 'contact',
      label: 'Contact Me',
      icon: 'Mail',
      onClick: onContact,
      color: 'from-secondary to-primary'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: 'Linkedin',
      onClick: () => window.open('https://linkedin.com/in/abhishek-nallam', '_blank'),
      color: 'from-accent to-secondary'
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: 'Github',
      onClick: () => window.open('https://github.com/abhishek-nallam', '_blank'),
      color: 'from-primary to-accent'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
      <motion.div
        className="flex flex-col items-end space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Toggle Button */}
        {/* <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cosmic-glow hover:shadow-glow-lg transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon name="Plus" size={24} color="white" />
          </motion.div>
        </motion.button> */}

        {/* Action Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col items-end space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, staggerChildren: 0.05 }}
            >
              {actions?.map((action, index) => (
                <motion.div
                  key={action?.id}
                  className="relative flex items-center"
                  variants={itemVariants}
                  onHoverStart={() => setShowTooltip(action?.id)}
                  onHoverEnd={() => setShowTooltip('')}
                >
                  {/* Tooltip */}
                  <AnimatePresence>
                    {showTooltip === action?.id && (
                      <motion.div
                        className="absolute right-16 bg-surface border border-border rounded-lg px-3 py-2 whitespace-nowrap"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-sm text-text-primary font-medium">
                          {action?.label}
                        </span>
                        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-surface border-r border-b border-border rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Button */}
                  <motion.button
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${action?.color} flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
                    onClick={action?.onClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon name={action?.icon} size={20} color="white" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FloatingActions;