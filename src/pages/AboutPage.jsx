import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Eye, Heart, Lightbulb, MapPin, Sparkles, Target } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { profile, socials } from '../data/portfolio';
import { useI18n } from '../i18n/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';

const tabIcons = { story: BookOpen, philosophy: Lightbulb, vision: Eye, mission: Target };
const tabGradients = {
  story: 'from-primary to-cyan',
  philosophy: 'from-violet-500 to-fuchsia-500',
  vision: 'from-cyan to-emerald-400',
  mission: 'from-amber-400 to-orange-500',
};

export default function AboutPage() {
  usePageTitle('about');
  const { content } = useI18n();
  const a = content.about;
  const [tab, setTab] = useState('story');
  const reduceMotion = useReducedMotion();

  const tabIds = ['story', 'philosophy', 'vision', 'mission'];

  return (
    <main className="relative pb-24 pt-28 sm:pt-32">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">{a.eyebrow}</p>
          <h1 className="section-title mt-4 max-w-3xl">
            {a.titleA} <span className="text-gradient">{a.titleB}</span>
          </h1>
          <p className="section-lead">{a.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          {/* Identity card */}
          <Reveal>
            <div className="card sticky top-24 overflow-hidden">
              <div className="relative">
                <img
                  src={profile.portrait}
                  alt={content.hero.portraitAlt}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                  {a.portraitTag}
                </p>

                <div className="mt-4 space-y-2 text-[13px] text-muted">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-cyan" /> {profile.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Lightbulb size={14} className="text-cyan" /> {a.level}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-line/60 pt-4">
                  {socials.slice(0, 3).map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-muted transition-colors hover:text-ink"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tabbed narrative */}
          <Reveal delay={0.06}>
            <div role="tablist" aria-label={a.tabsLabel} className="flex flex-wrap gap-1">
              {tabIds.map((id) => {
                const Icon = tabIcons[id];
                const active = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`tab-${id}`}
                    aria-selected={active}
                    aria-controls={`panel-${id}`}
                    onClick={() => setTab(id)}
                    className="relative flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-colors"
                  >
                    {active && (
                      <motion.span
                        layoutId="about-tab-pill"
                        className={`absolute inset-0 bg-gradient-to-r ${tabGradients[id]}`}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <Icon size={13} className={`relative z-10 ${active ? 'text-white' : 'text-muted'}`} />
                    <span className={`relative z-10 ${active ? 'text-white' : 'text-muted'}`}>
                      {a.tabs[id]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  id={`panel-${tab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${tab}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="card p-6 sm:p-8"
                >
                  {tab === 'story' && (
                    <div>
                      <h2 className="font-display text-xl font-semibold text-ink">
                        {a.storyPanelTitle}
                      </h2>
                      <p className="mt-2 text-[13.5px] text-muted">{a.storyPanelBody}</p>

                      <div className="mt-5 space-y-4 text-[14.5px] leading-[1.85] text-slate-300">
                        <p>{a.who1}</p>
                        <p className="text-muted">{a.story1}</p>
                        <p className="text-muted">{a.story2}</p>
                        <p className="text-muted">{a.story3}</p>
                      </div>

                      <blockquote className="mt-6 border-l-2 border-primary/60 pl-5 font-display text-base leading-snug text-ink">
                        &ldquo;{a.quote}&rdquo;
                      </blockquote>
                    </div>
                  )}

                  {tab === 'philosophy' && (
                    <div>
                      <h2 className="font-display text-xl font-semibold text-ink">
                        {a.philosophyTitle}
                      </h2>
                      <p className="mt-2 text-[13.5px] text-muted">{a.philosophyLead}</p>
                      <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                        {content.philosophy.map((principle, i) => (
                          <div key={principle.title}>
                            <p className="font-mono text-[9px] text-muted/50">0{i + 1}</p>
                            <h3 className="mt-1 text-[13.5px] font-semibold text-ink">
                              {principle.title}
                            </h3>
                            <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                              {principle.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(tab === 'vision' || tab === 'mission') && (
                    <div>
                      <h2 className="font-display text-xl font-semibold text-ink">
                        {tab === 'vision' ? a.visionTitle : a.missionTitle}
                      </h2>
                      <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">
                        {tab === 'vision' ? a.visionHeadline : a.missionHeadline}
                      </p>
                      <p className="mt-4 text-[14.5px] leading-[1.85] text-muted">
                        {tab === 'vision' ? a.visionText : a.missionText}
                      </p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-3">
                        {a.pillars.map((pillar) => (
                          <div key={pillar.title} className="rounded-xl border border-line/70 bg-surface/60 p-4">
                            <p className="text-[12.5px] font-semibold text-ink">{pillar.title}</p>
                            <p className="mt-1 text-[11.5px] leading-snug text-muted">{pillar.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-20">
          <Reveal>
            <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
              <Heart size={14} /> {a.valuesTitle}
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.04}>
                <div className="card h-full p-5 transition-colors duration-300 hover:border-primary/40">
                  <h3 className="font-display text-[15px] font-semibold text-ink">{value.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-20">
          <Reveal>
            <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
              <Sparkles size={14} /> {a.servicesTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{a.servicesLead}</p>
          </Reveal>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.04}>
                <div className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface font-display text-sm text-cyan">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">{service.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{service.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
