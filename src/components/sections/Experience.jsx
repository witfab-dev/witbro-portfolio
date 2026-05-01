import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────
const experiences = [
  {
    company: "Kirehe Adventist TVET School",
    role: "Senior Full-Stack Developer",
    period: "2025 – Present",
    location: "Kigali, Rwanda",
    type: "Full-time",
    description:
      "Architecting scalable microservices and leading the frontend migration to Next.js. Improved system performance by 40% through strategic caching layers and query optimization.",
    skills: ["React", "Go", "AWS", "Docker", "PostgreSQL", "Redis"],
    achievements: [
      { label: "Performance gain", value: "+40%" },
      { label: "Uptime", value: "99.9%" },
      { label: "Team size", value: "8 devs" },
    ],
    accent: "#3b82f6",
  },
  {
    company: "Kirehe Adventist TVET School",
    role: "Frontend Engineer",
    period: "2024 – 2025",
    location: "Kigali, Rwanda",
    type: "Full-time",
    description:
      "Developed interactive data-visualization dashboards processing 100k+ daily records. Pioneered AI voice-command integration, cutting navigation time by 35%.",
    skills: ["TypeScript", "D3.js", "Tailwind CSS", "GraphQL", "Framer Motion"],
    achievements: [
      { label: "Daily records", value: "100k+" },
      { label: "Nav time saved", value: "35%" },
      { label: "Dashboards shipped", value: "12" },
    ],
    accent: "#8b5cf6",
  },
  {
    company: "Kirehe Adventist TVET School",
    role: "Junior Developer",
    period: "2023 – 2024",
    location: "Kigali, Rwanda",
    type: "Internship",
    description:
      "Built responsive landing pages and managed CMS integrations for international clients across 6 countries. Delivered 20+ production sites on time and under budget.",
    skills: ["JavaScript", "PHP", "WordPress", "MySQL", "Sass"],
    achievements: [
      { label: "Sites delivered", value: "20+" },
      { label: "Countries served", value: "6" },
      { label: "Client satisfaction", value: "4.9★" },
    ],
    accent: "#06b6d4",
  },
];

// ─── Filter categories ────────────────────────────────────────────────────────
const FILTERS = ["All", "Full-time", "Internship"];

// ─── Skill badge ──────────────────────────────────────────────────────────────
const Badge = ({ label, accent }) => (
  <span
    className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all duration-200"
    style={{
      background: `${accent}14`,
      border: `1px solid ${accent}30`,
      color: accent,
    }}
  >
    {label}
  </span>
);

// ─── Stat pill ────────────────────────────────────────────────────────────────
const Stat = ({ label, value, accent }) => (
  <div
    className="flex flex-col items-center px-4 py-3 rounded-2xl"
    style={{ background: `${accent}0d`, border: `1px solid ${accent}20` }}
  >
    <span className="text-xl font-black" style={{ color: accent }}>{value}</span>
    <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">{label}</span>
  </div>
);

// ─── Timeline node ────────────────────────────────────────────────────────────
const Node = ({ accent, active }) => (
  <div className="relative flex items-center justify-center w-10 h-10 flex-shrink-0">
    <motion.div
      className="absolute rounded-full"
      animate={{ scale: active ? [1, 1.6, 1] : 1, opacity: active ? [0.4, 0, 0.4] : 0 }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ inset: 0, background: accent, filter: 'blur(4px)' }}
    />
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center relative z-10"
      style={{
        background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
        border: `1.5px solid ${accent}55`,
        boxShadow: active ? `0 0 20px ${accent}33` : 'none',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    </div>
  </div>
);

// ─── Experience card ──────────────────────────────────────────────────────────
const ExperienceCard = ({ exp, index, isActive, onClick }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative grid md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-6 mb-16 items-start`}
    >
      {/* LEFT column */}
      <div className={`hidden md:flex flex-col ${isEven ? 'items-end text-right' : 'items-start text-left order-3'}`}>
        {isEven && (
          <DateBadge exp={exp} align="right" />
        )}
        {!isEven && (
          <div className="md:mt-14 w-full">
            <Card exp={exp} isActive={isActive} onClick={onClick} />
          </div>
        )}
      </div>

      {/* CENTER — node + line connector */}
      <div className="flex flex-col items-center gap-0 md:order-2">
        <Node accent={exp.accent} active={isActive} />
        <div className="w-px flex-1 mt-1" style={{ background: `linear-gradient(to bottom, ${exp.accent}40, transparent)`, minHeight: 60 }} />
      </div>

      {/* RIGHT column */}
      <div className={`flex flex-col ${isEven ? 'items-start text-left order-3' : 'items-end text-right'}`}>
        {!isEven && (
          <DateBadge exp={exp} align="left" />
        )}
        {isEven && (
          <div className="md:mt-0 w-full">
            <Card exp={exp} isActive={isActive} onClick={onClick} />
          </div>
        )}
      </div>

      {/* Mobile: full-width layout */}
      <div className="md:hidden col-span-3 -mt-8 ml-14">
        <DateBadge exp={exp} align="left" />
        <Card exp={exp} isActive={isActive} onClick={onClick} />
      </div>
    </motion.div>
  );
};

const DateBadge = ({ exp, align }) => (
  <div className={`flex flex-col gap-1 mb-3 ${align === 'right' ? 'items-end' : 'items-start'}`}>
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase"
      style={{ background: `${exp.accent}15`, border: `1px solid ${exp.accent}35`, color: exp.accent }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      {exp.period}
    </div>
    <div className="flex items-center gap-1 text-[10px] text-slate-500">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      {exp.location}
    </div>
  </div>
);

const Card = ({ exp, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ y: -3 }}
    className="relative rounded-2xl p-5 cursor-pointer transition-all duration-300 w-full"
    style={{
      background: isActive
        ? `linear-gradient(135deg, ${exp.accent}10, ${exp.accent}05)`
        : 'rgba(255,255,255,0.02)',
      border: `1px solid ${isActive ? exp.accent + '40' : 'rgba(255,255,255,0.07)'}`,
      boxShadow: isActive ? `0 8px 40px ${exp.accent}15` : 'none',
    }}
  >
    {/* type tag */}
    <span
      className="inline-block mb-3 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest"
      style={{ background: `${exp.accent}20`, color: exp.accent }}
    >
      {exp.type}
    </span>

    <h3 className="text-[15px] font-black text-white tracking-tight leading-tight mb-0.5">
      {exp.role}
    </h3>
    <p className="text-[11px] font-semibold mb-3" style={{ color: exp.accent }}>
      {exp.company}
    </p>
    <p className="text-[12px] text-slate-400 leading-relaxed mb-4">
      {exp.description}
    </p>

    {/* Skills */}
    <div className="flex flex-wrap gap-1.5 mb-4">
      {exp.skills.map(s => <Badge key={s} label={s} accent={exp.accent} />)}
    </div>

    {/* Achievements — revealed when active */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pt-4 border-t" style={{ borderColor: `${exp.accent}20` }}>
            <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-3">Key metrics</p>
            <div className="grid grid-cols-3 gap-2">
              {exp.achievements.map(a => (
                <Stat key={a.label} label={a.label} value={a.value} accent={exp.accent} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* expand caret */}
    <div className="absolute bottom-4 right-4">
      <motion.div
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={exp.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </motion.div>
    </div>
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Experience() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter, setFilter] = useState('All');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  const filtered = useMemo(
    () => filter === 'All' ? experiences : experiences.filter(e => e.type === filter),
    [filter]
  );

  const totalYears = useMemo(() => {
    const start = 2023; const now = new Date().getFullYear();
    return now - start;
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen py-28 px-6 overflow-hidden"
      style={{ background: '#060c1a', color: '#fff', fontFamily: "'Syne', 'Outfit', sans-serif" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 40% at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 60%)' }} />
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[10px] font-black tracking-[0.4em] uppercase"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
            Career Timeline
          </div>

          <h2
            className="text-6xl md:text-8xl font-black uppercase leading-none mb-4"
            style={{
              fontStyle: 'italic',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(160deg, #fff 40%, rgba(255,255,255,0.3))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Experience
          </h2>

          <p className="text-slate-500 text-xs tracking-[0.3em] uppercase font-mono">
            Building in East Africa · {totalYears}+ years · {experiences.length} roles
          </p>
        </motion.div>

        {/* ── Summary stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { label: 'Years active',   value: `${totalYears}+`,   color: '#3b82f6' },
            { label: 'Roles held',     value: experiences.length, color: '#8b5cf6' },
            { label: 'Skills mastered',value: [...new Set(experiences.flatMap(e => e.skills))].length, color: '#06b6d4' },
            { label: 'Sites delivered',value: '20+',              color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center px-6 py-3 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[9px] text-slate-600 uppercase tracking-widest mt-0.5">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Filter tabs ── */}
        <div className="flex justify-center gap-2 mb-16">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200"
              style={{
                background: filter === f ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                border: filter === f ? '1px solid rgba(59,130,246,0.45)' : '1px solid rgba(255,255,255,0.07)',
                color: filter === f ? '#93c5fd' : '#475569',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Background spine */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 pointer-events-none"
            style={{ width: 1, background: 'rgba(255,255,255,0.05)', transform: 'translateX(-50%)' }}
          />
          {/* Scroll-progress glow spine */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-5 md:left-1/2 top-0 bottom-0 pointer-events-none"
            css={{ width: 1 }}
            /* inline style fallback */
            /* Framer can't animate custom props so we use an inner div */
          >
            <div style={{ width: 1, height: '100%', background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #06b6d4)', boxShadow: '0 0 12px rgba(59,130,246,0.6)', transform: 'translateX(-50%)', position: 'absolute', left: '50%' }} />
          </motion.div>

          <AnimatePresence mode="popLayout">
            {filtered.map((exp, idx) => (
              <ExperienceCard
                key={exp.role + exp.period}
                exp={exp}
                index={idx}
                isActive={activeIdx === idx}
                onClick={() => setActiveIdx(activeIdx === idx ? -1 : idx)}
              />
            ))}
          </AnimatePresence>

          {/* End node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center mt-4"
          >
            <motion.div
              animate={{ boxShadow: ['0 0 0 0 rgba(59,130,246,0.4)', '0 0 0 14px rgba(59,130,246,0)', '0 0 0 0 rgba(59,130,246,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </motion.div>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">What's Next?</p>
            <p className="text-[10px] text-slate-600 mt-1">Open to new challenges</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
