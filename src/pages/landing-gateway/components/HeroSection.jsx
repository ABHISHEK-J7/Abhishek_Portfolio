import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onEnterTalentSpace, onDownloadResume }) => {
  const [currentDescriptor, setCurrentDescriptor] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const descriptors = [
    {
      title: "Full-Stack Developer",
      icon: "Code",
      color: "from-primary to-secondary"
    },
    {
      title: "React.js Specialist",
      icon: "Zap",
      color: "from-secondary to-accent"
    },
    {
      title: "Digital Experience Creator",
      icon: "Palette",
      color: "from-accent to-primary"
    },
    {
      title: "UI/UX Innovator",
      icon: "Eye",
      color: "from-primary to-conversion"
    },
    {
      title: "Code Architect",
      icon: "Building",
      color: "from-conversion to-secondary"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptor((prev) => (prev + 1) % descriptors?.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [descriptors?.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const descriptorVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 lg:px-8">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Name */}
        <motion.div
          variants={nameVariants}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gradient-primary mb-4">
            Abhishek
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-90">
            Nallam
          </h2>
        </motion.div>

        {/* Dynamic Icon and Descriptor */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex flex-col items-center justify-center"
        >
          {/* Descriptor Text */}
          <motion.p
            key={`text-${currentDescriptor}`}
            variants={descriptorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xl md:text-2xl lg:text-3xl text-text-secondary mb-6 font-medium text-center"
          >
            {descriptors[currentDescriptor]?.title}
          </motion.p>
          {/* Icon */}
          <motion.div
            key={`icon-${currentDescriptor}`}
            className="mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${descriptors[currentDescriptor]?.color} flex items-center justify-center cosmic-glow`}>
              <Icon 
                name={descriptors[currentDescriptor]?.icon} 
                size={48} 
                color="white" 
                className="md:w-16 md:h-16"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Where technical expertise meets creative vision. Building the future of digital experiences, 
            one line of code at a time.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="default"
              size="lg"
              onClick={onEnterTalentSpace}
              iconName="Zap"
              iconPosition="left"
              className="text-lg px-8 py-4 cosmic-glow hover:shadow-glow-lg conversion-glow"
            >
              Enter Talent Space
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onDownloadResume}
              iconName="Download"
              iconPosition="left"
              className="text-lg px-8 py-4"
            >
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center text-text-secondary"
          >
            <span className="text-sm mb-2">Explore</span>
            <Icon name="ChevronDown" size={20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;