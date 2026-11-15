import React from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { education, experience } from '../../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Experience</p>
          <h2 className="section-title mt-4">
            My Journey in <span className="text-gradient">Technology.</span>
          </h2>
          <p className="section-lead">
            Development roles, education and the milestones that shaped how I build software.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Roles */}
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <Briefcase size={16} className="text-cyan" />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                Development experience
              </h3>
            </div>

            <ol className="relative space-y-4 border-l border-line/80 pl-6 sm:pl-8">
              {experience.map((job, i) => (
                <li key={`${job.role}-${job.period}`} className="relative">
                  <span
                    className={`absolute -left-[31px] top-6 h-2.5 w-2.5 rounded-full border-2 sm:-left-[39px] ${
                      job.current
                        ? 'border-cyan bg-night shadow-[0_0_0_4px_rgba(34,211,238,0.15)]'
                        : 'border-line bg-surface'
                    }`}
                    aria-hidden="true"
                  />
                  <Reveal delay={i * 0.06}>
                    <article className="card p-5 transition-colors duration-300 hover:border-primary/40 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                          {job.period}
                        </span>
                        {job.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Current
                          </span>
                        )}
                        <span className="chip ml-auto">{job.type}</span>
                      </div>

                      <h4 className="mt-2 font-display text-lg font-semibold text-ink">{job.role}</h4>
                      <p className="mt-0.5 text-[13px] font-medium text-blue-200">{job.organization}</p>

                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                        <MapPin size={11} /> {job.location}
                      </p>

                      <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{job.summary}</p>

                      <ul className="mt-3 space-y-1.5">
                        {job.highlights.map((h) => (
                          <li key={h} className="flex gap-2 text-[12.5px] text-slate-300">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.tech.map((t) => (
                          <span key={t} className="chip">{t}</span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Education */}
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <GraduationCap size={17} className="text-cyan" />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                Education &amp; learning
              </h3>
            </div>

            <div className="space-y-3">
              {education.map((entry, i) => (
                <Reveal key={entry.title} delay={i * 0.06}>
                  <div className="card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                        {entry.period}
                      </span>
                      <span className="h-px flex-1 bg-line/70" />
                    </div>
                    <h4 className="mt-3 font-display text-[15px] font-semibold leading-snug text-ink">
                      {entry.title}
                    </h4>
                    <p className="mt-0.5 text-[12px] text-muted">{entry.organization}</p>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">{entry.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-4 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-transparent p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                  Currently learning
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
                  Deepening my work in scalable backend architecture, AI integration and
                  production-grade frontend performance.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
