import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PersonalPhilosophy = () => {
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  const philosophies = [
    {
      title: 'Code that Captivates',
      subtitle: 'Beyond Functionality',
      description: `I believe that great code doesn't just work—it inspires. Every line I write is crafted with the understanding that behind every click, hover, and interaction is a human being seeking an experience that delights and engages.`,icon: 'Heart',color: 'from-red-500 to-pink-500',
      principles: [
        'User experience is paramount','Performance meets aesthetics','Accessibility is non-negotiable','Details make the difference'
      ]
    },
    {
      title: 'Solutions that Scale',subtitle: 'Future-Proof Architecture',
      description: `Building for today while preparing for tomorrow. I architect solutions that grow with businesses, adapt to changing needs, and maintain their elegance even as complexity increases.`,
      icon: 'TrendingUp',color: 'from-green-500 to-emerald-500',
      principles: [
        'Modular and maintainable code','Scalable system design','Performance optimization','Clean architecture patterns'
      ]
    },
    {
      title: 'Innovation Through Iteration',subtitle: 'Continuous Evolution',
      description: `The best solutions emerge through thoughtful iteration. I embrace experimentation, learn from failures, and constantly refine my approach to stay at the forefront of web development.`,
      icon: 'RefreshCw',color: 'from-blue-500 to-cyan-500',
      principles: [
        'Embrace new technologies','Learn from every project','Iterate based on feedback','Stay curious and adaptable'
      ]
    },
    {
      title: 'Collaborative Creation',subtitle: 'Stronger Together',description: `The most impactful solutions are born from collaboration. I thrive in environments where diverse perspectives merge to create something greater than the sum of its parts.`,icon: 'Users',color: 'from-purple-500 to-indigo-500',
      principles: [
        'Open communication','Knowledge sharing','Mentoring and learning','Team-first mindset'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-surface/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-6">
            Development Philosophy
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            The principles that guide every decision, every line of code, and every user interaction I create.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Philosophy Navigation */}
          <div className="space-y-4">
            {philosophies?.map((philosophy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`floating-element p-6 cursor-pointer transition-all duration-300 ${
                  activePhilosophy === index 
                    ? 'cosmic-glow border-primary/50' :'hover:border-primary/30'
                }`}
                onClick={() => setActivePhilosophy(index)}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${philosophy?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={philosophy?.icon} size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-1">
                      {philosophy?.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {philosophy?.subtitle}
                    </p>
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={20} 
                    className={`transition-all duration-300 ${
                      activePhilosophy === index 
                        ? 'text-primary rotate-90' :'text-text-secondary'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Philosophy Content */}
          <div className="lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhilosophy}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="floating-element p-8 h-full"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${philosophies?.[activePhilosophy]?.color} rounded-xl flex items-center justify-center`}>
                    <Icon name={philosophies?.[activePhilosophy]?.icon} size={32} color="white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {philosophies?.[activePhilosophy]?.title}
                    </h3>
                    <p className="text-primary font-medium">
                      {philosophies?.[activePhilosophy]?.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-8">
                  {philosophies?.[activePhilosophy]?.description}
                </p>

                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-4">
                    Core Principles:
                  </h4>
                  <div className="space-y-3">
                    {philosophies?.[activePhilosophy]?.principles?.map((principle, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${philosophies?.[activePhilosophy]?.color} rounded-full`}></div>
                        <span className="text-text-secondary">{principle}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quote Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8 pt-6 border-t border-border"
                >
                  <div className="flex items-start space-x-3">
                    <Icon name="Quote" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-text-secondary italic">
                      "Every great developer is also a great problem solver, but the best developers are those who solve problems in ways that inspire others."
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="floating-element p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient-primary mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-text-secondary mb-6">
              These philosophies aren't just words—they're the foundation of every project I undertake. Ready to see them in action?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-cosmic transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/project-universe'}
              >
                <Icon name="Rocket" size={20} className="inline mr-2" />
                View My Projects
              </motion.button>
              <motion.button
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/talent-space-hub'}
              >
                <Icon name="MessageCircle" size={20} className="inline mr-2" />
                Start a Conversation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalPhilosophy;