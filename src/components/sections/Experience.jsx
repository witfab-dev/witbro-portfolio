import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  MapPin, Calendar, Briefcase, ChevronDown,
  Star, TrendingUp, Users, Clock, Zap, ArrowUpRight,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────
const getExperiences = (t) => [
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Senior Full-Stack Developer',
    period: '2025 – Present',
    location: 'Kigali, Rwanda',
    type: t('fullTime', 'Full-time'),
    current: true,
    descriptionKey: 'architectureMicroservices',
    description: 'Architecting scalable microservices and leading the frontend migration to Next.js. Improved system performance by 40% through strategic caching and query optimization.',
    skills: ['React', 'Go', 'AWS', 'Docker', 'PostgreSQL', 'Redis'],
    skillLevels: [92, 78, 75, 80, 85, 72],
    achievements: [
      { icon: TrendingUp, labelKey: 'performance', label: 'Performance', value: '+40%' },
      { icon: Clock,      labelKey: 'uptime',      label: 'Uptime',      value: '99.9%' },
      { icon: Users,      labelKey: 'teamSize',    label: 'Team',         value: '8 devs' },
    ],
    accent: '#f97316',
    highlight: 'Led full frontend architecture migration',
    peakHeight: 380,
    mountainColor: 'from-orange-600 to-orange-800',
  },
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Frontend Engineer',
    period: '2024 – 2025',
    location: 'Kigali, Rwanda',
    type: t('fullTime', 'Full-time'),
    current: false,
    descriptionKey: 'interactiveDashboards',
    description: 'Built interactive data-visualization dashboards processing 100k+ daily records. Pioneered AI voice-command integration, cutting navigation time by 35%.',
    skills: ['TypeScript', 'D3.js', 'Tailwind CSS', 'GraphQL', 'Framer Motion'],
    skillLevels: [88, 75, 92, 80, 85],
    achievements: [
      { icon: TrendingUp, labelKey: 'recordsProcessed', label: 'Records/day', value: '100k+' },
      { icon: Clock,      labelKey: 'timeSaved',       label: 'Time saved',  value: '35%' },
      { icon: Users,      labelKey: 'dashboardsBuilt',  label: 'Dashboards',  value: '12' },
    ],
    accent: '#3b82f6',
    highlight: 'AI voice-command integration',
    peakHeight: 290,
    mountainColor: 'from-blue-600 to-blue-800',
  },
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Junior Developer',
    period: '2023 – 2024',
    location: 'Kigali, Rwanda',
    type: t('internship', 'Internship'),
    current: false,
    descriptionKey: 'juniorDeveloper',
    description: 'Built responsive landing pages and managed CMS integrations for international clients across 6 countries. Delivered 20+ production sites on time and under budget.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MySQL'],
    skillLevels: [85, 78, 82, 80, 75, 70],
    achievements: [
      { icon: TrendingUp, labelKey: 'sitesDelivered', label: 'Sites',     value: '20+' },
      { icon: Users,      labelKey: 'countries',      label: 'Countries', value: '6' },
      { icon: Star,       labelKey: 'rating',         label: 'Rating',    value: '4.9★' },
    ],
    accent: '#8b5cf6',
    highlight: '20+ production sites across 6 countries',
    peakHeight: 220,
    mountainColor: 'from-purple-600 to-purple-800',
  },
];

// ─── CSS Mountain Scene ────────────────────────────────────────
function CSSMountainScene({ experiences, activeIdx, onPeakClick }) {
  const [stars] = useState(() => 
    Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 60,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }))
  );

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0a0d14] via-[#0d1117] to-[#111827] overflow-hidden">
      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Moon */}
      <div className="absolute top-8 right-12 w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-300 opacity-80 shadow-lg shadow-white/20" />
      <div className="absolute top-6 right-10 w-4 h-4 rounded-full bg-[#0a0d14]" />

      {/* Mountains Container */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center px-8 sm:px-16">
        <div className="flex items-end gap-0 w-full max-w-2xl" style={{ justifyContent: 'space-between' }}>
          {experiences.map((exp, i) => {
            const isActive = activeIdx === i;
            const height = isActive ? exp.peakHeight + 20 : exp.peakHeight;
            
            return (
              <div
                key={i}
                className="relative flex flex-col items-center cursor-pointer"
                style={{ width: `${100 / experiences.length}%` }}
                onClick={() => onPeakClick(i)}
              >
                {/* Light beam from peak */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3], height: [0, 80, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-full w-0.5 origin-bottom"
                    style={{
                      background: `linear-gradient(to top, ${exp.accent}, transparent)`,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                )}

                {/* Mountain */}
                <motion.div
                  animate={{
                    height: height,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="relative w-full"
                  style={{ height }}
                >
                  {/* Main mountain shape */}
                  <div
                    className={`absolute bottom-0 w-full bg-gradient-to-b ${exp.mountainColor} rounded-t-full`}
                    style={{
                      height: '100%',
                      clipPath: `polygon(50% 0%, 100% 100%, 0% 100%)`,
                    }}
                  >
                    {/* Snow cap */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-white to-white/80 rounded-t-full"
                      style={{
                        clipPath: 'polygon(40% 0%, 60% 0%, 80% 100%, 20% 100%)',
                      }}
                    />
                  </div>

                  {/* Mountain texture lines */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className="absolute bg-white/20"
                        style={{
                          left: `${15 + j * 20}%`,
                          top: `${20 + j * 15}%`,
                          width: '1px',
                          height: `${30 + j * 10}%`,
                          transform: `rotate(${-10 + j * 5}deg)`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Active glow */}
                  {isActive && (
                    <motion.div
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-xl"
                      style={{ background: exp.accent }}
                    />
                  )}
                </motion.div>

                {/* Orbital ring at peak */}
                {isActive && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute border-2 rounded-full opacity-40"
                    style={{
                      width: 40,
                      height: 40,
                      borderColor: exp.accent,
                      bottom: height - 20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    }}
                  />
                )}

                {/* Year badge */}
                <motion.div
                  animate={{
                    y: isActive ? -5 : 0,
                    scale: isActive ? 1.1 : 1,
                  }}
                  className="absolute top-[-30px] left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: isActive ? exp.accent : `${exp.accent}20`,
                    color: isActive ? 'white' : exp.accent,
                    border: `1px solid ${exp.accent}50`,
                  }}
                >
                  {exp.period.split(' ')[0]}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
      
      {/* Ground grid */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          perspective: '500px',
          transform: 'rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Click instruction */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute h-full w-full rounded-full bg-orange-400 opacity-70" />
          <span className="relative rounded-full h-1.5 w-1.5 bg-orange-500" />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Click a peak to explore</span>
      </div>
    </div>
  );
}

// ─── Stat tile ─────────────────────────────────────────────────
const StatTile = ({ icon: Icon, label, value, accent }) => (
  <div className="flex flex-col items-center justify-center p-3 rounded-xl text-center"
    style={{ background: `${accent}0d`, border: `1px solid ${accent}22` }}>
    <Icon size={12} style={{ color: accent }} className="mb-1 opacity-80" />
    <span className="text-lg font-black leading-none" style={{ color: accent }}>{value}</span>
    <span className="text-[8px] text-stone-400 uppercase tracking-widest mt-1 leading-tight">{label}</span>
  </div>
);

// ─── Skill bar ─────────────────────────────────────────────────
const SkillBar = ({ label, level, accent, delay }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] font-medium text-stone-500 dark:text-stone-500 w-20 shrink-0 truncate">{label}</span>
    <div className="flex-1 h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}88, ${accent})` }}
      />
    </div>
    <span className="text-[10px] font-bold w-7 text-right shrink-0" style={{ color: accent }}>{level}%</span>
  </div>
);

// ─── Experience card ───────────────────────────────────────────
const ExpCard = ({ exp, index, isActive, onClick, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    onClick={onClick}
    whileHover={{ y: -4 }}
    className="group relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 flex-1"
    style={{
      border: `1px solid ${isActive ? exp.accent + '55' : ''}`,
      boxShadow: isActive ? `0 0 0 1px ${exp.accent}25, 0 16px 40px ${exp.accent}15` : undefined,
    }}
  >
    <div className="absolute inset-0 rounded-2xl pointer-events-none border border-stone-200 dark:border-stone-800/60 transition-opacity duration-300"
      style={{ opacity: isActive ? 0 : 1 }} />

    {/* Top accent bar */}
    <div className="h-1 w-full" style={{ background: isActive ? exp.accent : `${exp.accent}35` }} />

    {/* Active peak indicator line */}
    {isActive && (
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-px h-5 -translate-y-full"
        style={{ background: `linear-gradient(to top, ${exp.accent}, transparent)` }} />
    )}

    <div className="bg-white dark:bg-[#161513] p-5">
      {/* Step number */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black shrink-0"
          style={{
            background: isActive ? exp.accent : `${exp.accent}15`,
            color: isActive ? 'white' : exp.accent,
            border: `1px solid ${exp.accent}35`,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="flex flex-col items-end gap-1 ml-2">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
            style={{ background: `${exp.accent}15`, color: exp.accent }}>
            {exp.type}
          </div>
          {exp.current && (
            <div className="flex items-center gap-1 text-[9px] font-bold text-green-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              {t('current', 'Current')}
            </div>
          )}
        </div>
      </div>

      <h3 className="font-black text-sm leading-tight text-stone-900 dark:text-stone-100 mb-0.5 transition-colors"
        style={isActive ? { color: exp.accent } : {}}>
        {exp.role}
      </h3>
      <p className="text-[10px] font-semibold mb-2" style={{ color: exp.accent }}>{exp.company}</p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="flex items-center gap-1 text-[10px] text-stone-400 dark:text-stone-600">
          <Calendar size={9} /> {exp.period}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-stone-400 dark:text-stone-600">
          <MapPin size={9} /> {exp.location}
        </span>
      </div>

      {/* Highlight */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <Zap size={10} style={{ color: exp.accent }} />
        <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-500 italic">{exp.highlight}</span>
      </div>

      <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400 mb-3">{exp.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {exp.skills.slice(0, 4).map(s => (
          <span key={s} className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase"
            style={{ background: `${exp.accent}12`, border: `1px solid ${exp.accent}25`, color: exp.accent }}>
            {s}
          </span>
        ))}
        {exp.skills.length > 4 && (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-bold text-stone-400">+{exp.skills.length - 4}</span>
        )}
      </div>

      {/* Expand */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: `${exp.accent}20` }}>
              {/* Stats */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-2">
                  {t('keyMetrics', 'Key metrics')}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {exp.achievements.map((a, i) => (
                    <StatTile key={i} {...a} accent={exp.accent} />
                  ))}
                </div>
              </div>
              {/* Skill bars */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-2">
                  {t('proficiency', 'Proficiency')}
                </p>
                <div className="flex flex-col gap-2">
                  {exp.skills.map((s, i) => (
                    <SkillBar key={s} label={s} level={exp.skillLevels[i]} accent={exp.accent} delay={0.05 + i * 0.06} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end mt-2">
        <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={13} style={{ color: exp.accent, opacity: 0.5 }} />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// ─── Main Component ────────────────────────────────────────────
export default function Experience() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const dark = theme === 'dark';
  
  const experiences = getExperiences(t);
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter, setFilter] = useState('all');

  const FILTERS = [
    { key: 'all', label: t('all', 'All') },
    { key: 'fullTime', label: t('fullTime', 'Full-time') },
    { key: 'internship', label: t('internship', 'Internship') },
  ];

  const handlePeakClick = React.useCallback((i) => {
    setActiveIdx(prev => prev === i ? -1 : i);
  }, []);

  const filtered = useMemo(
    () => filter === 'all' 
      ? experiences 
      : experiences.filter(e => e.type === t(filter, filter)),
    [filter, t, experiences]
  );

  const startYear = 2023;
  const yearsActive = new Date().getFullYear() - startYear;
  const totalSkills = [...new Set(experiences.flatMap(e => e.skills))].length;

  const STATS = [
    { label: t('yearsActive', 'Years active'),    value: `${yearsActive}+`,  color: '#f97316' },
    { label: t('rolesHeld', 'Roles held'),         value: experiences.length, color: '#3b82f6' },
    { label: t('skillsMastered', 'Skills mastered'), value: totalSkills,     color: '#8b5cf6' },
    { label: t('sitesDelivered', 'Sites delivered'), value: '20+',           color: '#10b981' },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 overflow-hidden
                 bg-stone-100 dark:bg-[#0c0b0a] transition-colors duration-500"
    >
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.55 }}
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              {t('careerPath', 'Career path')}
            </p>
            <h2 className="text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight text-stone-900 dark:text-stone-100">
              {t('work', 'Work')} <span className="text-orange-500 italic">{t('experience', 'Experience')}</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-xs text-stone-500 dark:text-stone-500">
              {t('experienceDesc', 'Each peak represents a milestone — the higher the mountain, the greater the growth.')}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="flex gap-2 flex-wrap"
          >
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-250 ${
                  filter === f.key
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-transparent border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-500 hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                {f.label}
                <span className="ml-1.5 opacity-60 text-[9px]">
                  {f.key === 'all' ? experiences.length : experiences.filter(e => e.type === f.label).length}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {STATS.map((s, i) => (
            <motion.div 
              key={s.label} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center py-4 px-3 rounded-2xl bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 text-center"
            >
              <span className="text-2xl font-black leading-none" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[9px] uppercase tracking-widest mt-1.5 text-stone-400 dark:text-stone-600">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CSS Mountain Scene (No WebGL!) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800/50 mb-4"
          style={{ height: 380 }}
        >
          <CSSMountainScene 
            experiences={experiences} 
            activeIdx={activeIdx} 
            onPeakClick={handlePeakClick} 
          />
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, idx) => {
              const origIdx = experiences.indexOf(exp);
              return (
                <ExpCard
                  key={exp.role + exp.period}
                  exp={exp}
                  index={idx}
                  isActive={activeIdx === origIdx}
                  onClick={() => setActiveIdx(activeIdx === origIdx ? -1 : origIdx)}
                  t={t}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-6 flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 hover:border-orange-400 transition-all"
        >
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(249,115,22,0.4)', '0 0 0 10px rgba(249,115,22,0)', '0 0 0 0 rgba(249,115,22,0)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500 shrink-0"
          >
            <Star size={14} fill="white" stroke="none" />
          </motion.div>
          <div>
            <p className="text-sm font-black text-stone-900 dark:text-stone-100">{t('whatsNext', "What's Next?")}</p>
            <p className="text-xs text-stone-400 dark:text-stone-600 mt-0.5">
              {t('nextPeak', 'The next peak is yet to be climbed — open to new challenges')}
            </p>
          </div>
          <a 
            href="#contact" 
            className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-md shadow-orange-500/20 shrink-0"
          >
            {t('hireMe', 'Hire me')} <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
