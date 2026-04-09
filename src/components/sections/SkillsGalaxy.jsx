import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, Braces, 
  Terminal, Cpu, Layers,
  User, Github, Linkedin, Mail
} from 'lucide-react';

const GalaxySkills = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  // Sync window size for responsive orbit calculations
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;

  // Configuration for the "Planets"
  const skills = useMemo(() => [
    { name: 'React', level: 95, color: '#61DAFB', icon: Code2, orbit: isMobile ? 85 : 140, speed: 20 },
    { name: 'Tailwind', level: 92, color: '#38BDF8', icon: Layers, orbit: isMobile ? 125 : 210, speed: 28 },
    { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, orbit: isMobile ? 165 : 280, speed: 35 },
    { name: 'MySQL', level: 82, color: '#4479A1', icon: Database, orbit: isMobile ? 205 : 360, speed: 45 },
    { name: 'Git', level: 88, color: '#F05032', icon: Terminal, orbit: isMobile ? 245 : 440, speed: 60 },
    { name: 'Python', level: 75, color: '#3776AB', icon: Cpu, orbit: isMobile ? 285 : 520, speed: 80 },
  ], [isMobile]);

  return (
    <section className="relative h-screen w-full bg-[#020617] overflow-hidden flex items-center justify-center font-sans select-none">
      
      {/* 🌌 Deep Space Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black" />
        {/* Generates 100 random stars */}
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-30 animate-pulse"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }}
          />
        ))}
      </div>

      {/* 📡 HUD: Title & Info */}
      <div className="absolute top-10 left-10 z-50 pointer-events-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-6 bg-blue-500 rounded-full animate-pulse" />
          <h1 className="text-white font-black text-3xl md:text-5xl tracking-tighter">
            SKILL_GALAXY
          </h1>
        </div>
        <p className="text-blue-400/50 text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase pl-5">
          v2.0 // Neural Mapping Protocol
        </p>
      </div>

      {/* 🚀 Main Galaxy Viewport */}
      <div className="relative flex items-center justify-center w-full h-full">
        
        {/* 🌟 The Core (User Identity) */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative z-40 flex flex-col items-center justify-center"
        >
          {/* Outer Rings */}
          <div className="absolute w-40 h-40 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-48 h-48 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Central Sun Card */}
          <div className="group relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-slate-950 border-2 border-blue-500/50 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.4)] overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.3),transparent)]" 
            />
            <div className="z-10 flex flex-col items-center text-center">
              <User size={isMobile ? 24 : 32} className="text-white mb-1" />
              <span className="text-[10px] md:text-xs text-blue-400 font-black uppercase tracking-widest">
                Admin
              </span>
            </div>
          </div>
          
          {/* User Name Label */}
          <div className="mt-4 text-center">
            <h2 className="text-white font-bold text-sm md:text-lg tracking-widest uppercase">Alex Dev</h2>
            <div className="flex gap-2 justify-center mt-2">
              <Github size={14} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
              <Linkedin size={14} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
              <Mail size={14} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* 🛰️ Orbital Skill Nodes */}
        {skills.map((skill) => {
          const Icon = skill.icon;
          const isHovered = hoveredSkill === skill.name;

          return (
            <div key={skill.name} className="absolute flex items-center justify-center pointer-events-none">
              {/* Visible Orbit Path */}
              <div 
                className="absolute rounded-full border border-slate-800/40"
                style={{ width: skill.orbit * 2, height: skill.orbit * 2 }} 
              />

              {/* Individual Rotator */}
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
                {/* Planet Body Wrapper */}
                <div 
                  className="absolute pointer-events-auto"
                  style={{ 
                    top: '50%', 
                    left: `calc(50% + ${skill.orbit}px)`, 
                    transform: 'translate(-50%, -50%)' 
                  }}
                >
                  <motion.div
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => setActiveSkill(skill)}
                    whileHover={{ scale: 1.2 }}
                    className="relative cursor-pointer group flex flex-col items-center"
                  >
                    {/* The Icon Node */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                      style={{ 
                        animationPlayState: hoveredSkill ? 'paused' : 'running',
                        borderColor: isHovered ? skill.color : 'rgba(255,255,255,0.1)',
                        boxShadow: isHovered ? `0 0 20px ${skill.color}` : 'none'
                      }}
                      className="p-3 md:p-4 rounded-full bg-slate-900/90 backdrop-blur-sm border-2 transition-all duration-300 shadow-2xl"
                    >
                      <Icon size={isMobile ? 16 : 22} style={{ color: skill.color }} />
                    </motion.div>

                    {/* Skill Label - visible on mobile or hover */}
                    <AnimatePresence>
                      {(isHovered || isMobile) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute -bottom-8 md:-bottom-10 bg-slate-950/80 border border-white/10 px-2 py-1 rounded-md z-50 pointer-events-none"
                        >
                          <span className="text-[9px] md:text-[11px] font-bold text-white whitespace-nowrap tracking-widest uppercase">
                            {skill.name}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* 📑 Skill Insight Modal */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-blue-500/20 p-8 rounded-[2rem] max-w-sm w-full text-center relative shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-white/5 border border-white/10">
                <activeSkill.icon size={32} style={{ color: activeSkill.color }} />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter mb-1 uppercase">{activeSkill.name}</h3>
              <p className="text-slate-500 text-xs tracking-widest uppercase mb-8">System Analysis Complete</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Competency</span>
                  <span className="text-xl font-mono font-bold text-white">{activeSkill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${activeSkill.level}%` }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: activeSkill.color }}
                  />
                </div>
              </div>

              <button 
                onClick={() => setActiveSkill(null)}
                className="w-full py-4 bg-white text-black rounded-xl font-black text-sm uppercase tracking-tighter hover:bg-blue-400 transition-all"
              >
                Close Data Link
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖥️ Visual HUD Decorations */}
      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-end opacity-20 pointer-events-none">
        <div className="w-32 h-1 bg-white mb-2" />
        <div className="w-48 h-[1px] bg-white mb-6" />
        <p className="text-white text-[10px] font-mono">LATENCY: 12ms</p>
        <p className="text-white text-[10px] font-mono">STATUS: STABLE</p>
      </div>
    </section>
  );
};

export default GalaxySkills;