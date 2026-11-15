import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { skillGroups } from '../../data/portfolio';

const MARK_COLORS = {
  'HTML5': '#E34F26',
  'CSS3': '#1572B6',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  React: '#61DAFB',
  'Next.js': '#E5E7EB',
  Vue: '#42B883',
  'Tailwind CSS': '#38BDF8',
  'Framer Motion': '#D8B4FE',
  'Three.js': '#049EF4',
  'Node.js': '#68A063',
  Express: '#94A3B8',
  Python: '#FFD343',
  'REST APIs': '#3B82F6',
  GraphQL: '#E10098',
  WebSockets: '#22D3EE',
  'React Native': '#61DAFB',
  Flutter: '#54C5F8',
  Dart: '#0175C2',
  Firebase: '#FFCA28',
  PostgreSQL: '#7CA0C9',
  MySQL: '#00758F',
  MongoDB: '#47A248',
  Redis: '#DC382D',
  Git: '#F05032',
  GitHub: '#E5E7EB',
  Docker: '#2496ED',
  'VS Code': '#3B82F6',
  Vite: '#A78BFA',
  Vercel: '#E5E7EB',
  Figma: '#F24E1E',
  'UI Design': '#8B5CF6',
  'UX Thinking': '#22D3EE',
  'Responsive Design': '#34D399',
  Accessibility: '#F472B6',
  'AI Integration': '#A78BFA',
  'TensorFlow.js': '#FF6F00',
  WebRTC: '#22D3EE',
  PWA: '#5A0FC8',
};

const MARK_OVERRIDE = {
  HTML5: 'H5',
  CSS3: 'C3',
  JavaScript: 'JS',
  TypeScript: 'TS',
  'Next.js': 'NX',
  'Node.js': 'ND',
  'Tailwind CSS': 'TW',
  'Framer Motion': 'FM',
  'Three.js': '3J',
  PostgreSQL: 'PG',
  'React Native': 'RN',
  'REST APIs': 'API',
  'WebSockets': 'WS',
  'AI Integration': 'AI',
  'Responsive Design': 'RD',
  Accessibility: 'A11Y',
  'UI Design': 'UI',
  'UX Thinking': 'UX',
};

const mark = (name) => {
  if (MARK_OVERRIDE[name]) return MARK_OVERRIDE[name];
  const clean = name.replace(/\.js$/, '');
  if (clean.length <= 2) return clean.toUpperCase();
  if (clean.includes(' ')) {
    return clean
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState('all');
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const term = query.trim().toLowerCase();
    return skillGroups
      .filter((g) => activeGroup === 'all' || g.id === activeGroup)
      .map((g) => ({
        ...g,
        skills: g.skills.filter(
          (s) => !term || s.name.toLowerCase().includes(term) || s.note.toLowerCase().includes(term)
        ),
      }))
      .filter((g) => g.skills.length > 0);
  }, [activeGroup, query]);

  const totalSkills = skillGroups.reduce((sum, g) => sum + g.skills.length, 0);

  return (
    <section id="skills" className="section">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-cyan/[0.04] to-transparent" />

      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="section-title mt-4">
            My Technical <span className="text-gradient">Toolkit.</span>
          </h2>
          <p className="section-lead">
            The languages, frameworks, tools and design capabilities I use to build and ship
            software. Each one appears in the projects or work described on this page.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
            <button
              type="button"
              onClick={() => setActiveGroup('all')}
              aria-pressed={activeGroup === 'all'}
              className={`rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider transition-all ${
                activeGroup === 'all'
                  ? 'border-primary bg-primary text-white'
                  : 'border-line bg-surface/60 text-muted hover:border-primary/40 hover:text-ink'
              }`}
            >
              All <span className="ml-1 opacity-60">{totalSkills}</span>
            </button>
            {skillGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveGroup(g.id)}
                aria-pressed={activeGroup === g.id}
                className={`rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider transition-all ${
                  activeGroup === g.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-line bg-surface/60 text-muted hover:border-primary/40 hover:text-ink'
                }`}
              >
                {g.short || g.name.split(' ')[0]}{' '}
                <span className="ml-1 opacity-60">{g.skills.length}</span>
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:max-w-[240px]">
            <span className="sr-only">Search skills</span>
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills..."
              className="field py-2.5 pl-9 text-[13px]"
            />
          </label>
        </Reveal>

        <div className="mt-10 space-y-10">
          {groups.map((group, gi) => (
            <div key={group.id}>
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/70 pb-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{group.name}</h3>
                  <p className="text-[12px] text-muted">{group.description}</p>
                </div>
              </Reveal>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.skills.map((skill, si) => {
                  const color = MARK_COLORS[skill.name] || '#3B82F6';
                  return (
                    <Reveal key={skill.name} delay={Math.min(gi * 0.02 + si * 0.03, 0.3)}>
                      <div className="card group flex h-full items-start gap-3 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border font-mono text-[10px] font-semibold"
                          style={{
                            color,
                            borderColor: `${color}40`,
                            backgroundColor: `${color}14`,
                          }}
                          aria-hidden="true"
                        >
                          {mark(skill.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-semibold text-ink">{skill.name}</p>
                          <p className="mt-0.5 text-[11.5px] leading-snug text-muted">{skill.note}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="card mt-8 px-6 py-14 text-center">
            <p className="font-display text-base font-semibold text-ink">No skills found</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setActiveGroup('all');
              }}
              className="btn-secondary mt-4 px-4 py-2 text-[13px]"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
