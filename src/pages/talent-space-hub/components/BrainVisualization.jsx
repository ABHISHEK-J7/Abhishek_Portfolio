import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import AppLogo from '../../../components/AppLogo';

const BrainVisualization = ({ onNodeClick, activeNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e?.clientX / window.innerWidth) * 100,
        y: (e?.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const brainNodes = [
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'Personal Journey',
      icon: 'User',
      color: 'from-purple-500 to-purple-700',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      position: { x: 25, y: 30 },
      route: '/about-me-dimension'
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'Digital Creations',
      icon: 'Rocket',
      color: 'from-blue-500 to-blue-700',
      glowColor: 'rgba(0, 102, 255, 0.4)',
      position: { x: 75, y: 25 },
      route: '/project-universe'
    },
    {
      id: 'skills',
      title: 'Tech Stack',
      subtitle: 'Technical Arsenal',
      icon: 'Code',
      color: 'from-green-500 to-green-700',
      glowColor: 'rgba(0, 255, 136, 0.4)',
      position: { x: 20, y: 70 },
      route: '/technology-constellation'
    },
    {
      id: 'achievements',
      title: 'Achievements',
      subtitle: 'Milestone Gallery',
      icon: 'Trophy',
      color: 'from-yellow-500 to-yellow-700',
      glowColor: 'rgba(255, 184, 0, 0.4)',
      position: { x: 80, y: 75 },
      route: '/achievement-gallery'
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: 'Connect & Collaborate',
      icon: 'MessageCircle',
      color: 'from-gray-400 to-gray-600',
      glowColor: 'rgba(255, 255, 255, 0.3)',
      position: { x: 50, y: 50 },
      route: '/contact-portal'
    }
  ];

  const connectionLines = [
    { from: { x: 25, y: 30 }, to: { x: 50, y: 50 } },
    { from: { x: 75, y: 25 }, to: { x: 50, y: 50 } },
    { from: { x: 20, y: 70 }, to: { x: 50, y: 50 } },
    { from: { x: 80, y: 75 }, to: { x: 50, y: 50 } },
    { from: { x: 25, y: 30 }, to: { x: 75, y: 25 } },
    { from: { x: 20, y: 70 }, to: { x: 80, y: 75 } }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: (mousePosition?.x - 50) * 0.1,
              y: (mousePosition?.y - 50) * 0.1,
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      {/* Neural Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connectionLines?.map((line, index) => (
          <motion.line
            key={index}
            x1={`${line?.from?.x}%`}
            y1={`${line?.from?.y}%`}
            x2={`${line?.to?.x}%`}
            y2={`${line?.to?.y}%`}
            stroke="rgba(0, 102, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
      </svg>
      {/* Brain Nodes */}
      {brainNodes?.map((node, index) => (
        <motion.div
          key={node?.id}
          className="absolute cursor-pointer group"
          style={{
            left: `${node?.position?.x}%`,
            top: `${node?.position?.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNodeClick(node)}
        >
          {/* Node Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${node?.glowColor} 0%, transparent 70%)`,
              width: '120px',
              height: '120px',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%'
            }}
            animate={{
              scale: activeNode === node?.id ? [1, 1.3, 1] : [1, 1.1, 1],
              opacity: activeNode === node?.id ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main Node */}
          <motion.div
            className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${node?.color} border border-white/20 flex items-center justify-center shadow-2xl`}
            whileHover={{
              boxShadow: `0 0 30px ${node?.glowColor}`,
            }}
          >
            <Icon 
              name={node?.icon} 
              size={28} 
              color="white" 
              className="drop-shadow-lg"
            />

            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
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
          </motion.div>

          {/* Node Label */}
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            <div className="bg-surface/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 min-w-max">
              <h3 className="text-sm font-semibold text-white">{node?.title}</h3>
              <p className="text-xs text-text-secondary">{node?.subtitle}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
      {/* Central Logo Core */}
      {/* <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="w-32 h-32 flex items-center justify-center"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <AppLogo size={48} />
        </motion.div>
      </motion.div> */}
    </div>
  );
};

export default BrainVisualization;