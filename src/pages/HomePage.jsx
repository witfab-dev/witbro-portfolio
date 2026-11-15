import React, { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  FolderKanban,
  Layers,
  Mail,
  MapPin,
  Sparkles,
  User,
} from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import LazyThreeJS from '../components/shared/LazyThreeJS';

const HeroScene = lazy(() => import('../components/three/HeroScene'));
import { experienceMeta, profile, projectMeta, skillGroupsMeta, whatsappUrl } from '../data/portfolio';
import { useI18n } from '../i18n/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';

const cardIcons = [User, FolderKanban, Layers, Briefcase, Bot, Mail];
const cardPaths = ['/about', '/projects', '/skills', '/experience', '/assistant', '/contact'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePage() {
  usePageTitle(null);
  const { content, locale } = useI18n();
  const c = content.home;
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = content.hero.roles;

  useEffect(() => {
    setRoleIndex(0);
  }, [locale]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion, roles.length]);

  const featured = projectMeta.filter((p) => p.featured).slice(0, 3);
  const totalSkills = skillGroupsMeta.reduce((sum, group) => sum + group.skills.length, 0);
  const totalTech = new Set(projectMeta.flatMap((p) => p.technologies)).size;
  const allSkills = skillGroupsMeta.flatMap((group) => group.skills.map((s) => s.name));
  const currentRole = experienceMeta[0];

  return (
    <>
      {/* ── Hero with the original Three.js effect ─────────────── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28">
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
          <LazyThreeJS
            componentId="home-hero"
            fallback={
              <div className="h-full w-full bg-[radial-gradient(circle_at_70%_40%,rgba(59,130,246,0.22),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(34,211,238,0.14),transparent_50%)]" />
            }
          >
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </LazyThreeJS>
        </div>

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 grid-overlay opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
        </div>

        <div className="container-wide relative grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <motion.div variants={container} initial={reduceMotion ? false : 'hidden'} animate="show">
            <motion.p variants={item} className="eyebrow">
              {content.hero.title}
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,4.9rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-ink"
            >
              {content.hero.line1}
              <br />
              {content.hero.line2}{' '}
              <span className="relative inline-block text-gradient">
                {content.hero.accent}
                <span className="absolute -bottom-2 left-1 h-[3px] w-[92%] rounded-full bg-gradient-to-r from-primary via-cyan to-transparent" />
              </span>
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-7 flex h-7 items-center gap-3 font-mono text-sm text-cyan"
            >
              <span className="text-muted/70">&gt;</span>
              {reduceMotion ? (
                <span>{roles[0]}</span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              )}
              <span className="h-4 w-[2px] animate-pulse bg-cyan/80" aria-hidden="true" />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
            >
              {content.hero.intro}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="btn-primary">
                {content.hero.explore}
                <ArrowUpRight size={17} />
              </Link>
              <Link to="/about" className="btn-secondary">
                {content.hero.discover}
                <ArrowDown size={16} />
              </Link>
              <Link to="/contact" className="btn-ghost">
                {content.hero.contact}
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-cyan" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {content.hero.availability}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[330px] lg:mr-4 lg:max-w-[360px]"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-cyan/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-[0_40px_120px_-40px_rgba(34,211,238,0.35)]">
              <img
                src={profile.portrait}
                alt={content.hero.portraitAlt}
                width="760"
                height="900"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-line/80 bg-night/80 p-3.5 backdrop-blur-md">
                <p className="font-display text-sm font-semibold text-ink">{profile.name}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                  {content.hero.roles[0]}
                </p>
              </div>
            </div>

            <div className="absolute -left-3 top-8 hidden rounded-xl border border-line bg-surface/90 px-3 py-2 backdrop-blur-md sm:block">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                {content.hero.focusLabel}
              </p>
              <p className="text-xs font-semibold text-ink">{content.hero.focusValue}</p>
            </div>

            <motion.div
              animate={reduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-2 bottom-24 hidden items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1.5 backdrop-blur-md sm:flex"
            >
              <Sparkles size={12} className="text-cyan" />
              <span className="font-mono text-[10px] text-ink">{content.hero.projectsLabel}</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">{content.hero.scroll}</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
            <motion.span
              animate={reduceMotion ? {} : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1 rounded-full bg-cyan"
            />
          </span>
        </motion.div>
      </section>

      {/* ── Portfolio summary ──────────────────────────────────── */}
      <section className="section pt-4">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">{c.summaryEyebrow}</p>
            <h2 className="section-title mt-4 max-w-3xl">{c.summaryTitle}</h2>
            <p className="section-lead">{c.summaryLead}</p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { value: projectMeta.length, label: content.projectsPage.countProjects },
              { value: `${totalTech}+`, label: content.projectsPage.countTech },
              { value: totalSkills, label: content.nav.skills },
              { value: experienceMeta.length, label: content.nav.experience },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.05}>
                <div className="card px-5 py-4">
                  <p className="font-display text-2xl font-semibold text-ink">{stat.value}</p>
                  <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.cards.map((card, i) => {
              const Icon = cardIcons[i];
              return (
                <Reveal key={card.title} delay={i * 0.04}>
                  <Link
                    to={cardPaths[i]}
                    className="card group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_60px_-30px_rgba(59,130,246,0.5)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-cyan">
                        <Icon size={16} />
                      </span>
                      <span className="font-mono text-[10px] text-muted/50">0{i + 1}</span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-ink">{card.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{card.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-blue-200">
                      {card.cta}
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured work ─────────────────────────────────────── */}
      <section className="section pt-0">
        <div className="container-wide">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{c.workEyebrow}</p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink">
                {c.workTitle}
              </h2>
              <p className="mt-2 text-sm text-muted">{c.workLead}</p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-200 transition-colors hover:text-white"
            >
              {c.allProjects}
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <Link
                  to="/projects"
                  className="card group block overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <span
                      className="absolute left-3 top-3 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider backdrop-blur-md"
                      style={{
                        borderColor: `${project.accent}55`,
                        backgroundColor: `${project.accent}1f`,
                        color: project.accent,
                      }}
                    >
                      {content.projectCopy[project.id].category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
                      <span className="font-mono text-[10px] text-muted">{project.year}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-muted">
                      {content.projectCopy[project.id].description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills marquee ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-line/60 bg-surface/30 py-8">
        <div className="container-wide mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">{c.skillsEyebrow}</p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold tracking-[-0.03em] text-ink">
              {c.skillsTitle}
            </h2>
          </div>
          <Link
            to="/skills"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-200 transition-colors hover:text-white"
          >
            {c.allSkills}
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="group relative overflow-hidden" aria-hidden="true">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night to-transparent" />
          <div className="flex w-max animate-marquee gap-2 group-hover:[animation-play-state:paused]">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="whitespace-nowrap rounded-lg border border-line/70 bg-card/60 px-3 py-2 font-mono text-[11px] text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="container-wide mt-4 text-[12.5px] text-muted">{c.skillsLead}</p>
      </section>

      {/* ── Current role ──────────────────────────────────────── */}
      <section className="section">
        <div className="container-wide grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="card h-full p-7">
              <p className="eyebrow">{c.journeyEyebrow}</p>
              <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                {c.journeyTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.journeyLead}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="chip">{currentRole.period}</span>
                <span className="chip">{content.experiencePage.type[currentRole.type]}</span>
                {currentRole.tech.slice(0, 4).map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                to="/experience"
                className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-200 transition-colors hover:text-white"
              >
                {c.fullExperience}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-cyan/10 p-7">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <p className="eyebrow">{c.contactEyebrow}</p>
              <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                {c.contactTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.contactLead}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/contact" className="btn-primary px-4 py-2.5 text-[13px]">
                  {c.contactCta}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href={whatsappUrl(content.common.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-2.5 text-[13px]"
                >
                  WhatsApp
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
