import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TechnologyStar from './TechnologyStar';

const ConstellationMap = ({ technologies, onTechnologyClick, activeTechnology }) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [starPositions, setStarPositions] = useState({});

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('constellation-container');
      if (container) {
        setDimensions({
          width: container?.offsetWidth,
          height: container?.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Generate positions for stars based on categories
    const positions = {};
    const categories = {
      'Frontend': { centerX: 0.25, centerY: 0.3, radius: 120 },
      'Backend': { centerX: 0.75, centerY: 0.3, radius: 120 },
      'Database': { centerX: 0.5, centerY: 0.7, radius: 100 },
      'Mobile': { centerX: 0.2, centerY: 0.7, radius: 80 },
      'Programming': { centerX: 0.8, centerY: 0.7, radius: 80 }
    };

    // Special positioning for related technologies
    const specialPositions = {
      'nodejs': { x: 0.65, y: 0.35 },
      'expressjs': { x: 0.75, y: 0.25 },
      'firebase': { x: 0.85, y: 0.35 }
    };

    technologies?.forEach((tech, index) => {
      // Check if this technology has a special position
      if (specialPositions[tech.id]) {
        positions[tech.id] = {
          x: specialPositions[tech.id].x * dimensions.width,
          y: specialPositions[tech.id].y * dimensions.height
        };
      } else {
        const category = categories?.[tech?.category] || categories?.['Programming'];
        const categoryTechs = technologies?.filter(t => t?.category === tech?.category && !specialPositions[t.id]);
        const categoryIndex = categoryTechs?.findIndex(t => t.id === tech.id);
        const angle = categoryIndex >= 0 ? (categoryIndex * 2 * Math.PI) / categoryTechs?.length : 0;
        const radiusVariation = Math.random() * 40 - 20;
        
        positions[tech.id] = {
          x: (category?.centerX * dimensions?.width) + 
             Math.cos(angle) * (category?.radius + radiusVariation),
          y: (category?.centerY * dimensions?.height) + 
             Math.sin(angle) * (category?.radius + radiusVariation)
        };
      }
    });

    setStarPositions(positions);
  }, [technologies, dimensions]);

  const getStarSize = (proficiency) => {
    switch (proficiency) {
      case 'Expert': return 20;
      case 'Advanced': return 16;
      case 'Intermediate': return 12;
      default: return 8;
    }
  };

  const getConnections = (tech) => {
    if (!tech?.relatedTechnologies) return [];
    
    return tech?.relatedTechnologies?.map(relatedId => {
        const relatedTech = technologies?.find(t => t?.id === relatedId);
        return relatedTech && starPositions?.[relatedId] ? starPositions?.[relatedId] : null;
      })?.filter(Boolean);
  };

  return (
    <div 
      id="constellation-container" 
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-background via-surface to-background"
    >
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 })?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      {/* Main Constellation SVG */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ minHeight: '600px' }}
      >
        <defs>
          {/* Gradient definitions for different proficiency levels */}
          <radialGradient id="expert-gradient">
            <stop offset="0%" stopColor="#00FF88" />
            <stop offset="100%" stopColor="#0066FF" />
          </radialGradient>
          <radialGradient id="advanced-gradient">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </radialGradient>
          <radialGradient id="intermediate-gradient">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#FFB800" />
          </radialGradient>
        </defs>

        {/* Render Technology Stars */}
        {technologies?.map((tech) => (
          starPositions?.[tech?.id] && (
            <TechnologyStar
              key={tech?.id}
              technology={tech}
              position={starPositions?.[tech?.id]}
              size={getStarSize(tech?.proficiency)}
              proficiency={tech?.proficiency}
              onClick={onTechnologyClick}
              isActive={activeTechnology?.id === tech?.id}
              connections={getConnections(tech)}
            />
          )
        ))}

        {/* Category Labels */}
        <text x={dimensions?.width * 0.25} y="50" textAnchor="middle" className="text-lg font-bold fill-primary opacity-60">
          Frontend
        </text>
        <text x={dimensions?.width * 0.75} y="50" textAnchor="middle" className="text-lg font-bold fill-secondary opacity-60">
          Backend
        </text>
        <text x={dimensions?.width * 0.5} y="50" textAnchor="middle" className="text-lg font-bold mb-12 fill-accent opacity-60">
          Database & Cloud
        </text>
      </svg>
      {/* Constellation Navigation Hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        {/* <p x={dimensions?.width * 0.5} y="50" textAnchor="middle" className="text-sm text-text-secondary mb-12 mr-0 ml-0">
          Click on stars to explore technologies
        </p> */}
        {/* <div className="flex items-center justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-primary"></div>
            <span className="text-text-secondary">Expert</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent"></div>
            <span className="text-text-secondary">Advanced</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-warning"></div>
            <span className="text-text-secondary">Intermediate</span>
          </div>
        </div> */}
      </motion.div>
    </div>
  );
};

export default ConstellationMap;