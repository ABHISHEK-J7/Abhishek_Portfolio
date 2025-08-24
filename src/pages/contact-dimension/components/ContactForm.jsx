import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:abhinallam@gmail.com?subject=${encodeURIComponent(`Contact Form: ${formData.subject}`)}&body=${encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
      )}`;
      
      // Open default email client
      window.open(mailtoLink);
      
      // Show success message
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setSubmitStatus(null);
          setErrors({});
        }, 3000);
      }, 1000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }
  };

  return (
    <section id="contact-form" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Send a Message</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Tell me about your project and I'll get back to you with a detailed proposal.
          </p>
        </motion.div>

        <motion.div
          className="floating-element p-8 lg:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name *"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                error={errors.name}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                error={errors.email}
                required
              />
            </div>

            <Input
              label="Subject *"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="What's this about?"
              error={errors.subject}
              required
            />

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-4 py-3 bg-background border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                  errors.message ? 'border-error' : 'border-border'
                }`}
                placeholder="Tell me about your project, goals, and any specific requirements..."
                required
              />
              {errors.message && (
                <p className="text-error text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  className="flex items-center p-4 bg-success/10 border border-success/20 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Icon name="CheckCircle" size={20} className="text-success mr-3" />
                  <div>
                    <p className="text-success font-medium">Message sent successfully!</p>
                    <p className="text-success/80 text-sm">I'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
