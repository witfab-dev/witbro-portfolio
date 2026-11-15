import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { skillGroupsMeta } from '../data/portfolio';
import { useI18n } from '../i18n/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';

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
  WebSockets: 'WS',
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
      .map((word) => word[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

export default function SkillsPage() {
  usePageTitle('skills');
  const { content } = useI18n();
  const s = content.skillsPage;
  const [activeGroup, setActiveGroup] = useState('all');
  const [query, setQuery] = useState('');

  const totalSkills = skillGroupsMeta.reduce((sum, group) => sum + group.skills.length, 0);

  const groups = useMemo(() => {
    const term = query.trim().toLowerCase();
    return skillGroupsMeta
      .filter((group) => activeGroup === 'all' || group.id === activeGroup)
      .map((group) => {
        const copy = content.skillCopy[group.id];
        return {
          ...group,
          copy,
          skills: group.skills.filter((skill) => {
            const note = copy.notes[skill.name] || '';
            return !term || skill.name.toLowerCase().includes(term) || note.toLowerCase().includes(term);
          }),
        };
      })
      .filter((group) => group.skills.length > 0);
  }, [activeGroup, query, content]);

  return (
    <main className="relative pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-cyan/[0.05] to-transparent" />

      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">{s.eyebrow}</p>
          <h1 className="section-title mt-4">
            {s.titleA} <span className="text-gradient">{s.titleB}</span>
          </h1>
          <p className="section-lead">{s.lead}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label={s.filterLabel}>
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
              {s.all} <span className="ml-1 opacity-60">{totalSkills}</span>
            </button>
            {skillGroupsMeta.map((group) => {
              const copy = content.skillCopy[group.id];
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveGroup(group.id)}
                  aria-pressed={activeGroup === group.id}
                  className={`rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider transition-all ${
                    activeGroup === group.id
                      ? 'border-primary bg-primary text-white'
                      : 'border-line bg-surface/60 text-muted hover:border-primary/40 hover:text-ink'
                  }`}
                >
                  {copy.short} <span className="ml-1 opacity-60">{group.skills.length}</span>
                </button>
              );
            })}
          </div>

          <label className="relative block w-full lg:max-w-[240px]">
            <span className="sr-only">{s.searchPlaceholder}</span>
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={s.searchPlaceholder}
              className="field py-2.5 pl-9 text-[13px]"
            />
          </label>
        </Reveal>

        <div className="mt-10 space-y-10">
          {groups.map((group, groupIndex) => (
            <div key={group.id}>
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/70 pb-3">
                  <h2 className="font-display text-lg font-semibold text-ink">{group.copy.name}</h2>
                  <p className="text-[12px] text-muted">{group.copy.description}</p>
                </div>
              </Reveal>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.skills.map((skill, skillIndex) => (
                  <Reveal
                    key={skill.name}
                    delay={Math.min(groupIndex * 0.02 + skillIndex * 0.03, 0.3)}
                  >
                    <div className="card group flex h-full items-start gap-3 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border font-mono text-[10px] font-semibold"
                        style={{
                          color: skill.color,
                          borderColor: `${skill.color}40`,
                          backgroundColor: `${skill.color}14`,
                        }}
                        aria-hidden="true"
                      >
                        {mark(skill.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-semibold text-ink">{skill.name}</p>
                        <p className="mt-0.5 text-[11.5px] leading-snug text-muted">
                          {group.copy.notes[skill.name]}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="card mt-8 px-6 py-14 text-center">
            <p className="font-display text-base font-semibold text-ink">{s.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setActiveGroup('all');
              }}
              className="btn-secondary mt-4 px-4 py-2 text-[13px]"
            >
              {s.clearSearch}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
