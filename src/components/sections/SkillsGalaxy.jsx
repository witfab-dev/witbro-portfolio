import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, Braces, Terminal, Cpu, Layers, 
  Zap, Palette, Box, Globe, ChevronLeft, Layout, 
  ShieldCheck, Smartphone
} from 'lucide-react';

const GalaxySkills = () => {
  const [activeCategory, setActiveCategory] = useState(null);
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

  // 🛰️ Complete Technical Matrix
  const skillsData = useMemo(() => ({
    frontend: [
      { name: 'Vue.js', level: 90, color: '#42b883', icon: Layout, orbit: isMobile ? 80 : 130, speed: 20 },
      { name: 'React', level: 95, color: '#61DAFB', icon: Code2, orbit: isMobile ? 110 : 190, speed: 24 },
      { name: 'Tailwind', level: 92, color: '#38BDF8', icon: Layers, orbit: isMobile ? 140 : 250, speed: 28 },
      { name: 'Bootstrap', level: 85, color: '#7952b3', icon: Box, orbit: isMobile ? 170 : 310, speed: 32 },
    ],
    backend: [
      { name: 'Node.js', level: 90, color: '#68A063', icon: Zap, orbit: isMobile ? 80 : 140, speed: 22 },
      { name: 'Laravel', level: 88, color: '#FF2D20', icon: Globe, orbit: isMobile ? 110 : 210, speed: 26 },
      { name: 'MySQL', level: 85, color: '#4479A1', icon: Database, orbit: isMobile ? 140 : 280, speed: 30 },
      { name: 'MongoDB', level: 82, color: '#47A248', icon: Database, orbit: isMobile ? 170 : 350, speed: 34 },
    ],
    languages: [
      { name: 'JavaScript', level: 96, color: '#F7DF1E', icon: Braces, orbit: isMobile ? 80 : 150, speed: 18 },
      { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, orbit: isMobile ? 110 : 220, speed: 22 },
      { name: 'PHP', level: 85, color: '#777BB4', icon: Braces, orbit: isMobile ? 140 : 290, speed: 26 },
      { name: 'Dart', level: 80, color: '#0175C2', icon: Smartphone, orbit: isMobile ? 170 : 360, speed: 30 },
    ],
    infrastructure: [
      { name: 'Git', level: 88, color: '#F05032', icon: Terminal, orbit: isMobile ? 80 : 160, speed: 25 },
      { name: 'Python', level: 75, color: '#3776AB', icon: Cpu, orbit: isMobile ? 120 : 260, speed: 32 },
      { name: 'Figma', level: 82, color: '#F24E1E', icon: Palette, orbit: isMobile ? 160 : 360, speed: 40 },
    ]
  }), [isMobile]);

  const visibleSkills = activeCategory ? skillsData[activeCategory] : [];

  return (
    <section className="relative min-h-screen w-full bg-[#020617] overflow-hidden flex flex-col items-center justify-center py-20 font-sans">
      
      {/* 🌠 Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_80%)] opacity-50" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      {/* 🏷️ Header */}
      <div className="relative z-50 text-center mb-20 px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-blue-500 font-mono text-[10px] tracking-[0.7em] uppercase mb-4">
            Witness_OS :: Neural_Network
          </h2>
          <h1 className="text-white font-black text-5xl md:text-8xl tracking-tighter uppercase italic leading-tight">
            Technical Galaxy
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-6" />
        </motion.div>
      </div>

      {/* 🚀 Galaxy Interaction Area */}
      <div className="relative flex items-center justify-center w-full grow min-h-[600px]">
        
        {/* CATEGORY MENU */}
        {!activeCategory && (
          <div className="absolute z-50 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(skillsData).map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className="group relative px-12 py-6 bg-slate-900/30 backdrop-blur-3xl border border-white/5 rounded-3xl text-white font-bold uppercase tracking-[0.4em] text-[10px]"
              >
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                Init_{cat}_Subroutine
              </motion.button>
            ))}
          </div>
        )}

        {/* ORBIT SYSTEM */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex items-center justify-center"
            >
              {/* Back Button */}
              <motion.button 
                onClick={() => setActiveCategory(null)}
                className="absolute -top-[350px] md:-top-[420px] z-50 flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase text-[9px] font-black tracking-[0.3em] bg-slate-900/80 px-6 py-2.5 rounded-full border border-white/10"
              >
                <ChevronLeft size={14} /> System_Root
              </motion.button>

              {/* 🌟 CENTRAL REACTOR CORE */}
              <div className="relative z-40 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute w-40 h-40 md:w-64 md:h-64 rounded-full bg-blue-500/10 blur-3xl"
                />
                <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 shadow-[0_0_80px_rgba(59,130,246,0.3)]">
                  <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center border-4 border-[#020617] relative overflow-hidden">
                    <motion.div
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="relative z-10"
                    >
                      <Code2 size={isMobile ? 40 : 64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    </motion.div>
                    <motion.div 
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute w-full h-[2px] bg-blue-400/30 z-20"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-14 whitespace-nowrap text-center">
                  <div className="text-blue-500 font-mono text-[9px] font-black tracking-[0.5em] uppercase mb-1">
                    Status: {activeCategory}_Linked
                  </div>
                  <div className="h-0.5 w-12 bg-blue-600/30 mx-auto" />
                </div>
              </div>

              {/* ORBITAL PLANETS */}
              {visibleSkills.map((skill) => {
                const SkillIcon = skill.icon;
                return (
                  <div key={skill.name} className="absolute flex items-center justify-center pointer-events-none">
                    <div 
                      className="absolute rounded-full border border-blue-500/5 shadow-[inset_0_0_20px_rgba(59,130,246,0.02)]" 
                      style={{ width: skill.orbit * 2, height: skill.orbit * 2 }} 
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                      style={{ 
                        width: skill.orbit * 2, 
                        height: skill.orbit * 2,
                        animationPlayState: hoveredSkill ? 'paused' : 'running'
                      }}
                      className="absolute"
                    >
                      <div 
                        className="absolute pointer-events-auto"
                        style={{ top: '50%', left: `calc(50% + ${skill.orbit}px)`, transform: 'translate(-50%, -50%)' }}
                      >
                        <motion.div
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          onClick={() => setActiveSkill(skill)}
                          className="flex flex-col items-center group cursor-pointer"
                        >
                          {/* Counter-Rotating Icon */}
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                            style={{ 
                              animationPlayState: hoveredSkill ? 'paused' : 'running',
                              borderColor: hoveredSkill === skill.name ? skill.color : 'rgba(255,255,255,0.05)',
                              boxShadow: hoveredSkill === skill.name ? `0_0_30px_${skill.color}66` : 'none'
                            }}
                            className="p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border-2 transition-all duration-500"
                          >
                            <SkillIcon size={isMobile ? 18 : 26} style={{ color: skill.color }} />
                          </motion.div>

                          {/* Upright HUD Label */}
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                            style={{ animationPlayState: hoveredSkill ? 'paused' : 'running' }}
                            className="absolute -bottom-12 whitespace-nowrap flex flex-col items-center"
                          >
                            <div className={`h-3 w-[1px] bg-blue-500/30 mb-1 transition-opacity ${hoveredSkill === skill.name ? 'opacity-100' : 'opacity-0'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-lg border transition-all duration-300 ${hoveredSkill === skill.name ? 'text-white border-blue-500 bg-blue-600/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-slate-500 border-transparent opacity-40'}`}>
                              {skill.name}
                            </span>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/80 border border-white/5 p-12 rounded-[3.5rem] max-w-sm w-full text-center shadow-3xl"
            >
              <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <activeSkill.icon size={48} style={{ color: activeSkill.color }} />
              </div>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{activeSkill.name}</h3>
              <p className="text-blue-500 font-mono text-[9px] tracking-[0.5em] uppercase mb-10">Neural Compatibility</p>
              
              <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden mb-12">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${activeSkill.level}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-blue-500 shadow-[0_0_20px_#3b82f6]"
                />
              </div>

              <button 
                onClick={() => setActiveSkill(null)}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-xl hover:shadow-blue-500/20"
              >
                Close_Data_Stream
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalaxySkills;