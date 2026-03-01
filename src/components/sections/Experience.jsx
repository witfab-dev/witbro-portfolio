import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award,
  Code2,
  Building2,
  ChevronRight,
  Star,
  Heart,
  Users,
  Rocket,
  Zap,
  Globe,
  Cpu,
  Smartphone,
  Cloud,
  Database,
  ExternalLink,
  CheckCircle2,
  Clock,
  TrendingUp,
  Lightbulb,
  Target,
  Coffee
} from 'lucide-react';

const Experience = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'work', 'education'

  // Experience data
  const experiences = [
    {
      id: 1,
      type: 'work',
      title: 'Senior Full-Stack Developer',
      company: 'Innovatech Solutions',
      location: 'Kigali, Rwanda',
      period: '2022 - Present',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      description: 'Leading development of enterprise web applications and mentoring junior developers.',
      achievements: [
        'Led a team of 5 developers to deliver 3 major enterprise projects',
        'Improved application performance by 45% through code optimization',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Mentored 10+ junior developers who now lead their own teams',
        'Architected microservices infrastructure handling 1M+ requests/day'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB'],
      highlights: [
        { icon: Rocket, label: 'Team Lead', value: '5 developers' },
        { icon: Zap, label: 'Performance', value: '+45%' },
        { icon: Globe, label: 'Users', value: '1M+/day' }
      ]
    },
    {
      id: 2,
      type: 'work',
      title: 'Frontend Developer',
      company: 'TechStart Africa',
      location: 'Remote',
      period: '2020 - 2022',
      icon: Code2,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400',
      description: 'Developed responsive web applications for clients across Africa.',
      achievements: [
        'Built 15+ responsive websites for startups and SMEs',
        'Implemented reusable component library used across 10+ projects',
        'Reduced bundle size by 40% through code splitting',
        'Achieved 98% Lighthouse scores for all projects',
        'Collaborated with designers to create pixel-perfect implementations'
      ],
      technologies: ['React', 'Vue.js', 'Tailwind CSS', 'Figma', 'Firebase', 'Netlify'],
      highlights: [
        { icon: Rocket, label: 'Projects', value: '15+' },
        { icon: Zap, label: 'Lighthouse', value: '98%' },
        { icon: Globe, label: 'Countries', value: '5' }
      ]
    },
    {
      id: 3,
      type: 'education',
      title: 'BSc Computer Science',
      company: 'University of Rwanda',
      location: 'Kigali, Rwanda',
      period: '2017 - 2020',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400',
      description: 'Graduated with honors, specialized in Software Engineering.',
      achievements: [
        'Graduated with First Class Honors (GPA: 3.8/4.0)',
        'Led team project that won Best Innovation Award',
        'Published research paper on Cloud Computing',
        'Peer tutor for Data Structures and Algorithms',
        'President of the Computer Science Students Association'
      ],
      technologies: ['Java', 'Python', 'SQL', 'Data Structures', 'Algorithms', 'Networking'],
      highlights: [
        { icon: Award, label: 'GPA', value: '3.8/4.0' },
        { icon: Star, label: 'Honors', value: 'First Class' },
        { icon: Users, label: 'Leadership', value: 'President' }
      ]
    },
    {
      id: 4,
      type: 'work',
      title: 'Freelance Developer',
      company: 'Self-Employed',
      location: 'Worldwide',
      period: '2019 - Present',
      icon: Globe,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-600 dark:text-orange-400',
      description: 'Working with international clients on various web and mobile projects.',
      achievements: [
        'Delivered 30+ projects for clients in 10+ countries',
        'Maintained 100% client satisfaction rate',
        'Built e-commerce platforms generating $2M+ in revenue',
        'Developed custom CMS for content-heavy websites',
        'Provided technical consulting for startup founders'
      ],
      technologies: ['React', 'Flutter', 'Node.js', 'WordPress', 'Shopify', 'Stripe'],
      highlights: [
        { icon: Users, label: 'Clients', value: '30+' },
        { icon: Globe, label: 'Countries', value: '10+' },
        { icon: Heart, label: 'Satisfaction', value: '100%' }
      ]
    },
    {
      id: 5,
      type: 'education',
      title: 'AWS Certified Developer',
      company: 'Amazon Web Services',
      location: 'Online',
      period: '2023',
      icon: Cloud,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      description: 'Professional certification in cloud development.',
      achievements: [
        'Passed AWS Developer Associate exam on first attempt',
        'Completed 5 hands-on projects with AWS services',
        'Designed serverless applications using Lambda',
        'Implemented CI/CD pipelines with CodePipeline',
        'Managed infrastructure as code with CloudFormation'
      ],
      technologies: ['Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFormation', 'CDK'],
      highlights: [
        { icon: Award, label: 'Score', value: '92%' },
        { icon: Zap, label: 'Projects', value: '5' },
        { icon: Cloud, label: 'Services', value: '10+' }
      ]
    },
    {
      id: 6,
      type: 'work',
      title: 'Mobile Developer',
      company: 'AppWorks Rwanda',
      location: 'Kigali, Rwanda',
      period: '2021 - 2022',
      icon: Smartphone,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      textColor: 'text-pink-600 dark:text-pink-400',
      description: 'Developed cross-platform mobile applications.',
      achievements: [
        'Built 5 mobile apps for iOS and Android',
        'Reached 50,000+ downloads across all apps',
        'Implemented real-time features with WebSockets',
        'Integrated payment gateways for e-commerce apps',
        'Optimized app performance reducing load time by 50%'
      ],
      technologies: ['Flutter', 'React Native', 'Firebase', 'GraphQL', 'Redux', 'SQLite'],
      highlights: [
        { icon: Smartphone, label: 'Apps', value: '5' },
        { icon: Users, label: 'Downloads', value: '50k+' },
        { icon: Zap, label: 'Performance', value: '+50%' }
      ]
    }
  ];

  // Stats
  const stats = [
    { icon: Briefcase, label: 'Years Experience', value: '4+' },
    { icon: Award, label: 'Certifications', value: '5' },
    { icon: Code2, label: 'Projects Completed', value: '50+' },
    { icon: Users, label: 'Happy Clients', value: '30+' },
    { icon: Globe, label: 'Countries Served', value: '10+' },
    { icon: Heart, label: 'Satisfaction', value: '99%' }
  ];

  const filteredExperiences = experiences.filter(exp => 
    filter === 'all' ? true : exp.type === filter
  );

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A timeline of my professional growth, achievements, and the path that shaped my career
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {['all', 'work', 'education'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-3 rounded-full font-medium capitalize transition-all duration-300 ${
                filter === type
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80'
              }`}
            >
              {type === 'all' && <Globe className="w-4 h-4 inline mr-2" />}
              {type === 'work' && <Briefcase className="w-4 h-4 inline mr-2" />}
              {type === 'education' && <GraduationCap className="w-4 h-4 inline mr-2" />}
              {type}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-12">
            {filteredExperiences.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 z-10"></div>

                  {/* Content */}
                  <div className={`lg:w-1/2 ${isEven ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedItem(selectedItem === exp.id ? null : exp.id)}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${exp.bgColor}`}>
                          <Icon className={`w-6 h-6 ${exp.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {exp.company}
                          </p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {exp.highlights.map((highlight, i) => {
                          const HIcon = highlight.icon;
                          return (
                            <div key={i} className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <HIcon className="w-4 h-4 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                              <div className="text-sm font-bold text-gray-900 dark:text-white">
                                {highlight.value}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {highlight.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expand/Collapse indicator */}
                      <div className="flex items-center justify-end text-sm text-blue-600 dark:text-blue-400">
                        <span>{selectedItem === exp.id ? 'Show less' : 'Show more'}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                          selectedItem === exp.id ? 'rotate-90' : ''
                        }`} />
                      </div>

                      {/* Expanded Achievements */}
                      <AnimatePresence>
                        {selectedItem === exp.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Award className="w-4 h-4 text-yellow-500" />
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span>{achievement}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Empty column for alignment */}
                  <div className="lg:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/20">
            <Rocket className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's bring your ideas to life with the same passion and dedication I've brought to every project.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 group"
            >
              <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Hire Me Now
              <Coffee className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;