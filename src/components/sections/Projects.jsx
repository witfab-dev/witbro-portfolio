import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Search,
  Star,
  X,
} from 'lucide-react';
import Reveal from '../ui/Reveal';
import { projectFilters, projects } from '../../data/portfolio';

const statusStyles = {
  Live: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  Completed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  'In development': 'border-amber-400/30 bg-amber-400/10 text-amber-300',
};

function ProjectLinks({ project, compact = false }) {
  const { demo, github } = project.links;
  if (!demo && !github) {
    return (
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
        Source coming soon
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
          aria-label={`${project.title} source code on GitHub`}
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
          aria-label={`${project.title} live demo`}
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

function ProjectCard({ project, onOpen, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-30px_rgba(59,130,246,0.55)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
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
            {project.categoryLabel}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-amber-300 backdrop-blur-md">
              <Star size={9} fill="currentColor" /> Featured
            </span>
          )}
        </div>
        <span className="absolute right-3 top-3 rounded-full border border-line/80 bg-night/70 px-2 py-1 font-mono text-[9px] text-muted backdrop-blur-md">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink">
            {project.title}
          </h3>
          <ProjectLinks project={project} compact />
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span
            className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${
              statusStyles[project.status] || 'border-line bg-surface text-muted'
            }`}
          >
            {project.status}
          </span>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-200 transition-colors hover:text-white"
          >
            View details
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedCard({ project, onOpen }) {
  return (
    <div className="card group relative overflow-hidden transition-all duration-300 hover:border-primary/40">
      <div className="absolute right-4 top-4 z-10 rounded-full border border-amber-300/30 bg-night/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-amber-300 backdrop-blur-md">
        Featured
      </div>
      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-full md:min-h-[260px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent md:bg-gradient-to-r" />
        </div>
        <div className="flex flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            <span style={{ color: project.accent }}>{project.categoryLabel}</span>
            <span className="text-muted/40">/</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{project.title}</h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
            <ProjectLinks project={project} />
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-primary/50 hover:bg-surface"
            >
              Case study
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

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
        aria-label="Close project details"
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
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line bg-night/70 text-ink backdrop-blur-md transition-colors hover:bg-night"
          >
            <X size={16} />
          </button>
          <div className="absolute inset-x-5 bottom-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
              {project.categoryLabel} · {project.year}
            </p>
            <h2 id="project-modal-title" className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-[14.5px] leading-relaxed text-slate-300">{project.description}</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">Problem</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{project.problem}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">Solution</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{project.solution}</p>
            </div>
          </div>

          <div className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              Technologies used
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line/70 pt-6">
            <span
              className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${
                statusStyles[project.status] || 'border-line bg-surface text-muted'
              }`}
            >
              {project.status}
            </span>

            <div className="ml-auto flex flex-wrap gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-2.5 text-[13px]"
                >
                  <Github size={15} /> Source code
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-4 py-2.5 text-[13px]"
                >
                  View live project <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory = filter === 'all' || p.category === filter;
      if (!inCategory) return false;
      if (!term) return true;
      return (
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.categoryLabel.toLowerCase().includes(term) ||
        p.technologies.some((t) => t.toLowerCase().includes(term))
      );
    });
  }, [filter, query]);

  const featured = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <section id="projects" className="section">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/[0.05] to-transparent" />

      <div className="container-wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">Projects</p>
            <h2 className="section-title mt-4 max-w-2xl">
              Projects That Turn <span className="text-gradient">Ideas Into Reality.</span>
            </h2>
            <p className="section-lead">
              Every project built so far — web applications, a business system and an educational
              game. Open any project for the problem it solves, the approach taken and the
              technologies behind it.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex gap-6 lg:text-right">
            <div>
              <p className="font-display text-3xl font-semibold text-ink">{projects.length}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Projects</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-ink">
                {new Set(projects.flatMap((p) => p.technologies)).size}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Technologies</p>
            </div>
          </Reveal>
        </div>

        {/* Featured */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <FeaturedCard project={p} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>

        {/* Collection */}
        <div className="mt-20">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">Complete collection</h3>
              <p className="mt-1 text-[13px] text-muted">
                Search by name or technology, or filter by category.
              </p>
            </div>

            <label className="relative block w-full md:max-w-xs">
              <span className="sr-only">Search projects</span>
              <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects or tech..."
                className="field py-2.5 pl-9 text-[13px]"
              />
            </label>
          </Reveal>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {projectFilters.map((f) => {
              const count = f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length;
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'border-primary bg-primary text-white'
                      : 'border-line bg-surface/60 text-muted hover:border-primary/40 hover:text-ink'
                  }`}
                >
                  {f.label}
                  <span className={`ml-1.5 ${isActive ? 'text-white/60' : 'text-muted/60'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <ProjectCard key={p.id} project={p} onOpen={setSelected} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="card mt-6 px-6 py-14 text-center">
              <Search size={26} className="mx-auto text-muted/50" />
              <p className="mt-3 font-display text-base font-semibold text-ink">No projects found</p>
              <p className="mt-1 text-[13px] text-muted">Try a different search term or category.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilter('all');
                }}
                className="btn-secondary mt-5 px-4 py-2 text-[13px]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
