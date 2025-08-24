import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TimelineView = ({ achievements, onAchievementClick }) => {
  const sortedAchievements = [...achievements]?.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'certification': return 'bg-secondary';
      case 'education': return 'bg-primary';
      case 'achievement': return 'bg-warning';
      case 'course': return 'bg-accent';
      default: return 'bg-text-secondary';
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      year: date?.getFullYear(),
      month: date?.toLocaleDateString('en-US', { month: 'short' }),
      day: date?.getDate()
    };
  };

  const groupByYear = (achievements) => {
    return achievements?.reduce((groups, achievement) => {
      const year = new Date(achievement.date)?.getFullYear();
      if (!groups?.[year]) {
        groups[year] = [];
      }
      groups?.[year]?.push(achievement);
      return groups;
    }, {});
  };

  const groupedAchievements = groupByYear(sortedAchievements);
  const years = Object.keys(groupedAchievements)?.sort((a, b) => b - a);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>
      <motion.div
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {years?.map((year) => (
          <div key={year} className="relative">
            {/* Year Marker */}
            <div className="flex items-center mb-6">
              <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full cosmic-glow">
                <span className="text-lg font-bold text-white">{year}</span>
              </div>
              <div className="ml-4 flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>

            {/* Achievements for this year */}
            <div className="ml-20 space-y-4">
              {groupedAchievements?.[year]?.map((achievement, index) => {
                const dateInfo = formatDate(achievement?.date);
                
                return (
                  <motion.div
                    key={achievement?.id}
                    variants={itemVariants}
                    className="relative group cursor-pointer"
                    onClick={() => onAchievementClick(achievement?.id)}
                  >
                    {/* Connection Line */}
                    <div className="absolute -left-20 top-6 w-16 h-0.5 bg-gradient-to-r from-border to-primary/30 group-hover:from-primary/50 group-hover:to-primary transition-all duration-300"></div>
                    {/* Timeline Dot */}
                    <div className={`absolute -left-24 top-4 w-8 h-8 rounded-full ${getTypeColor(achievement?.type)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon 
                        name={getTypeIcon(achievement?.type)} 
                        size={14} 
                        color="white" 
                      />
                    </div>
                    {/* Achievement Card */}
                    <div className="floating-element p-4 border border-border hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-base font-semibold text-text-primary truncate">
                              {achievement?.title}
                            </h3>
                            {achievement?.verified && (
                              <Icon name="Shield" size={14} className="text-secondary" />
                            )}
                          </div>
                          
                          <p className="text-sm text-primary font-medium mb-1">
                            {achievement?.issuer}
                          </p>
                          
                          <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                            {achievement?.description}
                          </p>

                          {/* Skills Preview */}
                          {achievement?.skills && achievement?.skills?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {achievement?.skills?.slice(0, 3)?.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                              {achievement?.skills?.length > 3 && (
                                <span className="px-2 py-1 text-xs bg-muted text-text-secondary rounded-full">
                                  +{achievement?.skills?.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Date */}
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className="text-xs text-text-secondary">
                            {dateInfo?.month} {dateInfo?.day}
                          </div>
                          <div className="text-xs text-text-secondary opacity-60">
                            {dateInfo?.year}
                          </div>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs text-text-secondary capitalize">
                          {achievement?.type}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {achievement?.credentialUrl && (
                            <Icon name="ExternalLink" size={12} className="text-primary" />
                          )}
                          <Icon name="ChevronRight" size={12} className="text-text-secondary" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>
      {/* Timeline End Marker */}
      <div className="relative mt-8">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full cosmic-glow mx-auto">
          <Icon name="Rocket" size={24} color="white" />
        </div>
        <p className="text-center text-sm text-text-secondary mt-2">
          Journey Continues...
        </p>
      </div>
    </div>
  );
};

export default TimelineView;