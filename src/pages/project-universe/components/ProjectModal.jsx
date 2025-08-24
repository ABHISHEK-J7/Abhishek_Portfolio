import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleLiveDemo = () => {
    window.open(project?.liveUrl, '_blank');
  };

  const handleGitHub = () => {
    window.open(project?.githubUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 cosmic-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto floating-element cosmic-glow">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-surface transition-colors duration-200"
        >
          <Icon name="X" size={20} className="text-text-secondary hover:text-text-primary" />
        </button>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gradient-primary">
                  {project?.title}
                </h2>
                <p className="text-text-secondary max-w-2xl">
                  {project?.fullDescription}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={20} className="text-warning fill-current" />
                <span className="text-lg font-semibold text-text-primary">{project?.rating}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project?.liveUrl && (
                <Button
                  variant="default"
                  onClick={handleLiveDemo}
                  iconName="ExternalLink"
                  iconPosition="left"
                  className="cosmic-glow"
                >
                  View Live Demo
                </Button>
              )}
              {project?.githubUrl && (
                <Button
                  variant="outline"
                  onClick={handleGitHub}
                  iconName="Github"
                  iconPosition="left"
                >
                  View Source Code
                </Button>
              )}
              <Button
                variant="secondary"
                iconName="Download"
                iconPosition="left"
                className="particle-glow"
              >
                Case Study PDF
              </Button>
            </div>
          </div>

          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg h-64 md:h-80">
            <Image
              src={project?.image}
              alt={project?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Problem Statement */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-text-primary flex items-center">
                  <Icon name="Target" size={20} className="mr-2 text-primary" />
                  Problem Statement
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project?.problemStatement}
                </p>
              </div>

              {/* Solution Approach */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-text-primary flex items-center">
                  <Icon name="Lightbulb" size={20} className="mr-2 text-secondary" />
                  Solution Approach
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project?.solutionApproach}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-text-primary flex items-center">
                  <Icon name="CheckCircle" size={20} className="mr-2 text-success" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project?.keyFeatures?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Project Info */}
              <div className="floating-element p-4 space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">Project Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Duration:</span>
                    <span className="text-text-primary font-medium">{project?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Year:</span>
                    <span className="text-text-primary font-medium">{project?.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Type:</span>
                    <span className="text-text-primary font-medium">{project?.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Status:</span>
                    <span className={`font-medium ${
                      project?.status === 'Live' ? 'text-success' : 
                      project?.status === 'In Progress' ? 'text-warning' : 'text-text-secondary'
                    }`}>
                      {project?.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-text-primary flex items-center">
                  <Icon name="Code" size={20} className="mr-2 text-accent" />
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project?.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              {project?.metrics && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-text-primary flex items-center">
                    <Icon name="TrendingUp" size={20} className="mr-2 text-warning" />
                    Performance Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(project?.metrics)?.map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-muted/10 rounded-lg">
                        <div className="text-lg font-bold text-gradient-primary">{value}</div>
                        <div className="text-xs text-text-secondary capitalize">{key?.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Feedback */}
              {project?.feedback && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-text-primary flex items-center">
                    <Icon name="MessageCircle" size={20} className="mr-2 text-conversion" />
                    Client Feedback
                  </h3>
                  <div className="floating-element p-4 border-l-4 border-secondary">
                    <p className="text-text-secondary italic mb-2">"{project?.feedback?.comment}"</p>
                    <div className="text-sm text-text-secondary">
                      — {project?.feedback?.client}, {project?.feedback?.position}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;