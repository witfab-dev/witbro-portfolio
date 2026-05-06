import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, Briefcase, ChevronDown,
  Star, TrendingUp, Users, Clock,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────
const experiences = [
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Senior Full-Stack Developer',
    period: '2025 – Present',
    location: 'Kigali, Rwanda',
    type: 'Full-time',
    current: true,
    description:
      'Architecting scalable microservices and leading the frontend migration to Next.js. Improved system performance by 40% through strategic caching layers and query optimization.',
    skills: ['React', 'Go', 'AWS', 'Docker', 'PostgreSQL', 'Redis'],
    achievements: [
      { icon: TrendingUp, label: 'Performance gain', value: '+40%' },
      { icon: Clock,      label: 'Uptime',           value: '99.9%' },
      { icon: Users,      label: 'Team size',         value: '8 devs' },
    ],
    accent: '#f97316',
  },
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Frontend Engineer',
    period: '2024 – 2025',
    location: 'Kigali, Rwanda',
    type: 'Full-time',
    current: false,
    description:
      'Developed interactive data-visualization dashboards processing 100k+ daily records. Pioneered AI voice-command integration, cutting navigation time by 35%.',
    skills: ['TypeScript', 'D3.js', 'Tailwind CSS', 'GraphQL', 'Framer Motion'],
    achievements: [
      { icon: TrendingUp, label: 'Daily records',      value: '100k+' },
      { icon: Clock,      label: 'Nav time saved',     value: '35%' },
      { icon: Users,      label: 'Dashboards shipped', value: '12' },
    ],
    accent: '#3b82f6',
  },
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Junior Developer',
    period: '2023 – 2024',
    location: 'Kigali, Rwanda',
    type: 'Internship',
    current: false,
    description:
      'Built responsive landing pages and managed CMS integrations for international clients across 6 countries. Delivered 20+ production sites on time and under budget.',
    skills: ['JavaScript', 'PHP', 'WordPress', 'MySQL', 'Sass'],
    achievements: [
      { icon: TrendingUp, label: 'Sites delivered',     value: '20+' },
      { icon: Users,      label: 'Countries served',    value: '6' },
      { icon: Star,       label: 'Client satisfaction', value: '4.9' },
    ],
    accent: '#8b5cf6',
  },
];

const FILTERS = ['All', 'Full-time', 'Internship'];

// ─── Badge ──────────────────────────────────────────────────────
const Badge = ({ label, accent }) => (
  <span
    className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase"
    style={{ background: `${accent}16`, border: `1px solid ${accent}30`, color: accent }}
  >
    {label}
  </span>
);

// ─── Timeline dot ───────────────────────────────────────────────
const Dot = ({ accent, active, current }) => (
  <div className="relative flex items-center justify-center w-10 h-10 shrink-0 z-10">
    {(active || current) && (
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ background: accent, filter: 'blur(5px)' }}
      />
    )}
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center relative transition-shadow duration-300"
      style={{
        background: `linear-gradient(135deg, ${accent}28, ${accent}10)`,
        border: `1.5px solid ${accent}50`,
        boxShadow: (active || current) ? `0 0 20px ${accent}35` : 'none',
      }}
    >
      <Briefcase size={15} style={{ color: accent }} />
    </div>
  </div>
);

// ─── Meta badge ─────────────────────────────────────────────────
const MetaBadge = ({ exp, align }) => (
  <div className={`flex flex-col gap-1.5 mb-3 mt-1 ${align === 'right' ? 'items-end' : 'items-start'}`}>
    {exp.current && (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/25 w-fit mb-0.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
          <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-green-500">Current</span>
      </div>
    )}
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase w-fit"
      style={{ background: `${exp.accent}15`, border: `1px solid ${exp.accent}35`, color: exp.accent }}
    >
      <Calendar size={9} /> {exp.period}
    </div>
    <div className="flex items-center gap-1 text-[10px] text-stone-400 dark:text-stone-600">
      <MapPin size={9} /> {exp.location}
    </div>
  </div>
);

// ─── Inner card ─────────────────────────────────────────────────
const InnerCard = ({ exp, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ y: -4 }}
    className="relative w-full rounded-2xl p-5 cursor-pointer bg-white dark:bg-[#161513] transition-all duration-300"
    style={{
      border: `1px solid ${isActive ? exp.accent + '55' : ''}`,
      boxShadow: isActive ? `0 0 0 1px ${exp.accent}30, 0 16px 48px ${exp.accent}12` : undefined,
    }}
  >
    {/* If not active, show default border via className */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none border border-stone-200 dark:border-stone-800/60 transition-opacity duration-300"
      style={{ opacity: isActive ? 0 : 1 }}
    />

    {/* Type + company */}
    <div className="flex items-center gap-2 mb-3 flex-wrap">
      <span
        className="inline-block px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest"
        style={{ background: `${exp.accent}18`, color: exp.accent }}
      >
        {exp.type}
      </span>
      <span className="text-[10px] font-semibold text-stone-400 dark:text-stone-600 truncate">
        {exp.company}
      </span>
    </div>

    {/* Role */}
    <h3
      className="text-base font-black tracking-tight leading-snug mb-2 text-stone-900 dark:text-stone-100 transition-colors duration-200"
      style={isActive ? { color: exp.accent } : {}}
    >
      {exp.role}
    </h3>

    {/* Description */}
    <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400 mb-4">
      {exp.description}
    </p>

    {/* Skills */}
    <div className="flex flex-wrap gap-1.5 mb-1">
      {exp.skills.map(s => <Badge key={s} label={s} accent={exp.accent} />)}
    </div>

    {/* Achievements expandable */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-4 pt-4 border-t" style={{ borderColor: `${exp.accent}22` }}>
            <p className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-3">
              Key metrics
            </p>
            <div className="grid grid-cols-3 gap-2">
              {exp.achievements.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-2 py-3 rounded-xl text-center"
                  style={{ background: `${exp.accent}0d`, border: `1px solid ${exp.accent}20` }}
                >
                  <Icon size={12} style={{ color: exp.accent }} className="mb-1 opacity-70" />
                  <span className="text-base font-black leading-none" style={{ color: exp.accent }}>
                    {value}
                  </span>
                  <span className="text-[8px] text-stone-400 uppercase tracking-widest mt-1 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Caret */}
    <div className="absolute bottom-4 right-4">
      <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.25 }}>
        <ChevronDown size={14} style={{ color: exp.accent, opacity: 0.5 }} />
      </motion.div>
    </div>
  </motion.div>
);

// ─── Row ────────────────────────────────────────────────────────
const ExpRow = ({ exp, index, isActive, onClick }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-[40px_1fr] md:grid-cols-[1fr_56px_1fr] gap-x-5 mb-8 items-start"
    >
      {/* Desktop LEFT */}
      <div className={`hidden md:flex flex-col ${isEven ? 'items-end' : 'items-start'}`}>
        {isEven
          ? <MetaBadge exp={exp} align="right" />
          : <InnerCard exp={exp} isActive={isActive} onClick={onClick} />
        }
      </div>

      {/* Center node */}
      <div className="flex flex-col items-center md:order-2">
        <Dot accent={exp.accent} active={isActive} current={exp.current} />
        <div className="w-px flex-1 mt-1"
          style={{ background: `linear-gradient(to bottom, ${exp.accent}45, transparent)`, minHeight: 56 }} />
      </div>

      {/* Desktop RIGHT */}
      <div className={`hidden md:flex flex-col md:order-3 ${isEven ? 'items-start' : 'items-end'}`}>
        {isEven
          ? <InnerCard exp={exp} isActive={isActive} onClick={onClick} />
          : <MetaBadge exp={exp} align="left" />
        }
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-2">
        <MetaBadge exp={exp} align="left" />
        <InnerCard exp={exp} isActive={isActive} onClick={onClick} />
      </div>
    </motion.div>
  );
};

// ─── Main ──────────────────────────────────────────────────────
export default function Experience() {
  const containerRef              = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter,    setFilter]    = useState('All');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  const filtered = useMemo(
    () => filter === 'All' ? experiences : experiences.filter(e => e.type === filter),
    [filter]
  );

  const startYear   = 2023;
  const yearsActive = new Date().getFullYear() - startYear;
  const totalSkills = [...new Set(experiences.flatMap(e => e.skills))].length;

  const STATS = [
    { label: 'Years active',    value: `${yearsActive}+`,  color: '#f97316' },
    { label: 'Roles held',      value: experiences.length, color: '#3b82f6' },
    { label: 'Skills mastered', value: totalSkills,        color: '#8b5cf6' },
    { label: 'Sites delivered', value: '20+',              color: '#10b981' },
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden
                 bg-stone-100 dark:bg-[#0c0b0a] transition-colors duration-500"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              Career path
            </p>
            <h2 className="text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight text-stone-900 dark:text-stone-100">
              Work <span className="text-orange-500 italic">Experience</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-xs text-stone-500 dark:text-stone-500">
              Building products and growing craft across East Africa since {startYear}.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-250
                  ${filter === f
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-transparent border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-500 hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
              >
                {f}
                <span className="ml-1.5 opacity-60 text-[9px]">
                  {f === 'All' ? experiences.length : experiences.filter(e => e.type === f).length}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap gap-3 mb-14">
          {STATS.map(s => (
            <div key={s.label} className="flex flex-col items-center px-5 py-3 rounded-2xl bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60">
              <span className="text-xl font-black leading-none" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[9px] uppercase tracking-widest mt-1 text-stone-400 dark:text-stone-600">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Track */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 pointer-events-none"
            style={{ width: 1, background: 'rgba(0,0,0,0.07)', transform: 'translateX(-50%)' }} />
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 pointer-events-none hidden dark:block"
            style={{ width: 1, background: 'rgba(255,255,255,0.06)', transform: 'translateX(-50%)' }} />

          {/* Progress spine */}
          <motion.div style={{ scaleY, originY: 0 }} className="absolute left-5 md:left-1/2 top-0 bottom-0 pointer-events-none">
            <div style={{
              width: 2, height: '100%',
              background: 'linear-gradient(to bottom, #f97316, #3b82f6, #8b5cf6)',
              boxShadow: '0 0 8px rgba(249,115,22,0.5)',
              transform: 'translateX(-50%)',
              position: 'absolute', left: '50%',
            }} />
          </motion.div>

          <AnimatePresence mode="popLayout">
            {filtered.map((exp, idx) => (
              <ExpRow
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
            className="relative z-10 flex flex-col items-center mt-2 ml-5 md:ml-0"
          >
            <motion.div
              animate={{ boxShadow: ['0 0 0 0 rgba(249,115,22,0.4)', '0 0 0 14px rgba(249,115,22,0)', '0 0 0 0 rgba(249,115,22,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-orange-500 shadow-lg shadow-orange-500/30"
            >
              <Star size={16} fill="white" stroke="none" />
            </motion.div>
            <p className="mt-3 text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
              What&apos;s Next?
            </p>
            <p className="text-[10px] mt-0.5 text-stone-400 dark:text-stone-600">
              Open to new challenges
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
