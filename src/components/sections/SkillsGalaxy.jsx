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

  // 📐 Auto-scaling logic to fit the whole galaxy on any screen
  const galaxyScale = useMemo(() => {
    const minDimension = Math.min(screenSize.width, screenSize.height);
    if (screenSize.width < 640) return minDimension / 900; // Mobile
    return minDimension / 1100; // Desktop
  }, [screenSize.width, screenSize.height]);

  const skills = [
    { name: 'React', level: 95, color: '#61DAFB', icon: Code2, orbit: 120, speed: 15 },
    { name: 'Tailwind', level: 92, color: '#38BDF8', icon: Layers, orbit: 170, speed: 20 },
    { name: 'Node.js', level: 90, color: '#68A063', icon: Server, orbit: 230, speed: 25 },
    { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, orbit: 290, speed: 35 },
    { name: 'Next.js', level: 85, color: '#ffffff', icon: Globe, orbit: 350, speed: 40 },
    { name: 'MySQL', level: 82, color: '#4479A1', icon: Database, orbit: 410, speed: 50 },
    { name: 'Flutter', level: 80, color: '#02569B', icon: Smartphone, orbit: 480, speed: 65 },
    { name: 'Git', level: 88, color: '#F05032', icon: Terminal, orbit: 540, speed: 80 },
    { name: 'Python', level: 75, color: '#3776AB', icon: Cpu, orbit: 600, speed: 100 },
    { name: 'EmailJS', level: 85, color: '#FFB13B', icon: Workflow, orbit: 660, speed: 120 },
  ];

  return (
    <section className="relative h-screen w-full bg-[#030712] overflow-hidden flex items-center justify-center">
      
      {/* 🌠 Background Ambient Stars */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* 🚀 Scalable Galaxy Container */}
      <motion.div 
        style={{ scale: galaxyScale }}
        className="relative flex items-center justify-center w-full h-full transition-transform duration-500"
      >
        {/* 🌟 The Sun (Central Brand) */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: 360 }}
          transition={{ scale: { duration: 4, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
          className="absolute z-50 flex items-center justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-blue-500/10 blur-3xl absolute" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center border-2 border-white/20 shadow-[0_0_60px_rgba(59,130,246,0.4)]">
            <span className="text-white font-black text-2xl tracking-tighter">WIT</span>
          </div>
        </motion.div>

        {/* 🛰️ Orbits & Planets */}
        {skills.map((skill) => {
          const Icon = skill.icon;
          const isHovered = hoveredSkill === skill.name;

          return (
            <React.Fragment key={skill.name}>
              {/* Orbit Line */}
              <div 
                className="absolute rounded-full border border-white/5 pointer-events-none"
                style={{ width: skill.orbit * 2, height: skill.orbit * 2 }} 
              />

              {/* Rotator */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                className="absolute flex items-center justify-center"
                style={{ width: skill.orbit * 2, height: skill.orbit * 2 }}
              >
                {/* Planet Wrapper */}
                <div 
                  className="absolute"
                  style={{ left: `calc(50% + ${skill.orbit}px)`, transform: 'translateX(-50%)' }}
                >
                  <motion.div
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => setActiveSkill(skill)}
                    className="relative flex flex-col items-center group cursor-pointer"
                  >
                    {/* The Planet Body */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                      className="p-3 rounded-full bg-slate-900 border-2 transition-all duration-300 shadow-xl"
                      style={{ 
                        borderColor: isHovered ? skill.color : 'rgba(255,255,255,0.1)',
                        boxShadow: isHovered ? `0 0 25px ${skill.color}` : 'none'
                      }}
                    >
                      <Icon size={20} style={{ color: skill.color }} />
                    </motion.div>

                    {/* Permanent Label (Small) */}
                    <motion.span 
                      animate={{ rotate: -360 }}
                      transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                      className="absolute -bottom-6 text-[10px] font-bold text-white/30 uppercase tracking-widest group-hover:text-white transition-colors"
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </motion.div>

      {/* 📑 Minimalist Info Overlay */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${activeSkill.color}20` }}>
                <activeSkill.icon size={32} style={{ color: activeSkill.color }} />
              </div>
              <h3 className="text-2xl font-bold text-white">{activeSkill.name}</h3>
              <div className="my-6 space-y-2">
                <div className="flex justify-between text-xs text-gray-400 uppercase tracking-tighter">
                  <span>Proficiency</span>
                  <span>{activeSkill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${activeSkill.level}%` }}
                    className="h-full bg-blue-500" 
                  />
                </div>
              </div>
              <button 
                onClick={() => setActiveSkill(null)}
                className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Return to Mission
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static Labels */}
      <div className="absolute top-10 left-10 hidden md:block">
        <h2 className="text-white font-bold text-xl tracking-tighter">TECH_SOLAR_SYSTEM</h2>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Mapping Mastery across the void</p>
      </div>
    </section>
  );
};

export default SkillsGalaxy;