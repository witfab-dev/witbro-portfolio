import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  Code2,
  Heart,
  Coffee,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Target,
  Lightbulb,
  Rocket,
  Zap,
  Globe,
  Users,
  BookOpen,
  Music,
  Camera,
  Plane,
  Gamepad,
  Palette,
  Dumbbell,
  Sparkles,
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  CheckCircle2,
  Clock,
  TrendingUp,
  Smile,
  Quote
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('bio');
  const [showFullBio, setShowFullBio] = useState(false);

  // Personal information
  const personalInfo = {
    name: 'Witness Fabrice',
    title: 'Full-Stack Developer',
    location: 'Kigali, Rwanda',
    email: 'witnessfabrice@gmail.com',
    phone: '+250 788 123 456',
    birthdate: '1998-05-15',
    nationality: 'Rwandan',
    languages: ['English (Fluent)', 'French (Professional)', 'Kinyarwanda (Native)'],
    availability: 'Open for opportunities',
    freelance: 'Available'
  };

  // Bio sections
  const bio = {
    short: "I'm a passionate Full-Stack Developer with over 3 years of experience building web and mobile applications. Based in Kigali, Rwanda, I love creating solutions that make a difference.",
    long: `My journey into tech started when I built my first website at 16. Since then, I've been on an exciting path of continuous learning and growth. I graduated with honors in Computer Science from the University of Rwanda and have since worked with startups, enterprises, and freelance clients across Africa and beyond.

    I believe in writing clean, maintainable code and creating experiences that users love. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring aspiring developers.

    I'm passionate about using technology to solve real-world problems, especially in areas like education, healthcare, and financial inclusion. Every project I work on is an opportunity to learn something new and make a positive impact.`
  };

  // Skills data
  const skills = {
    frontend: [
      { name: 'React', level: 95, icon: Code2, color: 'from-blue-400 to-blue-600' },
      { name: 'Next.js', level: 88, icon: Code2, color: 'from-gray-400 to-gray-600' },
      { name: 'TypeScript', level: 90, icon: Code2, color: 'from-blue-400 to-blue-600' },
      { name: 'Tailwind CSS', level: 92, icon: Palette, color: 'from-cyan-400 to-cyan-600' },
      { name: 'Framer Motion', level: 85, icon: Sparkles, color: 'from-pink-400 to-pink-600' }
    ],
    backend: [
      { name: 'Node.js', level: 90, icon: Code2, color: 'from-green-400 to-green-600' },
      { name: 'Python', level: 85, icon: Code2, color: 'from-yellow-400 to-yellow-600' },
      { name: 'PostgreSQL', level: 82, icon: Database, color: 'from-blue-400 to-blue-600' },
      { name: 'MongoDB', level: 80, icon: Database, color: 'from-green-400 to-green-600' },
      { name: 'GraphQL', level: 78, icon: Code2, color: 'from-pink-400 to-pink-600' }
    ],
    mobile: [
      { name: 'Flutter', level: 82, icon: Smartphone, color: 'from-blue-400 to-blue-600' },
      { name: 'React Native', level: 80, icon: Smartphone, color: 'from-purple-400 to-purple-600' }
    ],
    tools: [
      { name: 'Docker', level: 75, icon: Container, color: 'from-blue-400 to-blue-600' },
      { name: 'Git', level: 92, icon: GitBranch, color: 'from-orange-400 to-orange-600' },
      { name: 'AWS', level: 78, icon: Cloud, color: 'from-yellow-400 to-yellow-600' },
      { name: 'Figma', level: 85, icon: Palette, color: 'from-purple-400 to-purple-600' }
    ]
  };

  // Journey timeline
  const journey = [
    {
      year: '2025',
      title: 'Sinior Developer',
      description: 'Leading development at Innovatech Solutions',
      icon: Rocket,
      color: 'from-blue-500 to-blue-600'
    },
    {
      year: '2024',
      title: 'Full-Stack Developer',
      description: 'Joined TechStart Africa, worked on multiple client projects',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600'
    },
    {
      year: '2023',
      title: 'Graduated',
      description: 'BSc Computer Science, University of Rwanda',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600'
    },
    {
      year: '2017',
      title: 'Started University',
      description: 'Began journey in Computer Science',
      icon: BookOpen,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      year: '2016',
      title: 'First Website',
      description: 'Built first website, discovered passion for coding',
      icon: Code2,
      color: 'from-red-500 to-red-600'
    }
  ];

  // Achievements
  const achievements = [
    { icon: Award, label: 'Best Innovation Award', year: '2023', color: 'text-yellow-500' },
    { icon: Star, label: 'Top Rated Freelancer', year: '2024', color: 'text-purple-500' },
    { icon: Users, label: 'Mentored 20+ Developers', year: '2023', color: 'text-green-500' },
    { icon: Globe, label: 'Projects in 10+ Countries', year: '2024', color: 'text-blue-500' },
    { icon: Code2, label: '50+ Projects Completed', year: '2024', color: 'text-orange-500' },
    { icon: Heart, label: '100% Client Satisfaction', year: '2024', color: 'text-red-500' }
  ];

  // Hobbies
  const hobbies = [
    { icon: Music, name: 'Music', description: 'Play guitar and produce beats' },
    { icon: Camera, name: 'Photography', description: 'Street and landscape photography' },
    { icon: Plane, name: 'Travel', description: 'Explored 15+ countries' },
    { icon: Gamepad, name: 'Gaming', description: 'Strategy and RPG games' },
    { icon: BookOpen, name: 'Reading', description: 'Tech blogs and sci-fi novels' },
    { icon: Dumbbell, name: 'Fitness', description: 'Morning runs and gym' }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Alice Uwase',
      role: 'Product Manager, Innovatech',
      content: 'Witness is one of the most talented developers I\'ve worked with. His attention to detail and problem-solving skills are exceptional.',
      avatar: 'https://ui-avatars.com/api/?name=Alice+Uwase&background=3b82f6&color=fff'
    },
    {
      name: 'Jean Paul',
      role: 'CTO, TechStart Africa',
      content: 'His ability to quickly grasp complex requirements and deliver high-quality code is impressive. A true asset to any team.',
      avatar: 'https://ui-avatars.com/api/?name=Jean+Paul&background=8b5cf6&color=fff'
    },
    {
      name: 'Sarah Johnson',
      role: 'Client, USA',
      content: 'Working with Witness was a pleasure. He understood our vision perfectly and delivered beyond expectations.',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff'
    }
  ];

  // Stats
  const stats = [
    { icon: Code2, label: 'Lines of Code', value: '500K+', color: 'from-blue-500 to-blue-600' },
    { icon: Users, label: 'Happy Clients', value: '30+', color: 'from-green-500 to-green-600' },
    { icon: Globe, label: 'Countries', value: '10+', color: 'from-purple-500 to-purple-600' },
    { icon: Coffee, label: 'Coffee Cups', value: '1000+', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
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
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl sticky top-24">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                  <img 
                    src="../images/wit.png" 
                    alt="Witness Fabrice"
                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {personalInfo.availability}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">
                {personalInfo.name}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                {personalInfo.title}
              </p>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Briefcase className="w-4 h-4" />
                  {personalInfo.freelance} for freelance
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mb-6">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                ))}
              </div>

              {/* Download Resume Button */}
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                Download Resume
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
              {['bio', 'skills', 'journey'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* Bio Tab */}
              {activeTab === 'bio' && (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {bio.short}
                    </p>
                    
                    <AnimatePresence>
                      {showFullBio && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                            {bio.long}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-2"
                    >
                      {showFullBio ? 'Show less' : 'Read more'}
                    </button>
                  </div>

                  {/* Personal Info Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Personal Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Birthday</span>
                          <span className="text-gray-900 dark:text-white">May 15, 2008</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Nationality</span>
                          <span className="text-gray-900 dark:text-white">Rwandan</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Languages</span>
                          <span className="text-gray-900 dark:text-white">English, French, Kinyarwanda</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hobbies.map((hobby) => {
                          const Icon = hobby.icon;
                          return (
                            <div
                              key={hobby.name}
                              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                            >
                              <Icon className="w-4 h-4" />
                              {hobby.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Quote className="w-4 h-4" />
                      What People Say
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {testimonials.map((testimonial, i) => (
                        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
                            "{testimonial.content}"
                          </p>
                          <div className="flex items-center gap-2">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {testimonial.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                        {category}
                      </h4>
                      <div className="space-y-4">
                        {skillList.map((skill) => {
                          const Icon = skill.icon;
                          return (
                            <div key={skill.name}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {skill.name}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Achievements */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Achievements
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {achievements.map((achievement, i) => {
                        const Icon = achievement.icon;
                        return (
                          <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <Icon className={`w-5 h-5 ${achievement.color} mb-2`} />
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {achievement.label}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {achievement.year}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Journey Tab */}
              {activeTab === 'journey' && (
                <motion.div
                  key="journey"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

                    <div className="space-y-8">
                      {journey.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-12"
                          >
                            <div className={`absolute left-0 p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                {item.year}
                              </span>
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                {item.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-blue-500/20"
        >
          <Rocket className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Let's Work Together
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 group"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
            <Smile className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Missing imports
const Database = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const Smartphone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const Container = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const Cloud = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const GitBranch = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);

export default About;