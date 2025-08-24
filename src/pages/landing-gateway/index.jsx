import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import FloatingActions from './components/FloatingActions';
import BrainNetworkPattern from './components/BrainNetworkPattern';
import ContactModal from './components/ContactModal';

const LandingGateway = () => {
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading and set loaded state
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterTalentSpace = () => {
    navigate('/talent-space-hub');
  };

  const handleDownloadResume = () => {
    // Simulate resume download
    const link = document.createElement('a');
    link.href = '/assets/resume/abhishek-nallam-resume.pdf';
    link.download = 'Abhishek_Nallam_Resume.pdf';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleContact = () => {
    setIsContactModalOpen(true);
  };

  const pageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground overflow-hidden relative"
      variants={pageVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {/* Header */}
      <Header />
      {/* Background Elements */}
      <ParticleBackground />
      <BrainNetworkPattern />
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection
          onEnterTalentSpace={handleEnterTalentSpace}
          onDownloadResume={handleDownloadResume}
        />
      </main>
      {/* Floating Actions */}
      <FloatingActions
        onDownloadResume={handleDownloadResume}
        onContact={handleContact}
      />
      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      {/* Gradient Overlays for Depth */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/50 to-transparent" />
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background/30 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background/30 to-transparent" />
      </div>
      {/* Loading Overlay */}
      <motion.div
        className="fixed inset-0 bg-background z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5, delay: isLoaded ? 0.3 : 0 }}
        style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cosmic-glow mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
            </motion.div>
          </div>
          <p className="text-text-secondary text-sm">Initializing Talent Space...</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingGateway;