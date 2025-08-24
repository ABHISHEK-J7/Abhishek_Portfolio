import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import WelcomeHeader from './components/WelcomeHeader';
import BrainVisualization from './components/BrainVisualization';
import NodePreviewModal from './components/NodePreviewModal';
import FloatingActionPanel from './components/FloatingActionPanel';

const TalentSpaceHub = () => {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setActiveNode(node?.id);
  };

  const handleCloseModal = () => {
    setSelectedNode(null);
    setActiveNode(null);
  };

  const handleResumeDownload = () => {
    // Simulate resume download
    const link = document.createElement('a');
    link.href = '/assets/resume/abhishek-nallam-resume.pdf';
    link.download = 'Abhishek_Nallam_Resume.pdf';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleContactClick = () => {
    navigate('/contact-portal');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            className="text-2xl font-bold text-gradient-primary mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Initializing Talent Space
          </motion.h2>
          <p className="text-text-secondary">Preparing your journey through the digital universe...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      {/* Main Content */}
      <main className="relative pt-16">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-warning/5" />
          
          {/* Animated Background Particles */}
          <div className="absolute inset-0">
            {[...Array(50)]?.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Welcome Section */}
          <section className="container mx-auto px-6 py-12">
            <WelcomeHeader />
          </section>

          {/* Brain Visualization Section */}
          <section className="relative h-screen">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <BrainVisualization 
                onNodeClick={handleNodeClick}
                activeNode={activeNode}
              />
            </motion.div>

            {/* Interactive Instructions */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-full px-6 py-3 text-center">
                <p className="text-sm text-text-secondary">
                  Click on any node to explore that dimension of my expertise
                </p>
              </div>
            </motion.div>
          </section>

          {/* Quick Stats Footer */}
          <section className="container mx-auto px-6 py-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <div className="inline-flex items-center space-x-8 bg-surface/30 backdrop-blur-sm border border-border rounded-full px-8 py-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">2025</div>
                  <div className="text-xs text-text-secondary">Current Year</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary">Active</div>
                  <div className="text-xs text-text-secondary">Status</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="text-lg font-bold text-warning">Ready</div>
                  <div className="text-xs text-text-secondary">For Projects</div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
      {/* Modal for Node Preview */}
      <NodePreviewModal 
        selectedNode={selectedNode}
        onClose={handleCloseModal}
      />
      {/* Floating Action Panel */}
      <FloatingActionPanel 
        onResumeDownload={handleResumeDownload}
        onContactClick={handleContactClick}
      />
    </div>
  );
};

export default TalentSpaceHub;