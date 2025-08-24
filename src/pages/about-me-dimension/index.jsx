import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import PersonalIntro from './components/PersonalIntro';
import JourneyTimeline from './components/JourneyTimeline';
import SkillsPreview from './components/SkillsPreview';
import PersonalPhilosophy from './components/PersonalPhilosophy';

const AboutMeDimension = () => {
  useEffect(() => {
    // Set page title
    document.title = 'About Me - Abhishek Nallam | Digital Frontier Pioneer';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        {/* Personal Introduction Section */}
        <PersonalIntro />

        {/* Journey Timeline Section */}
        <JourneyTimeline />

        {/* Skills Preview Section */}
        <SkillsPreview />

        {/* Personal Philosophy Section */}
        {/* <PersonalPhilosophy /> */}

        {/* Footer Section */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-12 border-t border-border bg-surface/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-text-secondary">
              © {new Date()?.getFullYear()} Abhishek Nallam. Crafting digital experiences that inspire.
            </p>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default AboutMeDimension;