import React from 'react';

import Button from '../../../components/ui/Button';

const ProjectFilter = ({ 
  activeFilter, 
  onFilterChange, 
  activeTechFilter, 
  onTechFilterChange,
  projectCounts 
}) => {
  const filterOptions = [
    { id: 'all', label: 'All Projects', icon: 'Grid3x3', count: projectCounts?.all },
    { id: 'web-apps', label: 'Web Apps', icon: 'Globe', count: projectCounts?.webApps },
    { id: 'apis', label: 'APIs', icon: 'Database', count: projectCounts?.apis },
    { id: 'ui-ux', label: 'UI/UX', icon: 'Palette', count: projectCounts?.uiux },
    { id: 'mobile', label: 'Mobile', icon: 'Smartphone', count: projectCounts?.mobile }
  ];

  const techFilters = [
    { id: 'all', label: 'All Tech', icon: 'Code' },
    { id: 'react', label: 'React', icon: 'Atom' },
    { id: 'nodejs', label: 'Node.js', icon: 'Server' },
    { id: 'java', label: 'Java', icon: 'Coffee' },
    { id: 'mongodb', label: 'MongoDB', icon: 'Database' },
    { id: 'firebase', label: 'Firebase', icon: 'Flame' }
  ];

  return (
    <div className="space-y-6">
      {/* Project Type Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
          Project Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={activeFilter === option?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(option?.id)}
              iconName={option?.icon}
              iconPosition="left"
              className={`transition-all duration-300 ${
                activeFilter === option?.id 
                  ? 'cosmic-glow shadow-glow-md' 
                  : 'hover:border-primary/50'
              }`}
            >
              {option?.label}
              <span className="ml-2 px-1.5 py-0.5 bg-background/50 rounded text-xs">
                {option?.count}
              </span>
            </Button>
          ))}
        </div>
      </div>
      {/* Technology Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
          Technology Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {techFilters?.map((tech) => (
            <Button
              key={tech?.id}
              variant={activeTechFilter === tech?.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onTechFilterChange(tech?.id)}
              iconName={tech?.icon}
              iconPosition="left"
              className={`transition-all duration-300 ${
                activeTechFilter === tech?.id 
                  ? 'particle-glow shadow-glow-sm' 
                  : 'hover:bg-surface/50'
              }`}
            >
              {tech?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="floating-element p-4 space-y-3">
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
          Portfolio Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient-primary">
              {projectCounts?.all}
            </div>
            <div className="text-xs text-text-secondary">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">
              {projectCounts?.featured}
            </div>
            <div className="text-xs text-text-secondary">Featured Work</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;