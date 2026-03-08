import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Code2, Heart, Coffee, MapPin, Briefcase, 
  GraduationCap, Award, Star, Globe, Users, BookOpen, 
  Music, Camera, Plane, Gamepad, Palette, Dumbbell, 
  Sparkles, Download, Mail, Github, Linkedin, Twitter, 
  Smile, Quote, Rocket, ChevronDown, ChevronUp, Database,
  Smartphone, Box, Cloud, GitBranch
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('bio');
  const [showFullBio, setShowFullBio] = useState(false);

  const personalInfo = {
    name: 'Witness Fabrice',
    title: 'Full-Stack Developer',
    location: 'Kigali, Rwanda',
    email: 'witnessfabrice@gmail.com',
    availability: 'Open for opportunities',
    freelance: 'Available'
  };

  const bio = {
    short: "I'm a passionate Full-Stack Developer with over 3 years of experience building web and mobile applications. Based in Kigali, Rwanda, I love creating solutions that make a difference.",
    long: `My journey into tech started when I built my first website at 16. Since then, I've been on an exciting path of continuous learning and growth. I graduated with honors in Software development from the Kirehe adventist tvet school and have since worked with startups, enterprises, and freelance clients across Africa and beyond.\n\nI believe in writing clean, maintainable code and creating experiences that users love. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring aspiring developers.`
  };

  const skills = {
    frontend: [
      { name: 'React', level: 95, icon: Code2, color: 'from-blue-400 to-blue-600' },
      { name: 'Next.js', level: 88, icon: Sparkles, color: 'from-gray-600 to-gray-800' },
      { name: 'TypeScript', level: 90, icon: Code2, color: 'from-blue-500 to-indigo-600' },
      { name: 'Tailwind CSS', level: 92, icon: Palette, color: 'from-cyan-400 to-cyan-600' }
    ],
    backend: [
      { name: 'Node.js', level: 90, icon: Code2, color: 'from-green-400 to-green-600' },
      { name: 'PostgreSQL', level: 82, icon: Database, color: 'from-blue-400 to-blue-600' },
      { name: 'Docker', level: 75, icon: Box, color: 'from-blue-500 to-blue-700' }
    ]
  };

  const journey = [
    { year: '2023', title: 'Senior Developer', description: 'Leading development at Innovatech Solutions', icon: Rocket, color: 'from-blue-500 to-indigo-600' },
    { year: '2024', title: 'Full-Stack Developer', description: 'Joined TechStart Africa, scaled client systems', icon: Briefcase, color: 'from-purple-500 to-pink-600' },
    { year: '2026', title: 'Graduated', description: 'Graduateed at KIREHE ADVENTIST TVET SCHOOL', icon: GraduationCap, color: 'from-emerald-500 to-teal-600' }
  ];

  const stats = [
    { icon: Code2, label: 'Lines of Code', value: '10K+', color: 'from-blue-500 to-blue-600' },
    { icon: Users, label: 'Happy Clients', value: '10+', color: 'from-emerald-500 to-emerald-600' },
    { icon: Globe, label: 'Countries', value: '2+', color: 'from-purple-500 to-purple-600' },
    { icon: Coffee, label: 'Coffee Cups', value: '10+', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Me</span>
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icon className="text-white w-6 h-6" />
              </div>
              <h4 className="text-3xl font-bold dark:text-white">{stat.value}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="sticky top-24 p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl"
            >
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full animate-pulse blur-lg opacity-30" />
                <img 
                  src="/images/wit.png" 
                  alt="Profile" 
                  className="relative w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl"
                />
              </div>
              
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-bold dark:text-white">{personalInfo.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">{personalInfo.title}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  {personalInfo.availability}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span className="text-sm truncate">{personalInfo.email}</span>
                </div>
              </div>

              <button 
                onClick={() => window.print()}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/10"
              >
                <Download className="w-5 h-5" />
                Download CV
              </button>
            </motion.div>
          </div>

          {/* Tabs Content */}
          <div className="lg:col-span-8">
            <div className="flex p-1.5 bg-gray-100 dark:bg-gray-900 rounded-2xl mb-8">
              {['bio', 'skills', 'journey'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 capitalize ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'bio' && (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                      {bio.short}
                    </p>
                    <AnimatePresence>
                      {showFullBio && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 dark:text-gray-400 mt-4 whitespace-pre-line leading-relaxed">
                            {bio.long}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button 
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="mt-4 flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                    >
                      {showFullBio ? 'Show Less' : 'Read Full Story'}
                      {showFullBio ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50">
                      <h4 className="font-bold flex items-center gap-2 mb-4 dark:text-white">
                        <User className="w-5 h-5 text-blue-500" /> Personal Info
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Nationality</span>
                          <span className="font-medium dark:text-gray-200">Rwandan</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Language</span>
                          <span className="font-medium dark:text-gray-200">English, French</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/50">
                      <h4 className="font-bold flex items-center gap-2 mb-4 dark:text-white">
                        <Heart className="w-5 h-5 text-purple-500" /> Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Coding', 'Music', 'Fitness', 'Travel'].map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-xs font-bold shadow-sm dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  {Object.entries(skills).map(([category, list]) => (
                    <div key={category} className="space-y-4">
                      <h4 className="text-lg font-bold capitalize dark:text-white">{category} Development</h4>
                      <div className="grid gap-4">
                        {list.map((skill) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-bold dark:text-gray-300">
                              <div className="flex items-center gap-2">
                                <skill.icon className="w-4 h-4 text-blue-500" />
                                {skill.name}
                              </div>
                              <span>{skill.level}%</span>
                            </div>
                            <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1 }}
                                className={`h-full bg-gradient-to-r ${skill.color}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'journey' && (
                <motion.div
                  key="journey"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative pl-8 space-y-12 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800"
                >
                  {journey.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-10 p-2 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{item.year}</span>
                        <h4 className="text-xl font-bold dark:text-white mt-1">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-12 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-center text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <Rocket className="w-16 h-16 mx-auto mb-6 animate-bounce" />
          <h3 className="text-3xl md:text-4xl font-black mb-4">Let's build something epic.</h3>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
            I'm currently available for new projects and collaborations. If you have an idea, let's make it real.
          </p>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-blue-600 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Hire Me <Smile className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;