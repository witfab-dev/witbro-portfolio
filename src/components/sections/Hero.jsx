import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import AnimatedCounter from '../shared/AnimatedCounter';
import Typewriter from '../shared/Typewriter';
import {
  Github, Linkedin, Twitter, Mail,
  MapPin, ChevronDown, Award, Code2,
  Heart, Star, Loader2, ArrowUpRight, Download,
} from 'lucide-react';

const HERO_IMG_PATH = '/wit.png';

const TITLES = [
  'Full-Stack Architect',
  'React Specialist',
  'Creative Developer',
  'AI Integrator',
  'UI/UX Enthusiast',
  'Tech Mentor',
];

const SOCIAL_LINKS = [
  { icon: Github,   href: 'https://github.com/witfab-dev',              label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/witnessfabrice',     label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com/witnessfabrice',         label: 'Twitter' },
  { icon: Mail,     href: 'mailto:witnessfabrice@gmail.com',            label: 'Email' },
];

export default function Hero() {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded]       = useState(false);
  const [titleIndex, setTitleIndex]         = useState(0);
  const [viewCount, setViewCount]           = useState(1247);

  /* rotate titles */
  useEffect(() => {
    const id = setInterval(() => setTitleIndex(p => (p + 1) % TITLES.length), 3800);
    return () => clearInterval(id);
  }, []);


  const achievements = [
    { icon: Award, label: t('experience') || 'Experience', value: 3,  suffix: '+', color: '#f97316' },
    { icon: Code2, label: t('projects')   || 'Projects',   value: 5,  suffix: '+', color: '#3b82f6' },
    { icon: Heart, label: t('satisfaction')|| 'Satisfaction',value: 99,suffix: '%', color: '#ef4444' },
    { icon: Star,  label: 'OSS Stars',                     value: 5,  suffix: '+', color: '#8b5cf6' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-stone-100 dark:bg-[#0c0b0a] pt-20 transition-colors duration-500"
    >
      {/* ── Ambient blobs ───────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 w-[480px] h-[480px] rounded-full bg-orange-500/[0.06] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-3xl" />
      </div>

      {/* ── Subtle grid texture ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ══ LEFT: CONTENT ═══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7"
          >

            {/* Headline */}
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
                <span className="block w-5 h-px bg-orange-500" />
                {t("welcome") || "Hello, I'm"}
              </p>
              <h1 className="text-[clamp(52px,7vw,84px)] font-black leading-[0.9] tracking-tight text-stone-900 dark:text-stone-100">
                Witness
                <br />
                <span className="text-orange-500">Fabrice</span>
              </h1>
            </div>

            {/* Rotating title */}
            <div className="h-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={titleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{   y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-base font-mono text-stone-400 dark:text-stone-500 italic"
                >
                  / {TITLES[titleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-500 max-w-md">
              {t('witnessBio') ||
                'Building fast, accessible, and beautifully crafted digital products from the heart of Kigali, Rwanda. Passionate about turning ideas into real, impactful experiences.'}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-[11px] text-stone-400 dark:text-stone-600 font-medium">
              <MapPin size={12} className="text-orange-400" />
              Kigali, Rwanda
              <span className="mx-1 opacity-30">·</span>
              <span className="text-green-500 font-semibold">Open to work</span>
            </div>

            {/* Achievement stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex flex-col gap-1.5 p-4 bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 rounded-2xl
                             hover:border-orange-300 dark:hover:border-orange-500/30 transition-all duration-300 group"
                >
                  <item.icon size={16} style={{ color: item.color }} className="opacity-80" />
                  <AnimatedCounter
                    value={item.value}
                    suffix={item.suffix}
                    className="text-xl font-black text-stone-900 dark:text-stone-100 block"
                  />
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 dark:text-stone-600 leading-tight">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Primary */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/25"
              >
                <RocketIcon className="w-4 h-4" />
                {t('viewProjects') || 'View Projects'}
                <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>

              {/* Secondary */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/cv.pdf"
                download
                className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-sm font-bold rounded-2xl hover:border-orange-400 transition-all"
              >
                <Download size={14} />
                Download CV
              </motion.a>

              {/* Socials */}
              <div className="flex gap-2">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#161513]
                               text-stone-400 dark:text-stone-500 hover:text-orange-500 hover:border-orange-400 transition-all"
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ══ RIGHT: PORTRAIT ════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">

              {/* Rotating dashed ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-orange-400/20 animate-[spin_22s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-dashed border-stone-300/20 dark:border-stone-700/30 animate-[spin_16s_linear_infinite_reverse]" />

              {/* Accent corner blocks */}
              <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-orange-400 rounded-tl-sm" />
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-orange-400 rounded-br-sm" />

              {/* Photo frame */}
              <div className="absolute inset-10 rounded-[2.5rem] overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl bg-stone-200 dark:bg-stone-800">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin text-orange-400" />
                  </div>
                )}
                <img
                  src={HERO_IMG_PATH}
                  alt="Witness Fabrice"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Gradient polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 -right-2 sm:right-0 flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-lg z-20"
              >
                <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <Code2 size={14} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Stack</p>
                  <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100">React · Node</p>
                </div>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-6 -left-2 sm:left-0 flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-lg z-20"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
                  <span className="relative rounded-full h-2 w-2 bg-green-500" />
                </span>
                <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100 whitespace-nowrap">
                  Available for hire
                </p>
              </motion.div>

              {/* Experience badge — bottom right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-2 right-6 flex flex-col items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/30 z-20"
              >
                <span className="text-xl font-black text-white leading-none">3+</span>
                <span className="text-[8px] font-bold text-orange-100 uppercase tracking-wide leading-tight text-center">Yrs Exp</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-70 transition-opacity cursor-pointer"
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-stone-400">
          {t('exploreMore') || 'Explore'}
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={16} className="text-stone-400" />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Inline rocket SVG ──────────────────────────────────────── */
function RocketIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/>
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/>
    </svg>
  );
}
