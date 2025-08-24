import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AchievementCard from './components/AchievementCard';
import TimelineView from './components/TimelineView';
import FilterControls from './components/FilterControls';
import StatsOverview from './components/StatsOverview';

const AchievementGallery = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isLoading, setIsLoading] = useState(true);

  // Real achievements data from Abhishek's resume
  const achievements = [
    {
      id: 1,
      title: "PEARSON IT Specialist - HTML & CSS",
      issuer: "PEARSON",
      type: "certification",
      date: "2023-06-15",
      description: "Professional certification demonstrating expertise in HTML5 and CSS3 web development technologies.",
      detailedDescription: `This certification validates comprehensive knowledge of HTML5 semantic elements, CSS3 styling techniques, responsive design principles, and modern web development best practices. The certification covers accessibility standards, cross-browser compatibility, and SEO optimization techniques.\n\nThe exam tested practical skills in creating responsive layouts, implementing modern CSS features like Flexbox and Grid, and ensuring web accessibility compliance.`,
      logo: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=100&h=100&fit=crop&crop=center",
      credentialId: "PEARSON-HTML-CSS-2023-001",
      credentialUrl: "https://pearson.com/certification/verify",
      certificateUrl: "https://pearson.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["HTML5", "CSS3", "Responsive Design", "Web Accessibility", "SEO", "Cross-browser Compatibility"],
      learningOutcomes: [
        "Master HTML5 semantic markup and accessibility standards",
        "Implement modern CSS3 features and responsive design",
        "Create cross-browser compatible web layouts",
        "Apply SEO best practices and web standards"
      ]
    },
    {
      id: 2,
      title: "PEARSON IT Specialist - JAVA",
      issuer: "PEARSON",
      type: "certification",
      date: "2023-08-20",
      description: "Professional certification demonstrating advanced Java programming skills and object-oriented programming expertise.",
      detailedDescription: `This certification validates comprehensive knowledge of Java programming language, object-oriented programming principles, data structures, algorithms, and Java application development. The certification covers advanced Java features, JDBC integration, and enterprise development concepts.\n\nThe exam tested practical skills in Java programming, database connectivity, exception handling, and building scalable Java applications.`,
      logo: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop&crop=center",
      credentialId: "PEARSON-JAVA-2023-002",
      credentialUrl: "https://pearson.com/certification/verify",
      certificateUrl: "https://pearson.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["Java", "OOP", "JDBC", "Data Structures", "Algorithms", "Database Integration"],
      learningOutcomes: [
        "Master Java programming language and OOP principles",
        "Implement database connectivity with JDBC",
        "Design and develop scalable Java applications",
        "Apply data structures and algorithms in Java"
      ]
    },
    {
      id: 3,
      title: "PEARSON IT Specialist - PYTHON",
      issuer: "PEARSON",
      type: "certification",
      date: "2023-10-15",
      description: "Professional certification demonstrating Python programming expertise and problem-solving skills.",
      detailedDescription: `This certification validates comprehensive knowledge of Python programming language, data structures, algorithms, and competitive programming concepts. The certification covers Python fundamentals, advanced features, and practical application development.\n\nThe exam tested skills in Python programming, problem-solving, data manipulation, and building efficient algorithms for competitive programming scenarios.`,
      logo: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&h=100&fit=crop&crop=center",
      credentialId: "PEARSON-PYTHON-2023-003",
      credentialUrl: "https://pearson.com/certification/verify",
      certificateUrl: "https://pearson.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["Python", "Data Structures", "Algorithms", "Competitive Programming", "Problem Solving"],
      learningOutcomes: [
        "Master Python programming fundamentals and advanced features",
        "Implement efficient data structures and algorithms",
        "Solve complex programming problems",
        "Apply competitive programming techniques"
      ]
    },
    {
      id: 4,
      title: "CISCO - C Programming",
      issuer: "CISCO",
      type: "certification",
      date: "2023-12-10",
      description: "Professional certification demonstrating C programming fundamentals and system-level programming concepts.",
      detailedDescription: `This certification validates comprehensive knowledge of C programming language, structured programming principles, memory management, and system-level programming concepts. The certification covers pointers, arrays, file handling, and low-level programming techniques.\n\nThe exam tested practical skills in C programming, memory management, pointer operations, and building efficient system-level applications.`,
      logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=center",
      credentialId: "CISCO-C-2023-004",
      credentialUrl: "https://cisco.com/certification/verify",
      certificateUrl: "https://cisco.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["C Programming", "Structured Programming", "Memory Management", "Pointers", "System Programming"],
      learningOutcomes: [
        "Master C programming fundamentals and structured programming",
        "Implement efficient memory management techniques",
        "Work with pointers and low-level programming concepts",
        "Build system-level applications and utilities"
      ]
    },
    {
      id: 5,
      title: "CISCO - C++ Programming",
      issuer: "CISCO",
      type: "certification",
      date: "2024-01-15",
      description: "Professional certification demonstrating C++ programming and object-oriented programming expertise.",
      detailedDescription: `This certification validates comprehensive knowledge of C++ programming language, object-oriented programming principles, Standard Template Library (STL), and modern C++ features. The certification covers templates, inheritance, polymorphism, and competitive programming applications.\n\nThe exam tested skills in C++ programming, OOP concepts, STL usage, and building efficient applications for competitive programming scenarios.`,
      logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=center",
      credentialId: "CISCO-CPP-2024-005",
      credentialUrl: "https://cisco.com/certification/verify",
      certificateUrl: "https://cisco.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["C++", "OOP", "STL", "Templates", "Competitive Programming", "Algorithms"],
      learningOutcomes: [
        "Master C++ programming and object-oriented concepts",
        "Utilize Standard Template Library effectively",
        "Implement template programming techniques",
        "Apply C++ in competitive programming scenarios"
      ]
    },
    {
      id: 6,
      title: "CISCO - CCNA",
      issuer: "CISCO",
      type: "certification",
      date: "2024-02-20",
      description: "Professional certification demonstrating networking fundamentals and Cisco technologies expertise.",
      detailedDescription: `This certification validates comprehensive knowledge of networking fundamentals, Cisco technologies, network configuration, and troubleshooting. The certification covers routing, switching, network security, and Cisco device management.\n\nThe exam tested practical skills in network configuration, troubleshooting, security implementation, and managing Cisco networking equipment.`,
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
      credentialId: "CISCO-CCNA-2024-006",
      credentialUrl: "https://cisco.com/certification/verify",
      certificateUrl: "https://cisco.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["Networking", "Cisco Technologies", "Routing", "Switching", "Network Security", "Troubleshooting"],
      learningOutcomes: [
        "Master networking fundamentals and Cisco technologies",
        "Configure and manage network devices",
        "Implement network security measures",
        "Troubleshoot network issues effectively"
      ]
    },
    {
      id: 7,
      title: "CISCO - JavaScript",
      issuer: "CISCO",
      type: "certification",
      date: "2024-03-15",
      description: "Professional certification demonstrating JavaScript programming and web development expertise.",
      detailedDescription: `This certification validates comprehensive knowledge of JavaScript programming language, DOM manipulation, asynchronous programming, and modern web development techniques. The certification covers ES6+ features, event handling, and client-side development.\n\nThe exam tested practical skills in JavaScript programming, web development, API integration, and building interactive web applications.`,
      logo: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop&crop=center",
      credentialId: "CISCO-JS-2024-007",
      credentialUrl: "https://cisco.com/certification/verify",
      certificateUrl: "https://cisco.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["JavaScript", "DOM Manipulation", "ES6+", "Web Development", "API Integration", "Event Handling"],
      learningOutcomes: [
        "Master JavaScript programming fundamentals and ES6+ features",
        "Implement DOM manipulation and event handling",
        "Build interactive web applications",
        "Integrate APIs and handle asynchronous operations"
      ]
    },
    {
      id: 8,
      title: "REDHAT - PYTHON",
      issuer: "REDHAT",
      type: "certification",
      date: "2024-04-10",
      description: "Professional certification demonstrating Python programming expertise in Linux environments.",
      detailedDescription: `This certification validates comprehensive knowledge of Python programming in Linux environments, system administration automation, and Red Hat technologies. The certification covers Python scripting, automation, and Linux system integration.\n\nThe exam tested practical skills in Python programming for system administration, automation scripting, and Linux environment development.`,
      logo: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop&crop=center",
      credentialId: "REDHAT-PYTHON-2024-008",
      credentialUrl: "https://redhat.com/certification/verify",
      certificateUrl: "https://redhat.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["Python", "Linux", "System Administration", "Automation", "Scripting", "Red Hat Technologies"],
      learningOutcomes: [
        "Master Python programming in Linux environments",
        "Implement system administration automation",
        "Develop scripts for Linux system management",
        "Integrate Python with Red Hat technologies"
      ]
    },
    {
      id: 9,
      title: "SUMMER INTERNSHIP - Jr. Developer Certificate",
      issuer: "Technical Hub",
      type: "certification",
      date: "2024-08-15",
      description: "Professional certification demonstrating junior developer skills and full-stack development expertise.",
      detailedDescription: `This certification validates comprehensive knowledge of full-stack web development, modern web technologies, and professional development practices. The certification covers HTML, CSS, JavaScript, React.js, Node.js, and MongoDB.\n\nThe program included hands-on project development, code reviews, and collaborative development practices.`,
      logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center",
      credentialId: "TECH-HUB-JR-DEV-2024-009",
      credentialUrl: "https://technicalhub.com/certification/verify",
      certificateUrl: "https://technicalhub.com/certificate/download",
      verified: true,
      grade: "Pass",
      skills: ["Full Stack Development", "React.js", "Node.js", "MongoDB", "Web Development", "Project Management"],
      learningOutcomes: [
        "Build full-stack web applications from scratch",
        "Implement modern web development technologies",
        "Work with databases and APIs",
        "Collaborate in professional development teams"
      ]
    },
    {
      id: 10,
      title: "BEST PROJECT - BEST WEBSITE of Year (2024)",
      issuer: "Aditya College of Engineering and Technology",
      type: "achievement",
      date: "2024-12-15",
      description: "Awarded for developing the best website project of the year, demonstrating excellence in web development and design.",
      detailedDescription: `Awarded for outstanding achievement in web development and design, creating an innovative and technically excellent website project. The project demonstrated advanced web development skills, creative design, and technical innovation.\n\nThe award recognized excellence in user experience design, technical implementation, and project presentation.`,
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
      credentialId: "ACET-BEST-WEB-2024-010",
      verified: true,
      skills: ["Web Development", "Design", "Innovation", "Project Management", "Technical Excellence"],
      learningOutcomes: [
        "Demonstrated excellence in web development and design",
        "Created innovative and technically advanced solutions",
        "Presented projects effectively to stakeholders",
        "Achieved recognition for technical and creative skills"
      ]
    },
    {
      id: 11,
      title: "Bachelor of Technology in CSE (2022-2026)",
      issuer: "Aditya College of Engineering and Technology",
      type: "education",
      date: "2026-05-20",
      description: "Undergraduate degree in Computer Science and Engineering with current CGPA of 7.5.",
      detailedDescription: `Comprehensive undergraduate program in Computer Science and Engineering covering fundamental and advanced topics in computer science, software engineering, and technology. The curriculum includes programming, data structures, algorithms, database systems, and software development.\n\nCurrent academic performance demonstrates strong foundation in computer science principles and practical application skills.`,
      logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=100&fit=crop&crop=center",
      credentialId: "ACET-CSE-BTECH-2026-011",
      credentialUrl: "https://adityacollege.ac.in/verify",
      certificateUrl: "https://adityacollege.ac.in/diploma/download",
      verified: true,
      grade: "7.5 CGPA",
      skills: ["Computer Science", "Software Engineering", "Programming", "Data Structures", "Algorithms", "Database Systems"],
      learningOutcomes: [
        "Strong foundation in computer science principles",
        "Practical software development skills",
        "Problem-solving and analytical thinking",
        "Academic excellence in technical education"
      ]
    },
    {
      id: 12,
      title: "Board of Intermediate Education",
      issuer: "Aditya Jr. College",
      type: "education",
      date: "2022-05-20",
      description: "Intermediate education with 69.00% percentage in Science stream.",
      detailedDescription: `Completed intermediate education with focus on Science stream, building strong foundation in mathematics, physics, and chemistry. The curriculum prepared for higher education in engineering and technology fields.\n\nAcademic performance demonstrated strong analytical and problem-solving skills essential for computer science education.`,
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?w=100&h=100&fit=crop&crop=center",
      credentialId: "AJC-INTER-2022-012",
      credentialUrl: "https://adityajrcollege.ac.in/verify",
      certificateUrl: "https://adityajrcollege.ac.in/certificate/download",
      verified: true,
      grade: "69.00%",
      skills: ["Mathematics", "Physics", "Chemistry", "Problem Solving", "Analytical Thinking"],
      learningOutcomes: [
        "Strong foundation in science and mathematics",
        "Analytical and logical thinking skills",
        "Preparation for engineering education",
        "Academic discipline and study habits"
      ]
    },
    {
      id: 13,
      title: "Board of Secondary Education",
      issuer: "St. Joseph's High School",
      type: "education",
      date: "2020-05-20",
      description: "Secondary education with 9.5 CGPA demonstrating academic excellence.",
      detailedDescription: `Completed secondary education with outstanding academic performance, achieving 9.5 CGPA. The curriculum provided comprehensive foundation in core subjects including mathematics, science, and languages.\n\nExceptional academic record demonstrated strong learning abilities, discipline, and commitment to excellence in education.`,
      logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop&crop=center",
      credentialId: "SJHS-SEC-2020-013",
      credentialUrl: "https://stjosephs.edu.in/verify",
      certificateUrl: "https://stjosephs.edu.in/certificate/download",
      verified: true,
      grade: "9.5 CGPA",
      skills: ["Academic Excellence", "Mathematics", "Science", "Languages", "Study Skills"],
      learningOutcomes: [
        "Outstanding academic performance and discipline",
        "Strong foundation in core subjects",
        "Excellent study habits and time management",
        "Commitment to educational excellence"
      ]
    },
    {
      id: 14,
      title: "2nd Place - Campus Coding Competition",
      issuer: "Aditya College of Engineering and Technology",
      type: "achievement",
      date: "2023-03-15",
      description: "Secured 2nd position in campus-wide coding competition during 1st year 2nd semester, demonstrating strong programming and problem-solving skills.",
      detailedDescription: `Achieved 2nd place in the annual campus coding competition, competing against students from all engineering branches. The competition tested programming skills, algorithmic thinking, and problem-solving abilities under time constraints.\n\nThis achievement demonstrated early proficiency in programming fundamentals, competitive coding techniques, and ability to perform under pressure.`,
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
      credentialId: "ACET-CODING-2ND-2023-014",
      verified: true,
      skills: ["Competitive Programming", "Problem Solving", "Algorithms", "Data Structures", "Time Management"],
      learningOutcomes: [
        "Demonstrated strong programming fundamentals",
        "Applied algorithmic thinking under pressure",
        "Competed successfully against peers",
        "Early recognition of coding talent"
      ]
    },
    {
      id: 15,
      title: "Problem Solving Badge",
      issuer: "HackerRank",
      type: "achievement",
      date: "2024-01-15",
      description: "Earned a Problem Solving badge with 4-star rating on HackerRank, demonstrating algorithmic and logical problem-solving skills.",
      detailedDescription: `This badge validates the ability to solve algorithmic challenges using programming fundamentals, data structures, and logical thinking.\n\nIt reflects proficiency in applying problem-solving techniques across multiple programming languages and scenarios.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "4 Stars",
      skills: ["Problem Solving", "Algorithms", "Data Structures", "Logic"],
      learningOutcomes: [
        "Ability to solve algorithmic challenges efficiently",
        "Apply logical and analytical thinking",
        "Strengthened programming fundamentals",
        "Enhanced competitive programming readiness"
      ]
    },
    {
      id: 16,
      title: "C++ Badge",
      issuer: "HackerRank",
      type: "achievement",
      date: "2024-01-20",
      description: "Earned a C++ badge with 5-star rating on HackerRank, showcasing advanced knowledge of C++ programming.",
      detailedDescription: `This badge demonstrates strong expertise in C++ including OOP principles, templates, STL, and problem-solving using C++.\n\nThe badge was awarded based on consistent problem-solving performance in C++ challenges.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "5 Stars",
      skills: ["C++", "OOP", "STL", "Algorithms", "Competitive Programming"],
      learningOutcomes: [
        "Mastered advanced C++ programming",
        "Applied OOP principles effectively",
        "Utilized STL and templates in problem-solving",
        "Built efficient solutions in competitive coding"
      ]
    },
    {
      id: 17,
      title: "Java Badge",
      issuer: "HackerRank",
      type: "achievement",
      date: "2024-01-22",
      description: "Earned a Java badge with 2-star rating on HackerRank, demonstrating foundational Java programming skills.",
      detailedDescription: `This badge reflects basic understanding of Java syntax, OOP principles, and problem-solving with Java.\n\nIt highlights proficiency in using Java for algorithmic challenges and simple application logic.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "2 Stars",
      skills: ["Java", "OOP", "Problem Solving", "Programming Fundamentals"],
      learningOutcomes: [
        "Strengthened knowledge of Java basics",
        "Practiced object-oriented programming",
        "Solved problems using Java",
        "Applied fundamental coding concepts"
      ]
    },
    {
      id: 18,
      title: "Python Badge",
      issuer: "HackerRank",
      type: "achievement",
      date: "2024-01-25",
      description: "Earned a Python badge with 5-star rating on HackerRank, showcasing advanced Python programming expertise.",
      detailedDescription: `This badge validates comprehensive knowledge of Python programming, covering data structures, algorithms, and application development.\n\nAwarded for consistent problem-solving and mastery of Python fundamentals and advanced features.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "5 Stars",
      skills: ["Python", "Data Structures", "Algorithms", "Problem Solving"],
      learningOutcomes: [
        "Mastered Python programming language",
        "Implemented efficient solutions using Python",
        "Solved advanced programming challenges",
        "Applied Python in competitive programming"
      ]
    },
    {
      id: 19,
      title: "10 Days of JavaScript Badge",
      issuer: "HackerRank",
      type: "achievement",
      date: "2024-02-05",
      description: "Earned the 10 Days of JavaScript badge with 4-star rating on HackerRank, demonstrating proficiency in JavaScript fundamentals.",
      detailedDescription: `This badge validates knowledge of JavaScript basics, ES6+ features, and problem-solving with JavaScript.\n\nIt reflects ability to implement DOM manipulation, event handling, and algorithmic solutions using JavaScript.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "4 Stars",
      skills: ["JavaScript", "ES6+", "Problem Solving", "DOM Manipulation"],
      learningOutcomes: [
        "Mastered JavaScript fundamentals",
        "Applied ES6+ features in coding",
        "Practiced problem-solving with JavaScript",
        "Improved client-side scripting skills"
      ]
    },
    {
      id: 20,
      title: "SQL Badge",
      issuer: "HackerRank",
      type: "achievement",
      date: "2024-02-12",
      description: "Earned an SQL badge with 2-star rating on HackerRank, demonstrating foundational SQL and database skills.",
      detailedDescription: `This badge reflects understanding of SQL queries, database concepts, and problem-solving with relational databases.\n\nIt highlights ability to work with SELECT, JOIN, and aggregation queries.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "2 Stars",
      skills: ["SQL", "Database Queries", "Relational Databases", "Data Manipulation"],
      learningOutcomes: [
        "Applied SQL queries to solve database problems",
        "Worked with relational database concepts",
        "Strengthened data manipulation skills",
        "Learned basics of database management"
      ]
    },
    {
      id: 21,
      title: "C Language Badge",
      issuer: "HackerRank",
      type: "achievement",
      date: "2024-02-18",
      description: "Earned a C Language badge with 4-star rating on HackerRank, showcasing strong knowledge of C programming fundamentals.",
      detailedDescription: `This badge validates knowledge of C programming syntax, structured programming, memory management, and problem-solving using C.\n\nIt reflects proficiency in using C for algorithmic challenges and application logic.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "4 Stars",
      skills: ["C Programming", "Memory Management", "Pointers", "Structured Programming"],
      learningOutcomes: [
        "Mastered fundamentals of C programming",
        "Worked with pointers and memory concepts",
        "Solved problems using C",
        "Built structured and efficient programs"
      ]
    },
    {
      id: 22,
      title: "CSS (Basic) Certification",
      issuer: "HackerRank",
      type: "certification",
      date: "2024-03-01",
      description: "Verified certification in CSS (Basic) from HackerRank.",
      detailedDescription: `This certification validates knowledge of CSS fundamentals, styling techniques, and ability to create structured web pages with proper styling.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "Verified",
      skills: ["CSS", "Styling", "Web Development"],
      learningOutcomes: [
        "Mastered basic CSS styling",
        "Designed structured and styled web pages",
        "Applied CSS properties effectively",
        "Laid foundation for advanced frontend development"
      ]
    },
    {
      id: 23,
      title: "Python (Basic) Certification",
      issuer: "HackerRank",
      type: "certification",
      date: "2024-03-05",
      description: "Verified certification in Python (Basic) from HackerRank.",
      detailedDescription: `This certification validates foundational knowledge of Python programming language and problem-solving.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "Verified",
      skills: ["Python", "Programming Fundamentals", "Problem Solving"],
      learningOutcomes: [
        "Demonstrated Python basics",
        "Solved problems using Python",
        "Strengthened programming logic",
        "Prepared for advanced Python development"
      ]
    },
    {
      id: 24,
      title: "Problem Solving (Basic) Certification",
      issuer: "HackerRank",
      type: "certification",
      date: "2024-03-10",
      description: "Verified certification in Problem Solving (Basic) from HackerRank.",
      detailedDescription: `This certification validates problem-solving skills, algorithmic thinking, and foundational programming knowledge.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "Verified",
      skills: ["Problem Solving", "Algorithms", "Programming"],
      learningOutcomes: [
        "Applied logical problem-solving techniques",
        "Strengthened algorithmic thinking",
        "Solved coding challenges successfully",
        "Built foundation for competitive programming"
      ]
    },
    {
      id: 25,
      title: "JavaScript (Basic) Certification",
      issuer: "HackerRank",
      type: "certification",
      date: "2024-03-15",
      description: "Verified certification in JavaScript (Basic) from HackerRank.",
      detailedDescription: `This certification validates foundational knowledge of JavaScript programming and ability to solve problems using JS.`,
      logo: "https://hrcdn.net/community-frontend/assets/brand/h_mark_sm-8942d04fbb.svg",
      verified: true,
      grade: "Verified",
      skills: ["JavaScript", "ES6+", "Problem Solving"],
      learningOutcomes: [
        "Mastered JavaScript fundamentals",
        "Applied ES6+ syntax in problems",
        "Developed problem-solving skills with JS",
        "Prepared for advanced web development"
      ]
    }
  ];

  // Filter and sort achievements
  const filteredAndSortedAchievements = useMemo(() => {
    let filtered = achievements;

    // Apply type filter
    if (activeFilter !== 'all') {
      filtered = filtered?.filter(achievement => achievement?.type === activeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(achievement =>
        achievement?.title?.toLowerCase()?.includes(query) ||
        achievement?.issuer?.toLowerCase()?.includes(query) ||
        achievement?.description?.toLowerCase()?.includes(query) ||
        (achievement?.skills && achievement?.skills?.some(skill => 
          skill?.toLowerCase()?.includes(query)
        ))
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'type':
          return a?.type?.localeCompare(b?.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [achievements, activeFilter, searchQuery, sortBy]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardToggle = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleAchievementClick = (id) => {
    setExpandedCard(id);
    if (viewMode === 'timeline') {
      setViewMode('grid');
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Achievement Gallery - Talent Space | Abhishek Nallam</title>
        <meta name="description" content="Explore Abhishek Nallam's professional achievements, certifications, education, and career milestones in an interactive gallery format." />
        <meta name="keywords" content="achievements, certifications, education, career, professional development, AWS, Google Cloud, React" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-6 py-12"
          >
            {/* Hero Section */}
            <motion.section variants={sectionVariants} className="text-center mb-16">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-warning via-secondary to-primary rounded-full flex items-center justify-center cosmic-glow mx-auto">
                  <Icon name="Trophy" size={40} color="white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full animate-pulse-glow"></div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-4">
                Achievement Gallery
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Journey through my professional milestones, certifications, and educational achievements. 
                Each milestone represents growth, learning, and the continuous pursuit of excellence in technology and innovation.
              </p>
              
              <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-text-secondary">
                <div className="flex items-center">
                  <Icon name="Award" size={16} className="mr-2 text-secondary" />
                  <span>{achievements?.filter(a => a?.type === 'certification')?.length} Certifications</span>
                </div>
                <div className="flex items-center">
                  <Icon name="GraduationCap" size={16} className="mr-2 text-primary" />
                  <span>{achievements?.filter(a => a?.type === 'education')?.length} Degrees</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Trophy" size={16} className="mr-2 text-warning" />
                  <span>{achievements?.filter(a => a?.type === 'achievement')?.length} Awards</span>
                </div>
              </div>
            </motion.section>

            {/* Stats Overview */}
            <motion.section variants={sectionVariants} className="mb-12">
              <StatsOverview achievements={achievements} />
            </motion.section>

            {/* Filter Controls */}
            <motion.section variants={sectionVariants} className="mb-12">
              <FilterControls
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </motion.section>

            {/* Results Summary */}
            <motion.section variants={sectionVariants} className="mb-8">
              <div className="flex items-center justify-between">
                <p className="text-text-secondary">
                  Showing {filteredAndSortedAchievements?.length} of {achievements?.length} achievements
                </p>
                
                {filteredAndSortedAchievements?.length === 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveFilter('all');
                      setSearchQuery('');
                    }}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            </motion.section>

            {/* Achievements Display */}
            <motion.section variants={sectionVariants}>
              <AnimatePresence mode="wait">
                {filteredAndSortedAchievements?.length === 0 ? (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Search" size={32} className="text-text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      No achievements found
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveFilter('all');
                        setSearchQuery('');
                      }}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                ) : viewMode === 'grid' ? (
                  <motion.div
                    key="grid-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    {filteredAndSortedAchievements?.map((achievement, index) => (
                      <AchievementCard
                        key={achievement?.id}
                        achievement={achievement}
                        index={index}
                        isExpanded={expandedCard === achievement?.id}
                        onToggle={handleCardToggle}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="timeline-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-4xl mx-auto"
                  >
                    <TimelineView
                      achievements={filteredAndSortedAchievements}
                      onAchievementClick={handleAchievementClick}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Call to Action */}
            {filteredAndSortedAchievements?.length > 0 && (
              <motion.section 
                variants={sectionVariants}
                className="text-center mt-16 pt-16 border-t border-border"
              >
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  Ready to Collaborate?
                </h2>
                <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                  These achievements represent my commitment to continuous learning and excellence. 
                  Let's discuss how my expertise can contribute to your next project.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Mail"
                    iconPosition="left"
                    className="conversion-glow"
                  >
                    Get In Touch
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download Resume
                  </Button>
                </div>
              </motion.section>
            )}
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AchievementGallery;