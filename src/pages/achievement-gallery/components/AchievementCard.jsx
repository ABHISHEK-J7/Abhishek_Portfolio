import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AchievementCard = ({ achievement, index, isExpanded, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const expandVariants = {
    collapsed: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    expanded: { 
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'certification': return 'Award';
      case 'education': return 'GraduationCap';
      case 'achievement': return 'Trophy';
      case 'course': return 'BookOpen';
      default: return 'Star';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'certification': return 'text-secondary';
      case 'education': return 'text-primary';
      case 'achievement': return 'text-warning';
      case 'course': return 'text-accent';
      default: return 'text-text-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative group"
    >
      <div className="floating-element p-6 border border-border hover:border-primary/30 transition-all duration-300 cosmic-border">
        {/* Achievement Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            {/* Icon/Logo */}
            <div className="relative flex-shrink-0">
              {achievement?.logo ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Image
                    src={achievement?.logo}
                    alt={`${achievement?.title} logo`}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <Icon 
                      name={getTypeIcon(achievement?.type)} 
                      size={24} 
                      className={getTypeColor(achievement?.type)}
                    />
                  )}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Icon 
                    name={getTypeIcon(achievement?.type)} 
                    size={24} 
                    className={getTypeColor(achievement?.type)}
                  />
                </div>
              )}
              
              {/* Status Indicator */}
              {achievement?.verified && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={10} color="white" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-text-primary truncate">
                  {achievement?.title}
                </h3>
                {achievement?.grade && (
                  <span className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full">
                    {achievement?.grade}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-primary font-medium mb-1">
                {achievement?.issuer}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <span className="flex items-center">
                  <Icon name="Calendar" size={12} className="mr-1" />
                  {formatDate(achievement?.date)}
                </span>
                
                {achievement?.expiryDate && (
                  <span className="flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    Expires {formatDate(achievement?.expiryDate)}
                  </span>
                )}
                
                <span className="px-2 py-1 bg-muted rounded-full text-text-secondary capitalize">
                  {achievement?.type}
                </span>
              </div>
            </div>
          </div>

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(achievement?.id)}
            className="flex-shrink-0"
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16}
              className="transition-transform duration-300"
            />
          </Button>
        </div>

        {/* Quick Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {achievement?.description}
        </p>

        {/* Skills Tags */}
        {achievement?.skills && achievement?.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {achievement?.skills?.slice(0, 4)?.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full"
              >
                {skill}
              </span>
            ))}
            {achievement?.skills?.length > 4 && (
              <span className="px-2 py-1 text-xs bg-muted text-text-secondary rounded-full">
                +{achievement?.skills?.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {achievement?.credentialUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(achievement?.credentialUrl, '_blank')}
              iconName="ExternalLink"
              iconPosition="right"
            >
              View Credential
            </Button>
          )}
          
          {achievement?.certificateUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(achievement?.certificateUrl, '_blank')}
              iconName="Download"
              iconPosition="left"
            >
              Certificate
            </Button>
          )}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-border">
                {/* Detailed Description */}
                {achievement?.detailedDescription && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-2">
                      About This Achievement
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {achievement?.detailedDescription}
                    </p>
                  </div>
                )}

                {/* Key Learning Outcomes */}
                {achievement?.learningOutcomes && achievement?.learningOutcomes?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-3">
                      Key Learning Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {achievement?.learningOutcomes?.map((outcome, outcomeIndex) => (
                        <li key={outcomeIndex} className="flex items-start space-x-2">
                          <Icon 
                            name="CheckCircle" 
                            size={14} 
                            className="text-secondary mt-0.5 flex-shrink-0" 
                          />
                          <span className="text-sm text-text-secondary">
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* All Skills */}
                {achievement?.skills && achievement?.skills?.length > 4 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-3">
                      Skills Covered
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {achievement?.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects/Applications */}
                {achievement?.projects && achievement?.projects?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-3">
                      Related Projects
                    </h4>
                    <div className="space-y-3">
                      {achievement?.projects?.map((project, projectIndex) => (
                        <div key={projectIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-text-primary">
                              {project?.name}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {project?.description}
                            </p>
                          </div>
                          {project?.url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(project?.url, '_blank')}
                              iconName="ExternalLink"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Details */}
                {achievement?.credentialId && (
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>Credential ID: {achievement?.credentialId}</span>
                      {achievement?.verified && (
                        <span className="flex items-center text-secondary">
                          <Icon name="Shield" size={12} className="mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AchievementCard;