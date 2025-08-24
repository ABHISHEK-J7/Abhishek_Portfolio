import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsPreview = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const navigate = useNavigate();

  const skillCategories = [
    {
      category: 'Frontend Mastery',
      icon: 'Monitor',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 95, icon: 'Atom' },
        { name: 'JavaScript', level: 92, icon: 'Code' },
        { name: 'Data Handling', level: 88, icon: 'FileCode' },
        { name: 'CSS/SCSS', level: 90, icon: 'Palette' }
      ]
    },
    {
      category: 'Backend Excellence',
      icon: 'Server',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 89, icon: 'Zap' },
        { name: 'Express.js', level: 87, icon: 'Globe' },
        { name: 'MongoDB', level: 85, icon: 'Database' },
        { name: 'PostgreSQL', level: 82, icon: 'HardDrive' }
      ]
    },
    {
      category: 'Creative Tools',
      icon: 'Sparkles',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Framer Motion', level: 93, icon: 'Wand2' },
        { name: 'Three.js', level: 78, icon: 'Box' },
        { name: 'GSAP', level: 85, icon: 'Play' },
        { name: 'Figma', level: 88, icon: 'Layers' }
      ]
    }
  ];

  const handleExploreConstellation = () => {
    navigate('/technology-constellation');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-surface/20 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-6">
            Technical Constellation
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            A preview of the technologies and tools that power my creative solutions. Each skill represents countless hours of learning, building, and innovating.
          </p>
          
          <Button
            variant="outline"
            onClick={handleExploreConstellation}
            iconName="ExternalLink"
            iconPosition="right"
            className="hover:cosmic-glow"
          >
            Explore Full Constellation
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories?.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="floating-element p-6 hover:cosmic-glow transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${category?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={category?.icon} size={24} color="white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">{category?.category}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category?.skills?.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={skill?.icon} 
                          size={16} 
                          className={`transition-colors duration-300 ${
                            hoveredSkill === `${categoryIndex}-${skillIndex}` 
                              ? 'text-primary' :'text-text-secondary'
                          }`}
                        />
                        <span className="text-sm font-medium text-text-primary">{skill?.name}</span>
                      </div>
                      <span className="text-xs text-text-secondary">{skill?.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category?.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill?.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      />
                    </div>

                    {/* Hover Glow Effect */}
                    {hoveredSkill === `${categoryIndex}-${skillIndex}` && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${category?.color} opacity-10 rounded-lg -z-10`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Category Stats */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Average Proficiency</span>
                  <span className="text-primary font-semibold">
                    {Math.round(category?.skills?.reduce((acc, skill) => acc + skill?.level, 0) / category?.skills?.length)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="floating-element p-8 max-w-2xl mx-auto">
            <Icon name="Telescope" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Explore More?
            </h3>
            <p className="text-text-secondary mb-6">
              This is just a glimpse of my technical universe. Dive deeper into the full constellation to see detailed proficiencies, certifications, and project applications.
            </p>
            <Button
              variant="default"
              onClick={handleExploreConstellation}
              iconName="ArrowRight"
              iconPosition="right"
              className="cosmic-glow"
            >
              Enter Technology Constellation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsPreview;