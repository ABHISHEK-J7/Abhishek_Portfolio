import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProjectCard from './components/ProjectCard';
import ProjectFilter from './components/ProjectFilter';
import ProjectModal from './components/ProjectModal';
import CosmicBackground from './components/CosmicBackground';

const ProjectUniverse = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTechFilter, setActiveTechFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Real project data from Abhishek's resume
  const projects = [
    {
      id: 1,
      title: "Veda 2024",
      description: "Scalable event management platform with payment gateway integration and real-time updates.",
      fullDescription: "Spearheaded the development of a comprehensive event management platform that revolutionized the way events are organized and managed. The platform facilitated seamless registration for 8,000+ participants while generating significant revenue through integrated payment solutions.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      techStack: ["Node.js", "MongoDB", "Payment Gateway", "Real-time Updates", "Email Automation"],
      type: "web-apps",
      status: "Live",
      year: "2024",
      duration: "1 month",
      featured: true,
      liveUrl: "https://adityauniversity.in/veda2025",
      githubUrl: "https://github.com/abhisheknallam/veda-2024",
      problemStatement: "Event organizers needed a scalable platform to manage large-scale events with seamless registration, payment processing, and real-time communication with participants.",
      solutionApproach: "Developed a full-stack event management solution using Node.js and MongoDB, integrating multiple payment gateways and implementing real-time features for enhanced user engagement.",
      keyFeatures: [
        "8,000+ participant registrations",
        "Multi-method payment gateway",
        "Real-time event updates",
        "Personalized dashboards",
        "Automated confirmation emails",
        "Revenue tracking system"
      ],
      metrics: {
        registrations: "8,000+",
        revenue: "₹5,00,000+",
        transactionSuccess: "99.9%",
        efficiency: "40% improvement"
      },
      feedback: {
        comment: "Veda 2024 was a game-changer for our event management. The platform handled everything seamlessly from registration to payments.",
        client: "Event Organizing Team",
        position: "Veda 2024 Committee"
      }
    },
    {
      id: 2,
      title: "Quiz Application Development",
      description: "Feature-rich quiz application with real-time scoring and performance analytics.",
      fullDescription: "Designed and engineered a comprehensive quiz application that provides an engaging learning experience for users. The platform supports multiple quiz formats and includes advanced analytics to track user performance and engagement.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
      techStack: ["React.js", "Firebase", "Real-time Database", "Authentication", "Analytics"],
      type: "web-apps",
      status: "Live",
      year: "2024",
      duration: "2 months",
      rating: 4.8,
      featured: true,
      liveUrl: "https://quiz-app.abhisheknallam.com",
      githubUrl: "https://github.com/abhisheknallam/quiz-application",
      problemStatement: "Educational institutions and organizations needed an interactive platform to create and administer quizzes with real-time scoring and performance tracking capabilities.",
      solutionApproach: "Built a React.js application with Firebase backend, implementing real-time features for live scoring and comprehensive analytics for performance tracking.",
      keyFeatures: [
        "5,000+ active users",
        "10,000+ quizzes supported",
        "Multiple quiz formats",
        "Real-time scoring system",
        "Interactive leaderboards",
        "Performance analytics"
      ],
      metrics: {
        activeUsers: "5,000+",
        quizzes: "10,000+",
        engagement: "40% improvement",
        accuracy: "98%"
      }
    },
    {
      id: 3,
      title: "Food Donation Management System",
      description: "Mobile application connecting donors, NGOs, and recipients with real-time tracking.",
      fullDescription: "Developed a comprehensive mobile application that bridges the gap between food donors, NGOs, and recipients. The platform streamlines the entire donation process from registration to delivery, ensuring efficient food distribution and reducing wastage.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      techStack: ["React Native", "Node.js", "MongoDB", "JWT", "Push Notifications", "Real-time Tracking"],
      type: "mobile",
      status: "Live",
      year: "2024",
      duration: "2 months",
      rating: 4.7,
      featured: true,
      liveUrl: "https://food-donation-app.com",
      githubUrl: "https://github.com/abhisheknallam/food-donation-system",
      problemStatement: "Food donation processes were inefficient with poor coordination between donors, NGOs, and recipients, leading to food wastage and delayed deliveries.",
      solutionApproach: "Created a React Native mobile application with Node.js backend, implementing real-time tracking, authentication, and analytics to optimize the donation workflow.",
      keyFeatures: [
        "2,000+ donation requests",
        "Real-time tracking system",
        "JWT authentication",
        "Push notifications",
        "Analytics dashboards",
        "Multi-stakeholder platform"
      ],
      metrics: {
        donations: "2,000+",
        deliveryRate: "90%",
        wastageReduction: "25%",
        efficiency: "45% improvement"
      }
    },
    {
      id: 4,
      title: "Infrastructure Tracker",
      description: "Interactive web platform for infrastructure tracking with real-time data visualizations.",
      fullDescription: "Architected a comprehensive web platform for tracking infrastructure and equipment across multiple locations. The system provides real-time insights through interactive data visualizations and efficient data management capabilities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      techStack: ["React.js", "MongoDB", "Data Visualization", "Real-time Updates", "Team Collaboration"],
      type: "web-apps",
      status: "Live",
      year: "2024",
      duration: "2 months",
      rating: 4.6,
      featured: false,
      liveUrl: "https://infrastructure-tracker.com",
      githubUrl: "https://github.com/abhisheknallam/infrastructure-tracker",
      problemStatement: "Organizations needed a centralized system to track and manage infrastructure equipment across multiple locations with real-time visibility and reporting capabilities.",
      solutionApproach: "Developed a React.js web application with MongoDB backend, implementing data visualization features and team collaboration tools for efficient infrastructure management.",
      keyFeatures: [
        "10,000+ equipment records",
        "50+ locations tracked",
        "Real-time visualizations",
        "Team collaboration",
        "Performance analytics",
        "Scalable architecture"
      ],
      metrics: {
        equipmentRecords: "10,000+",
        locations: "50+",
        efficiency: "35% improvement",
        responseTime: "40% reduction"
      }
    },
    {
      id: 5,
      title: "Student Statistics",
      description: "Java-based student management system with JDBC integration and OOP principles.",
      fullDescription: "Developed a comprehensive student management system using Java and SQL, implementing JDBC for database connectivity and applying Object-Oriented Programming principles for scalable and maintainable code architecture.",
      image: "https://images.unsplash.com/photo-1523240794102-9c5cc81d4d6a?w=800&h=600&fit=crop",
      techStack: ["Java", "SQL", "JDBC", "OOP", "Database Design"],
      type: "web-apps",
      status: "Completed",
      year: "2023",
      duration: "1 month",
      rating: 4.5,
      featured: false,
      githubUrl: "https://github.com/abhisheknallam/student-statistics",
      problemStatement: "Educational institutions needed an efficient system to manage student records with improved database operations and user-friendly interface for data entry and retrieval.",
      solutionApproach: "Built a Java application with SQL database integration, implementing JDBC for efficient database operations and OOP principles for code maintainability.",
      keyFeatures: [
        "1,000+ student records",
        "JDBC integration",
        "OOP implementation",
        "User-friendly interface",
        "Data validation",
        "Reporting system"
      ],
      metrics: {
        studentRecords: "1,000+",
        efficiency: "30% improvement",
        dataRetrieval: "40% faster",
        errorReduction: "25%"
      }
    }
  ];

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by project type
    if (activeFilter !== 'all') {
      filtered = filtered?.filter(project => project?.type === activeFilter);
    }

    // Filter by technology
    if (activeTechFilter !== 'all') {
      filtered = filtered?.filter(project => 
        project?.techStack?.some(tech => 
          tech?.toLowerCase()?.includes(activeTechFilter?.toLowerCase())
        )
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(project =>
        project?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.techStack?.some(tech => 
          tech?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Sort projects
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return b?.featured - a?.featured || b?.rating - a?.rating;
        case 'rating':
          return b?.rating - a?.rating;
        case 'year':
          return b?.year - a?.year;
        case 'title':
          return a?.title?.localeCompare(b?.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, activeFilter, activeTechFilter, searchQuery, sortBy]);

  // Calculate project counts for filters
  const projectCounts = useMemo(() => {
    return {
      all: projects?.length,
      webApps: projects?.filter(p => p?.type === 'web-apps')?.length,
      apis: projects?.filter(p => p?.type === 'apis')?.length,
      uiux: projects?.filter(p => p?.type === 'ui-ux')?.length,
      mobile: projects?.filter(p => p?.type === 'mobile')?.length,
      featured: projects?.filter(p => p?.featured)?.length
    };
  }, [projects]);

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'year', label: 'Most Recent' },
    { value: 'title', label: 'Alphabetical' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Cosmic Background */}
      <CosmicBackground />
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="text-gradient-primary">Project Universe</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Explore a cosmic collection of innovative projects that showcase technical mastery, 
                creative problem-solving, and cutting-edge development practices across multiple domains.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">{projectCounts?.all}</div>
                <div className="text-sm text-text-secondary">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{projectCounts?.featured}</div>
                <div className="text-sm text-text-secondary">Featured Work</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">15+</div>
                <div className="text-sm text-text-secondary">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-conversion">4.8</div>
                <div className="text-sm text-text-secondary">Avg Rating</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Sort Section */}
        <section className="px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="bg-surface border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24">
                  <ProjectFilter
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    activeTechFilter={activeTechFilter}
                    onTechFilterChange={setActiveTechFilter}
                    projectCounts={projectCounts}
                  />
                </div>
              </motion.div>

              {/* Projects Grid */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-6 flex items-center justify-between"
                >
                  <h2 className="text-2xl font-semibold text-text-primary">
                    {filteredProjects?.length} Project{filteredProjects?.length !== 1 ? 's' : ''} Found
                  </h2>
                  
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      iconName="X"
                      iconPosition="left"
                    >
                      Clear Search
                    </Button>
                  )}
                </motion.div>

                {filteredProjects?.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredProjects?.map((project, index) => (
                      <motion.div
                        key={project?.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <ProjectCard
                          project={project}
                          onViewDetails={handleProjectDetails}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center py-16"
                  >
                    <Icon name="Search" size={64} className="mx-auto text-text-secondary mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No Projects Found</h3>
                    <p className="text-text-secondary mb-6">
                      Try adjusting your filters or search terms to find more projects.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveFilter('all');
                        setActiveTechFilter('all');
                        setSearchQuery('');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl text-text-secondary">
                Let's collaborate on your next project and create digital experiences that captivate and inspire.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="cosmic-glow"
              >
                Start a Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
              >
                Download Resume
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectUniverse;