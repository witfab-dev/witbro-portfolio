import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, Braces, Terminal, Cpu, Layers, 
  Zap, Palette, Box, Globe, ChevronLeft
} from 'lucide-react';

import profileImage from '../images/wit.png';

const GalaxySkills = () => {
  const [activeCategory, setActiveCategory] = useState(null); // Filter state
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;

  // 4 Main Professional Categories
  const skillsData = useMemo(() => ({
    frontend: [
      { name: 'Vue.js', level: 90, color: '#42b883', icon: Code2, orbit: isMobile ? 85 : 130, speed: 20 },
      { name: 'React', level: 95, color: '#61DAFB', icon: Code2, orbit: isMobile ? 125 : 200, speed: 25 },
      { name: 'Bootstrap', level: 85, color: '#7952b3', icon: Layers, orbit: isMobile ? 165 : 280, speed: 30 },
      { name: 'Tailwind', level: 92, color: '#38BDF8', icon: Layers, orbit: isMobile ? 205 : 360, speed: 35 },
    ],
    backend: [
      { name: 'Node.js', level: 90, color: '#68A063', icon: Zap, orbit: isMobile ? 85 : 150, speed: 20 },
      { name: 'Laravel', level: 88, color: '#FF2D20', icon: Database, orbit: isMobile ? 125 : 230, speed: 25 },
      { name: 'MongoDB', level: 82, color: '#47A248', icon: Database, orbit: isMobile ? 165 : 310, speed: 30 },
      { name: 'MySQL', level: 85, color: '#4479A1', icon: Database, orbit: isMobile ? 205 : 390, speed: 35 },
    ],
    languages: [
      { name: 'JavaScript', level: 96, color: '#F7DF1E', icon: Braces, orbit: isMobile ? 85 : 140, speed: 18 },
      { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, orbit: isMobile ? 125 : 220, speed: 22 },
      { name: 'PHP', level: 85, color: '#777BB4', icon: Braces, orbit: isMobile ? 165 : 300, speed: 26 },
      { name: 'Dart', level: 80, color: '#0175C2', icon: Braces, orbit: isMobile ? 205 : 380, speed: 30 },
    ],
    tools: [
      { name: 'Git', level: 88, color: '#F05032', icon: Terminal, orbit: isMobile ? 85 : 160, speed: 25 },
      { name: 'Python', level: 75, color: '#3776AB', icon: Cpu, orbit: isMobile ? 125 : 250, speed: 30 },
      { name: 'Figma', level: 80, color: '#F24E1E', icon: Palette, orbit: isMobile ? 165 : 340, speed: 35 },
    ]
  }), [isMobile]);

  // Determine which skills to render based on selection
  const visibleSkills = activeCategory ? skillsData[activeCategory] : [];

  return (
    <section className="relative min-h-screen w-full bg-[#020617] overflow-hidden flex flex-col items-center justify-center py-20 font-sans">
      
      {/* 🌠 Starfield Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_70%)]" />
      </div>

      {/* 🏷️ Header Section */}
      <div className="relative z-50 text-center mb-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase mb-2">Technical Vision</h2>
          <h1 className="text-white font-black text-5xl md:text-7xl tracking-tighter uppercase italic">
            Skills Galaxy
          </h1>
        </motion.div>
      </div>

      {/* 🚀 Galaxy Container */}
      <div className="relative flex items-center justify-center w-full grow h-[600px]">
        
        {/* Category Menu (Shown when no category is selected) */}
        {!activeCategory && (
          <div className="absolute z-50 grid grid-cols-2 gap-4">
            {Object.keys(skillsData).map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className="px-8 py-4 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest text-[10px] hover:border-blue-500 transition-colors"
              >
                Explore {cat}
              </motion.button>
            ))}
          </div>
        )}

        {/* Orbit System (Visible when category selected) */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative flex items-center justify-center"
            >
              {/* Back Button */}
              <button 
                onClick={() => setActiveCategory(null)}
                className="absolute -top-64 md:-top-80 z-50 flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest"
              >
                <ChevronLeft size={14} /> Back to Core
              </button>

              {/* Central Identity Core */}
              <div className="relative z-40 w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-purple-600 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden">
                  <img src={profileImage} alt="Core" className="w-full h-full object-cover grayscale opacity-50" />
                </div>
              </div>

              {/* Orbital Planets */}
              {visibleSkills.map((skill) => (
                <div key={skill.name} className="absolute flex items-center justify-center">
                  <div className="absolute rounded-full border border-white/5" style={{ width: skill.orbit * 2, height: skill.orbit * 2 }} />
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                    style={{ width: skill.orbit * 2, height: skill.orbit * 2 }}
                    className="absolute"
                  >
                    <div 
                      className="absolute cursor-pointer"
                      style={{ top: '50%', left: `calc(50% + ${skill.orbit}px)`, transform: 'translate(-50%, -50%)' }}
                      onClick={() => setActiveSkill(skill)}
                    >
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                        className="p-3 md:p-4 rounded-xl bg-slate-900 border border-white/10 shadow-lg hover:border-blue-500 transition-colors"
                      >
                        <skill.icon size={20} style={{ color: skill.color }} />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 📑 Detailed Skill Modal */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-white/5">
                <activeSkill.icon size={32} style={{ color: activeSkill.color }} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase">{activeSkill.name}</h3>
              <div className="my-8">
                <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold mb-2">
                  <span>Efficiency</span>
                  <span>{activeSkill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${activeSkill.level}%` }} className="h-full bg-blue-500" />
                </div>
              </div>
              <button onClick={() => setActiveSkill(null)} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em]">Close System</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalaxySkills;