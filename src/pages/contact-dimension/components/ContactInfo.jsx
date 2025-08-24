import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'Mail',
      title: 'Email',
      value: 'abhinallam@gmail.com',
      description: 'For project inquiries and collaborations',
      action: () => window.open('mailto:abhinallam@gmail.com'),
      gradient: 'from-primary to-secondary'
    },
    {
      icon: 'Phone',
      title: 'Phone',
      value: '+91 9391285090',
      description: 'Available for urgent matters and calls',
      action: () => window.open('tel:+919391285090'),
      gradient: 'from-secondary to-accent'
    },
    {
      icon: 'MapPin',
      title: 'Location',
      value: 'Hyderabad, Telangana, India',
      description: 'Based in the heart of tech innovation',
      action: null,
      gradient: 'from-accent to-primary'
    },
    {
      icon: 'Clock',
      title: 'Availability',
      value: 'Mon - Fri, 9AM - 6PM IST',
      description: 'Flexible scheduling for global clients',
      action: null,
      gradient: 'from-primary to-accent'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="contact-info" className="py-20 bg-surface/20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Get In Touch</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Choose your preferred way to connect. I'm here to help bring your vision to reality.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              variants={itemVariants}
              className="floating-element p-6 text-center group hover-scale"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${method.gradient} flex items-center justify-center group-hover:shadow-glow transition-all duration-300`}>
                <Icon name={method.icon} size={24} color="white" />
              </div>
              
              <h3 className="text-lg font-semibold text-text-primary mb-2">{method.title}</h3>
              <p className="text-text-primary font-medium mb-2">{method.value}</p>
              <p className="text-sm text-text-secondary mb-4">{method.description}</p>
              
              {method.action && (
                <motion.button
                  className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary font-medium rounded-lg hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={method.action}
                >
                  <Icon name="ExternalLink" size={16} className="inline mr-2" />
                  Contact
                </motion.button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Response Time */}
          <div className="floating-element p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-success to-secondary flex items-center justify-center mr-4">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Quick Response</h3>
            </div>
            <p className="text-text-secondary mb-4">
              I typically respond to all inquiries within 24 hours. For urgent matters, feel free to call directly.
            </p>
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
              <span>Average response time: 4-6 hours</span>
            </div>
          </div>

          {/* Consultation */}
          <div className="floating-element p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-conversion to-primary flex items-center justify-center mr-4">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Free Consultation</h3>
            </div>
            <p className="text-text-secondary mb-4">
              Let's discuss your project requirements and explore how we can work together to achieve your goals.
            </p>
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Clock" size={16} className="mr-2 text-conversion" />
              <span>30-minute initial consultation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
