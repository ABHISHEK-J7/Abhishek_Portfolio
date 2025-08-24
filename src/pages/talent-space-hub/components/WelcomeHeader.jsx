import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime?.getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, [currentTime]);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stats = [
    { label: 'Years Experience', value: '2+', icon: 'Calendar' },
    { label: 'Projects Completed', value: '5+', icon: 'CheckCircle' },
    { label: 'Technologies Mastered', value: '10+', icon: 'Code' },
    { label: 'Client Satisfaction', value: '100%', icon: 'Heart' }
  ];

  return (
    <div className="relative">
      {/* Main Welcome Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Greeting */}
        <motion.div
          className="flex items-center justify-center space-x-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Icon name="Sun" size={24} className="text-warning animate-pulse" />
          <h2 className="text-2xl font-semibold text-text-secondary">
            {greeting}! Welcome to my
          </h2>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-6xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-gradient-primary">Talent Space</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Navigate through my digital universe of skills, projects, and achievements. 
          Each node represents a dimension of my professional journey.
        </motion.p>

        {/* Current Time Display */}
        <motion.div
          className="inline-flex items-center space-x-4 bg-surface/50 backdrop-blur-sm border border-border rounded-full px-6 py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Icon name="Clock" size={20} className="text-primary" />
          <div className="text-center">
            <div className="text-lg font-mono text-white">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-text-secondary">
              {formatDate(currentTime)}
            </div>
          </div>
        </motion.div>
      </motion.div>
      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {stats?.map((stat, index) => (
          <motion.div
            key={stat?.label}
            className="text-center p-6 bg-surface/30 backdrop-blur-sm border border-border rounded-xl hover:bg-surface/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {stat?.value}
            </div>
            <div className="text-sm text-text-secondary">
              {stat?.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* Navigation Hint */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="inline-flex items-center space-x-2 text-text-secondary">
          <Icon name="MousePointer" size={16} />
          <span className="text-sm">
            Hover over the brain nodes to explore different dimensions
          </span>
        </div>
        
        {/* Animated Arrow */}
        <motion.div
          className="flex justify-center mt-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon name="ChevronDown" size={24} className="text-primary/60" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeHeader;