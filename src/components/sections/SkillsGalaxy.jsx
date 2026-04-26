import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ChevronLeft, Activity, Sparkles } from 'lucide-react';

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
      label: "Initialize Frontend Interface",
      description: "Crafting immersive, high-performance user environments.",
      items: [
        { name: 'Vue.js', level: 90, color: '#42b883', img: 'http://googleusercontent.com/image_collection/image_retrieval/4192764351770236833_0', orbit: isMobile ? 80 : 130, speed: 20 },
        { name: 'React', level: 95, color: '#61DAFB', img: 'http://googleusercontent.com/image_collection/image_retrieval/650359149339702216_0', orbit: isMobile ? 110 : 190, speed: 24 },
        { name: 'Tailwind', level: 92, color: '#38BDF8', img: 'http://googleusercontent.com/image_collection/image_retrieval/17997745332195855202_0', orbit: isMobile ? 140 : 250, speed: 28 },
      ]
    },
    backend: {
      label: "Access Backend Architecture",
      description: "Building robust, scalable server-side logic and databases.",
      items: [
        { name: 'Node.js', level: 90, color: '#68A063', img: 'http://googleusercontent.com/image_collection/image_retrieval/4789381693507728_0', orbit: isMobile ? 80 : 140, speed: 22 },
        { name: 'Laravel', level: 88, color: '#FF2D20', img: 'http://googleusercontent.com/image_collection/image_retrieval/8150841565510209824_0', orbit: isMobile ? 110 : 210, speed: 26 },
        { name: 'MySQL', level: 85, color: '#4479A1', img: 'http://googleusercontent.com/image_collection/image_retrieval/5347112021448280178_0', orbit: isMobile ? 140 : 280, speed: 30 },
        { name: 'MongoDB', level: 82, color: '#47A248', img: 'http://googleusercontent.com/image_collection/image_retrieval/2941319852247220788_0', orbit: isMobile ? 170 : 350, speed: 34 },
      ]
    },
    languages: {
      label: "Execute Core Languages",
      description: "Leveraging polyglot capabilities for complex problem solving.",
      items: [
        { name: 'JavaScript', level: 96, color: '#F7DF1E', img: 'http://googleusercontent.com/image_collection/image_retrieval/9336706257396307114_0', orbit: isMobile ? 80 : 150, speed: 18 },
        { name: 'TypeScript', level: 88, color: '#3178C6', img: 'http://googleusercontent.com/image_collection/image_retrieval/5024344040187068380_0', orbit: isMobile ? 110 : 220, speed: 22 },
        { name: 'PHP', level: 85, color: '#777BB4', img: 'http://googleusercontent.com/image_collection/image_retrieval/7636507936204711359_0', orbit: isMobile ? 140 : 290, speed: 26 },
        { name: 'Dart', level: 80, color: '#0175C2', img: 'http://googleusercontent.com/image_collection/image_retrieval/3927435606064658185_0', orbit: isMobile ? 170 : 360, speed: 30 },
      ]
    },
    infrastructure: {
      label: "Scan System Infrastructure",
      description: "Ensuring version control, design precision, and logic efficiency.",
      items: [
        { name: 'Git', level: 88, color: '#F05032', img: 'http://googleusercontent.com/image_collection/image_retrieval/8060082872374633787_0', orbit: isMobile ? 80 : 160, speed: 25 },
        { name: 'Python', level: 75, color: '#3776AB', img: 'http://googleusercontent.com/image_collection/image_retrieval/17974534221790964099_0', orbit: isMobile ? 120 : 260, speed: 32 },
        { name: 'Figma', level: 82, color: '#F24E1E', img: 'http://googleusercontent.com/image_collection/image_retrieval/11624362302728015001_0', orbit: isMobile ? 160 : 360, speed: 40 },
      ]
    }
  }), [isMobile]);

  const visibleSkills = activeCategory ? skillsData[activeCategory].items : [];

  return (
    <section className="relative min-h-screen w-full bg-[#030712] overflow-hidden flex flex-col items-center justify-center py-20">
      
      {/* 🌌 Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#030712_80%)] opacity-60" />
      </div>

      {/* 🏷️ Header */}
      <div className="relative z-50 text-center mb-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-2 mb-4">
             <Activity size={14} className="text-blue-500 animate-pulse" />
             <span className="text-[10px] text-blue-500 font-black tracking-[0.6em] uppercase">Technical_Ecosystem</span>
          </div>
          <h1 className="text-white font-black text-6xl md:text-9xl tracking-tighter uppercase italic">
            Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Galaxy</span>
          </h1>
        </motion.div>
      </div>

      {/* 🚀 Galaxy Interaction Area */}
      <div className="relative flex items-center justify-center w-full grow min-h-[600px]">
        
        {!activeCategory ? (
          <div className="absolute z-50 flex flex-col gap-6 w-full max-w-xl px-6">
            {Object.entries(skillsData).map(([key, data], idx) => (
              <motion.button
                key={key}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: idx * 0.1 } }}
                whileHover={{ x: 20, backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
                onClick={() => setActiveCategory(key)}
                className="group relative flex items-center gap-6 p-8 bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] text-left transition-all"
              >
                <div className="text-4xl font-black text-white/5 group-hover:text-blue-500/20">0{idx + 1}</div>
                <div className="flex flex-col grow">
                  <span className="text-white font-black text-2xl uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{data.label}</span>
                  <p className="text-slate-500 text-xs font-medium">{data.description}</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                  <ChevronLeft className="rotate-180 text-white" size={20} />
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex items-center justify-center">
            {/* Back Navigation */}
            <button 
              onClick={() => setActiveCategory(null)}
              className="absolute -top-80 z-[60] text-slate-500 hover:text-white uppercase text-[10px] font-black tracking-widest flex items-center gap-2"
            >
              <ChevronLeft size={14} /> Back to Core_System
            </button>

            {/* Central Reactor */}
            <div className="relative z-40 w-32 h-32 md:w-48 md:h-48 rounded-full p-2 bg-gradient-to-tr from-blue-600 to-purple-600 shadow-[0_0_80px_rgba(59,130,246,0.3)]">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center relative overflow-hidden">
                <Code2 size={60} className="text-white animate-pulse" />
              </div>
            </div>

            {/* ORBITAL SKILLS WITH REAL IMAGES */}
            {visibleSkills.map((skill) => (
              <div key={skill.name} className="absolute flex items-center justify-center pointer-events-none">
                <div className="absolute rounded-full border border-blue-500/5 shadow-[inset_0_0_20px_rgba(59,130,246,0.02)]" style={{ width: skill.orbit * 2, height: skill.orbit * 2 }} />
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
                      {/* REAL LOGO IMAGE BOX */}
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                        style={{ 
                          animationPlayState: hoveredSkill ? 'paused' : 'running',
                          boxShadow: hoveredSkill === skill.name ? `0 0 30px ${skill.color}55` : 'none',
                          borderColor: hoveredSkill === skill.name ? skill.color : 'rgba(255,255,255,0.05)'
                        }}
                        className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-slate-900 border-2 transition-all duration-300 p-3"
                      >
                        <img 
                          src={skill.img} 
                          alt={skill.name} 
                          className="w-full h-full object-contain filter group-hover:brightness-125 transition-all"
                        />
                      </motion.div>

                      {/* HUD LABEL */}
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: skill.speed, repeat: Infinity, ease: "linear" }}
                        style={{ animationPlayState: hoveredSkill ? 'paused' : 'running' }}
                        className="absolute -bottom-10 whitespace-nowrap"
                      >
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded transition-all duration-300 ${hoveredSkill === skill.name ? 'text-white border-blue-500 bg-blue-600/20' : 'text-slate-500 opacity-40'}`}>
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
      </div>

      {/* 📑 DETAIL MODAL */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/5 p-12 rounded-[4rem] max-w-sm w-full text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 bg-white/5 p-4 border border-white/10 shadow-2xl">
                <img src={activeSkill.img} alt={activeSkill.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">{activeSkill.name}</h3>
              <p className="text-blue-500 font-mono text-[9px] tracking-[0.5em] uppercase mb-10">Neural Compatibility: {activeSkill.level}%</p>
              
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-12">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${activeSkill.level}%` }}
                  className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                />
              </div>

              <button onClick={() => setActiveSkill(null)} className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em]">De-Initialize</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalaxySkills;