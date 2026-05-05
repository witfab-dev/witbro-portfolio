import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Database, Braces, Terminal, Cpu, Layers,
  Zap, Palette, Box, Globe, Activity, Smartphone,
  Layout, Shield, X, ChevronRight, LayoutGrid, Orbit,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────
const skillsPayload = {
  categories: [
    {
      name: 'Frontend',
      icon: Layout,
      color: '#f97316',
      skills: [
        { name: 'React',        color: '#61DAFB', level: 95, years: 4 },
        { name: 'TypeScript',   color: '#3178C6', level: 88, years: 3 },
        { name: 'Next.js',      color: '#a3a3a3', level: 85, years: 3 },
        { name: 'Tailwind CSS', color: '#38BDF8', level: 92, years: 3 },
        { name: 'Three.js',     color: '#049EF4', level: 70, years: 2 },
        { name: 'Vue',          color: '#42B883', level: 75, years: 2 },
      ],
    },
    {
      name: 'Backend',
      icon: Terminal,
      color: '#3b82f6',
      skills: [
        { name: 'Node.js',    color: '#68A063', level: 90, years: 4 },
        { name: 'Python',     color: '#FFD343', level: 82, years: 3 },
        { name: 'PostgreSQL', color: '#336791', level: 85, years: 3 },
        { name: 'Redis',      color: '#DC382D', level: 78, years: 2 },
        { name: 'GraphQL',    color: '#E10098', level: 80, years: 2 },
        { name: 'MongoDB',    color: '#47A248', level: 76, years: 2 },
      ],
    },
    {
      name: 'DevOps',
      icon: Activity,
      color: '#8b5cf6',
      skills: [
        { name: 'Docker', color: '#2496ED', level: 84, years: 3 },
        { name: 'AWS',    color: '#FF9900', level: 79, years: 2 },
        { name: 'Git',    color: '#F05032', level: 96, years: 5 },
        { name: 'CI/CD',  color: '#A259FF', level: 75, years: 2 },
      ],
    },
    {
      name: 'Mobile',
      icon: Smartphone,
      color: '#10b981',
      skills: [
        { name: 'Flutter',      color: '#54C5F8', level: 80, years: 2 },
        { name: 'React Native', color: '#61DAFB', level: 85, years: 3 },
        { name: 'Dart',         color: '#0175C2', level: 78, years: 2 },
      ],
    },
  ],
};

const ICON_MAP = {
  React: Code2,       TypeScript: Braces,    'Next.js': Code2,
  'Tailwind CSS': Layers, 'Node.js': Zap,    Python: Cpu,
  PostgreSQL: Database,   Redis: Database,   Flutter: Smartphone,
  'React Native': Smartphone, Docker: Terminal, AWS: Globe,
  Git: Terminal,      'CI/CD': Activity,     GraphQL: Globe,
  'Three.js': Box,    Vue: Layout,           MongoDB: Database,
  Dart: Smartphone,   Figma: Palette,        'Cyber Security': Shield,
};

// ─── Orbital ring ──────────────────────────────────────────────
const OrbitalRing = ({ radius }) => (
  <svg
    className="absolute pointer-events-none"
    style={{
      width: radius * 2 + 4, height: radius * 2 + 4,
      left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <circle
      cx={radius + 2} cy={radius + 2} r={radius}
      fill="none" stroke="rgba(249,115,22,0.08)"
      strokeWidth="1" strokeDasharray="4 10"
    />
  </svg>
);

// ─── Orbital planet ────────────────────────────────────────────
const Planet = ({ skill, isHovered, onHover, onLeave, onClick }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      className="absolute"
      style={{
        width: skill.orbitRadius * 2, height: skill.orbitRadius * 2,
        left: '50%', top: '50%',
        marginLeft: -skill.orbitRadius, marginTop: -skill.orbitRadius,
      }}
      animate={{ rotate: [skill.initialRotation, skill.initialRotation + 360] }}
      transition={{ repeat: Infinity, duration: skill.duration, ease: 'linear' }}
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2">
        <motion.div
          animate={{ rotate: [-skill.initialRotation, -(skill.initialRotation + 360)] }}
          transition={{ repeat: Infinity, duration: skill.duration, ease: 'linear' }}
          onMouseEnter={onHover} onMouseLeave={onLeave}
          onClick={onClick}
          className="relative cursor-pointer"
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.92 }}
        >
          {/* glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ boxShadow: `0 0 24px 6px ${skill.color}55`, borderRadius: '1rem' }}
          />
          {/* node */}
          <div
            className="relative flex items-center justify-center rounded-2xl border transition-colors duration-300"
            style={{
              width: 48, height: 48,
              background: isHovered
                ? `radial-gradient(circle, ${skill.color}25, #0a0f1e)`
                : 'rgba(22,21,19,0.9)',
              borderColor: isHovered ? `${skill.color}80` : 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Icon size={20} style={{ color: skill.color }} />
          </div>

          {/* tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.88 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 pointer-events-none z-50 whitespace-nowrap"
              >
                <div
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}dd, ${skill.color}99)`,
                    color: '#000',
                    boxShadow: `0 4px 16px ${skill.color}44`,
                  }}
                >
                  {skill.name} · {skill.level}%
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Skill card (grid view) ────────────────────────────────────
const SkillCard = ({ skill, onClick, delay }) => {
  const Icon = skill.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-3 p-4 rounded-2xl border bg-white dark:bg-[#161513]
                 border-stone-200 dark:border-stone-800/60 text-left cursor-pointer
                 hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.3),0_12px_32px_rgba(0,0,0,0.08)]
                 transition-all duration-300"
    >
      {/* icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}
      >
        <Icon size={18} style={{ color: skill.color }} />
      </div>

      {/* name + years */}
      <div>
        <p className="font-black text-sm text-stone-900 dark:text-stone-100 tracking-tight group-hover:text-orange-500 transition-colors">
          {skill.name}
        </p>
        <p className="text-[10px] text-stone-400 dark:text-stone-600 mt-0.5">{skill.years}+ yrs</p>
      </div>

      {/* progress bar */}
      <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
        />
      </div>

      {/* level badge */}
      <span
        className="absolute top-3 right-3 text-[9px] font-black px-2 py-0.5 rounded-full"
        style={{ background: `${skill.color}18`, color: skill.color }}
      >
        {skill.level}%
      </span>
    </motion.button>
  );
};

// ─── Skill detail modal ────────────────────────────────────────
const SkillModal = ({ skill, onClose }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 32, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-[#161513] rounded-3xl overflow-hidden
                   border border-stone-200 dark:border-stone-800 shadow-2xl"
      >
        {/* accent stripe */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }} />

        <div className="p-6 sm:p-8">
          {/* header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}
              >
                <Icon size={28} style={{ color: skill.color }} />
              </div>
              <div>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 tracking-tight">{skill.name}</h3>
                <p className="text-[10px] text-stone-400 mt-0.5 uppercase tracking-widest">{skill.years}+ years experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800
                         text-stone-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
            >
              <X size={14} />
            </button>
          </div>

          {/* description */}
          <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400 mb-6">
            Deep expertise in {skill.name}, building high-performance, production-ready solutions
            with modern architectural patterns and best practices.
          </p>

          {/* mastery bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-400">Mastery</span>
              <span className="text-sm font-black text-stone-900 dark:text-stone-100">{skill.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
              />
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Mastery',    value: `${skill.level}%` },
              { label: 'Experience', value: `${skill.years}+ yrs` },
            ].map(({ label, value }) => (
              <div key={label} className="px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40
                                          border border-stone-100 dark:border-stone-800">
                <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-1">{label}</p>
                <p className="text-xl font-black text-stone-900 dark:text-stone-100">{value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="group w-full py-3.5 rounded-2xl flex items-center justify-center gap-2
                       text-xs font-black uppercase tracking-widest text-white transition-all active:scale-95"
            style={{ background: `linear-gradient(135deg, ${skill.color}dd, ${skill.color}aa)` }}
          >
            Close
            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main ──────────────────────────────────────────────────────
export default function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState(skillsPayload.categories[0].name);
  const [hoveredSkill,   setHoveredSkill]   = useState(null);
  const [activeSkill,    setActiveSkill]    = useState(null);
  const [viewMode,       setViewMode]       = useState('grid'); // 'grid' | 'orbit'

  const activeCategoryData = useMemo(
    () => skillsPayload.categories.find(c => c.name === activeCategory),
    [activeCategory]
  );

  const visibleSkills = useMemo(() => {
    if (!activeCategoryData) return [];
    return activeCategoryData.skills.map((skill, i) => ({
      ...skill,
      icon: ICON_MAP[skill.name] || Code2,
      orbitRadius: 100 + i * 42,
      duration: 20 + i * 8,
      initialRotation: (i / activeCategoryData.skills.length) * 360,
    }));
  }, [activeCategoryData]);

  const dark = typeof document !== 'undefined'
    ? document.documentElement.classList.contains('dark')
    : false;

  const bg      = 'bg-stone-100 dark:bg-[#0c0b0a]';
  const surface = 'bg-white dark:bg-[#161513]';
  const border  = 'border-stone-200 dark:border-stone-800/60';
  const ink     = 'text-stone-900 dark:text-stone-100';
  const muted   = 'text-stone-400 dark:text-stone-600';
  const subtle  = 'text-stone-500 dark:text-stone-500';

  return (
    <section
      id="skills"
      className={`relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-500 ${bg}`}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              Technical skills
            </p>
            <h2 className={`text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight ${ink}`}>
              My <span className="text-orange-500 italic">Tech</span> Stack
            </h2>
            <p className={`mt-3 text-sm leading-relaxed max-w-xs ${subtle}`}>
              Tools and technologies I use to build fast, scalable, and beautiful products.
            </p>
          </motion.div>

          {/* View toggle */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${surface} ${border}`}>
            {[
              { mode: 'grid',  Icon: LayoutGrid, label: 'Grid'  },
              { mode: 'orbit', Icon: Orbit,      label: 'Orbit' },
            ].map(({ mode, Icon: Ic, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-250
                  ${viewMode === mode
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : `${muted} hover:${ink}`
                  }`}
              >
                <Ic size={13} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Category tabs ────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillsPayload.categories.map(cat => {
            const CatIcon = cat.icon;
            const active  = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all duration-250
                  ${active
                    ? 'text-white border-transparent shadow-lg'
                    : `bg-transparent ${border} ${muted} hover:border-stone-300 dark:hover:border-stone-600`
                  }`}
                style={active ? { background: cat.color, boxShadow: `0 8px 20px ${cat.color}35` } : {}}
              >
                <CatIcon size={13} />
                {cat.name}
                <span className="opacity-60 text-[9px]">{cat.skills.length}</span>
              </button>
            );
          })}
        </div>

        {/* ── Content area ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <motion.div
              key={`grid-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3"
            >
              {visibleSkills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  delay={i * 0.04}
                  onClick={() => setActiveSkill(skill)}
                />
              ))}
            </motion.div>
          )}

          {/* ORBIT VIEW */}
          {viewMode === 'orbit' && (
            <motion.div
              key={`orbit-${activeCategory}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="relative flex flex-col items-center"
            >
              {/* Galaxy stage */}
              <div className="relative flex items-center justify-center w-full"
                style={{ height: Math.min(640, 200 + visibleSkills.length * 80) }}>

                {/* Orbital rings */}
                {visibleSkills.map(s => <OrbitalRing key={s.name} radius={s.orbitRadius} />)}

                {/* Central node */}
                <div className="relative z-20 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ repeat: Infinity, duration: 3.5 }}
                    className="absolute rounded-full"
                    style={{
                      width: 130, height: 130,
                      background: `radial-gradient(circle, ${activeCategoryData?.color || '#f97316'}60, transparent)`,
                      filter: 'blur(24px)',
                    }}
                  />
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: dark ? 'linear-gradient(135deg,#1a1917,#0c0b0a)' : 'linear-gradient(135deg,#fff,#f5f3ee)',
                      border: `1.5px solid ${activeCategoryData?.color || '#f97316'}40`,
                      boxShadow: `0 0 32px ${activeCategoryData?.color || '#f97316'}20`,
                    }}
                  >
                    {activeCategoryData && (
                      <activeCategoryData.icon size={28} style={{ color: activeCategoryData.color }} />
                    )}
                  </div>
                </div>

                {/* Planets */}
                {visibleSkills.map(skill => (
                  <Planet
                    key={skill.name}
                    skill={skill}
                    isHovered={hoveredSkill === skill.name}
                    onHover={() => setHoveredSkill(skill.name)}
                    onLeave={() => setHoveredSkill(null)}
                    onClick={() => setActiveSkill(skill)}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-2xl">
                {visibleSkills.map(skill => {
                  const Icon = skill.icon;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setActiveSkill(skill)}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border`}
                      style={{
                        background: hoveredSkill === skill.name ? `${skill.color}15` : 'transparent',
                        borderColor: hoveredSkill === skill.name ? `${skill.color}40` : 'rgba(0,0,0,0.08)',
                        color: hoveredSkill === skill.name ? skill.color : undefined,
                      }}
                    >
                      <Icon size={11} style={{ color: skill.color }} />
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── All skills summary strip ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-14 p-5 rounded-2xl border ${surface} ${border} flex flex-wrap items-center justify-between gap-4`}
        >
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${muted} mb-1`}>Total skills</p>
            <p className={`text-2xl font-black ${ink}`}>
              {skillsPayload.categories.reduce((a, c) => a + c.skills.length, 0)}
              <span className="text-orange-500">+</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsPayload.categories.map(cat => (
              <div
                key={cat.name}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold"
                style={{ background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}25` }}
              >
                <cat.icon size={11} />
                {cat.name} · {cat.skills.length}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeSkill && <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />}
      </AnimatePresence>
    </section>
  );
}
