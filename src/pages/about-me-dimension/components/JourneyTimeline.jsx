import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const JourneyTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineData = [
    {
      year: '2022',
      title: 'The Spark Ignites',
      role: 'Computer Science Student',
      description: `My journey began with curiosity about how websites work. Late nights spent learning HTML, CSS, and JavaScript laid the foundation for what would become a passionate career in web development.`,
      icon: 'Lightbulb',
      color: 'from-yellow-500 to-orange-500',
      achievements: ['First HTML/CSS project', 'JavaScript fundamentals', 'Problem-solving mindset']
    },
    {
      year: '2023',
      title: 'Framework Discovery',
      role: 'Frontend Enthusiast',
      description: `Discovered React and fell in love with component-based architecture. This was the turning point where I realized the power of modern frontend frameworks in creating dynamic user experiences.`,
      icon: 'Zap',
      color: 'from-blue-500 to-cyan-500',
      achievements: ['React mastery', 'Component thinking', 'State management']
    },
    {
      year: '2024',
      title: 'Full-Stack Evolution',
      role: 'Backend Explorer',
      description: `Expanded into backend development with Node.js and databases. Understanding the complete web development cycle allowed me to build end-to-end solutions with confidence.`,
      icon: 'Database',
      color: 'from-green-500 to-emerald-500',
      achievements: ['Node.js proficiency', 'Database design', 'API development']
    },
    {
      year: '2024',
      title: 'Professional Growth',
      role: 'Junior Developer',
      description: `Joined my first development team and learned the importance of collaboration, code reviews, and agile methodologies. Real-world projects taught me to balance functionality with user experience.`,
      icon: 'Users',
      color: 'from-purple-500 to-pink-500',
      achievements: ['Team collaboration', 'Agile methodology', 'Code quality']
    },
    {
      year: '2025',
      title: 'Innovation Focus',
      role: 'Full-Stack Developer',
      description: `Started focusing on creating innovative user experiences with advanced animations and interactions. Developed expertise in modern tools like Framer Motion and advanced React patterns.`,
      icon: 'Sparkles',
      color: 'from-indigo-500 to-purple-500',
      achievements: ['Animation expertise', 'UX innovation', 'Performance optimization']
    },
    {
      year: '2025',
      title: 'Digital Architect',
      role: 'Senior Developer',
      description: `Now crafting immersive digital experiences that push boundaries. Leading projects that combine technical excellence with creative vision, building the future of web interactions.`,
      icon: 'Crown',
      color: 'from-primary to-secondary',
      achievements: ['Technical leadership', 'Creative solutions', 'Mentoring others']
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
            My Journey Through Code
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From curious beginner to digital architect—every milestone shaped my approach to creating exceptional web experiences.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full opacity-30"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <motion.div
                    className={`floating-element p-6 cursor-pointer transition-all duration-300 ${
                      activeIndex === index ? 'cosmic-glow scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item?.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={item?.icon} size={24} color="white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{item?.year}</div>
                        <div className="text-sm text-secondary font-medium">{item?.role}</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary mb-3">{item?.title}</h3>
                    <p className="text-text-secondary leading-relaxed mb-4">{item?.description}</p>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border pt-4 mt-4"
                        >
                          <h4 className="text-sm font-semibold text-primary mb-3">Key Achievements:</h4>
                          <div className="space-y-2">
                            {item?.achievements?.map((achievement, achIndex) => (
                              <div key={achIndex} className="flex items-center space-x-2">
                                <Icon name="CheckCircle" size={16} className="text-secondary" />
                                <span className="text-sm text-text-secondary">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-text-secondary">Click to expand</span>
                      <Icon 
                        name={activeIndex === index ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="text-primary" 
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background z-10 cosmic-glow"></div>

                {/* Spacer for opposite side */}
                <div className="hidden lg:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;