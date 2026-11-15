import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { profile, rotatingRoles } from '../../data/portfolio';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % rotatingRoles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-overlay opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
      </div>

      <div className="container-wide grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow">
            {profile.title}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 max-w-[15ch] font-display text-[clamp(2.6rem,6.2vw,5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink"
          >
            Building Digital
            <br />
            Experiences That{' '}
            <span className="relative inline-block text-gradient">
              Matter.
              <span className="absolute -bottom-2 left-1 h-[3px] w-[92%] rounded-full bg-gradient-to-r from-primary via-cyan to-transparent" />
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-7 flex h-7 items-center gap-3 font-mono text-sm text-cyan">
            <span className="text-muted/70">&gt;</span>
            {reduceMotion ? (
              <span>{rotatingRoles[0]}</span>
            ) : (
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingRoles[roleIndex]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  {rotatingRoles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            )}
            <span className="h-4 w-[2px] animate-pulse bg-cyan/80" aria-hidden="true" />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
          >
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => scrollTo('projects')} className="btn-primary">
              Explore My Projects
              <ArrowUpRight size={17} />
            </button>
            <button type="button" onClick={() => scrollTo('about')} className="btn-secondary">
              Discover More
              <ArrowDown size={16} />
            </button>
            <button type="button" onClick={() => scrollTo('contact')} className="btn-ghost">
              Contact Me
            </button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-cyan" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[350px] lg:max-w-[380px]"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-cyan/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-card">
            <img
              src={profile.portrait}
              alt="Portrait of Witness Fabrice"
              width="760"
              height="900"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />

            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-line/80 bg-night/80 p-3.5 backdrop-blur-md">
              <p className="font-display text-sm font-semibold text-ink">{profile.name}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                Software Developer
              </p>
            </div>
          </div>

          <div className="absolute -left-3 top-8 hidden rounded-xl border border-line bg-surface/90 px-3 py-2 backdrop-blur-md sm:block">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Focus</p>
            <p className="text-xs font-semibold text-ink">Full-Stack &amp; Mobile</p>
          </div>

          <div className="absolute -right-2 bottom-24 hidden items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1.5 backdrop-blur-md sm:flex">
            <Sparkles size={12} className="text-cyan" />
            <span className="font-mono text-[10px] text-ink">6 projects</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to the About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-ink sm:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-cyan"
          />
        </span>
      </motion.button>
    </section>
  );
}
