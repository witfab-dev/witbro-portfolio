import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, Braces, 
  Terminal, Cpu, Layers
} from 'lucide-react';

// ✅ Ensure this path matches your Vite project structure
import profileImage from '../images/wit.png';

const GalaxySkills = () => {
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
  
  const responsiveScale = useMemo(() => {
    if (windowSize.width < 400) return 0.5; // Extra small devices
    if (isMobile) return 0.75;
    if (windowSize.height < 700) return 0.8;
    return 1;
  }, [windowSize.width, windowSize.height, isMobile]);

  const skills = useMemo(() => [
    { name: 'React', level: 95, color: '#61DAFB', icon: Code2, orbit: isMobile ? 85 : 130, speed: 20 },
    { name: 'Tailwind', level: 92, color: '#38BDF8', icon: Layers, orbit: isMobile ? 125 : 200, speed: 25 },
    { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, orbit: isMobile ? 165 : 280, speed: 32 },
    { name: 'MySQL', level: 82, color: '#4479A1', icon: Database, orbit: isMobile ? 205 : 370, speed: 42 },
    { name: 'Git', level: 88, color: '#F05032', icon: Terminal, orbit: isMobile ? 245 : 460, speed: 55 },
    { name: 'Python', level: 75, color: '#3776AB', icon: Cpu, orbit: isMobile ? 285 : 550, speed: 75 },
  ], [isMobile]);

  return (
    <section className="relative min-h-screen w-full bg-[#020617] overflow-hidden flex flex-col items-center justify-center py-10">
      
      {/* 🌠 Starfield */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-black" />
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
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

      {/* 🏷️ Header */}
      <div className="relative z-50 text-center mb-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-white font-black text-4xl md:text-6xl tracking-tighter mb-2">
            SKILLS GALAXY
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-2" />
          <p className="text-blue-400/60 text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase">
            Interactive Technical Orbitals
          </p>
        </motion.div>
      </div>

      {/* 🚀 Galaxy Container */}
      <div className="relative flex items-center justify-center w-full grow min-h-[500px]">
        <motion.div 
          style={{ scale: responsiveScale }}
          className="relative flex items-center justify-center"
        >
          {/* 🌟 Central Core */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative z-40 flex flex-col items-center justify-center"
          >
            <div className="absolute w-32 h-32 md:w-44 md:h-44 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-purple-600 shadow-[0_0_50px_rgba(59,130,246,0.4)]">
              <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden border-2 border-slate-950">
                <img 
                  src={profileImage} 
                  alt="Witness Fabrice" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* 🛰️ Orbital Planets */}
          {skills.map((skill) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkill === skill.name;

            return (
              <div key={skill.name} className="absolute flex items-center justify-center pointer-events-none">
                {/* Orbital Path Line */}
                <div 
                  className="absolute rounded-full border border-white/5"
                  style={{ width: skill.orbit * 2, height: skill.orbit * 2 }} 
                />
                
                {/* Rotating Wrapper */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                  style={{ 
                    width: skill.orbit * 2, 
                    height: skill.orbit * 2,
                    animationPlayState: hoveredSkill ? 'paused' : 'running',
                    willChange: 'transform'
                  }}
                  className="absolute"
                >
                  {/* Planet Item */}
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
                      whileTap={{ scale: 0.9 }}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                        style={{ 
                          animationPlayState: hoveredSkill ? 'paused' : 'running',
                          boxShadow: isHovered ? `0 0 30px ${skill.color}` : 'none',
                          borderColor: isHovered ? skill.color : 'rgba(255,255,255,0.1)'
                        }}
                        className="p-3 md:p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border-2 transition-all duration-300"
                      >
                        <Icon size={isMobile ? 18 : 24} style={{ color: skill.color }} />
                      </motion.div>
                      
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                        style={{ animationPlayState: hoveredSkill ? 'paused' : 'running' }}
                        className={`mt-2 transition-opacity duration-300 ${isHovered || isMobile ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
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
      </div>

      {/* 📑 Skill Detail Modal */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: activeSkill.color }} />
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-white/5">
                <activeSkill.icon size={32} style={{ color: activeSkill.color }} />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{activeSkill.name}</h3>
              
              <div className="my-8 space-y-4">
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                  <span>Proficiency</span>
                  <span>{activeSkill.level}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${activeSkill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full" 
                    style={{ backgroundColor: activeSkill.color }}
                  />
                </div>
              </div>

              <button 
                onClick={() => setActiveSkill(null)}
                className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Back to Galaxy
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalaxySkills;