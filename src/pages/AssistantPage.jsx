import React from 'react';
import { ArrowUpRight, Bot, FolderKanban, Code2, Wrench, Mail, BrainCircuit, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal';
import { useI18n } from '../i18n/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';

const icons = [FolderKanban, Code2, Wrench, Mail];

export default function AssistantPage({ onAsk }) {
  usePageTitle('assistant');
  const { content } = useI18n();
  const a = content.assistantPage;

  return (
    <main className="relative pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary/[0.07] to-transparent" />

      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
        <Reveal>
          <p className="eyebrow">{a.eyebrow}</p>
          <h1 className="section-title mt-4">
            {a.titleA} <span className="text-gradient">{a.titleB}</span>
          </h1>
          <p className="section-lead">{a.lead}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => onAsk(null)} className="btn-primary">
              <Bot size={17} /> {content.common.openAssistant}
            </button>
            <Link to="/contact" className="btn-secondary">
              {content.common.contactDirectly} <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
              {a.capabilitiesTitle}
            </h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {a.capabilities.map((capability, i) => {
                const Icon = icons[i];
                return (
                  <div key={capability.title} className="card p-4">
                    <Icon size={15} className="text-cyan" />
                    <p className="mt-2 text-[12.5px] font-semibold text-ink">{capability.title}</p>
                    <p className="mt-1 text-[11.5px] leading-snug text-muted">{capability.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line/70 bg-surface/50 p-4">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
              <BrainCircuit size={13} /> {a.howTitle}
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{a.howText}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card overflow-hidden">
            <div className="flex items-center gap-3 border-b border-line/70 bg-card/70 px-5 py-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-white">
                <Bot size={17} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ink">WIT.FAB AI</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-300">
                  {a.online}
                </p>
              </div>
              <Sparkles size={15} className="ml-auto text-cyan" />
            </div>

            <div className="space-y-4 p-5">
              <p className="text-[13px] leading-relaxed text-slate-300">{a.welcome}</p>

              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                  {a.tryAsking}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {a.suggestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => onAsk(question)}
                      className="rounded-full border border-line bg-card/70 px-2.5 py-1.5 text-left text-[10.5px] text-muted transition-colors hover:border-primary/50 hover:text-ink"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
