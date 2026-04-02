import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Server, Cloud, Database, Braces,
  Clock, Target 
} from 'lucide-react';

const SkillsGalaxy = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [warpedSkill, setWarpedSkill] = useState(null);
  const [screenSize, setScreenSize] = useState({ width: 1200, height: 800 });

  // Handle Screen Resize for Galaxy Scaling
  useEffect(() => {
    const handleResize = () => setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Escape Key & Scroll Lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveSkill(null);
        setWarpedSkill(null);
      }
    };
    if (activeSkill || warpedSkill) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeSkill, warpedSkill]);

  const skills = [
    { name: 'React', level: 95, color: '#61DAFB', icon: Code2, years: 4, projects: 25, longDescription: 'Expertise in React 18, Server Components, and complex state management.' },
    { name: 'Node.js', level: 90, color: '#68A063', icon: Server, years: 4, projects: 20, longDescription: 'Scalable backend architecture and real-time WebSocket implementation.' },
    { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, years: 3, projects: 30, longDescription: 'Type-safe architecture and advanced utility type mastery.' },
    { name: 'AWS', level: 75, color: '#FF9900', icon: Cloud, years: 2, projects: 12, longDescription: 'Cloud infrastructure management and serverless deployment.' },
    { name: 'PostgreSQL', level: 77, color: '#336791', icon: Database, years: 3, projects: 22, longDescription: 'Relational database design and query performance tuning.' }
    // Add more skills here!
  ];

  // Calculate Galaxy Coordinates
  const galaxySkills = useMemo(() => {
    const radiusScale = screenSize.width < 768 ? 0.5 : 1;
    return skills.map((skill, i) => {
      const angle = (i * 360) / skills.length;
      const radius = (180 + skill.level) * radiusScale;
      return {
        ...skill,
        x: Math.cos((angle * Math.PI) / 180) * radius,
        y: Math.sin((angle * Math.PI) / 180) * radius,
      };
    });
  }, [skills.length, screenSize.width]);

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gray-50 dark:bg-[#0B1120] overflow-hidden transition-colors duration-500">
      
      {/* 🌌 Starfield Background (Galaxy Mode Only) */}
      <AnimatePresence>
        {viewMode === 'galaxy' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-[#020617] -z-20" />
            <div className="stars-small" /> {/* Ensure your CSS for stars is imported */}
            <div className="stars-large" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <h2 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Skills <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Galaxy</span>
          </h2>
          
          {/* View Toggles */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => { setViewMode('grid'); setWarpedSkill(null); }}
              className={`px-6 py-2.5 rounded-full border transition-all font-medium ${viewMode === 'grid' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Grid View
            </button>
            <button 
              onClick={() => setViewMode('galaxy')}
              className={`px-6 py-2.5 rounded-full border transition-all font-medium ${viewMode === 'galaxy' ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Galaxy View
            </button>
          </div>
        </header>

        {/* 🚀 Main Display Container (The Camera) */}
        <div className={`relative min-h-[600px] transition-all duration-1000 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6' : 'flex items-center justify-center'}`}>
          
          <motion.div
            animate={
              warpedSkill 
                ? { scale: 2.2, x: -warpedSkill.x * 2.2, y: -warpedSkill.y * 2.2, rotate: 0 } 
                : viewMode === 'galaxy' 
                  ? { scale: 1, x: 0, y: 0, rotate: 360 } // Continuous orbit
                  : { scale: 1, x: 0, y: 0, rotate: 0 }
            }
            transition={
              viewMode === 'galaxy' && !warpedSkill
                ? { 
                    rotate: { duration: 60, repeat: Infinity, ease: "linear" }, // 60s rotation
                    scale: { type: "spring", stiffness: 80, damping: 20 },
                    x: { type: "spring", stiffness: 80, damping: 20 },
                    y: { type: "spring", stiffness: 80, damping: 20 }
                  }
                : { type: "spring", stiffness: 80, damping: 20 }
            }
            className={`w-full h-full ${viewMode === 'galaxy' ? 'absolute flex items-center justify-center' : 'contents'}`}
          >
            {galaxySkills.map((skill) => {
              const Icon = skill.icon;
              const isWarped = warpedSkill?.name === skill.name;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onClick={() => {
                    if (viewMode === 'galaxy') {
                      setWarpedSkill(isWarped ? null : { name: skill.name, x: skill.x, y: skill.y });
                      if (!isWarped) setTimeout(() => setActiveSkill(skill), 600);
                    } else {
                      setActiveSkill(skill);
                    }
                  }}
                  style={viewMode === 'galaxy' ? { position: 'absolute', x: skill.x, y: skill.y } : {}}
                  className={`group cursor-pointer p-6 rounded-2xl border transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl' : 'border-none'}`}
                >
                  {/* The Planet (Counter-Rotates) */}
                  <motion.div 
                    layout="position"
                    className="flex flex-col items-center"
                    animate={{ 
                      opacity: warpedSkill && !isWarped ? 0.3 : 1,
                      scale: isWarped ? 0.6 : 1,
                      rotate: viewMode === 'galaxy' && !warpedSkill ? -360 : 0 // Spin backward to stay upright
                    }}
                    transition={
                      viewMode === 'galaxy' && !warpedSkill
                        ? { rotate: { duration: 60, repeat: Infinity, ease: "linear" } }
                        : { type: "spring", stiffness: 200, damping: 25 }
                    }
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-lg"
                      style={{ backgroundColor: `${skill.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: skill.color }} />
                    </div>
                    {viewMode === 'grid' && (
                      <>
                        <h3 className="text-xl font-bold dark:text-white">{skill.name}</h3>
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full" style={{ backgroundColor: skill.color }}
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* 📄 Detail Modal */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => { setActiveSkill(null); setWarpedSkill(null); }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 rounded-2xl shadow-inner" style={{ backgroundColor: `${activeSkill.color}20` }}>
                  <activeSkill.icon className="w-12 h-12" style={{ color: activeSkill.color }} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{activeSkill.name}</h3>
                  <p className="text-blue-500 font-medium text-lg mt-1">{activeSkill.level}% Mastery</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg">{activeSkill.longDescription}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-gray-500 font-medium"><Clock size={18}/> Experience</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{activeSkill.years}+ Years</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-gray-500 font-medium"><Target size={18}/> Projects</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{activeSkill.projects}+ Apps</div>
                </div>
              </div>

              <button 
                onClick={() => { setActiveSkill(null); setWarpedSkill(null); }}
                className="mt-8 w-full py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white rounded-xl font-bold transition-colors shadow-lg"
              >
                Close Constellation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SkillsGalaxy;