import React from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { educationMeta, experienceMeta } from '../data/portfolio';
import { useI18n } from '../i18n/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';

export default function ExperiencePage() {
  usePageTitle('experience');
  const { content, locale } = useI18n();
  const e = content.experiencePage;

  return (
    <main className="relative pb-24 pt-28 sm:pt-32">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">{e.eyebrow}</p>
          <h1 className="section-title mt-4">
            {e.titleA} <span className="text-gradient">{e.titleB}</span>
          </h1>
          <p className="section-lead">{e.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <Briefcase size={16} className="text-cyan" />
              <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                {e.rolesTitle}
              </h2>
            </div>

            <ol className="relative space-y-4 border-l border-line/80 pl-6 sm:pl-8">
              {experienceMeta.map((job, i) => {
                const copy = content.roles[i];
                return (
                  <li key={`${job.period}-${i}`} className="relative">
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
                            {locale === 'fr' ? job.periodFr : job.period}
                          </span>
                          {job.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {e.current}
                            </span>
                          )}
                          <span className="chip ml-auto">{e.type[job.type]}</span>
                        </div>

                        <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                          {copy.role}
                        </h3>
                        <p className="mt-0.5 text-[13px] font-medium text-blue-200">
                          {job.organization}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                          <MapPin size={11} /> {job.location}
                        </p>

                        <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{copy.summary}</p>

                        <ul className="mt-3 space-y-1.5">
                          {copy.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-2 text-[12.5px] text-slate-300">
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan" />
                              {highlight}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {job.tech.map((tech) => (
                            <span key={tech} className="chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <GraduationCap size={17} className="text-cyan" />
              <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                {e.educationTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {educationMeta.map((entry, i) => {
                const copy = content.education[i];
                return (
                  <Reveal key={copy.title} delay={i * 0.06}>
                    <div className="card p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                          {locale === 'fr' ? entry.periodFr : entry.period}
                        </span>
                        <span className="h-px flex-1 bg-line/70" />
                      </div>
                      <h3 className="mt-3 font-display text-[15px] font-semibold leading-snug text-ink">
                        {copy.title}
                      </h3>
                      <p className="mt-0.5 text-[12px] text-muted">{entry.organization}</p>
                      <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">{copy.detail}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-4 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-transparent p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                  {e.learningTitle}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{e.learningText}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
