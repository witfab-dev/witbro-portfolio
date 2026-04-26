import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, Braces, Terminal, Cpu, Layers, 
  Zap, Palette, Box, Globe, ChevronLeft, Layout, 
  Smartphone, Activity, Shield 
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

  const skillsData = useMemo(() => ({
    frontend: {
      label: "Launch Frontend Interface",
      items: [
        { name: 'Vue.js', level: 90, color: '#42b883', icon: Layout, orbit: isMobile ? 80 : 130, speed: 20 },
        { name: 'React', level: 95, color: '#61DAFB', icon: Code2, orbit: isMobile ? 110 : 190, speed: 24 },
        { name: 'Tailwind', level: 92, color: '#38BDF8', icon: Layers, orbit: isMobile ? 140 : 250, speed: 28 },
        { name: 'Bootstrap', level: 85, color: '#7952b3', icon: Box, orbit: isMobile ? 170 : 310, speed: 32 },
      ]
    },
    backend: {
      label: "Explore Backend Architecture",
      items: [
        { name: 'Node.js', level: 90, color: '#68A063', icon: Zap, orbit: isMobile ? 80 : 140, speed: 22 },
        { name: 'Laravel', level: 88, color: '#FF2D20', icon: Globe, orbit: isMobile ? 110 : 210, speed: 26 },
        { name: 'MySQL', level: 85, color: '#4479A1', icon: Database, orbit: isMobile ? 140 : 280, speed: 30 },
        { name: 'MongoDB', level: 82, color: '#47A248', icon: Database, orbit: isMobile ? 170 : 350, speed: 34 },
      ]
    },
    languages: {
      label: "Execute Core Languages",
      items: [
        { name: 'JavaScript', level: 96, color: '#F7DF1E', icon: Braces, orbit: isMobile ? 80 : 150, speed: 18 },
        { name: 'TypeScript', level: 88, color: '#3178C6', icon: Braces, orbit: isMobile ? 110 : 220, speed: 22 },
        { name: 'PHP', level: 85, color: '#777BB4', icon: Braces, orbit: isMobile ? 140 : 290, speed: 26 },
        { name: 'Dart', level: 80, color: '#0175C2', icon: Smartphone, orbit: isMobile ? 170 : 360, speed: 30 },
      ]
    },
    infrastructure: {
      label: "Review System Infrastructure",
      items: [
        { name: 'Git', level: 88, color: '#F05032', icon: Terminal, orbit: isMobile ? 80 : 160, speed: 25 },
        { name: 'Python', level: 75, color: '#3776AB', icon: Cpu, orbit: isMobile ? 120 : 260, speed: 32 },
        { name: 'Figma', level: 82, color: '#F24E1E', icon: Palette, orbit: isMobile ? 160 : 360, speed: 40 },
      ]
    }
  }), [isMobile]);

  const visibleSkills = activeCategory ? skillsData[activeCategory].items : [];

  return (
    <section className="relative min-h-screen w-full bg-[#030712] overflow-hidden flex flex-col items-center justify-center py-20 font-sans">
      
      {/* 🌠 Background Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#030712_80%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      {/* 🏷️ Header */}
      <div className="relative z-50 text-center mb-16 px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-2 mb-3">
             <Activity size={12} className="text-blue-500 animate-pulse" />
             <span className="text-[10px] text-blue-500 font-black tracking-[0.5em] uppercase">Neural_Network_Active</span>
          </div>
          <h1 className="text-white font-black text-6xl md:text-8xl tracking-tighter uppercase italic leading-none">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Galaxy</span>
          </h1>
        </motion.div>
      </div>

      {/* 🚀 Galaxy Interface */}
      <div className="relative flex items-center justify-center w-full grow min-h-[600px]">
        
        {/* CATEGORY MENU */}
        {!activeCategory && (
          <div className="absolute z-50 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-6">
            {Object.entries(skillsData).map(([key, data], idx) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: idx * 0.1 } }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.4)' }}
                onClick={() => setActiveCategory(key)}
                className="group relative flex items-center justify-between p-8 bg-slate-900/30 backdrop-blur-2xl border border-white/5 rounded-3xl text-left transition-all hover:border-blue-500/30"
              >
                <div className="flex flex-col">
                  <span className="text-blue-500 font-mono text-[9px] font-black tracking-[0.3em] uppercase mb-1">Module_0{idx + 1}</span>
                  <span className="text-white font-bold text-xl uppercase tracking-tighter italic">{data.label}</span>
                </div>
                <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <ChevronLeft className="rotate-180 text-white" size={16} />
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* ORBIT SYSTEM */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              className="relative flex items-center justify-center"
            >
              {/* Back Button */}
              <button 
                onClick={() => setActiveCategory(null)}
                className="absolute -top-[350px] z-50 text-slate-500 hover:text-white uppercase text-[9px] font-black tracking-widest flex items-center gap-2 bg-slate-900/50 px-6 py-2 rounded-full border border-white/5"
              >
                <ChevronLeft size={14} /> Back_to_Root
              </button>

              {/* Central Core (Reactor) */}
              <div className="relative z-40 w-32 h-32 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 shadow-[0_0_80px_rgba(59,130,246,0.3)]">
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center relative overflow-hidden group">
                   <Shield size={isMobile ? 30 : 50} className="text-white animate-pulse opacity-20 absolute" />
                   <Code2 size={isMobile ? 40 : 60} className="text-white relative z-10" />
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-2 border border-dashed border-blue-500/20 rounded-full" 
                   />
                </div>
              </div>

              {/* Orbiting Icons */}
              {visibleSkills.map((skill) => (
                <div key={skill.name} className="absolute flex items-center justify-center pointer-events-none">
                  <div className="absolute rounded-full border border-blue-500/10" style={{ width: skill.orbit * 2, height: skill.orbit * 2 }} />
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                    style={{ width: skill.orbit * 2, height: skill.orbit * 2, animationPlayState: hoveredSkill ? 'paused' : 'running' }}
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
                        {/* ICON BOX */}
                        <motion.div 
                          animate={{ rotate: -360 }}
                          transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                          style={{ 
                            animationPlayState: hoveredSkill ? 'paused' : 'running',
                            borderColor: hoveredSkill === skill.name ? skill.color : 'rgba(255,255,255,0.05)',
                            boxShadow: hoveredSkill === skill.name ? `0 0 20px ${skill.color}44` : 'none'
                          }}
                          className="relative p-4 rounded-2xl bg-slate-900 border-2 transition-all duration-300"
                        >
                          <skill.icon size={isMobile ? 18 : 24} style={{ color: skill.color }} />
                        </motion.div>

                        {/* HUD LABEL (Stays Horizontal) */}
                        <motion.div 
                          animate={{ rotate: -360 }}
                          transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                          style={{ animationPlayState: hoveredSkill ? 'paused' : 'running' }}
                          className="absolute -bottom-10 whitespace-nowrap"
                        >
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded transition-all duration-300 ${hoveredSkill === skill.name ? 'text-white border-blue-500 bg-blue-600/20 border' : 'text-slate-500 opacity-40'}`}>
                            {skill.name}
                          </span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 📑 Skill Detail Modal */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-xl"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/5 p-12 rounded-[3.5rem] max-w-sm w-full text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10">
                <activeSkill.icon size={40} style={{ color: activeSkill.color }} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-8">{activeSkill.name}</h3>
              
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-12">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${activeSkill.level}%` }}
                  className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                />
              </div>

              <button onClick={() => setActiveSkill(null)} className="w-full py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em]">De-Initialize</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalaxySkills;