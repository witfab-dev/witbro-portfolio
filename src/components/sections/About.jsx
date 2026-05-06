import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Globe, Zap, ShieldCheck, Terminal,
  ArrowUpRight, Sparkles, Coffee, Code2,
  BookOpen, Eye, Lightbulb,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────
const TABS = [
  { id: 'story',      label: 'Story',      icon: BookOpen },
  { id: 'philosophy', label: 'Philosophy', icon: Lightbulb },
  { id: 'vision',     label: 'Vision',     icon: Eye },
];

const TAB_CONTENT = {
  story: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
      <p>
        I&apos;m a <span className="font-bold text-stone-900 dark:text-stone-100">Full-Stack Developer</span> and
        Level 5 Software Student, bridging the gap between complex logic and fluid user
        interfaces. My journey started with a deep curiosity for systems — how things
        connect, communicate, and scale.
      </p>
      <p>
        I mastered the{' '}
        <span className="text-orange-500 font-semibold underline decoration-orange-500/30 underline-offset-4">
          React, Node.js &amp; MySQL
        </span>{' '}
        stack and have since expanded into cloud infrastructure, 3D web experiences,
        and AI integrations. Based in{' '}
        <span className="font-semibold text-stone-900 dark:text-stone-100">Kigali, Rwanda</span>,
        building products used across six countries.
      </p>
      <p>
        I believe in "Project Archaeology" — digging into the root of a problem before
        writing a single line of code. Whether it&apos;s a marketplace or a school
        management system, my goal is software that feels genuinely human.
      </p>
    </div>
  ),
  philosophy: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
      <p>
        Great software is invisible. It solves problems so naturally that users never
        have to think about the tool — only the outcome. That philosophy drives every
        decision I make, from API design to micro-animation timing.
      </p>
      <p>
        I build with{' '}
        <span className="font-bold text-stone-900 dark:text-stone-100">performance as a constraint</span>,
        not an afterthought. Sub-2.5s LCP, accessible markup, and
        offline-ready architectures are non-negotiable starting points, not bonus features.
      </p>
      <p>
        Collaboration &gt; isolation. The best products emerge from honest feedback loops,
        clear documentation, and a team that challenges each other respectfully. I&apos;d rather
        ship a well-considered v1 than a perfect idea that never ships.
      </p>
    </div>
  ),
  vision: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
      <p>
        My vision is to help East Africa produce world-class software talent and products.
        Rwanda&apos;s tech ecosystem is growing rapidly — I want to be part of the generation
        that puts it on the global map.
      </p>
      <p>
        In the next three years I&apos;m focused on{' '}
        <span className="font-bold text-stone-900 dark:text-stone-100">AI-native product development</span>,
        building tools that lower the barrier to entrepreneurship for local founders, and
        mentoring the next generation of developers in my community.
      </p>
      <p>
        Long-term: a venture-backed product studio operating from Kigali — shipping software
        that solves real African problems with world-class execution.
      </p>
    </div>
  ),
};

const PILLARS = [
  {
    icon: Zap,
    title: 'Performance First',
    desc: 'Optimising for sub-2.5s LCP. Speed is a feature and a first principle.',
    color: '#f97316',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    desc: 'MERN + API-first design for systems that grow without breaking.',
    color: '#3b82f6',
  },
  {
    icon: Code2,
    title: 'Visual Craft',
    desc: 'Figma precision married to Three.js & Framer Motion storytelling.',
    color: '#8b5cf6',
  },
];

const STATS = [
  { icon: ShieldCheck, label: 'Proficiency', value: 'Level 5' },
  { icon: Zap,         label: 'Focus',       value: 'Full-Stack' },
  { icon: Globe,       label: 'Location',    value: 'Kigali, RW' },
];

// ─── Component ─────────────────────────────────────────────────
export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 overflow-hidden
                 bg-stone-100 dark:bg-[#0c0b0a] transition-colors duration-500"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              Identity 2026
            </p>
            <h2 className="text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight text-stone-900 dark:text-stone-100">
              Crafting the{' '}
              <span className="text-orange-500 italic">Next-Gen</span>
              <br />Web.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:block text-sm leading-relaxed text-stone-500 dark:text-stone-500 max-w-xs text-right"
          >
            Based in Rwanda, building worldwide. Specialising in robust backend logic
            and immersive frontend motion.
          </motion.p>
        </div>

        {/* ── Main grid ──────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT col ──────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Photo card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-square rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800/60 bg-stone-200 dark:bg-stone-800"
            >
              <img
                src="/wit.png"
                alt="Witness Fabrice"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              {/* gradient polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating status badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-5 right-5 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl
                           bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                  <Terminal size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">Building now</p>
                  <p className="text-[11px] font-bold text-white leading-tight">Student Manager v2</p>
                </div>
              </motion.div>

              {/* Corner accent */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">Available</span>
              </div>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map(({ icon: Ic, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex flex-col items-center gap-1.5 p-4 rounded-2xl text-center
                             bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60
                             hover:border-orange-400 transition-all duration-300"
                >
                  <Ic size={15} className="text-stone-400 group-hover:text-orange-500 transition-colors" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-600">{label}</p>
                  <p className="text-[11px] font-black text-stone-900 dark:text-stone-100">{value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT col ─────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Tab switcher */}
            <div>
              {/* Tab nav */}
              <div className="flex gap-1 p-1 rounded-xl bg-stone-200/60 dark:bg-stone-800/40 w-fit mb-6">
                {TABS.map(({ id, label, icon: Ic }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-250
                      ${activeTab === id
                        ? 'text-white'
                        : 'text-stone-500 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                      }`}
                  >
                    {activeTab === id && (
                      <motion.div
                        layoutId="tab-pill"
                        className="absolute inset-0 bg-orange-500 rounded-lg shadow-md shadow-orange-500/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Ic size={12} className="relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                  >
                    {TAB_CONTENT[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid sm:grid-cols-3 gap-4">
              {PILLARS.map(({ icon: Ic, title, desc, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group relative p-5 rounded-2xl bg-white dark:bg-[#161513]
                             border border-stone-200 dark:border-stone-800/60
                             hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]
                             transition-all duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Ic size={16} style={{ color }} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-2">
                    {title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl
                         bg-white dark:bg-[#161513]
                         border border-stone-200 dark:border-stone-800/60
                         hover:border-orange-400 transition-all duration-300"
            >
              {/* Avatars */}
              <div className="flex -space-x-2.5 shrink-0">
                {[Coffee, Coffee, Sparkles].map((Ic, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white dark:border-[#161513]
                               bg-stone-100 dark:bg-stone-800 flex items-center justify-center"
                  >
                    <Ic size={13} className={i === 2 ? 'text-orange-500' : 'text-stone-400'} />
                  </div>
                ))}
              </div>

              <p className="flex-1 text-xs text-stone-500 dark:text-stone-500 text-center sm:text-left">
                <span className="font-bold text-stone-900 dark:text-stone-100">Available for hire</span>
                {' '}— open to freelance work, collaborations, and exciting full-time roles.
              </p>

              <a
                href="#contact"
                className="group/cta shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                           bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold
                           uppercase tracking-widest transition-all shadow-md shadow-orange-500/20"
              >
                Let&apos;s Talk
                <ArrowUpRight
                  size={13}
                  className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform"
                />
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
