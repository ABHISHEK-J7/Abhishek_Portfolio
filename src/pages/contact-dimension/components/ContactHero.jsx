import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactHero = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient-primary">Let's Connect</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project and explore the possibilities together.
            </p>
          </motion.div>

          {/* Contact Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="floating-element p-6 text-center group hover-scale">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <Icon name="MessageCircle" size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Quick Response</h3>
              <p className="text-text-secondary">Usually respond within 24 hours</p>
            </div>

            <div className="floating-element p-6 text-center group hover-scale">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <Icon name="Clock" size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Flexible Schedule</h3>
              <p className="text-text-secondary">Available for calls and meetings</p>
            </div>

            <div className="floating-element p-6 text-center group hover-scale">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <Icon name="Globe" size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Global Reach</h3>
              <p className="text-text-secondary">Working with clients worldwide</p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover-scale cosmic-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Send" size={20} className="inline mr-2" />
              Send Message
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border border-border text-text-primary font-semibold rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Phone" size={20} className="inline mr-2" />
              View Contact Info
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
