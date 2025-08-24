import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TechnologyStar = ({ 
  technology, 
  position, 
  size, 
  proficiency, 
  onClick,
  isActive,
  connections = []
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'from-secondary to-primary';
      case 'Advanced':
        return 'from-primary to-accent';
      case 'Intermediate':
        return 'from-accent to-warning';
      default:
        return 'from-muted to-text-secondary';
    }
  };

  const getProficiencyGlow = (level) => {
    switch (level) {
      case 'Expert':
        return 'shadow-[0_0_30px_rgba(0,255,136,0.6)]';
      case 'Advanced':
        return 'shadow-[0_0_25px_rgba(0,102,255,0.5)]';
      case 'Intermediate':
        return 'shadow-[0_0_20px_rgba(139,92,246,0.4)]';
      default:
        return 'shadow-[0_0_15px_rgba(160,160,176,0.3)]';
    }
  };

  return (
    <>
      {/* Connection Lines */}
      {connections?.map((connection, index) => (
        <motion.line
          key={index}
          x1={position?.x}
          y1={position?.y}
          x2={connection?.x}
          y2={connection?.y}
          stroke="rgba(0,102,255,0.3)"
          strokeWidth="1"
          className="pointer-events-none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isActive ? 1 : 0.3, 
            opacity: isActive ? 0.6 : 0.2 
          }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />
      ))}
      {/* Technology Star */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: Math.random() * 0.5,
          type: "spring",
          stiffness: 100 
        }}
        whileHover={{ scale: 1.2 }}
        className="cursor-pointer"
        onClick={() => onClick(technology)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer Glow Ring */}
        <motion.circle
          cx={position?.x}
          cy={position?.y}
          r={size + 8}
          fill="none"
          stroke={`url(#gradient-${technology?.id})`}
          strokeWidth="2"
          opacity={isHovered || isActive ? 0.8 : 0.3}
          className={`${getProficiencyGlow(proficiency)} transition-all duration-300`}
          animate={{
            r: isHovered ? size + 12 : size + 8,
            strokeWidth: isHovered ? 3 : 2
          }}
        />

        {/* Main Star Circle */}
        <motion.circle
          cx={position?.x}
          cy={position?.y}
          r={size}
          fill={`url(#gradient-${technology?.id})`}
          className={`${getProficiencyGlow(proficiency)} transition-all duration-300`}
          animate={{
            r: isHovered ? size + 2 : size
          }}
        />

        {/* Technology Icon */}
        <foreignObject
          x={position?.x - 12}
          y={position?.y - 12}
          width="24"
          height="24"
          className="pointer-events-none"
        >
          <div className="flex items-center justify-center w-full h-full">
            <Icon 
              name={technology?.icon} 
              size={16} 
              color="white"
              className="drop-shadow-lg"
            />
          </div>
        </foreignObject>

        {/* Proficiency Badge */}
        <motion.circle
          cx={position?.x + size - 5}
          cy={position?.y - size + 5}
          r="8"
          fill="rgba(0,0,0,0.8)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          opacity={isHovered ? 1 : 0}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        
        <motion.text
          x={position?.x + size - 5}
          y={position?.y - size + 9}
          textAnchor="middle"
          className="text-xs font-bold fill-white pointer-events-none"
          opacity={isHovered ? 1 : 0}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          {proficiency?.charAt(0)}
        </motion.text>

        {/* Gradient Definitions */}
        <defs>
          <radialGradient id={`gradient-${technology?.id}`}>
            <stop offset="0%" stopColor={technology?.color || '#0066FF'} />
            <stop offset="100%" stopColor={technology?.secondaryColor || '#00FF88'} />
          </radialGradient>
        </defs>
      </motion.g>
      {/* Hover Tooltip */}
      {isHovered && (
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <motion.rect
            x={position?.x - 80}
            y={position?.y - size - 60}
            width="160"
            height="50"
            rx="8"
            fill="rgba(26,26,46,0.95)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            className="drop-shadow-xl"
          />
          
          <text
            x={position?.x}
            y={position?.y - size - 40}
            textAnchor="middle"
            className="text-sm font-semibold fill-white"
          >
            {technology?.name}
          </text>
          
          <text
            x={position?.x}
            y={position?.y - size - 25}
            textAnchor="middle"
            className="text-xs fill-text-secondary"
          >
            {proficiency} • {technology?.experience}
          </text>
        </motion.g>
      )}
    </>
  );
};

export default TechnologyStar;