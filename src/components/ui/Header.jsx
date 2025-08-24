import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import AppLogo from '../AppLogo';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Gateway', path: '/landing-gateway', icon: 'Home' },
    { name: 'Talent Hub', path: '/talent-space-hub', icon: 'Zap' },
    { name: 'About Me', path: '/about-me-dimension', icon: 'User' },
    { name: 'Projects', path: '/project-universe', icon: 'Rocket' },
    { name: 'Contact', path: '/contact', icon: 'Mail' },

  ];

  const secondaryItems = [
    { name: 'Tech Stack', path: '/technology-constellation', icon: 'Code' },
    { name: 'Achievements', path: '/achievement-gallery', icon: 'Trophy' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleResumeDownload = () => {
    // Simulate resume download
    const link = document.createElement('a');
    link.href = '/assets/resume/abhishek-nallam-resume.pdf';
    link.download = 'Abhishek_Nallam_Resume.pdf';
    link?.click();
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/90 cosmic-backdrop border-b border-border' :'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('/landing-gateway')}
          >
            <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center transition-all duration-300">
              <AppLogo size={50} />
            </div>
              {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse-glow"></div> */}
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gradient-primary">
                Abhishek Nallam
              </h1>
              <p className="text-xs text-text-secondary -mt-1">
                Full Stack Developer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  isActivePath(item?.path)
                    ? 'bg-primary/20 text-primary cosmic-glow' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className={`mr-2 transition-all duration-300 ${
                    isActivePath(item?.path) ? 'text-primary' : 'group-hover:text-primary'
                  }`}
                />
                {item?.name}
              </button>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface/50 transition-all duration-300">
                <Icon name="MoreHorizontal" size={16} className="mr-2" />
                More
              </button>
              
              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-surface opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-all duration-300 first:rounded-t-lg last:rounded-b-lg ${
                      isActivePath(item?.path)
                        ? 'bg-primary/20 text-primary' :'text-text-secondary hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} className="mr-3" />
                    {item?.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResumeDownload}
              iconName="Download"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Resume
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleNavigation('/talent-space-hub')}
              iconName="Zap"
              iconPosition="left"
              className="hidden sm:flex conversion-glow hover:shadow-conversion"
            >
              Enter Space
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface/50 transition-all duration-300"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-2 border-t border-border">
            {[...navigationItems, ...secondaryItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? 'bg-primary/20 text-primary cosmic-glow' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className={`mr-3 ${
                    isActivePath(item?.path) ? 'text-primary' : ''
                  }`}
                />
                {item?.name}
              </button>
            ))}
            
            <div className="pt-4 space-y-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeDownload}
                iconName="Download"
                iconPosition="left"
                fullWidth
              >
                Download Resume
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={() => handleNavigation('/talent-space-hub')}
                iconName="Zap"
                iconPosition="left"
                fullWidth
                className="conversion-glow"
              >
                Enter Talent Space
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;