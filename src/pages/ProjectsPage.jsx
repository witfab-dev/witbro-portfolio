import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Search, Star, X } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { projectFilters, projectMeta } from '../data/portfolio';
import { useI18n } from '../i18n/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';

const statusClass = {
  live: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  completed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  development: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
};

function ProjectLinks({ project, compact = false, content }) {
  const { demo, github } = project.links;
  if (!demo && !github) {
    return (
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
        {content.common.sourceSoon}
      </span>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${content.common.sourceCode}`}
          className={`grid place-items-center rounded-lg border border-line bg-surface/70 text-muted transition-colors hover:border-primary/50 hover:text-ink ${
            compact ? 'h-8 w-8' : 'h-9 w-9'
          }`}
        >
          <Github size={compact ? 14 : 15} />
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${content.common.viewLive}`}
          className={`grid place-items-center rounded-lg border border-primary/40 bg-primary/15 text-blue-200 transition-colors hover:bg-primary hover:text-white ${
            compact ? 'h-8 w-8' : 'h-9 w-9'
          }`}
        >
          <ExternalLink size={compact ? 14 : 15} />
        </a>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose, content }) {
  const closeRef = useRef(null);
  const copy = content.projectCopy[project.id];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        aria-label={content.common.close}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-night/85 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface sm:rounded-3xl"
      >
        <div className="relative h-48 overflow-hidden sm:h-64">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={content.common.close}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line bg-night/70 text-ink backdrop-blur-md transition-colors hover:bg-night"
          >
            <X size={16} />
          </button>
          <div className="absolute inset-x-5 bottom-4">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: project.accent }}
            >
              {copy.category} · {project.year}
            </p>
            <h2
              id="project-modal-title"
              className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl"
            >
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-[14.5px] leading-relaxed text-slate-300">{copy.description}</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                {content.projectsPage.problem}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{copy.problem}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                {content.projectsPage.solution}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{copy.solution}</p>
            </div>
          </div>

          <div className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              {content.projectsPage.technologies}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line/70 pt-6">
            <span
              className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${
                statusClass[project.status] || 'border-line bg-surface text-muted'
              }`}
            >
              {content.projectsPage.status[project.status]}
            </span>

            <div className="ml-auto flex flex-wrap gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-2.5 text-[13px]"
                >
                  <Github size={15} /> {content.common.sourceCode}
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-4 py-2.5 text-[13px]"
                >
                  {content.common.viewLive} <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  usePageTitle('projects');
  const { content } = useI18n();
  const p = content.projectsPage;
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projectMeta.filter((project) => {
      if (filter !== 'all' && project.category !== filter) return false;
      if (!term) return true;
      const copy = content.projectCopy[project.id];
      return (
        project.title.toLowerCase().includes(term) ||
        copy.description.toLowerCase().includes(term) ||
        copy.category.toLowerCase().includes(term) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(term))
      );
    });
  }, [filter, query, content]);

  const totalTech = new Set(projectMeta.flatMap((project) => project.technologies)).size;

  return (
    <main className="relative pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/[0.06] to-transparent" />

      <div className="container-wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">{p.eyebrow}</p>
            <h1 className="section-title mt-4 max-w-2xl">
              {p.titleA} <span className="text-gradient">{p.titleB}</span>
            </h1>
            <p className="section-lead">{p.lead}</p>
          </Reveal>

          <Reveal delay={0.1} className="flex gap-6 lg:text-right">
            <div>
              <p className="font-display text-3xl font-semibold text-ink">{projectMeta.length}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {p.countProjects}
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-ink">{totalTech}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {p.countTech}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label={p.filterLabel}>
            {projectFilters.map((key) => {
              const count =
                key === 'all'
                  ? projectMeta.length
                  : projectMeta.filter((project) => project.category === key).length;
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={active}
                  className={`rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? 'border-primary bg-primary text-white'
                      : 'border-line bg-surface/60 text-muted hover:border-primary/40 hover:text-ink'
                  }`}
                >
                  {p.filters[key]}
                  <span className={`ml-1.5 ${active ? 'text-white/60' : 'text-muted/60'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <label className="relative block w-full md:max-w-xs">
            <span className="sr-only">{p.searchPlaceholder}</span>
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={p.searchPlaceholder}
              className="field py-2.5 pl-9 text-[13px]"
            />
          </label>
        </Reveal>

        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => {
              const copy = content.projectCopy[project.id];
              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-30px_rgba(59,130,246,0.55)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/10 to-transparent" />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      <span
                        className="rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider backdrop-blur-md"
                        style={{
                          borderColor: `${project.accent}55`,
                          backgroundColor: `${project.accent}1f`,
                          color: project.accent,
                        }}
                      >
                        {copy.category}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-amber-300 backdrop-blur-md">
                          <Star size={9} fill="currentColor" /> {content.common.featured}
                        </span>
                      )}
                    </div>
                    <span className="absolute right-3 top-3 rounded-full border border-line/80 bg-night/70 px-2 py-1 font-mono text-[9px] text-muted backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-display text-lg font-semibold leading-snug text-ink">
                        {project.title}
                      </h2>
                      <ProjectLinks project={project} compact content={content} />
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{copy.description}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span
                        className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${
                          statusClass[project.status] || 'border-line bg-surface text-muted'
                        }`}
                      >
                        {p.status[project.status]}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelected(project)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-200 transition-colors hover:text-white"
                      >
                        {content.common.viewDetails}
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="card mt-6 px-6 py-14 text-center">
            <Search size={26} className="mx-auto text-muted/50" />
            <p className="mt-3 font-display text-base font-semibold text-ink">{p.noResults}</p>
            <p className="mt-1 text-[13px] text-muted">{p.noResultsHint}</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
              className="btn-secondary mt-5 px-4 py-2 text-[13px]"
            >
              {p.clearFilters}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} content={content} />
        )}
      </AnimatePresence>
    </main>
  );
}
