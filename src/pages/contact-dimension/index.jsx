import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import SocialConnections from './components/SocialConnections';
import ContactBackground from './components/ContactBackground';

const ContactDimension = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Contact - Abhishek Nallam | Let\'s Connect';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background Elements */}
      <ContactBackground />
      
      {/* Header */}
      <Header />
      
      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Information */}
        <ContactInfo />

        {/* Social Connections */}
        {/* <SocialConnections /> */}

        {/* Contact Form */}
        <ContactForm />

        {/* Footer Section */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-12 border-t border-border bg-surface/20 relative z-10"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-text-secondary">
              © {new Date()?.getFullYear()} Abhishek Nallam. Let's build something amazing together.
            </p>
          </div>
        </motion.footer>
      </main>

      {/* Gradient Overlays for Depth */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/50 to-transparent" />
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background/30 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background/30 to-transparent" />
      </div>
    </div>
  );
};

export default ContactDimension;
