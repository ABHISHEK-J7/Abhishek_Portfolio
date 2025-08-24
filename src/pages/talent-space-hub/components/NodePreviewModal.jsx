import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NodePreviewModal = ({ selectedNode, onClose }) => {
  const navigate = useNavigate();

  const nodeContent = {
    about: {
      title: 'About Me Dimension',
      description: `Discover the story behind the code. My journey from curious beginner to seasoned developer, 
      exploring the experiences that shaped my technical philosophy and creative approach to problem-solving.`,
      highlights: [
        'Professional Journey & Background',
        'Technical Philosophy & Approach',
        'Personal Interests & Hobbies',
        'Career Milestones & Growth'
      ],
      stats: { experience: '2+ Years', projects: '5+ Completed', satisfaction: '100% Client' }
    },
    projects: {
      title: 'Project Universe',
      description: `Explore a curated collection of my digital creations. From complex web applications to 
      innovative solutions, each project represents a unique challenge conquered through code and creativity.`,
      highlights: [
        'Full-Stack Web Applications',
        'React & Next.js Showcases',
        'API Development & Integration',
        'UI/UX Design Implementation'
      ],
      stats: { projects: '5+ Built', technologies: '15+ Used', clients: '10+ Satisfied' }
    },
    skills: {
      title: 'Technology Constellation',
      description: `Navigate through my technical arsenal. A comprehensive map of programming languages, 
      frameworks, tools, and technologies that power my development capabilities.`,
      highlights: [
        'Frontend: React, Next.js, Vue.js',
        'Backend: Node.js, Python, Java',
        'Database: MongoDB, PostgreSQL',
        'Cloud: AWS, Docker, Kubernetes'
      ],
      stats: { languages: '7+ Languages', frameworks: '15+ Frameworks', tools: '20+ Tools' }
    },
    achievements: {
      title: 'Achievement Gallery',
      description: `Witness the milestones of my professional journey. Certifications, awards, and recognitions 
      that validate my expertise and commitment to continuous learning and excellence.`,
      highlights: [
        'Professional Certifications',
        'Industry Recognition Awards',
        'Educational Achievements',
        'Community Contributions'
      ],
      stats: { certificates: '15+ Earned', awards: '4+ Received', courses: '20+ Completed' }
    },
    contact: {
      title: 'Contact Portal',
      description: `Ready to collaborate? Multiple channels to connect and start meaningful conversations 
      about projects, opportunities, or just to share ideas about technology and innovation.`,
      highlights: [
        'Direct Email Communication',
        'Professional Social Networks',
        'Project Collaboration Inquiry',
        'Technical Discussion Forums'
      ],
      stats: { response: '< 12 Hours', availability: '95% Uptime', satisfaction: '100% Rate' }
    }
  };

  const handleExplore = () => {
    if (selectedNode?.route) {
      navigate(selectedNode?.route);
      onClose();
    }
  };

  if (!selectedNode) return null;

  const content = nodeContent?.[selectedNode?.id];
  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className={`relative p-6 bg-gradient-to-br ${selectedNode?.color} text-white`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Icon name={selectedNode?.icon} size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{content?.title}</h2>
                <p className="text-white/80">{selectedNode?.subtitle}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(content?.stats)?.map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold">{value}</div>
                  <div className="text-xs text-white/70 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-text-secondary mb-6 leading-relaxed">
              {content?.description}
            </p>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Icon name="Star" size={20} className="mr-2 text-warning" />
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {content?.highlights?.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handleExplore}
                iconName="ArrowRight"
                iconPosition="right"
                className="flex-1"
              >
                Explore {selectedNode?.title}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                iconName="Eye"
                iconPosition="left"
              >
                Quick View
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <Icon name={selectedNode?.icon} size={128} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NodePreviewModal;