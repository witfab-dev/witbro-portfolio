import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Code2, Database, Braces, Terminal,Cpu, Layers, 
  Zap, Palette, Box, Globe, Activity, Star 
} from 'lucide-react';
import skillsPayload from '../../data/skills.json';

const ICON_MAP = {
  React: Code2, 'TypeScript': Braces, 'Next.js': Code2, 'Tailwind CSS': Layers,
  'Node.js': Zap, Python: Cpu, PostgreSQL: Database, Redis: Database,
  Flutter: Smartphone, 'React Native': Smartphone, Docker: Terminal,
  AWS: Globe, Git: Terminal, 'CI/CD': Terminal, GraphQL: Globe,
  WebSocket: Globe, 'Three.js': Code2, 'TensorFlow.js': Cpu, Vue: Layout,
  Laravel: Box, MySQL: Database, MongoDB: Database, JavaScript: Braces,
  PHP: Braces, Dart: Smartphone, Figma: Palette,
};

const GalaxySkills = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  // Initialize first category
  useEffect(() => {
    if (skillsPayload.categories.length > 0) {
      setActiveCategory(skillsPayload.categories[0].name.toLowerCase());
    }
  }, []);

  const activeCategoryData = useMemo(() => 
    skillsPayload.categories.find(cat => cat.name.toLowerCase() === activeCategory),
    [activeCategory]
  );

  const visibleSkills = useMemo(() => {
    if (!activeCategoryData) return [];
    return activeCategoryData.skills.map((skill, index) => ({
      ...skill,
      icon: ICON_MAP[skill.name] || Code2,
      // Distribute orbits: inner skills closer, outer further
      orbitRadius: 120 + (index * 45),
      // Vary speeds: inner orbits faster (Kepler's Law vibe)
      duration: 20 + (index * 8),
      // Stagger start positions
      initialRotation: (index / activeCategoryData.skills.length) * 360
    }));
  }, [activeCategoryData]);

  return (
    <section className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20 transition-colors duration-700 ${
      theme === 'dark' ? 'bg-[#030712] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* 1. COSMIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 opacity-20 ${theme === 'dark' ? 'bg-[radial-gradient(#fff_1px,transparent_1px)]' : 'bg-[radial-gradient(#000_1px,transparent_1px)]'} [background-size:32px_32px]`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* 2. HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-30 text-center mb-12 px-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4">
          <Star size={12} className="text-blue-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400">{t('techStack')}</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">{t('skills')}</h2>
      </motion.div>

      {/* 3. CATEGORY NAVIGATION */}
      <div className="relative z-30 flex flex-wrap justify-center gap-3 mb-16 max-w-2xl px-4">
        {skillsPayload.categories.map((cat) => {
          const isActive = activeCategory === cat.name.toLowerCase();
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name.toLowerCase())}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-500 border ${
                isActive 
                ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 4. THE GALAXY ENGINE */}
      <div className="relative flex items-center justify-center w-full h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center w-full h-full"
          >
            {/* The Sun / Center Core */}
            <div className="relative z-20 group cursor-pointer">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] border-4 border-white/10">
                <Code2 size={40} className="text-white" />
              </div>
            </div>

            {/* Orbital Rings & Planets */}
            {visibleSkills.map((skill, idx) => (
              <React.Fragment key={skill.name}>
                {/* Visual Orbit Path */}
                <div 
                  className="absolute rounded-full border border-white/5 pointer-events-none"
                  style={{ width: skill.orbitRadius * 2, height: skill.orbitRadius * 2 }}
                />

                {/* Orbit Animation Wrapper */}
                <motion.div
                  className="absolute"
                  style={{ width: skill.orbitRadius * 2, height: skill.orbitRadius * 2 }}
                  animate={{ rotate: [skill.initialRotation, skill.initialRotation + 360] }}
                  transition={{
                    repeat: Infinity,
                    duration: skill.duration,
                    ease: "linear"
                  }}
                >
                  {/* Planet Positioning Wrapper (Moves along the edge of the circle) */}
                  <div 
                    className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2"
                    style={{ width: 'auto' }}
                  >
                    {/* The Planet (Skill Card) */}
                    <motion.div
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => setActiveSkill(skill)}
                      // Counter-rotation: Keeps the icon vertical while it orbits
                      animate={{ rotate: [-(skill.initialRotation), -(skill.initialRotation + 360)] }}
                      transition={{ repeat: Infinity, duration: skill.duration, ease: "linear" }}
                      className="relative cursor-pointer group"
                    >
                      <div 
                        className={`p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover:scale-125 ${
                          theme === 'dark' ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200'
                        }`}
                        style={{ 
                          boxShadow: hoveredSkill === skill.name ? `0 0 30px ${skill.color}50` : 'none',
                          borderColor: hoveredSkill === skill.name ? skill.color : ''
                        }}
                      >
                        <skill.icon size={24} style={{ color: skill.color }} />
                      </div>

                      {/* Floating Label */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap transition-opacity duration-300 ${
                        hoveredSkill === skill.name ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5. SKILL DETAIL MODAL (Enhanced) */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#030712]/95 backdrop-blur-xl"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] max-w-xl w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <activeSkill.icon size={120} style={{ color: activeSkill.color }} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <activeSkill.icon size={40} style={{ color: activeSkill.color }} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white uppercase italic">{activeSkill.name}</h3>
                    <p className="text-blue-400 font-bold tracking-widest text-xs uppercase">{activeSkill.category || 'Technology'}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-lg leading-relaxed mb-8">{activeSkill.description || t('noDescription')}</p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: t('proficiency'), value: `${activeSkill.level}%` },
                    { label: 'Experience', value: `${activeSkill.years || '3+'}Y` },
                    { label: 'Stability', value: 'High' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                      <p className="text-[10px] uppercase text-slate-500 mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setActiveSkill(null)}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all"
                >
                  {t('closeDiscovery')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalaxySkills;
