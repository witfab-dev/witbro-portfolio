import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  Palette, 
  Braces, 
  Terminal, 
  Layout,
  Box,
  Workflow,
  Layers,
  Gauge,
  Sparkles,
  Rocket,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
  Users,
  BookOpen,
  Target,
  Linkedin,
  Github,
  Twitter,
  Mail
} from 'lucide-react';

const SkillsGalaxy = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'galaxy'

  const skills = [
    { 
      name: 'React', 
      level: 95, 
      color: '#61DAFB', 
      description: 'Advanced React with Hooks, Context, and Suspense',
      longDescription: 'Building complex SPAs with React 18, Concurrent Rendering, and Server Components. Expertise in custom hooks, state management, and performance optimization.',
      icon: Code2,
      category: 'frontend',
      years: 4,
      projects: 25,
      certifications: ['Meta Frontend Developer', 'React Advanced Patterns'],
      tools: ['Redux', 'Zustand', 'React Query', 'Next.js', 'Gatsby'],
      achievements: ['Built 3 enterprise dashboards', 'Optimized bundle size by 40%', 'Mentored 10+ junior devs'],
      endorsements: 45
    },
    { 
      name: 'Node.js', 
      level: 90, 
      color: '#68A063', 
      description: 'REST APIs, GraphQL, WebSocket servers',
      longDescription: 'Designing scalable backend services with Express, Fastify, and NestJS. Implementing real-time features with WebSockets and message queues.',
      icon: Server,
      category: 'backend',
      years: 4,
      projects: 20,
      certifications: ['Node.js Application Developer', 'Advanced Node.js'],
      tools: ['Express', 'NestJS', 'Fastify', 'Socket.io', 'BullMQ'],
      achievements: ['Handled 1M+ requests/day', 'Reduced response time by 60%', 'Built real-time chat system'],
      endorsements: 38
    },
    { 
      name: 'TypeScript', 
      level: 88, 
      color: '#3178C6', 
      description: 'Type-safe JavaScript for scalable applications',
      longDescription: 'Implementing type-safe architectures with advanced TypeScript features like conditional types, mapped types, and utility types.',
      icon: Braces,
      category: 'frontend',
      years: 3,
      projects: 30,
      certifications: ['TypeScript Advanced Concepts'],
      tools: ['TSConfig', 'ESLint', 'Prettier', 'JSDoc'],
      achievements: ['Migrated 5 projects to TypeScript', 'Created shared type libraries', 'Reduced runtime errors by 70%'],
      endorsements: 32
    },
    { 
      name: 'Python', 
      level: 85, 
      color: '#3776AB', 
      description: 'Data analysis, ML, and backend development',
      longDescription: 'Leveraging Python for data processing, machine learning pipelines, and backend services. Experience with FastAPI, Django, and data science libraries.',
      icon: Terminal,
      category: 'backend',
      years: 3,
      projects: 15,
      certifications: ['Python Institute PCEP', 'Data Science Specialization'],
      tools: ['FastAPI', 'Django', 'Pandas', 'NumPy', 'Jupyter'],
      achievements: ['Built ML model with 92% accuracy', 'Processed 10GB+ datasets', 'Automated data pipelines'],
      endorsements: 25
    },
    { 
      name: 'Tailwind', 
      level: 92, 
      color: '#06B6D4', 
      description: 'Utility-first CSS framework mastery',
      longDescription: 'Creating responsive, maintainable UIs with Tailwind CSS. Expertise in custom configurations, plugins, and performance optimization.',
      icon: Palette,
      category: 'frontend',
      years: 3,
      projects: 28,
      certifications: ['Tailwind CSS Masterclass'],
      tools: ['PostCSS', 'Autoprefixer', 'Headless UI', 'DaisyUI'],
      achievements: ['Built 20+ responsive websites', 'Created custom plugin', 'Reduced CSS size by 80%'],
      endorsements: 41
    },
    { 
      name: 'MongoDB', 
      level: 80, 
      color: '#47A248', 
      description: 'NoSQL database design and optimization',
      longDescription: 'Designing efficient data models for MongoDB. Experience with aggregation pipelines, indexing strategies, and replica sets.',
      icon: Database,
      category: 'database',
      years: 3,
      projects: 18,
      certifications: ['MongoDB Associate Developer'],
      tools: ['Mongoose', 'Compass', 'Atlas', 'Studio 3T'],
      achievements: ['Optimized query performance by 300%', 'Designed sharding strategy', 'Implemented change streams'],
      endorsements: 22
    },
    { 
      name: 'AWS', 
      level: 75, 
      color: '#FF9900', 
      description: 'Cloud infrastructure and serverless architecture',
      longDescription: 'Deploying and managing cloud infrastructure on AWS. Experience with EC2, Lambda, S3, and CloudFormation.',
      icon: Cloud,
      category: 'devops',
      years: 2,
      projects: 12,
      certifications: ['AWS Certified Developer', 'AWS Solutions Architect (in progress)'],
      tools: ['EC2', 'Lambda', 'S3', 'CloudFormation', 'CDK'],
      achievements: ['Reduced costs by 35%', 'Implemented auto-scaling', 'Built serverless APIs'],
      endorsements: 18
    },
    { 
      name: 'Docker', 
      level: 70, 
      color: '#2496ED', 
      description: 'Containerization and DevOps',
      longDescription: 'Containerizing applications and managing multi-container setups with Docker Compose and Kubernetes.',
      icon: Box,
      category: 'devops',
      years: 2,
      projects: 15,
      certifications: ['Docker Certified Associate'],
      tools: ['Docker Compose', 'Kubernetes', 'Portainer', 'Docker Swarm'],
      achievements: ['Containerized 10+ apps', 'Reduced deployment time by 80%', 'Set up CI/CD pipelines'],
      endorsements: 15
    },
    { 
      name: 'GraphQL', 
      level: 82, 
      color: '#E10098', 
      description: 'API query language and Apollo Client',
      longDescription: 'Building efficient GraphQL APIs with Apollo Server and client-side data fetching with Apollo Client. Schema design and resolver optimization.',
      icon: Workflow,
      category: 'backend',
      years: 2,
      projects: 10,
      certifications: ['Apollo GraphQL Developer'],
      tools: ['Apollo Server', 'Apollo Client', 'GraphQL Yoga', 'Prisma'],
      achievements: ['Reduced API calls by 60%', 'Built federated gateway', 'Implemented real-time subscriptions'],
      endorsements: 20
    },
    { 
      name: 'Redis', 
      level: 68, 
      color: '#DC382D', 
      description: 'In-memory data structure store',
      longDescription: 'Implementing caching strategies and real-time features with Redis. Experience with pub/sub, sorted sets, and Redis Streams.',
      icon: Gauge,
      category: 'database',
      years: 1.5,
      projects: 8,
      certifications: ['Redis Developer Certification'],
      tools: ['Redis CLI', 'RedisInsight', 'ioredis', 'Redis OM'],
      achievements: ['Improved response times by 90%', 'Implemented rate limiting', 'Built real-time leaderboards'],
      endorsements: 12
    },
    { 
      name: 'Flutter', 
      level: 78, 
      color: '#02569B', 
      description: 'Cross-platform mobile development',
      longDescription: 'Building natively compiled mobile apps for iOS and Android from a single codebase. Experience with BLoC, Riverpod, and Firebase integration.',
      icon: Layout,
      category: 'mobile',
      years: 2,
      projects: 6,
      certifications: ['Google Flutter Certification'],
      tools: ['Dart', 'BLoC', 'Riverpod', 'Firebase', 'GetX'],
      achievements: ['Launched 2 apps on App Store', 'Reached 10k+ downloads', 'Implemented complex animations'],
      endorsements: 16
    },
    { 
      name: 'PostgreSQL', 
      level: 77, 
      color: '#336791', 
      description: 'Advanced relational database management',
      longDescription: 'Designing complex database schemas, writing optimized queries, and implementing database-level security. Experience with PostGIS and TimescaleDB.',
      icon: Database,
      category: 'database',
      years: 3,
      projects: 22,
      certifications: ['PostgreSQL Advanced DBA'],
      tools: ['pgAdmin', 'Prisma', 'Knex', 'PostGIS'],
      achievements: ['Optimized queries for 5M+ rows', 'Implemented full-text search', 'Designed geospatial features'],
      endorsements: 28
    },
    { 
      name: 'Next.js', 
      level: 87, 
      color: '#000000', 
      description: 'React framework for production',
      longDescription: 'Building SEO-friendly React applications with Next.js. Experience with SSR, SSG, ISR, and middleware.',
      icon: Rocket,
      category: 'frontend',
      years: 2.5,
      projects: 15,
      certifications: ['Vercel Next.js Certification'],
      tools: ['App Router', 'Server Components', 'Middleware', 'NextAuth'],
      achievements: ['Achieved 98 Lighthouse score', 'Implemented i18n', 'Optimized Core Web Vitals'],
      endorsements: 34
    },
    { 
      name: 'Kubernetes', 
      level: 65, 
      color: '#326CE5', 
      description: 'Container orchestration',
      longDescription: 'Managing containerized applications with Kubernetes. Experience with Helm charts, operators, and cluster management.',
      icon: Layers,
      category: 'devops',
      years: 1.5,
      projects: 5,
      certifications: ['CKAD (in progress)'],
      tools: ['Helm', 'kubectl', 'Minikube', 'ArgoCD'],
      achievements: ['Deployed microservices architecture', 'Implemented auto-scaling', 'Set up monitoring stack'],
      endorsements: 10
    }
  ];

  const categories = {
    frontend: { 
      name: 'Frontend Development', 
      icon: Code2, 
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      description: 'Building responsive, interactive user interfaces with modern frameworks'
    },
    backend: { 
      name: 'Backend Development', 
      icon: Server, 
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      description: 'Creating scalable APIs and services with robust architecture'
    },
    database: { 
      name: 'Database Management', 
      icon: Database, 
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      description: 'Designing efficient data models and optimizing queries'
    },
    devops: { 
      name: 'DevOps & Cloud', 
      icon: Cloud, 
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      description: 'Automating deployment and managing cloud infrastructure'
    },
    mobile: { 
      name: 'Mobile Development', 
      icon: Layout, 
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      textColor: 'text-pink-600 dark:text-pink-400',
      description: 'Building cross-platform mobile apps with native performance'
    }
  };

  // Calculate total stats
  const totalStats = {
    projects: skills.reduce((sum, skill) => sum + skill.projects, 0),
    certifications: skills.reduce((sum, skill) => sum + (skill.certifications?.length || 0), 0),
    endorsements: skills.reduce((sum, skill) => sum + (skill.endorsements || 0), 0),
    years: Math.max(...skills.map(s => s.years))
  };

  // REMOVED: The useEffect that automatically cycles through skills
  // Now the popup only appears when a user hovers over a skill

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Constellation</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Skills{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Galaxy
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A constellation of technologies I've mastered across the full development stack
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Award, label: 'Projects', value: totalStats.projects, color: 'blue' },
            { icon: BookOpen, label: 'Certifications', value: totalStats.certifications, color: 'purple' },
            { icon: Users, label: 'Endorsements', value: totalStats.endorsements, color: 'green' },
            { icon: Clock, label: 'Years Experience', value: totalStats.years, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-500`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Mode Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              viewMode === 'grid' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            <Layout className="w-4 h-4" />
            Grid View
          </button>
          <button
            onClick={() => setViewMode('galaxy')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              viewMode === 'galaxy' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Galaxy View
          </button>
        </div>

        {/* Skills Display */}
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
                  
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                    <div className="flex justify-center mb-4">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${skill.color}20` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: skill.color }} />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{skill.name}</h3>
                    
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: skill.color }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{skill.years} years</span>
                      <Users className="w-3 h-3 text-gray-400 ml-2" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{skill.endorsements}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 justify-center">
                      {skill.tools.slice(0, 2).map(tool => (
                        <span key={tool} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Galaxy View
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Center core */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: 360
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-30"
            />
            
            <div className="relative w-full h-full">
              {skills.map((skill, index) => {
                const angle = (index * 360) / skills.length;
                const radius = 200 + (skill.level * 2);
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const Icon = skill.icon;
                
                return (
                  <motion.div
                    key={skill.name}
                    className="absolute left-1/2 top-1/2"
                    animate={{
                      x: [x, x + 20, x],
                      y: [y, y - 20, y],
                    }}
                    transition={{
                      duration: 5 + index,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setActiveSkill(skill)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                      <div 
                        className="relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{ backgroundColor: skill.color }}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                        <span className="bg-gray-900 text-white text-xs py-1 px-2 rounded">
                          {skill.name} - {skill.level}%
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Skill Details Modal - Only appears on hover */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={() => setActiveSkill(null)}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${activeSkill.color}20` }}
                  >
                    <activeSkill.icon className="w-10 h-10" style={{ color: activeSkill.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{activeSkill.name}</h3>
                      <span 
                        className="px-3 py-1 rounded-full text-sm text-white"
                        style={{ backgroundColor: activeSkill.color }}
                      >
                        {activeSkill.level}% Mastery
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{activeSkill.longDescription}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">Experience</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">{activeSkill.years}+ years</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activeSkill.projects} projects completed</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">Endorsements</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">{activeSkill.endorsements}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">from peers & clients</p>
                  </div>
                </div>

                {/* Tools */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.tools.map(tool => (
                      <span 
                        key={tool}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {activeSkill.certifications && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Certifications</h4>
                    <div className="space-y-2">
                      {activeSkill.certifications.map(cert => (
                        <div key={cert} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Achievements */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h4>
                  <div className="space-y-2">
                    {activeSkill.achievements.map(achievement => (
                      <div key={achievement} className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setActiveSkill(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Breakdown */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Skill <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Categories</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(categories).map(([key, category]) => {
              const categorySkills = skills.filter(s => s.category === key);
              const avgLevel = Math.round(categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length);
              
              return (
                <motion.div
                  key={key}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setHoveredCategory(key)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`relative overflow-hidden rounded-2xl p-6 ${category.bgColor} border border-gray-200 dark:border-gray-700`}
                >
                  {/* Background icon */}
                  <category.icon className={`absolute -right-4 -top-4 w-24 h-24 ${category.textColor} opacity-10`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h4>
                        <p className={`text-sm ${category.textColor}`}>{categorySkills.length} technologies</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{category.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      {categorySkills.slice(0, hoveredCategory === key ? undefined : 3).map(skill => (
                        <div key={skill.name} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: skill.color }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {!hoveredCategory && categorySkills.length > 3 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        +{categorySkills.length - 3} more technologies
                      </p>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Average Mastery</span>
                        <span className={`text-lg font-bold ${category.textColor}`}>{avgLevel}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Learning & Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 text-center"
        >
          <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Continuous Learning</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Currently expanding my skills in WebAssembly, Rust, and Machine Learning. Always exploring new technologies to build better solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {['WebAssembly', 'Rust', 'TensorFlow.js', 'WebGPU', 'Tauri'].map(skill => (
              <span 
                key={skill}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a 
            href="#" 
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm text-gray-700 dark:text-gray-300">GitHub</span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">LinkedIn</span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <Twitter className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Twitter</span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <Mail className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Email</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsGalaxy;