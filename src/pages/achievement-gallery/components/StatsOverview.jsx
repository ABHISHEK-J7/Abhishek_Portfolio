import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ achievements }) => {
  const stats = React.useMemo(() => {
    const certifications = achievements?.filter(a => a?.type === 'certification')?.length;
    const education = achievements?.filter(a => a?.type === 'education')?.length;
    const courses = achievements?.filter(a => a?.type === 'course')?.length;
    const totalAchievements = achievements?.filter(a => a?.type === 'achievement')?.length;
    
    const verified = achievements?.filter(a => a?.verified)?.length;
    const currentYear = new Date()?.getFullYear();
    const thisYear = achievements?.filter(a => new Date(a.date)?.getFullYear() === currentYear)?.length;
    
    // Get unique skills
    const allSkills = achievements?.flatMap(a => a?.skills || []);
    const uniqueSkills = [...new Set(allSkills)]?.length;
    
    // Calculate completion rate (achievements with certificates)
    const withCertificates = achievements?.filter(a => a?.certificateUrl)?.length;
    const completionRate = achievements?.length > 0 ? Math.round((withCertificates / achievements?.length) * 100) : 0;

    return {
      total: achievements?.length,
      certifications,
      education,
      courses,
      achievements: totalAchievements,
      verified,
      thisYear,
      uniqueSkills,
      completionRate
    };
  }, [achievements]);

  const statCards = [
    {
      title: 'Total Achievements',
      value: stats?.total,
      icon: 'Trophy',
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      description: 'Career milestones reached'
    },
    {
      title: 'Certifications',
      value: stats?.certifications,
      icon: 'Award',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
      description: 'Professional certifications earned'
    },
    {
      title: 'Education',
      value: stats?.education,
      icon: 'GraduationCap',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      description: 'Academic qualifications'
    },
    {
      title: 'Skills Mastered',
      value: stats?.uniqueSkills,
      icon: 'Code',
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      description: 'Technical and soft skills'
    },
    {
      title: 'This Year',
      value: stats?.thisYear,
      icon: 'Calendar',
      color: 'text-conversion',
      bgColor: 'bg-conversion/20',
      description: `Achievements in ${new Date()?.getFullYear()}`
    },
    {
      title: 'Verified',
      value: `${Math.round((stats?.verified / stats?.total) * 100)}%`,
      icon: 'Shield',
      color: 'text-success',
      bgColor: 'bg-success/20',
      description: 'Verified credentials'
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {statCards?.map((stat, index) => (
        <motion.div
          key={stat?.title}
          variants={cardVariants}
          whileHover="hover"
          className="floating-element p-6 border border-border hover:border-primary/30 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon 
                name={stat?.icon} 
                size={24} 
                className={stat?.color}
              />
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                {stat?.value}
              </div>
              <div className="text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                +{Math.floor(Math.random() * 5) + 1} this month
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors duration-300">
              {stat?.title}
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              {stat?.description}
            </p>
          </div>

          {/* Progress indicator for some stats */}
          {(stat?.title === 'Verified' || stat?.title === 'Skills Mastered') && (
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-1000 delay-500 ${
                    stat?.title === 'Verified' ? 'bg-success' : 'bg-accent'
                  }`}
                  style={{ 
                    width: stat?.title === 'Verified' 
                      ? `${(stats?.verified / stats?.total) * 100}%`
                      : `${Math.min((stats?.uniqueSkills / 50) * 100, 100)}%`
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsOverview;