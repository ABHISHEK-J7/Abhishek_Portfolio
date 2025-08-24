import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'abhinallam@gmail.com',
      action: () => window.open('mailto:abhinallam@gmail.com')
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      action: () => window.open('tel:+15551234567')
    },
    {
      icon: 'Linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/abhishek-nallam',
      action: () => window.open('https://linkedin.com/in/abhishek-nallam', '_blank')
    },
    {
      icon: 'Github',
      label: 'GitHub',
      value: 'github.com/abhishek-nallam',
      action: () => window.open('https://github.com/abhishek-nallam', '_blank')
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus(null);
        onClose();
      }, 2000);
    }, 1500);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Get In Touch</h2>
                <p className="text-text-secondary mt-1">Let's discuss your next project</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted/50 transition-all duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {contactMethods?.map((method) => (
                  <motion.button
                    key={method?.label}
                    className="flex items-center p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-left group"
                    onClick={method?.action}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 group-hover:shadow-glow">
                      <Icon name={method?.icon} size={20} color="white" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{method?.label}</p>
                      <p className="text-sm text-text-secondary">{method?.value}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Contact Form */}
              <div className="border-t border-border pt-8">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      type="text"
                      name="name"
                      value={formData?.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    type="text"
                    name="subject"
                    value={formData?.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData?.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Tell me about your project or inquiry..."
                      required
                    />
                  </div>

                  {/* Submit Status */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        className="flex items-center p-4 bg-success/10 border border-success/20 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <Icon name="CheckCircle" size={20} className="text-success mr-3" />
                        <span className="text-success font-medium">Message sent successfully!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="left"
                      className="cosmic-glow"
                      disabled={submitStatus === 'success'}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;