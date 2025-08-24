import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TechnologyDetail = ({ technology, onClose, relatedProjects = [] }) => {
  if (!technology) return null;

  const getProficiencyDescription = (level) => {
    switch (level) {
      case 'Expert':
        return "Deep expertise with extensive production experience and ability to architect complex solutions.";
      case 'Advanced':
        return "Strong proficiency with solid understanding of best practices and advanced concepts.";
      case 'Intermediate':
        return "Good working knowledge with ability to implement standard features and solutions.";
      default:
        return "Basic understanding with ability to work on simple tasks with guidance.";
    }
  };

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'text-secondary';
      case 'Advanced':
        return 'text-primary';
      case 'Intermediate':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e?.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center cosmic-glow">
                  <Icon name={technology?.icon} size={32} color="white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{technology?.name}</h2>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`text-sm font-semibold ${getProficiencyColor(technology?.proficiency)}`}>
                      {technology?.proficiency}
                    </span>
                    <span className="text-text-secondary">•</span>
                    <span className="text-sm text-text-secondary">{technology?.experience}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
                className="text-text-secondary hover:text-white"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About This Technology</h3>
              <p className="text-text-secondary leading-relaxed">
                {technology?.description || getProficiencyDescription(technology?.proficiency)}
              </p>
            </div>

            {/* Skills & Frameworks */}
            {technology?.skills && technology?.skills?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Skills & Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {technology?.skills?.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-text-secondary border border-border"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {technology?.keyFeatures && technology?.keyFeatures?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {technology?.keyFeatures?.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon name="CheckCircle" size={16} className="text-secondary flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Projects */}
            {relatedProjects?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Projects Using This Technology</h3>
                <div className="space-y-3">
                  {relatedProjects?.slice(0, 3)?.map((project, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Icon name="Folder" size={16} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{project?.name}</h4>
                          <p className="text-sm text-text-secondary">{project?.description}</p>
                        </div>
                      </div>
                      <Icon name="ExternalLink" size={16} className="text-text-secondary" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Timeline */}
            {technology?.timeline && technology?.timeline?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Experience Timeline</h3>
                <div className="space-y-3">
                  {technology?.timeline?.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-white">{item?.milestone}</p>
                        <p className="text-xs text-text-secondary">{item?.year}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-muted/20 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                Last updated: {new Date()?.toLocaleDateString()}
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close
                </Button>
                <Button variant="default" size="sm" iconName="ExternalLink" iconPosition="right">
                  View Projects
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TechnologyDetail;