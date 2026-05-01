import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Code2, Database, Braces, Terminal, Cpu, Layers,
  Zap, Palette, Box, Globe, Activity, Star,
  Smartphone, Layout, Shield, X, ChevronRight
} from 'lucide-react';

// ─── Mock data (replace with your actual skillsPayload + context imports) ──────
const skillsPayload = {
  categories: [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', color: '#61DAFB', level: 95, years: 4 },
        { name: 'TypeScript', color: '#3178C6', level: 88, years: 3 },
        { name: 'Next.js', color: '#FFFFFF', level: 85, years: 3 },
        { name: 'Tailwind CSS', color: '#38BDF8', level: 92, years: 3 },
        { name: 'Three.js', color: '#049EF4', level: 70, years: 2 },
        { name: 'Vue', color: '#42B883', level: 75, years: 2 },
      ],
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', color: '#68A063', level: 90, years: 4 },
        { name: 'Python', color: '#FFD343', level: 82, years: 3 },
        { name: 'PostgreSQL', color: '#336791', level: 85, years: 3 },
        { name: 'Redis', color: '#DC382D', level: 78, years: 2 },
        { name: 'GraphQL', color: '#E10098', level: 80, years: 2 },
        { name: 'MongoDB', color: '#47A248', level: 76, years: 2 },
      ],
    },
    {
      name: 'DevOps',
      skills: [
        { name: 'Docker', color: '#2496ED', level: 84, years: 3 },
        { name: 'AWS', color: '#FF9900', level: 79, years: 2 },
        { name: 'Git', color: '#F05032', level: 96, years: 5 },
        { name: 'CI/CD', color: '#A259FF', level: 75, years: 2 },
      ],
    },
    {
      name: 'Mobile',
      skills: [
        { name: 'Flutter', color: '#54C5F8', level: 80, years: 2 },
        { name: 'React Native', color: '#61DAFB', level: 85, years: 3 },
        { name: 'Dart', color: '#0175C2', level: 78, years: 2 },
      ],
    },
  ],
};

const ICON_MAP = {
  React: Code2, TypeScript: Braces, 'Next.js': Code2, 'Tailwind CSS': Layers,
  'Node.js': Zap, Python: Cpu, PostgreSQL: Database, Redis: Database,
  Flutter: Smartphone, 'React Native': Smartphone, Docker: Terminal,
  AWS: Globe, Git: Terminal, 'CI/CD': Activity, GraphQL: Globe,
  WebSocket: Zap, 'Three.js': Box, 'TensorFlow.js': Cpu, Vue: Layout,
  Laravel: Box, MySQL: Database, MongoDB: Database, JavaScript: Braces,
  PHP: Braces, Dart: Smartphone, Figma: Palette, 'Cyber Security': Shield,
};

// ─── Tiny hook: smooth cursor tracking ─────────────────────────────────────────
function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });
  useEffect(() => {
    const handler = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return { x: sx, y: sy };
}

// ─── Floating star field ───────────────────────────────────────────────────────
const Stars = React.memo(() => {
  const stars = useMemo(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.6 + 0.3,
      dur: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    })), []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {stars.map(s => (
        <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white">
          <animate attributeName="opacity" values="0.08;0.55;0.08"
            dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
});

// ─── Orbital ring SVG ──────────────────────────────────────────────────────────
const OrbitalRing = ({ radius }) => (
  <svg
    className="absolute pointer-events-none"
    style={{
      width: radius * 2 + 4,
      height: radius * 2 + 4,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <circle
      cx={radius + 2} cy={radius + 2} r={radius}
      fill="none" stroke="rgba(99,179,237,0.08)" strokeWidth="1"
      strokeDasharray="4 10"
    />
  </svg>
);

// ─── Planet (skill node) ───────────────────────────────────────────────────────
const Planet = ({ skill, isHovered, onHover, onLeave, onClick }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      className="absolute"
      style={{ width: skill.orbitRadius * 2, height: skill.orbitRadius * 2, left: '50%', top: '50%', marginLeft: -(skill.orbitRadius), marginTop: -(skill.orbitRadius) }}
      animate={{ rotate: [skill.initialRotation, skill.initialRotation + 360] }}
      transition={{ repeat: Infinity, duration: skill.duration, ease: 'linear' }}
    >
      {/* planet sits at the "3 o'clock" edge */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2">
        <motion.div
          animate={{ rotate: [-(skill.initialRotation), -(skill.initialRotation + 360)] }}
          transition={{ repeat: Infinity, duration: skill.duration, ease: 'linear' }}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onClick={onClick}
          className="relative cursor-pointer"
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.92 }}
        >
          {/* glow ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              boxShadow: `0 0 28px 6px ${skill.color}55`,
              borderRadius: '1rem',
            }}
          />
          {/* pill */}
          <div
            className="relative flex items-center justify-center rounded-2xl border transition-colors duration-300"
            style={{
              width: 52, height: 52,
              background: isHovered
                ? `radial-gradient(circle at 40% 35%, ${skill.color}22, #0a0f1e)`
                : 'rgba(10,15,30,0.85)',
              borderColor: isHovered ? `${skill.color}88` : 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <Icon size={22} style={{ color: skill.color }} />
          </div>

          {/* tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 pointer-events-none z-50"
              >
                <div className="px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase whitespace-nowrap"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}cc, ${skill.color}88)`,
                    color: '#000',
                    boxShadow: `0 4px 20px ${skill.color}44`,
                  }}
                >
                  {skill.name}
                </div>
                <div className="w-2 h-2 mx-auto -mt-1 rotate-45"
                  style={{ background: `${skill.color}88` }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Skill detail modal ────────────────────────────────────────────────────────
const SkillModal = ({ skill, onClose }) => {
  const Icon = skill.icon;
  const pct = skill.level || 80;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,4,20,0.88)', backdropFilter: 'blur(24px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.82, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0d1226, #060c1a)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: `0 0 80px ${skill.color}22, 0 30px 60px rgba(0,0,0,0.6)`,
        }}
      >
        {/* accent stripe */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }} />

        <div className="p-10">
          {/* header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}33` }}>
                <Icon size={32} style={{ color: skill.color }} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">{skill.name}</h3>
                <p className="text-xs text-slate-500 mt-1 tracking-widest uppercase">{skill.years || 2}+ years experience</p>
              </div>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
              <X size={16} />
            </button>
          </div>

          {/* description */}
          <p className="text-slate-400 text-sm leading-7 mb-8">
            {skill.description || `Deep expertise in ${skill.name}, building high-performance, production-ready solutions with modern architectural patterns and best practices.`}
          </p>

          {/* mastery bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] uppercase tracking-widest text-slate-500">Mastery</span>
              <span className="text-sm font-black text-white">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
              />
            </div>
          </div>

          {/* stats row */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { label: 'Mastery score', value: `${pct}%` },
              { label: 'Experience', value: `${skill.years || 2}+ yrs` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-2xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1">{label}</p>
                <p className="text-xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="group w-full py-4 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-all duration-200 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${skill.color}cc, ${skill.color}88)`, color: '#000' }}
          >
            Close
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
export default function GalaxySkills() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const mouse = useMousePosition();

  useEffect(() => {
    if (skillsPayload?.categories?.length > 0)
      setActiveCategory(skillsPayload.categories[0].name.toLowerCase());
  }, []);

  const activeCategoryData = useMemo(
    () => skillsPayload?.categories?.find(c => c.name.toLowerCase() === activeCategory),
    [activeCategory]
  );

  const visibleSkills = useMemo(() => {
    if (!activeCategoryData) return [];
    return activeCategoryData.skills.map((skill, i) => ({
      ...skill,
      icon: ICON_MAP[skill.name] || Code2,
      orbitRadius: 110 + i * 44,
      duration: 22 + i * 8,
      initialRotation: (i / activeCategoryData.skills.length) * 360,
    }));
  }, [activeCategoryData]);

  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24"
      style={{ background: '#020818', color: '#fff' }}
    >
      {/* ── background layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        <Stars />
        {/* deep nebula blobs */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,64,175,0.12) 0%, transparent 70%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 40% 30% at 20% 80%, rgba(124,58,237,0.07) 0%, transparent 60%)' }} />
        {/* subtle parallax glow that follows mouse */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            left: mouse.x,
            top: mouse.y,
            x: '-50%',
            y: '-50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── header ── */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 text-center mb-14 px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}>
          <Activity size={12} className="text-blue-400" style={{ animation: 'pulse 2s infinite' }} />
          <span className="text-[9px] font-black tracking-[0.5em] uppercase text-blue-400">Technical Galaxy</span>
        </div>
        <h2
          className="text-7xl md:text-9xl font-black uppercase leading-none"
          style={{
            fontStyle: 'italic',
            background: 'linear-gradient(160deg, #fff 40%, rgba(255,255,255,0.35))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.04em',
          }}
        >
          Skills
        </h2>
        <p className="mt-4 text-sm text-slate-500 tracking-widest uppercase">
          Click any planet to explore
        </p>
      </motion.header>

      {/* ── category nav ── */}
      <nav className="relative z-30 flex flex-wrap justify-center gap-2.5 mb-16 max-w-xl px-6">
        {skillsPayload.categories.map((cat, i) => {
          const isActive = activeCategory === cat.name.toLowerCase();
          return (
            <motion.button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name.toLowerCase())}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
              style={{
                background: isActive ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                border: isActive ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.07)',
                color: isActive ? '#93c5fd' : '#64748b',
                boxShadow: isActive ? '0 0 20px rgba(59,130,246,0.2)' : 'none',
                transform: isActive ? 'translateY(-1px)' : 'none',
              }}
            >
              {cat.name}
            </motion.button>
          );
        })}
      </nav>

      {/* ── galaxy stage ── */}
      <div className="relative flex items-center justify-center w-full h-[640px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center w-full h-full"
          >
            {/* orbital rings */}
            {visibleSkills.map(s => <OrbitalRing key={s.name} radius={s.orbitRadius} />)}

            {/* central reactor */}
            <div className="relative z-20 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.28, 0.15] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute rounded-full"
                style={{ width: 140, height: 140, background: 'radial-gradient(circle, rgba(59,130,246,0.6), transparent)', filter: 'blur(24px)' }}
              />
              <div
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #0f1e3a, #060c1a)',
                  border: '1px solid rgba(99,179,237,0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 0 40px rgba(59,130,246,0.15)',
                }}
              >
                <Code2 size={32} className="text-blue-400" />
              </div>
            </div>

            {/* planets */}
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── legend strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-30 flex flex-wrap justify-center gap-3 mt-10 px-6 max-w-2xl"
      >
        {visibleSkills.map(skill => {
          const Icon = skill.icon;
          return (
            <button
              key={skill.name}
              onClick={() => setActiveSkill(skill)}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                background: hoveredSkill === skill.name ? `${skill.color}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hoveredSkill === skill.name ? skill.color + '44' : 'rgba(255,255,255,0.06)'}`,
                color: hoveredSkill === skill.name ? skill.color : '#475569',
              }}
            >
              <Icon size={12} style={{ color: skill.color }} />
              {skill.name}
            </button>
          );
        })}
      </motion.div>

      {/* ── modal ── */}
      <AnimatePresence>
        {activeSkill && <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />}
      </AnimatePresence>
    </section>
  );
}
