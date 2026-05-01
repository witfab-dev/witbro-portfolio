import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

import { 
  User, Code2, Heart, Coffee, MapPin, Briefcase, 
  GraduationCap, Globe, Users, Palette, Box, 
  Database, Sparkles, Download, Mail, 
  Smile, Rocket, ChevronDown, ChevronUp,
  Eye, Compass, Target, Zap, ShieldCheck
} from 'lucide-react';

const About = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('bio');
  const [showFullBio, setShowFullBio] = useState(false);

  const personalInfo = {
    name: 'Witness Fabrice',
    title: 'Full-Stack Developer',
    location: 'Kigali, Rwanda',
    email: 'witnessfabrice@gmail.com',
    availability: 'Open for opportunities',
  };

  const bio = {
    short: "I'm a dedicated Full-Stack Developer focused on building high-performance applications that solve real-world problems through clean code and modern design.",
    long: `My journey into tech began with a deep curiosity for how the web works. Since then, I've dedicated myself to mastering the MERN stack and modern UI/UX principles. I recently graduated from Kirehe Technical Secondary School, where I focused on Level 5 Software Development.\n\nI believe in writing clean, scalable code and constantly pushing the boundaries of what's possible with React and Node.js. When I'm not coding, you'll find me exploring 3D web graphics, participating in entrepreneurship challenges, or mentoring peers in my community.`
  };

  // ✅ REPLACED SKILLS WITH VISION
  const vision = {
    core: "Empowering Rwanda’s digital landscape through high-performance, scalable software solutions.",
    pillars: [
      { 
        title: 'Technical Mastery', 
        objective: 'Advancing the limits of Full-Stack architecture with React, Node.js, and modern database management.', 
        icon: ShieldCheck, 
        color: 'from-blue-400 to-blue-600' 
      },
      { 
        title: 'User-Centric Innovation', 
        objective: 'Crafting immersive digital environments that prioritize human experience and accessibility.', 
        icon: Palette, 
        color: 'from-cyan-400 to-cyan-600' 
      },
      { 
        title: 'Problem-Solving Agility', 
        objective: 'Transforming complex local challenges into streamlined, automated global opportunities.', 
        icon: Zap, 
        color: 'from-emerald-400 to-emerald-600' 
      }
    ]
  };

  // ✅ REPLACED JOURNEY WITH MISSION
  const mission = [
    { 
      id: '01',
      title: 'Continuous Growth', 
      description: 'Relentlessly pursuing technical excellence and staying ahead of the architectural curve in system design.', 
      icon: Rocket, 
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      id: '02',
      title: 'Collaborative Excellence', 
      description: 'Working alongside mentors and peers to build robust solutions that meet international standards.', 
      icon: Compass, 
      color: 'from-purple-500 to-pink-600' 
    },
    { 
      id: '03',
      title: 'Purposeful Impact', 
      description: 'Dedicated to building software that is not just functional, but meaningful and transformative for the community.', 
      icon: Target, 
      color: 'from-emerald-500 to-teal-600' 
    }
  ];

  const stats = [
    { icon: Code2, label: 'Projects', value: '15+', color: 'from-blue-500 to-blue-600' },
    { icon: Users, label: 'Collaborations', value: '5+', color: 'from-emerald-500 to-emerald-600' },
    { icon: Globe, label: 'Tech Stack', value: '8+', color: 'from-purple-500 to-purple-600' },
    { icon: Coffee, label: 'Coffee Cups', value: '500+', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
            {t('about')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Me</span>
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl"
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
                  src="/wit.png" 
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

              <a 
                href="/witness_fabrice_cv.pdf"
                download="Witness_Fabrice_CV.pdf"
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                {t('downloadCV')}
              </a>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="flex p-1.5 bg-gray-100 dark:bg-gray-900 rounded-2xl mb-8">
              {['bio', 'vision', 'mission'].map((tab) => (
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
                    <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
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
                      {showFullBio ? t('showLess') : t('readFullStory')}
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
                          <span className="text-gray-500">Education</span>
                          <span className="font-medium dark:text-gray-200">Kirehe Technical</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Languages</span>
                          <span className="font-medium dark:text-gray-200">English, Kinyarwanda</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/50">
                      <h4 className="font-bold flex items-center gap-2 mb-4 dark:text-white">
                        <Heart className="w-5 h-5 text-purple-500" /> Focus Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Architecture', 'UI Design', 'System Design', 'Open Source'].map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-xs font-bold shadow-sm dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vision' && (
                <motion.div key="vision" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-100 dark:border-blue-900/30">
                     <p className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-relaxed italic">
                       "{vision.core}"
                     </p>
                   </div>
                   <div className="grid gap-6">
                     {vision.pillars.map((pillar) => (
                       <div key={pillar.title} className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-all shadow-sm">
                         <div className="flex items-start gap-4">
                           <div className={`p-3 rounded-xl bg-gradient-to-br ${pillar.color} text-white`}>
                             <pillar.icon size={24} />
                           </div>
                           <div>
                             <h4 className="font-bold text-lg dark:text-white mb-1">{pillar.title}</h4>
                             <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{pillar.objective}</p>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'mission' && (
                <motion.div key="mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {mission.map((item) => (
                    <div key={item.id} className="relative group">
                      <div className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 transition-all">
                        <div className="text-4xl font-black text-gray-200 dark:text-gray-800 group-hover:text-blue-500/20 transition-colors">
                          {item.id}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold dark:text-white flex items-center gap-2">
                             <item.icon size={18} className="text-blue-500" />
                             {item.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-12 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-center text-white shadow-2xl overflow-hidden relative"
        >
          <Rocket className="w-16 h-16 mx-auto mb-6 animate-bounce" />
          <h3 className="text-3xl md:text-4xl font-black mb-4">Ready to innovate?</h3>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
            I'm looking for meaningful collaborations and full-stack opportunities. Let's build the future together.
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