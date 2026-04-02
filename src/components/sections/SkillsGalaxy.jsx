import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Server, Cloud, Database, Braces, 
  Terminal, Smartphone, Globe, Cpu, Layers, 
  CpuIcon, Workflow
} from 'lucide-react';

const SkillsGalaxy = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [screenSize, setScreenSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills = [
    // Core / Inner Planets (Fastest)
    { name: 'React', level: 95, color: '#61DAFB', icon: Code2, orbit: 140, speed: 20 },
    { name: 'Tailwind', level: 92, color: '#38BDF8', icon: Layers, orbit: 190, speed: 25 },
    { name: 'Node.js', level: 90, color: '#68A063', icon: Server, orbit: 250, speed: 30 },
    
    // Middle Planets
    { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, orbit: 320, speed: 45 },
    { name: 'Next.js', level: 85, color: '#ffffff', icon: Globe, orbit: 380, speed: 50 },
    { name: 'MySQL', level: 82, color: '#4479A1', icon: Database, orbit: 440, speed: 60 },
    
    // Outer Planets (Slowest)
    { name: 'Flutter', level: 80, color: '#02569B', icon: Smartphone, orbit: 510, speed: 80 },
    { name: 'Git/GitHub', level: 88, color: '#F05032', icon: Terminal, orbit: 580, speed: 95 },
    { name: 'Python', level: 75, color: '#3776AB', icon: Cpu, orbit: 650, speed: 110 },
    { name: 'EmailJS', level: 85, color: '#FFB13B', icon: Workflow, orbit: 720, speed: 130 },
  ];

  return (
    <section className="relative min-h-[900px] w-full bg-[#030712] overflow-hidden flex items-center justify-center">
      
      {/* 🌟 Central Sun (Your Brand) */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute z-20 flex flex-col items-center justify-center"
      >
        <div className="w-24 h-24 rounded-full bg-brand-primary/20 blur-2xl absolute" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
          <span className="text-white font-black text-xl">WIT</span>
        </div>
        <motion.p className="text-white/50 text-[10px] mt-4 tracking-[0.3em] uppercase font-bold">The Core</motion.p>
      </motion.div>

      {/* 🛰️ Orbital Tracks & Planets */}
      <div className="relative flex items-center justify-center w-full h-full">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          const isHovered = hoveredSkill === skill.name;

          return (
            <React.Fragment key={skill.name}>
              {/* The Visual Orbit Path */}
              <div 
                className="absolute rounded-full border border-white/5 pointer-events-none"
                style={{ 
                  width: skill.orbit * 2, 
                  height: skill.orbit * 2 
                }} 
              />

              {/* The Moving Planet Container */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: skill.speed, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute flex items-center justify-center"
                style={{ width: skill.orbit * 2, height: skill.orbit * 2 }}
              >
                {/* The Planet itself */}
                <motion.div
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setActiveSkill(skill)}
                  className="absolute cursor-pointer flex flex-col items-center"
                  style={{ left: `calc(50% + ${skill.orbit}px)`, transform: 'translateX(-50%)' }}
                >
                  {/* Skill Planet Body */}
                  <motion.div 
                    animate={{ rotate: -360 }} // Counter-rotate to keep icon upright
                    transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                    className="relative group"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg"
                      style={{ 
                        backgroundColor: `${skill.color}20`, 
                        borderColor: isHovered ? skill.color : 'rgba(255,255,255,0.1)',
                        boxShadow: isHovered ? `0 0 20px ${skill.color}` : 'none'
                      }}
                    >
                      <Icon size={18} style={{ color: skill.color }} />
                    </div>

                    {/* Skill Name Label (Shows on Hover) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-slate-900 px-3 py-1 rounded-md border border-white/10 shadow-xl z-50"
                        >
                          <p className="text-xs font-bold text-white">{skill.name}</p>
                          <div className="w-full h-1 bg-gray-800 rounded-full mt-1">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${skill.level}%` }} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      {/* 📑 Detail Modal (Same as before but cleaner) */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${activeSkill.color}20` }}>
                <activeSkill.icon size={40} style={{ color: activeSkill.color }} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{activeSkill.name}</h3>
              <p className="text-blue-400 font-mono mb-6">{activeSkill.level}% Field Mastery</p>
              <button 
                onClick={() => setActiveSkill(null)}
                className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Exit Orbit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-10 left-10 text-white/30 text-xs font-mono uppercase tracking-widest">
        Click a planet to inspect • Hover to identify
      </div>
    </section>
  );
};

export default SkillsGalaxy;