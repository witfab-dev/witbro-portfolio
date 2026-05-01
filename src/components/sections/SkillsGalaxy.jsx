import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Code2, Database, Braces, Terminal, Cpu, Layers, Zap, Palette, Box, Globe, ChevronLeft, Layout, Smartphone, Activity, Shield } from 'lucide-react';
import skillsPayload from '../../data/skills.json';

const ICON_MAP = {
  React: Code2,
  'TypeScript': Braces,
  'Next.js': Code2,
  'Tailwind CSS': Layers,
  'Node.js': Zap,
  Python: Cpu,
  PostgreSQL: Database,
  Redis: Database,
  Flutter: Smartphone,
  'React Native': Smartphone,
  Docker: Terminal,
  AWS: Globe,
  Git: Terminal,
  'CI/CD': Terminal,
  GraphQL: Globe,
  WebSocket: Globe,
  'Three.js': Code2,
  'TensorFlow.js': Cpu,
  Vue: Layout,
  Laravel: Box,
  MySQL: Database,
  MongoDB: Database,
  JavaScript: Braces,
  PHP: Braces,
  Dart: Smartphone,
  Figma: Palette,
};

const GalaxySkills = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loader = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(loader);
  }, []);

  const isMobile = windowSize.width < 768;

  const categories = useMemo(() => {
    return skillsPayload.categories.map((category) => ({
      ...category,
      items: category.skills.map((skill, index) => ({
        ...skill,
        icon: ICON_MAP[skill.name] || Code2,
        color: skill.color || '#60a5fa',
        orbit: isMobile ? 90 + index * 14 : 140 + index * 22,
        speed: skill.speed || 26,
      }))
    }));
  }, [isMobile]);

  useEffect(() => {
    if (categories.length && !activeCategory) {
      setActiveCategory(categories[0].name.toLowerCase());
    }
  }, [categories, activeCategory]);

  const activeCategoryData = categories.find((category) => category.name.toLowerCase() === activeCategory);
  const visibleSkills = activeCategoryData?.items || [];

  return (
    <section id="skills" className="relative min-h-screen w-full bg-[#030712] overflow-hidden flex flex-col items-center justify-center py-20 font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#030712_80%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="relative z-20 max-w-6xl w-full px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Activity size={14} className="text-blue-400 animate-pulse" />
            <span className="text-[10px] text-blue-400 uppercase tracking-[0.35em] font-black">{t('discoverSkills')}</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white uppercase">{t('skills')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-slate-400">{t('skillsDescription')}</p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const id = category.name.toLowerCase();
            const active = activeCategory === id;
            return (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`px-5 py-3 rounded-full text-sm font-semibold transition-all ${active ? 'bg-blue-500 text-white shadow-xl' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="relative flex items-center justify-center w-full grow min-h-[520px]">
          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-16 w-full max-w-3xl text-center">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              <p className="text-slate-300 uppercase tracking-[0.25em] text-xs">{t('loadingSkills')}</p>
            </div>
          ) : (
            <div className="relative w-full">
              <AnimatePresence>
                {visibleSkills.length ? (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    <div className="relative flex items-center justify-center">
                      <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500/70 via-cyan-500/40 to-purple-500/70 shadow-[0_0_80px_rgba(59,130,246,0.25)] flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center">
                          <Code2 size={42} className="text-white" />
                        </div>
                      </div>

                      {visibleSkills.map((skill, idx) => (
                        <motion.button
                          key={skill.name}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          onClick={() => setActiveSkill(skill)}
                          whileHover={{ scale: 1.05 }}
                          className="absolute flex items-center justify-center pointer-events-auto"
                          style={{
                            width: `${skill.orbit * 2}px`,
                            height: `${skill.orbit * 2}px`,
                            transform: `rotate(${(idx / visibleSkills.length) * 360}deg)`
                          }}
                        >
                          <motion.div
                            animate={{ rotate: -((idx / visibleSkills.length) * 360) }}
                            transition={{ repeat: Infinity, duration: skill.speed, ease: 'linear' }}
                            className="absolute"
                            style={{ top: '50%', left: '50%', transform: 'translate(120%, -50%)' }}
                          >
                            <div className="relative p-4 rounded-3xl bg-slate-900/90 border border-white/10 shadow-xl transition duration-300 hover:border-blue-500/30" style={{ boxShadow: hoveredSkill === skill.name ? `0 0 30px ${skill.color}40` : undefined }}>
                              <skill.icon size={isMobile ? 22 : 26} className="text-white" style={{ color: skill.color }} />
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                              {skill.name}
                            </div>
                          </motion.div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-slate-400">No skills available</div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-xl"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 p-8 rounded-[3rem] max-w-xl w-full overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-28 h-28 rounded-3xl bg-slate-800 border border-white/10 flex items-center justify-center">
                  <activeSkill.icon size={40} style={{ color: activeSkill.color }} />
                </div>
                <div className="space-y-3 text-left">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tight">{activeSkill.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{activeSkill.description}</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-sm text-slate-300">
                <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{t('skillGrowth')}</p>
                  <p className="text-2xl font-bold text-white">{activeSkill.level}%</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Years</p>
                  <p className="text-2xl font-bold text-white">{activeSkill.years || '—'}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{t('performance')}</p>
                  <p className="text-2xl font-bold text-white">{Math.min(activeSkill.level + 5, 100)}%</p>
                </div>
              </div>
              <button onClick={() => setActiveSkill(null)} className="mt-10 w-full py-4 bg-blue-500 text-slate-900 font-semibold rounded-3xl uppercase tracking-[0.25em] hover:bg-blue-400 transition-all">
                {t('backToRoot')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalaxySkills;