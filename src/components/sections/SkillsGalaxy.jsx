import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, Braces, 
  Terminal, Cpu, Layers 
} from 'lucide-react';

const SkillsGalaxy = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;

  const skills = useMemo(() => [
    { name: 'React', level: 95, color: '#61DAFB', icon: Code2, orbit: isMobile ? 80 : 120, speed: 15 },
    { name: 'Tailwind', level: 92, color: '#38BDF8', icon: Layers, orbit: isMobile ? 130 : 180, speed: 22 },
    { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, orbit: isMobile ? 180 : 250, speed: 30 },
    { name: 'MySQL', level: 82, color: '#4479A1', icon: Database, orbit: isMobile ? 230 : 330, speed: 40 },
    { name: 'Git', level: 88, color: '#F05032', icon: Terminal, orbit: isMobile ? 280 : 420, speed: 55 },
    { name: 'Python', level: 75, color: '#3776AB', icon: Cpu, orbit: isMobile ? 330 : 520, speed: 70 },
  ], [isMobile]);

  return (
    <section className="relative h-screen w-full bg-[#020617] overflow-hidden flex items-center justify-center font-sans">
      
      {/* 🌠 Procedural Starfield */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950" />
        {[...Array(80)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* 🚀 Galaxy Container */}
      <div className="relative flex items-center justify-center w-full h-full">
        
        {/* 🌟 The Sun (Core) */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative z-40 flex items-center justify-center"
        >
          <div className="absolute w-32 h-32 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-950 border border-blue-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            <div className="text-center">
              <div className="text-[10px] md:text-xs text-blue-400 font-bold tracking-widest uppercase">Expertise</div>
              <div className="text-white font-black text-sm md:text-xl leading-none tracking-tighter">CORE</div>
            </div>
          </div>
        </motion.div>

        {/* 🛰️ Orbits & Planets */}
        {skills.map((skill) => {
          const Icon = skill.icon;
          const isSelected = hoveredSkill === skill.name;

          return (
            <div key={skill.name} className="absolute flex items-center justify-center">
              {/* Orbit Path */}
              <div 
                className="absolute rounded-full border border-slate-800/50"
                style={{ width: skill.orbit * 2, height: skill.orbit * 2 }} 
              />

              {/* Orbital Motion */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: skill.speed, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                // This is the trick: pause when any skill is being hovered to focus
                style={{ 
                  width: skill.orbit * 2, 
                  height: skill.orbit * 2,
                  animationPlayState: hoveredSkill ? 'paused' : 'running'
                }}
                className="absolute"
              >
                {/* Planet Wrapper */}
                <div 
                  className="absolute"
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
                    className="relative cursor-pointer group"
                  >
                    {/* Reverse rotation for the icon so it stays upright */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                      style={{ animationPlayState: hoveredSkill ? 'paused' : 'running' }}
                      className="p-2 md:p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl transition-colors duration-300 group-hover:border-white/30"
                    >
                      <Icon 
                        size={isMobile ? 18 : 24} 
                        className="transition-transform duration-300"
                        style={{ color: skill.color }} 
                      />
                    </motion.div>

                    {/* Skill Name Tag */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-black whitespace-nowrap z-50"
                        >
                          {skill.name}
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

      {/* 📑 Skill Detail Modal */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 p-6 md:p-10 rounded-3xl max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: activeSkill.color }} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/5">
                  <activeSkill.icon size={32} style={{ color: activeSkill.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeSkill.name}</h3>
                  <p className="text-slate-400 text-sm">Technical Proficiency</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Mastery</span>
                  <span className="text-2xl font-mono font-bold text-white">{activeSkill.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${activeSkill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: activeSkill.color }}
                  />
                </div>
              </div>

              <button 
                onClick={() => setActiveSkill(null)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all active:scale-95"
              >
                Close Data Stream
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side HUD Labels */}
      <div className="absolute bottom-8 left-8 md:top-8 md:left-8 border-l border-blue-500/30 pl-4">
        <h2 className="text-white font-black text-lg tracking-tighter italic">SYSTEM_SCAN</h2>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em]">6 Active Modules Found</p>
      </div>
    </section>
  );
};

export default SkillsGalaxy;