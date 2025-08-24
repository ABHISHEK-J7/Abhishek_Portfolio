import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialConnections = () => {
  const socialPlatforms = [
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: 'https://linkedin.com/in/abhishek-nallam',
      description: 'Professional network and updates',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'GitHub',
      icon: 'Github',
      url: 'https://github.com/abhishek-nallam',
      description: 'Code repositories and projects',
      color: 'from-gray-800 to-gray-900'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: 'https://twitter.com/abhisheknallam',
      description: 'Thoughts and industry insights',
      color: 'from-blue-400 to-blue-500'
    },
    {
      name: 'Dribbble',
      icon: 'Dribbble',
      url: 'https://dribbble.com/abhisheknallam',
      description: 'Design work and inspiration',
      color: 'from-pink-500 to-red-500'
    },
    {
      name: 'Medium',
      icon: 'BookOpen',
      url: 'https://medium.com/@abhisheknallam',
      description: 'Technical articles and insights',
      color: 'from-green-600 to-green-700'
    },
    {
      name: 'Behance',
      icon: 'Palette',
      url: 'https://behance.net/abhisheknallam',
      description: 'Portfolio and creative work',
      color: 'from-blue-500 to-blue-600'
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
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Connect & Follow</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Stay updated with my latest work, thoughts, and insights across various platforms.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {socialPlatforms.map((platform) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="floating-element p-6 group hover-scale"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300`}>
                <Icon name={platform.icon} size={24} color="white" />
              </div>
              
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                {platform.name}
              </h3>
              
              <p className="text-text-secondary mb-4">
                {platform.description}
              </p>
              
              <div className="flex items-center text-primary font-medium">
                <span>Visit Profile</span>
                <Icon name="ExternalLink" size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        {/* <motion.div
          className="mt-16 floating-element p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Mail" size={24} color="white" />
          </div>
          
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Stay in the Loop
          </h3>
          
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Subscribe to my newsletter for exclusive insights, project updates, and industry trends delivered straight to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover-scale cosmic-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default SocialConnections;
