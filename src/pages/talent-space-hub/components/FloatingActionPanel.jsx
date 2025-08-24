import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FloatingActionPanel = ({ onResumeDownload, onContactClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actionItems = [
    {
      id: 'resume',
      label: 'Download Resume',
      icon: 'Download',
      variant: 'outline',
      onClick: onResumeDownload,
      description: 'Get my latest CV'
    },
    {
      id: 'contact',
      label: 'Get In Touch',
      icon: 'MessageCircle',
      variant: 'default',
      onClick: onContactClick,
      description: 'Start a conversation'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      icon: 'Linkedin',
      variant: 'secondary',
      onClick: () => window.open('https://linkedin.com/in/abhisheknallam', '_blank'),
      description: 'Professional network'
    },
    {
      id: 'github',
      label: 'GitHub Portfolio',
      icon: 'Github',
      variant: 'ghost',
      onClick: () => window.open('https://github.com/abhisheknallam', '_blank'),
      description: 'Code repositories'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Expanded Action Items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-20 right-0 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
          >
            {actionItems?.map((item, index) => (
              <motion.div
                key={item?.id}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Action Description */}
                <motion.div
                  className="bg-surface/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm text-text-secondary whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                >
                  {item?.description}
                </motion.div>

                {/* Action Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={item?.variant}
                    size="sm"
                    onClick={item?.onClick}
                    iconName={item?.icon}
                    iconPosition="left"
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {item?.label}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main Toggle Button */}
      <motion.button
        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-2xl flex items-center justify-center text-white hover:shadow-primary/25 transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isExpanded ? 45 : 0,
        }}
        style={{
          boxShadow: isExpanded 
            ? '0 0 30px rgba(0, 102, 255, 0.4)' 
            : '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        <Icon 
          name={isExpanded ? "X" : "Zap"} 
          size={24} 
          color="white"
        />

        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/50"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.button>
      {/* Background Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionPanel;