import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ConstellationMap from './components/ConstellationMap';
import TechnologyDetail from './components/TechnologyDetail';
import CategoryFilter from './components/CategoryFilter';
import SkillsLegend from './components/SkillsLegend';
import Icon from '../../components/AppIcon';

const TechnologyConstellation = () => {
  const [activeTechnology, setActiveTechnology] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredTechnologies, setFilteredTechnologies] = useState([]);

  // Real technology data from Abhishek's resume
  const technologies = [
    {
      id: 'reactjs',
      name: 'React.js',
      category: 'Frontend',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'Atom',
      color: '#0066FF',
      secondaryColor: '#00FF88',
      description: `Strong proficiency in React.js with experience building feature-rich applications. Skilled in component development, state management, and creating responsive user interfaces.`,
      skills: ['Component Development', 'Hooks', 'State Management', 'Firebase Integration', 'Real-time Features', 'Performance Optimization'],
      keyFeatures: [
        'Component Architecture','State Management','Firebase Integration','Real-time Applications','Responsive Design','Performance Optimization'
      ],
      relatedTechnologies: ['javascript', 'firebase', 'html', 'css'],
      timeline: [
        { year: '2022', milestone: 'Started learning React.js fundamentals' },
        { year: '2023', milestone: 'Built first React.js application' },
        { year: '2024', milestone: 'Developed Quiz Application with 5,000+ users' },
        { year: '2024', milestone: 'Created Infrastructure Tracker with 10,000+ records' }
      ]
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Frontend',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'Code',
      color: '#FFB800',
      secondaryColor: '#FF6B35',
      description: `Solid foundation in JavaScript with experience in both frontend and backend development. Proficient in modern ES6+ features and asynchronous programming.`,
      skills: ['ES6+', 'DOM Manipulation', 'Async/Await', 'Event Handling', 'API Integration', 'Modern Syntax'],
      keyFeatures: [
        'ES6+ Features','DOM Manipulation','Asynchronous Programming','Event Handling','API Integration','Modern JavaScript Patterns'
      ],
      relatedTechnologies: ['reactjs', 'nodejs', 'html', 'css'],
      timeline: [
        { year: '2022', milestone: 'Started JavaScript fundamentals' },
        { year: '2023', milestone: 'Built interactive web applications' },
        { year: '2024', milestone: 'Advanced JavaScript in full-stack projects' }
      ]
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'Server',
      color: '#00FF88',
      secondaryColor: '#8B5CF6',
      description: `Experienced in Node.js backend development with Express.js. Built scalable applications with MongoDB integration and real-time features.`,
      skills: ['Express.js', 'RESTful APIs', 'MongoDB Integration', 'Authentication', 'Real-time Features', 'Payment Gateway'],
      keyFeatures: [
        'RESTful API Development','MongoDB Integration','Express.js Framework','Authentication & Authorization','Payment Gateway Integration','Real-time Applications'
      ],
      relatedTechnologies: ['javascript', 'mongodb', 'expressjs'],
      timeline: [
        { year: '2023', milestone: 'Started Node.js development' },
        { year: '2024', milestone: 'Built Veda 2024 event platform' },
        { year: '2024', milestone: 'Developed Food Donation Management System' }
      ]
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Database',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'Database',
      color: '#00FF88',
      secondaryColor: '#0066FF',
      description: `Proficient in MongoDB NoSQL database with experience in data modeling, aggregation pipelines, and real-time data management.`,
      skills: ['Data Modeling', 'Aggregation Pipelines', 'CRUD Operations', 'Indexing', 'Real-time Data', 'Performance Optimization'],
      keyFeatures: [
        'NoSQL Database Design','Aggregation Pipelines','CRUD Operations','Data Modeling','Performance Optimization','Real-time Data Management'
      ],
      relatedTechnologies: ['nodejs', 'expressjs'],
      timeline: [
        { year: '2023', milestone: 'Started MongoDB learning' },
        { year: '2024', milestone: 'Integrated MongoDB in Veda 2024' },
        { year: '2024', milestone: 'Used MongoDB in multiple projects' }
      ]
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Programming',
      proficiency: 'Advanced',
      experience: '3+ years',
      icon: 'Coffee',
      color: '#FF6B35',
      secondaryColor: '#FFB800',
      description: `Strong Java programming skills with expertise in OOP principles, JDBC integration, and database connectivity. Experienced in building scalable applications.`,
      skills: ['OOP Principles', 'JDBC Integration', 'SQL Operations', 'Data Structures', 'Algorithms', 'Database Design'],
      keyFeatures: [
        'Object-Oriented Programming','JDBC Integration','SQL Database Operations','Data Structures & Algorithms','Performance Optimization','Database Design'
      ],
      relatedTechnologies: ['sql', 'jdbc'],
      timeline: [
        { year: '2021', milestone: 'Started Java programming' },
        { year: '2023', milestone: 'Built Student Statistics system' },
        { year: '2024', milestone: 'Java Intern at Technical Hub' }
      ]
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      proficiency: 'Advanced',
      experience: '3+ years',
      icon: 'Code2',
      color: '#FFB800',
      secondaryColor: '#00FF88',
      description: `Proficient in Python programming with strong foundation in data structures, algorithms, and competitive coding. Earned 5-star badges in Python.`,
      skills: ['Data Structures', 'Algorithms', 'Competitive Coding', 'Problem Solving', 'OOP', 'Basic Scripting'],
      keyFeatures: [
        'Data Structures & Algorithms','Competitive Programming','Problem Solving','Object-Oriented Programming','Basic Scripting','LeetCode Problem Solving'
      ],
      relatedTechnologies: ['algorithms', 'datastructures'],
      timeline: [
        { year: '2021', milestone: 'Started Python programming' },
        { year: '2023', milestone: 'Competitive coding on LeetCode' },
        { year: '2024', milestone: '250+ problems solved on LeetCode' }
      ]
    },
    {
      id: 'c',
      name: 'C Programming',
      category: 'Programming',
      proficiency: 'Advanced',
      experience: '3+ years',
      icon: 'Code',
      color: '#8B5CF6',
      secondaryColor: '#0066FF',
      description: `Strong foundation in C programming with expertise in structured programming, memory management, and system-level programming concepts.`,
      skills: ['Structured Programming', 'Memory Management', 'Pointers', 'Arrays', 'File Handling', 'System Programming'],
      keyFeatures: [
        'Structured Programming','Memory Management','Pointer Operations','Array Manipulation','File Handling','System Programming Concepts'
      ],
      relatedTechnologies: ['algorithms', 'datastructures'],
      timeline: [
        { year: '2021', milestone: 'Started C programming' },
        { year: '2024', milestone: 'C Intern at Technical Hub' },
        { year: '2024', milestone: 'Built 10+ mini-projects in C' }
      ]
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'Programming',
      proficiency: 'Intermediate',
      experience: '2+ years',
      icon: 'Code',
      color: '#0066FF',
      secondaryColor: '#8B5CF6',
      description: `Intermediate proficiency in C++ with understanding of object-oriented programming, STL, and competitive programming concepts.`,
      skills: ['OOP', 'STL', 'Templates', 'Competitive Programming', 'Data Structures', 'Algorithms'],
      keyFeatures: [
        'Object-Oriented Programming','Standard Template Library','Template Programming','Competitive Programming','Data Structures','Algorithm Implementation'
      ],
      relatedTechnologies: ['algorithms', 'datastructures'],
      timeline: [
        { year: '2022', milestone: 'Started C++ learning' },
        { year: '2023', milestone: 'Competitive programming in C++' },
        { year: '2024', milestone: 'Advanced C++ concepts' }
      ]
    },
    {
      id: 'html',
      name: 'HTML',
      category: 'Frontend',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'FileText',
      color: '#FF6B35',
      secondaryColor: '#FFB800',
      description: `Strong HTML skills with semantic markup, accessibility best practices, and modern HTML5 features. Certified as PEARSON IT Specialist.`,
      skills: ['HTML5', 'Semantic Markup', 'Accessibility', 'Forms', 'SEO Optimization', 'Cross-browser Compatibility'],
      keyFeatures: [
        'HTML5 Semantic Elements','Accessibility Standards','Form Design','SEO Optimization','Cross-browser Compatibility','Modern HTML Features'
      ],
      relatedTechnologies: ['css', 'javascript'],
      timeline: [
        { year: '2022', milestone: 'Started HTML learning' },
        { year: '2023', milestone: 'PEARSON IT Specialist certification' },
        { year: '2024', milestone: 'Advanced HTML5 features' }
      ]
    },
    {
      id: 'css',
      name: 'CSS',
      category: 'Frontend',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'Palette',
      color: '#0066FF',
      secondaryColor: '#00FF88',
      description: `Proficient in CSS with modern styling techniques, responsive design, and advanced layout methods. Certified as PEARSON IT Specialist.`,
      skills: ['CSS3', 'Flexbox', 'Grid', 'Responsive Design', 'Animations', 'Preprocessors'],
      keyFeatures: [
        'CSS3 Advanced Features','Flexbox & Grid Layouts','Responsive Design','CSS Animations','Modern Styling Techniques','Cross-browser Compatibility'
      ],
      relatedTechnologies: ['html', 'javascript'],
      timeline: [
        { year: '2022', milestone: 'Started CSS learning' },
        { year: '2023', milestone: 'PEARSON IT Specialist certification' },
        { year: '2024', milestone: 'Advanced CSS techniques' }
      ]
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'Database',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'Database',
      color: '#00FF88',
      secondaryColor: '#8B5CF6',
      description: `Strong SQL skills with experience in database design, optimization, and complex queries. Integrated JDBC for efficient database operations.`,
      skills: ['Database Design', 'Query Optimization', 'JDBC Integration', 'CRUD Operations', 'Indexing', 'Performance Tuning'],
      keyFeatures: [
        'Database Design & Modeling','Query Optimization','JDBC Integration','CRUD Operations','Performance Tuning','Database Administration'
      ],
      relatedTechnologies: ['java', 'jdbc'],
      timeline: [
        { year: '2022', milestone: 'Started SQL learning' },
        { year: '2023', milestone: 'Built Student Statistics system' },
        { year: '2024', milestone: 'Advanced SQL optimization' }
      ]
    },
    {
      id: 'firebase',
      name: 'Firebase',
      category: 'Backend',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'Flame',
      color: '#FFB800',
      secondaryColor: '#FF6B35',
      description: `Experienced in Firebase integration for real-time applications. Built Quiz Application with Firebase backend supporting 5,000+ users.`,
      skills: ['Real-time Database', 'Authentication', 'Hosting', 'Cloud Functions', 'Analytics', 'Performance Monitoring'],
      keyFeatures: [
        'Real-time Database','Authentication Services','Cloud Hosting','Analytics Integration','Performance Monitoring','Backend-as-a-Service'
      ],
      relatedTechnologies: ['reactjs', 'javascript'],
      timeline: [
        { year: '2023', milestone: 'Started Firebase learning' },
        { year: '2024', milestone: 'Built Quiz Application with Firebase' },
        { year: '2024', milestone: '5,000+ users on Firebase platform' }
      ]
    },
    {
      id: 'reactnative',
      name: 'React Native',
      category: 'Mobile',
      proficiency: 'Intermediate',
      experience: '1+ year',
      icon: 'Smartphone',
      color: '#0066FF',
      secondaryColor: '#00FF88',
      description: `Intermediate skills in React Native for mobile app development. Built Food Donation Management System with real-time tracking.`,
      skills: ['Mobile Development', 'Cross-platform', 'Real-time Features', 'Push Notifications', 'Native Modules', 'Performance'],
      keyFeatures: [
        'Cross-platform Development','Real-time Features','Push Notifications','Native Module Integration','Performance Optimization','Mobile UI/UX'
      ],
      relatedTechnologies: ['reactjs', 'javascript'],
      timeline: [
        { year: '2023', milestone: 'Started React Native learning' },
        { year: '2024', milestone: 'Built Food Donation Management System' },
        { year: '2024', milestone: '2,000+ donation requests managed' }
      ]
    },
    {
      id: 'gsap',
      name: 'GSAP',
      category: 'Frontend',
      proficiency: 'Intermediate',
      experience: '1+ year',
      icon: 'Zap',
      color: '#00FF88',
      secondaryColor: '#0066FF',
      description: `Intermediate proficiency in GSAP for creating smooth animations and interactive web experiences.`,
      skills: ['Animation', 'Timeline', 'Tweening', 'Interactive Effects', 'Performance', 'Cross-browser'],
      keyFeatures: [
        'Advanced Animations','Timeline Management','Tweening Effects','Interactive Animations','Performance Optimization','Cross-browser Compatibility'
      ],
      relatedTechnologies: ['javascript', 'html', 'css'],
      timeline: [
        { year: '2023', milestone: 'Started GSAP learning' },
        { year: '2024', milestone: 'Implemented animations in projects' },
        { year: '2024', milestone: 'Interactive web experiences' }
      ]
    },
    {
      id: 'expressjs',
      name: 'Express.js',
      category: 'Backend',
      proficiency: 'Advanced',
      experience: '2+ years',
      icon: 'Server',
      color: '#8B5CF6',
      secondaryColor: '#0066FF',
      description: `Proficient in Express.js framework for building RESTful APIs and web applications. Integrated with Node.js and MongoDB for full-stack development.`,
      skills: ['RESTful APIs', 'Middleware', 'Routing', 'Authentication', 'Error Handling', 'Performance'],
      keyFeatures: [
        'RESTful API Development','Middleware Integration','Route Management','Authentication & Authorization','Error Handling','Performance Optimization'
      ],
      relatedTechnologies: ['nodejs', 'mongodb'],
      timeline: [
        { year: '2023', milestone: 'Started Express.js learning' },
        { year: '2024', milestone: 'Built APIs for multiple projects' },
        { year: '2024', milestone: 'Full-stack development with Express.js' }
      ]
    }
  ];

  // Mock related projects data
  const relatedProjects = [
    {
      name: 'E-commerce Platform',
      description: 'Full-stack React application with Node.js backend'
    },
    {
      name: 'Task Management System',
      description: 'TypeScript-based project management tool'
    },
    {
      name: 'Real-time Chat Application',
      description: 'WebSocket-powered communication platform'
    },
    {
      name: 'Data Analytics Dashboard',
      description: 'Python-based data visualization platform'
    },
    {
      name: 'Cloud Infrastructure',
      description: 'AWS-based scalable application deployment'
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Cloud'];

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredTechnologies(technologies);
    } else {
      setFilteredTechnologies(technologies?.filter(tech => tech?.category === activeCategory));
    }
  }, [activeCategory]);

  const handleTechnologyClick = (technology) => {
    setActiveTechnology(technology);
  };

  const handleCloseDetail = () => {
    setActiveTechnology(null);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveTechnology(null);
  };

  return (
    <>
      <Helmet>
        <title>Technology Constellation - Abhishek Nallam | Interactive Skills Map</title>
        <meta name="description" content="Explore Abhishek's technical expertise through an interactive constellation of technologies. Discover proficiency levels, experience, and related projects in an immersive visual experience." />
        <meta name="keywords" content="React, JavaScript, Node.js, Python, MongoDB, AWS, Full Stack Developer, Technical Skills" />
        <meta property="og:title" content="Technology Constellation - Interactive Skills Showcase" />
        <meta property="og:description" content="Navigate through a cosmic map of technical expertise and discover the technologies that power innovative solutions." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center cosmic-glow">
                  <Icon name="Cpu" size={32} color="white" />
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient-primary">Technology</span>
                <br />
                <span className="text-white">Constellation</span>
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
                Navigate through an interactive map of technical expertise where each technology 
                shines as a star in the digital universe. Discover proficiency levels, experience, 
                and the connections that power innovative solutions.
              </p>

              <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} className="text-secondary" />
                  <span>26+ Technologies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-primary" />
                  <span>6+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Code" size={16} className="text-accent" />
                  <span>Full Stack Expertise</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <motion.section
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.section>

        {/* Constellation Map */}
        <section className="relative min-h-screen">
          <motion.div
            className="h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <ConstellationMap
              technologies={filteredTechnologies}
              onTechnologyClick={handleTechnologyClick}
              activeTechnology={activeTechnology}
            />
            
            <SkillsLegend isVisible={activeCategory === 'All'} />
          </motion.div>
        </section>

        {/* Technology Detail Modal */}
        <TechnologyDetail
          technology={activeTechnology}
          onClose={handleCloseDetail}
          relatedProjects={relatedProjects}
        />

        {/* Stats Section */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 cosmic-glow">
                  <Icon name="Award" size={24} color="white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">8</h3>
                <p className="text-text-secondary">Expert Level Technologies</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-border">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto mb-4 cosmic-glow">
                  <Icon name="TrendingUp" size={24} color="white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">12</h3>
                <p className="text-text-secondary">Advanced Proficiency Skills</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/10 to-warning/10 border border-border">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-warning flex items-center justify-center mx-auto mb-4 cosmic-glow">
                  <Icon name="Rocket" size={24} color="white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">5+</h3>
                <p className="text-text-secondary">Projects Completed</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-text-secondary">
              © {new Date()?.getFullYear()} Abhishek Nallam. Crafted with passion for technology and innovation.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TechnologyConstellation;