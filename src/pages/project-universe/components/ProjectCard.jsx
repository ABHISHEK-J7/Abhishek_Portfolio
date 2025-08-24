import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLiveDemo = (e) => {
    e?.stopPropagation();
    window.open(project?.liveUrl, '_blank');
  };

  const handleGitHub = (e) => {
    e?.stopPropagation();
    window.open(project?.githubUrl, '_blank');
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${
        isHovered ? 'transform scale-105 z-10' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(project)}
    >
      {/* Main Card */}
              <div className="floating-element p-6 h-[500px] cosmic-border hover:cosmic-glow transition-all duration-500 flex flex-col">
          {/* Project Image */}
          <div className="relative mb-4 overflow-hidden rounded-lg h-64">
          <Image
            src={project?.image}
            alt={project?.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Status Badge */}
          {/* <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              project?.status === 'Live' ?'bg-success/20 text-success border border-success/30'
                : project?.status === 'In Progress' ?'bg-warning/20 text-warning border border-warning/30' :'bg-muted/20 text-muted-foreground border border-muted/30'
            }`}>
              {project?.status}
            </span>
          </div> */}

          {/* Overlay Actions */}
          {/* <div className={`absolute inset-0 bg-background/80 flex items-center justify-center space-x-3 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            {project?.liveUrl && (
              <Button
                variant="default"
                size="sm"
                onClick={handleLiveDemo}
                iconName="ExternalLink"
                iconPosition="left"
                className="cosmic-glow"
              >
                Live Demo
              </Button>
            )}
            {project?.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGitHub}
                iconName="Github"
                iconPosition="left"
              >
                Code
              </Button>
            )}
          </div> */}
        </div>

        {/* Project Info */}
        <div className="space-y-3 flex-1 flex flex-col">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-gradient-primary transition-all duration-300">
              {project?.title}
            </h3>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-warning fill-current" />
              <span className="text-sm text-text-secondary">{project?.rating}</span>
            </div>
          </div>

          <p className="text-sm text-text-secondary line-clamp-2 flex-1">
            {project?.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project?.techStack?.slice(0, 4)?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
              >
                {tech}
              </span>
            ))}
            {project?.techStack?.length > 4 && (
              <span className="px-2 py-1 bg-muted/10 text-muted-foreground text-xs rounded-full border border-muted/20">
                +{project?.techStack?.length - 4}
              </span>
            )}
          </div>

          {/* Project Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>{project?.year}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{project?.duration}</span>
              </div>
            </div>
            
            {project?.featured && (
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={14} className="text-secondary" />
                <span className="text-xs text-secondary font-medium">Featured</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Floating Particles */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
};

export default ProjectCard;